<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    v-model="dialog"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
    persistent
  >
    <q-card
      class="bg-white rounded-borders"
      style="
        width: 95vw;
        max-width: 1100px;
        border-radius: 16px;
        overflow: hidden;
      "
    >
      <!-- Header with nicer gradient + blur effect possibility -->
      <q-card-section :class="['dialog-header text-white', headerClass]">
        <div class="row items-center justify-between q-gutter-md">
          <div class="row items-center q-gutter-sm">
            <q-icon :name="getCategoryIcon(category)" size="xl" />
            <div>
              <div class="text-h5 text-weight-bold">
                {{ category === "Bread" ? "Send" : "Send / Add" }}
                {{ category }} Products
              </div>
              <div class="text-subtitle1 opacity-85 q-mt-xs">
                Transfer to branches or update inventory
              </div>
            </div>
          </div>

          <q-btn
            icon="close"
            flat
            round
            dense
            class="bg-white text-grey-8"
            size="md"
            v-close-popup
            @click="onDialogHide"
          />
        </div>
      </q-card-section>

      <q-card-section class="q-pa-lg">
        <!-- Optional quick filter (very user-friendly) -->
        <q-input
          v-if="rows.length > 3"
          v-model="filter"
          outlined
          dense
          debounce="300"
          placeholder="Search product, staff, destination..."
          class="q-mb-lg"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <div v-if="!loading">
          <q-table
            :rows="rows"
            :columns="productColumns"
            row-key="id"
            flat
            square
            bordered
            v-model:pagination="pagination"
            :loading="loading"
            :rows-per-page-options="[5, 10, 0]"
            :filter="filter"
            @request="handleRequest"
            class="my-sticky-modern-table shadow-1 rounded-borders"
            wrap-cells
            virtual-scroll
          >
            <!-- :pagination="{ rowsPerPage: 10, sortBy: 'date', descending: true }" -->
            <!-- <template v-slot:body-cell-destination="props">
            <q-td :props="props" class="text-center">
              <div v-if="props.row.action === 'add'">
                {{ props.row.action }}
              </div>
              <div v-else>
                {{ props.row.to_branch }}
              </div>
            </q-td>
          </template> -->
            <!-- Status badge with better contrast -->
            <template v-slot:body-cell-status="props">
              <q-td :props="props" class="text-center">
                <q-badge
                  :color="getStatusColor(props.value)"
                  text-color="white"
                  class="q-pa-sm q-px-md text-weight-medium text-uppercase"
                  rounded
                  :label="props.value"
                />
              </q-td>
            </template>

            <!-- Product name with better visual weight -->
            <template v-slot:body-cell-product="props">
              <q-td :props="props">
                <div class="text-subtitle1 text-weight-medium text-primary">
                  {{ props.value }}
                </div>
              </q-td>
            </template>

            <!-- Actions with tooltip + subtle hover -->
            <template v-slot:body-cell-action="props">
              <q-td :props="props" class="text-right">
                <q-btn-group flat>
                  <q-btn
                    flat
                    round
                    dense
                    color="primary"
                    icon="visibility"
                    @click="viewDetails(props.row)"
                  >
                    <q-tooltip anchor="bottom middle" :offset="[0, 8]"
                      >View Details</q-tooltip
                    >
                  </q-btn>
                </q-btn-group>
              </q-td>
            </template>

            <!-- Nice loading state -->
            <template #loading>
              <q-inner-loading showing>
                <q-spinner-ios size="50px" color="grey-10" />
              </q-inner-loading>
            </template>

            <!-- Empty state – very important for UX -->
            <template v-slot:no-data="{ icon, message }">
              <div
                class="full-width row flex-center text-accent q-gutter-sm q-py-xl"
              >
                <q-icon :name="icon" size="2rem" />
                <span>{{
                  message || "No products found in this category."
                }}</span>
              </div>
            </template>
          </q-table>
          <!-- <div class="row justify-center q-mt-md">
            <q-pagination
              v-model="pagination.page"
              :max="maxPages"
              :max-pages="7"
              direction-links
              boundary-links
            />
          </div> -->
        </div>

        <q-inner-loading v-else showing />
      </q-card-section>

      <!-- Optional footer with summary / actions -->
      <q-card-actions align="right" class="q-pa-md bg-grey-2">
        <q-btn
          v-close-popup
          flat
          label="Close"
          color="grey-8"
          class="q-mr-sm"
        />
        <!-- Add more global actions if needed -->
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useDialogPluginComponent, useQuasar } from "quasar";
import { useBranchProductsStore } from "src/stores/branch-product";
import { useSalesReportsStore } from "src/stores/sales-report";
import { typographyFormat } from "src/composables/typography/typography-format";
import ViewDetails from "./ViewDetails.vue";

const props = defineProps({ category: { type: String, required: true } });

const filter = ref("");

const { dialogRef, onDialogHide } = useDialogPluginComponent();
const maximizedToggle = ref(true); // you can make this computed or toggleable

const { formatDate, formatTime, formatFullname, capitalizeFirstLetter } =
  typographyFormat();

