<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="q-mb-sm" align="right">
      <DeliveryCard @reFetchDelivery="fetchDeliveryStocks" />
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-md-4">
        <q-card
          flat
          class="bg-white q-pa-md rounded- borders-lg custom-shadow-light"
        >
          <div class="text-h6 text-weight-bold q-mb-sm text-grey-8">
            Delivery Transaction List
          </div>

          <q-input
            outlined
            dense
            placeholder="Search delivery"
            class="q-mb-sm"
            bg-color="grey-1"
            input-class="text-grey-8"
            label-color="grey-6"
            v-model="searchQuery"
            @update:model-value="onSearch"
          >
            <template v-slot:append>
              <q-icon name="search" color="grey-6" />
            </template>
          </q-input>

          <q-list separator>
            <template v-if="loading">
              <q-item v-for="n in pagination.per_page" :key="n">
                <q-item-section>
                  <q-skeleton type="text" width="80%" />
                  <q-skeleton type="text" width="40%" />
                </q-item-section>
              </q-item>
            </template>

            <template v-else>
              <q-item
                v-for="delivery in deliveryList.data"
                :key="delivery.id"
                class="q-py-md"
                clickable
                @click="openDialog(delivery)"
                :class="getItemClass(delivery)"
              >
                <!-- :class="[
                  selectedDelivery && delivery.id === selectedDelivery.id
                    ? delivery.to_designation === 'Warehouse'
                      ? 'selected-delivery-item'
                      : delivery.to_designation === 'Branch'
                      ? 'branch-selected-item'
                      : delivery.to_designation === 'Supplier'
                      ? 'default-selected-item'
                      : ''
                    : '',
                ]" -->

                <q-item-section>
                  <q-item-label
                    class="text-subtitle1 text-weight-bold text-grey-8"
                  >
                    {{ capitalize(delivery.to_data?.name || "N/A") }}
                  </q-item-label>
                  <q-item-label caption class="text-grey-6">
                    {{ delivery.items.length || "N/A" }} items
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label>
                    {{ formatTimeStamp(delivery.created_at) || "N/A" }}
                  </q-item-label>
                  <div class="row items-center text-caption">
                    <q-icon
                      name="fiber_manual_record"
                      :color="
                        delivery.status
                          ? getStatusColor(delivery.status)
                          : 'grey-6'
                      "
                      size="8px"
                      class="q-mr-xs"
                    />

                    <span
                      :class="
                        delivery.status
                          ? `text-${getStatusColor(delivery.status)}`
                          : 'text-grey-6'
                      "
                    >
                      {{ capitalize(delivery.status || "No Status") }}
                    </span>
                  </div>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
          <div v-if="pagination.last_page > 1" class="q-pt-md flex flex-center">
            <q-pagination
              v-model="pagination.current_page"
              :max="pagination.last_page"
              :max-pages="5"
              boundary-links
              direction-links
              icon-first="skip_previous"
              icon-last="skip_next"
              icon-prev="fast_rewind"
              icon-next="fast_forward"
              @update:model-value="onPageChange"
            />
          </div>
        </q-card>
      </div>

      <div class="col-xs-12 col-md-8">
        <q-card
          flat
          class="bg-white q-pa-md rounded-borders-lg custom-shadow-light"
        >
          <q-card-section>
            <div class="row justify-between">
              <div class="text-h6 text-weight-bold q-mb-sm text-grey-8">
                Items / Raw materials Delivery Details
              </div>

              <!-- <q-btn v-if="selectedDelivery" flat round dense icon="more_vert">
                <q-menu>
                  <q-list style="min-width: 100px">
                    <q-item
                      clickable
                      v-close-popup
                      @click="openEditDialog(selectedDelivery)"
                    >
                      <q-item-section> Edit </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section> Delete </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn> -->
            </div>
          </q-card-section>

          <q-card-section>
            <div v-if="selectedDelivery">
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-xs-12 col-sm-4">
                  <span class="text-grey-7 text-caption">From:</span>
                  <div class="text-subtitle1 text-weight-bold">
                    {{ capitalize(selectedDelivery.from_name || "No Name") }}
                  </div>
                </div>
                <div class="col-xs-12 col-sm-4">
                  <span class="text-grey-7 text-caption">To:</span>
                  <div class="text-subtitle1 text-weight-bold">
                    {{
                      capitalize(selectedDelivery.to_data?.name || "No Name")
                    }}
                  </div>
                </div>
              </div>

              <div class="col-xs-12 col-sm-4 q-mb-md">
                <span class="text-grey-7 text-caption">Status:</span>
                <div class="row items-center">
                  <q-icon
                    name="fiber_manual_record"
                    :color="getStatusColor(selectedDelivery.status)"
                    size="10px"
                    class="q-mr-xs"
                  />
                  <span
                    :class="
                      selectedDelivery.status
                        ? `text-${getStatusColor(selectedDelivery.status)}`
                        : 'text-grey-6'
                    "
                  >
                    {{ capitalize(selectedDelivery.status || "No Status") }}
                  </span>
                </div>
              </div>

              <div>
                <span class="text-grey-7 text-caption">Items:</span>

                <template
                  v-if="selectedDelivery.items && selectedDelivery.items.length"
                >
                  <q-list dense separator class="box">
                    <q-item class="bg-grey-1 text-weight-bold">
                      <q-item-section>
                        <q-item-label> Raw Materials Name </q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label> Raw Materials Code </q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label> Stocks Category </q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label> Quantity </q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label> Price per Unit </q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label> Price per Gram </q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label> Action </q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item
                      v-for="(item, index) in selectedDelivery.items"
                      :key="index"
                    >
                      <q-item-section>
                        <q-item-label>
                          {{ item.raw_material?.name || "No Name" }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>
                          {{ item.raw_material?.code || "No Code" }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>
                          {{ item.category || "No Category" }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>
                          {{ formatQuantity(item.quantity) }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>
                          {{ formatPrice(item.price_per_unit) }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>
                          {{ formatPrice(item.price_per_gram) }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label>
                          <q-btn
                            color="dark"
                            flat
                            round
                            dense
                            icon="edit"
                            @click="openEditDialog(item, selectedDelivery)"
                          />
                          <q-tooltip>
                            <span>Edit</span>
                          </q-tooltip>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </template>
                <div v-else class="text-caption text-grey-6 q-mt-md">
                  No items in this delivery
                </div>
              </div>
            </div>

            <div v-else class="text-h6 text-grey-6 q-my-xl text-center">
              Select a delivery from the list to see details
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useStockDelivery } from "src/stores/stock-delivery";
import DeliveryCard from "./components/StocksDeliveryButton.vue";
import EditDialog from "./components/EditDialog.vue";
import { date as quasarDate, useQuasar } from "quasar";
import { computed, onMounted, ref } from "vue";

const stocksDeliveryStore = useStockDelivery();
const $q = useQuasar();

const openMenu = ref(false);

// Computed properties to access store state
const deliveryList = computed(() => stocksDeliveryStore.deliveryStocks.data);
const loading = computed(() => stocksDeliveryStore.loading);
const pagination = computed(() => {
  return (
    stocksDeliveryStore.deliveryStocks?.pagination || {
      current_page: 1,
      last_page: 1,
      per_page: 5,
    }
  );
});

const selectedDelivery = ref(null);
const searchQuery = ref("");

// Debounce for search input to prevet any API calls
let searchTimeout = null;

const onSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    fetchDeliveryStocks(1);
  }, 500);
};

// Functio to fetch deliveries ewith current pagination and search parameters
const fetchDeliveryStocks = async (page = 1) => {
  $q.loading.show();
  try {
    await stocksDeliveryStore.fetchDeliveryStocks(
      page,
      pagination.value.per_page,
      searchQuery.value
    );

    // if deliveryList becomes empty after search/pagination, clear selected delivery
    if (!deliveryList.value.length && selectedDelivery.value) {
      selectedDelivery.value = null;
    }
    // if theres a selected delivery and its no longer in the current page, deselect it
    if (
      selectedDelivery.value &&
      !deliveryList.value.some((d) => d.id === selectedDelivery.value.id)
    ) {
      selectedDelivery.value = null;
    }
    // Automatically select the first delivery if none is selected and list is not empty
    if (!selectedDelivery.value && deliveryList.value.length > 0) {
      selectedDelivery.value = deliveryList.value[0];
    }

    console.log("deliveryList", deliveryList.value);
    console.log("pagination", pagination.value);
  } catch (error) {
    console.error("Error fetching delivery stocks in component:", error);
    $q.notify({
      type: "negative",
      message: "Failed to load deliveries. Please try again.",
    });
  } finally {
    $q.loading.hide(); // Hide loading indicator
  }
};

onMounted(() => {
  fetchDeliveryStocks(pagination.value.current_page);
});

// Watch for changes in the delivery list from the store
// No longer needed to directly watch delliveryStocks for `deliveryList.value = deliveryStocks.value;`
// as `deliveryList` is now a computed property directly accessing `stocksDeliveryStore.deliveryStocks.data`

const openEditDialog = (item, delivery) => {
  console.log("Editing item:", item);
  console.log("Parent delivery:", delivery);

  $q.dialog({
    component: EditDialog,
    componentProps: {
      item,
      delivery,
    },
  });
};
const formatTimeStamp = (val) => {
  return quasarDate.formatDate(val, "MMM DD, YYYY || hh:mm A");
};

const capitalize = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const openDialog = (delivery) => {
  selectedDelivery.value = delivery;
  // deliveryDialog.value = true // Uncomment if you still use this dialog
};

const onPageChange = (newPage) => {
  fetchDeliveryStocks(newPage);
};

const formatQuantity = (val) => {
  if (val == null) return "No Quantity";
  return parseFloat(val);
};

const formatPrice = (val) => {
  if (val == null) return "No Price";
  // return `₱${parseFloat(val).toFixed(2)}`
  return `₱${Number(val).toFixed(2)}`; // always show 2 decimals
};

const getStatusColor = (status) => {
  switch ((status || "").toLowerCase()) {
    case "pending":
      return "warning";
    case "in progress":
      return "blue-7";
    case "confirmed":
      return "positive";
    case "declined":
      return "negative";
    default:
      return "grery-6";
  }
};

const getItemClass = (delivery) => {
  if (!selectedDelivery.value || delivery.id !== selectedDelivery.value.id)
    return "";
  switch (delivery.to_designation) {
    case "Warehouse":
      return "selected-delivery-item";
    case "Branch":
      return "branch-selected-item";
    case "Supplier":
      return "default-selected-item";
    default:
      return "";
  }
};
</script>

<style scoped>
.selected-delivery-item {
  background-color: #e3f2fd !important;
  border-left: 5px solid #1976d2;
  transition: all 0.2s ease;
}

.selected-delivery-item:hover {
  background-color: #bbdefb !important;
}

/* 🔴 Red background if from_designation is Branch */
.branch-selected-item {
  background-color: #ffebee !important;
  border-left: 5px solid #ff7e7b;
}

.branch-selected-item:hover {
  background-color: #ffcdd2 !important;
}

/* ⚪ Default */
.default-selected-item {
  background-color: #f5f5f5 !important;
  border-left: 5px solid #9e9e9e;
  transition: all 0.2s ease;
}

.default-selected-item:hover {
  background-color: #eeeeee !important;
}

.gradient-btn {
  background: linear-gradient(45deg, #103432, #d2bd00);
  border: none;
}

.q-btn {
  transition: all 0.3s ease-in-out;
  transform: translateY(0);
}

.q-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.q-btn:active {
  transform: translateY(-1px) scale(0.98);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

.btn-cancel {
  background: linear-gradient(45deg, #ef5350, #e53935);
  color: #fff;
  font-weight: bold;
}

.rounded-borders-lg {
  border-radius: 12px;
}

.rounded-borders-sm {
  border-radius: 6px;
}

.custom-shadow-light {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.03);
}

.bg-grey-2 {
  background-color: #f5f7fa !important;
}

.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