const salesReportsStore = useSalesReportsStore();
const userData = computed(() => salesReportsStore.user);
const branchId = computed(
  () =>
    userData.value?.device?.reference_id ||
    userData.value?.device?.reference?.id ||
    ""
);

const $q = useQuasar();

const pagination = ref({
  page: 1,
  rowsPerPage: 0,
  rowsNumber: 0,
});

const closeDialog = () => {
  onDialogHide();
};

const branchProductsStore = useBranchProductsStore();
const branchProducts = computed(() => branchProductsStore.branchSendAddedProd);
const rows = ref([]);

const loading = ref(false);

const fetchASBranchProd = async (page = 0, rowsPerPage = 5, search = "") => {
  if (!branchId.value) return;
  loading.value = true;
  try {
    const response = await branchProductsStore.fetchSendAddedBranchProducts(
      props.category,
      branchId.value,
      page,
      rowsPerPage,
      search
    );

    const { data, current_page, per_page, total } = branchProducts.value;

    console.log("branchProducts.value", branchProducts.value);

    console.log("data", data);

    rows.value = data;

    console.log("rows.value", rows.value);
    pagination.value = {
      page: current_page,
      rowsPerPage: per_page,
      rowsNumber: total,
    };
  } catch (err) {
    console.error("Failed to load branch products:", err);
    // → you can show $q.notify here
  } finally {
    loading.value = false;
  }
};

onMounted(fetchASBranchProd);

const handleRequest = (props) => {
  fetchASBranchProd(
    props.pagination.page,
    props.pagination.rowsPerPage,
    props.filter
  );
};

watch(filter, async (newVal) => {
  pagination.value.page = 1;
  await fetchASBranchProd(
    pagination.value.page,
    pagination.value.rowsPerPage,
    newVal
  );
});

const headerClass = computed(() => {
  const map = {
    selecta: "bg-selecta",
    bread: "bg-bread",
    softdrinks: "bg-softdrinks",
    other: "bg-other",
  };
  return map[props.category?.toLowerCase()] || "bg-primary";
});

const getCategoryIcon = (cat) => {
  const icons = {
    bread: "bakery_dining",
    selecta: "icecream",
    softdrinks: "local_drink",
    other: "category",
  };
  return icons[cat?.toLowerCase()] || "inventory_2";
};

const getStatusColor = (status) => {
  const s = (status || "").toLowerCase();
  if (s.includes("pending")) return "orange";
  if (s.includes("confirmed") || s.includes("approved")) return "positive";
  if (s.includes("cancel") || s.includes("reject")) return "negative";
  return "grey-7";
};

const viewDetails = (row) => {
  console.log("View:", row);
  // → open details drawer / modal / page

  $q.dialog({
    component: ViewDetails,
    componentProps: {
      productDetails: row,
      category: props.category,
    },
  });
};

function approveItem(row) {
  // TODO: implement approve logic + optimistic update
  console.log("Approve:", row);
}

// Columns – added sortable flags & better alignment
const productColumns = [
  {
    name: "product",
    label: "Product",
    field: (row) => capitalizeFirstLetter(row.product?.name || ""),
    align: "left",
    sortable: true,
  },
  {
    name: "date",
    label: "Date / Time",
    field: (row) =>
      `${formatDate(row.created_at)} ${formatTime(row.created_at)}`,
    align: "left",
    sortable: true,
  },
  {
    name: "employee",
    label: "Staff",
    field: (row) => formatFullname(row.employee),
    align: "left",
    sortable: true,
  },
  {
    name: "from_branch",
    label: "Source",
    field: (row) => capitalizeFirstLetter(row.from_branch?.name || "—"),
    align: "left",
    sortable: true,
  },
  {
    name: "to_branch",
    label: "Destination",
    field: (row) => {
      if (row.action === "add") {
        return "Need to be approved by Admin";
      } else {
        return capitalizeFirstLetter(row.to_branch?.name || "—");
      }
    },
    align: "left",
    sortable: true,
  },
  {
    name: "status",
    label: "Status",
    field: (row) => capitalizeFirstLetter(row.status || ""),
    align: "center",
    sortable: true,
  },
  { name: "action", label: "Actions", align: "right" },
];
</script>

<style lang="scss" scoped>
.dialog-header {
  padding: 28px 24px;
  background: linear-gradient(
    135deg,
    var(--q-primary) 0%,
    var(--q-primary-dark) 100%
  );
  position: relative;

  &.bg-selecta {
    background: linear-gradient(135deg, #f48fb1, #f06292);
  }
  &.bg-bread {
    background: linear-gradient(135deg, #8d6e63, #5d4037);
  }
  &.bg-softdrinks {
    background: linear-gradient(135deg, #4fc3f7, #0288d1);
  }
  &.bg-other {
    background: linear-gradient(135deg, #78909c, #455a64);
  }

  .text-h5 {
    line-height: 1.2;
  }
}

.my-sticky-modern-table {
  max-height: 65vh;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  thead th {
    background: #f8f9fa !important;
    color: #546e7a;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.78rem;
    letter-spacing: 0.4px;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .q-td {
    padding: 14px 16px !important;
  }

  tr:hover {
    background: #f5faff !important;
    transition: background 0.18s ease;
  }
}

.opacity-85 {
  opacity: 0.85;
}
</style>
