<template>
  <div class="credits-report-container">
    <!-- Animated Summary Cards -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-4">
        <q-card flat bordered class="summary-card hover-lift">
          <q-card-section class="q-pa-md">
            <div class="row items-center">
              <div class="summary-icon-wrapper bg-gradient-purple">
                <q-icon name="assignment" size="20px" color="white" />
              </div>
              <div class="q-ml-sm">
                <div class="text-caption text-grey-6">Total Credits</div>
                <div class="summary-value">{{ formatPrice(overallTotal) }}</div>
                <div class="text-caption text-grey-5 q-mt-xs">
                  {{ filteredRows.length }} items
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-4">
        <q-card flat bordered class="summary-card hover-lift">
          <q-card-section class="q-pa-md">
            <div class="row items-center">
              <div class="summary-icon-wrapper bg-gradient-purple-light">
                <q-icon name="people" size="20px" color="white" />
              </div>
              <div class="q-ml-sm">
                <div class="text-caption text-grey-6">Employees</div>
                <div class="summary-value">{{ uniqueEmployeeCount }}</div>
                <div class="text-caption text-grey-5 q-mt-xs">with credits</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-4">
        <q-card flat bordered class="summary-card hover-lift">
          <q-card-section class="q-pa-md">
            <div class="row items-center">
              <div class="summary-icon-wrapper bg-gradient-purple-dark">
                <q-icon name="shopping_cart" size="20px" color="white" />
              </div>
              <div class="q-ml-sm">
                <div class="text-caption text-grey-6">Average per Employee</div>
                <div class="summary-value">
                  {{ formatPrice(averagePerEmployee) }}
                </div>
                <div class="text-caption text-grey-5 q-mt-xs">
                  {{ getAverageComparison }}
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Search and Action Bar -->
    <div class="action-bar q-mb-lg">
      <div class="row items-center justify-between">
        <div class="col-12 col-sm-7 col-md-8">
          <q-input
            v-model="filter"
            outlined
            placeholder="Search by employee or product..."
            debounce="300"
            dense
            class="search-input"
            bg-color="white"
          >
            <template v-slot:prepend>
              <q-icon name="search" size="18px" color="grey-5" />
            </template>
            <template v-slot:append>
              <q-icon
                v-if="filter"
                name="close"
                size="18px"
                color="grey-5"
                class="cursor-pointer"
                @click="filter = ''"
              />
              <q-icon
                name="tune"
                size="18px"
                color="grey-5"
                class="cursor-pointer q-ml-xs"
              >
                <q-menu>
                  <q-list style="min-width: 200px">
                    <q-item
                      clickable
                      v-close-popup
                      @click="sortBy = 'employee'"
                    >
                      <q-item-section avatar>
                        <q-icon name="people" size="xs" color="purple" />
                      </q-item-section>
                      <q-item-section>Sort by Employee</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="sortBy = 'amount'">
                      <q-item-section avatar>
                        <q-icon name="sort" size="xs" color="secondary" />
                      </q-item-section>
                      <q-item-section>Sort by Amount</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="sortBy = 'date'">
                      <q-item-section avatar>
                        <q-icon name="date_range" size="xs" color="teal" />
                      </q-item-section>
                      <q-item-section>Sort by Date</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-auto q-mt-sm q-mt-sm-none">
          <AddingCredit
            :reports="creditReports"
            :user="props.user"
            :userId="userId"
            :saleReportId="salesReportId"
            @credit-added="handleCreditAdded"
          >
            <template v-slot:button="{ open }">
              <q-btn
                unelevated
                class="add-credit-btn"
                icon="add"
                label="Add Credit"
                no-caps
                @click="open"
              />
            </template>
          </AddingCredit>
        </div>
      </div>
    </div>

    <!-- Credits List - Grouped by Employee -->
    <div v-if="filteredRows.length > 0" class="credits-list">
      <transition-group name="list" tag="div">
        <div
          v-for="group in sortedGroups"
          :key="group.employeeName"
          class="employee-group q-mb-lg"
        >
          <!-- Employee Header -->
          <div class="employee-header q-mb-sm">
            <div class="row items-center justify-between">
              <div class="row items-center">
                <q-avatar size="36px" class="bg-purple-2 text-purple-8 q-mr-sm">
                  {{ getInitials(group.employeeName) }}
                </q-avatar>
                <div>
                  <div class="employee-name">{{ group.employeeName }}</div>
                  <div class="employee-subtitle">
                    {{ group.items.length }} items • Total:
                    {{ formatPrice(group.total) }}
                  </div>
                </div>
              </div>
              <q-badge color="purple" outline class="q-px-md q-py-xs">
                {{ formatPrice(group.total) }}
              </q-badge>
            </div>
          </div>

          <!-- Employee's Credit Cards -->
          <div class="credits-grid">
            <div
              v-for="credit in group.items"
              :key="credit.id"
              class="credit-card-wrapper"
            >
              <q-card flat bordered class="credit-card">
                <!-- @click="openQuickView(credit)" -->
                <!-- Card Header -->
                <div class="credit-card-header">
                  <div class="row items-center justify-between q-mb-xs">
                    <div
                      class="credit-category-badge"
                      :class="getCategoryClass(credit.product?.category)"
                    >
                      {{ getCategoryLabel(credit.product?.category) }}
                    </div>
                    <q-btn
                      flat
                      round
                      dense
                      icon="more_vert"
                      size="sm"
                      class="menu-btn"
                      @click.stop
                    >
                      <q-menu anchor="bottom right" self="top right">
                        <q-list style="min-width: 180px" class="menu-list">
                          <!-- <q-item
                            clickable
                            v-close-popup
                            @click.stop="openEditDialog(credit, 'product')"
                          >
                            <q-item-section avatar>
                              <q-icon name="edit" size="xs" color="primary" />
                            </q-item-section>
                            <q-item-section>Edit Product</q-item-section>
                          </q-item> -->
                          <q-item
                            clickable
                            v-close-popup
                            @click.stop="openEditDialog(credit, 'pieces')"
                          >
                            <q-item-section avatar>
                              <q-icon
                                name="edit_note"
                                size="xs"
                                color="secondary"
                              />
                            </q-item-section>
                            <q-item-section>Edit Quantity</q-item-section>
                          </q-item>
                          <q-item
                            clickable
                            v-close-popup
                            @click.stop="openEditDialog(credit, 'price')"
                          >
                            <q-item-section avatar>
                              <q-icon
                                name="payments"
                                size="xs"
                                color="positive"
                              />
                            </q-item-section>
                            <q-item-section>Edit Price</q-item-section>
                          </q-item>
                          <!-- <q-separator /> -->
                          <!-- <q-item
                            clickable
                            v-close-popup
                            @click.stop="confirmDeleteCredit(credit)"
                          >
                            <q-item-section avatar>
                              <q-icon
                                name="delete"
                                size="xs"
                                color="negative"
                              />
                            </q-item-section>
                            <q-item-section class="text-negative"
                              >Delete</q-item-section
                            >
                          </q-item> -->
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>

                  <div class="product-name">
                    {{
                      capitalizeFirstLetter(
                        credit.product?.name || "Unknown Product"
                      )
                    }}
                  </div>
                </div>

                <!-- Card Body -->
                <div class="credit-card-body">
                  <div class="row items-center justify-between">
                    <div class="quantity-info">
                      <span class="text-caption text-grey-5">Quantity</span>
                      <div class="quantity-value">{{ credit.pieces }} pcs</div>
                    </div>
                    <div class="price-info">
                      <span class="text-caption text-grey-5">Price</span>
                      <div class="price-value">
                        {{ formatPrice(credit.price) }}
                      </div>
                    </div>
                  </div>

                  <!-- Progress Bar -->
                  <div class="progress-section q-mt-sm">
                    <div class="row items-center justify-between q-mb-xs">
                      <span class="text-caption text-grey-5">Total</span>
                      <span class="text-weight-bold text-purple-7">
                        {{ formatPrice(credit.pieces * credit.price) }}
                      </span>
                    </div>
                    <div class="progress-bar-container">
                      <div
                        class="progress-bar"
                        :class="getProgressBarClass(credit.product?.category)"
                        :style="{
                          width:
                            calculatePercentage(credit.pieces * credit.price) +
                            '%',
                        }"
                      ></div>
                    </div>
                  </div>
                </div>

                <!-- Card Footer -->
                <div class="credit-card-footer">
                  <div class="row items-center justify-between">
                    <div class="row items-center">
                      <q-icon name="schedule" size="12px" color="grey-4" />
                      <span class="text-caption text-grey-4 q-ml-xs">
                        {{ formatTime(credit.created_at) }}
                      </span>
                    </div>
                    <q-badge
                      :color="getBadgeColor(credit.product?.category)"
                      class="credit-badge"
                      :label="getBadgeLabel(credit.pieces * credit.price)"
                    />
                  </div>
                </div>
              </q-card>
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- Empty State with Animation -->
    <div v-else class="empty-state-container">
      <div class="empty-state q-pa-xl">
        <div class="empty-icon-wrapper">
          <q-icon name="assignment" size="64px" color="grey-3" />
          <q-icon
            name="add_circle"
            size="24px"
            color="purple-4"
            class="plus-icon"
          />
        </div>
        <div class="text-h6 text-grey-7 q-mt-md">No Credits Yet</div>
        <div class="text-caption text-grey-5 q-mb-lg">
          Start adding credits for employee purchases
        </div>
        <!-- <AddingCredit
          :reports="creditReports"
          :user="props.user"
          :userId="userId"
          :saleReportId="salesReportId"
          @credit-added="handleCreditAdded"
        >
          <template v-slot:button="{ open }">
            <q-btn
              unelevated
              class="add-first-btn"
              icon="add"
              label="Add First Credit"
              no-caps
              @click="open"
            />
          </template>
        </AddingCredit> -->
      </div>
    </div>
    <!-- Quick View Dialog -->
    <!-- <q-dialog v-model="quickViewDialog" persistent>
      <q-card class="quick-view-dialog" v-if="currentCredit">
        <q-card-section
          class="q-pa-md dialog-header"
          :class="getDialogHeaderClass(currentCredit.product?.category)"
        >
          <div class="row items-center justify-between">
            <div class="row items-center">
              <div class="header-icon">
                <q-icon
                  :name="getCategoryIcon(currentCredit.product?.category)"
                  size="24px"
                  color="white"
                />
              </div>
              <div class="q-ml-sm">
                <div class="text-subtitle2 text-white text-opacity-80">
                  Credit Details
                </div>
                <div class="text-h6 text-white">
                  {{
                    capitalizeFirstLetter(
                      currentCredit.product?.name || "Unknown Product"
                    )
                  }}
                </div>
              </div>
            </div>
            <q-btn flat dense round icon="close" color="white" v-close-popup />
          </div>
        </q-card-section>

        <q-card-section class="q-pa-md">
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Employee</span>
              <span class="detail-value">{{
                formatFullname(currentCredit.credit_user_id)
              }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Product</span>
              <span class="detail-value">{{
                capitalizeFirstLetter(
                  currentCredit.product?.name || "Unknown Product"
                )
              }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Category</span>
              <span class="detail-value">
                <q-badge
                  :color="getBadgeColor(currentCredit.product?.category)"
                  class="q-px-sm q-py-xs"
                >
                  {{ getCategoryLabel(currentCredit.product?.category) }}
                </q-badge>
              </span>
            </div>
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <div class="detail-item">
                  <span class="detail-label">Quantity</span>
                  <span class="detail-value pieces"
                    >{{ currentCredit.pieces }} pcs</span
                  >
                </div>
              </div>
              <div class="col-6">
                <div class="detail-item">
                  <span class="detail-label">Price</span>
                  <span class="detail-value price">{{
                    formatPrice(currentCredit.price)
                  }}</span>
                </div>
              </div>
            </div>
            <div class="detail-item total">
              <span class="detail-label">Total Amount</span>
              <span class="detail-value total-amount">
                {{ formatPrice(currentCredit.pieces * currentCredit.price) }}
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Date Added</span>
              <span class="detail-value">{{
                formatDate(currentCredit.created_at)
              }}</span>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md q-pt-none">
          <q-btn flat label="Close" color="grey-6" v-close-popup />
          <q-btn
            unelevated
            label="Edit"
            color="purple"
            @click="openEditFromQuickView"
          />
        </q-card-actions>
      </q-card>
    </q-dialog> -->

    <!-- Edit Product Dialog -->
    <!-- <q-dialog v-model="editProductDialog" persistent>
      <q-card class="edit-dialog">
        <q-card-section class="q-pa-md">
          <div class="row items-center q-mb-md">
            <div class="edit-icon bg-purple-1">
              <q-icon name="edit" size="18px" color="purple" />
            </div>
            <span class="text-weight-medium q-ml-sm">Edit Product</span>
          </div>
          <q-select
            v-model="editProductValue"
            :options="productOptions"
            option-label="name"
            option-value="id"
            outlined
            dense
            placeholder="Select product"
            class="edit-input"
            emit-value
            map-options
          />
        </q-card-section>
        <q-card-actions align="right" class="q-pa-md q-pt-none">
          <q-btn flat label="Cancel" color="grey-6" v-close-popup />
          <q-btn
            unelevated
            label="Save"
            color="purple"
            @click="saveProductEdit"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog> -->

    <!-- Edit Quantity Dialog -->
    <q-dialog v-model="editQuantityDialog" persistent>
      <q-card class="edit-dialog">
        <q-card-section class="q-pa-md">
          <div class="row items-center q-mb-md">
            <div class="edit-icon bg-secondary-1">
              <q-icon name="edit_note" size="18px" color="secondary" />
            </div>
            <span class="text-weight-medium q-ml-sm">Edit Quantity</span>
          </div>
          <q-input
            v-model.number="editQuantityValue"
            type="number"
            outlined
            dense
            placeholder="Enter quantity"
            class="edit-input"
            min="1"
            step="1"
          >
            <template v-slot:append>
              <span class="text-grey-6">pcs</span>
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right" class="q-pa-md q-pt-none">
          <q-btn flat label="Cancel" color="grey-6" v-close-popup />
          <q-btn
            unelevated
            label="Save"
            color="secondary"
            @click="saveQuantityEdit"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Edit Price Dialog -->
    <q-dialog v-model="editPriceDialog" persistent>
      <q-card class="edit-dialog">
        <q-card-section class="q-pa-md">
          <div class="row items-center q-mb-md">
            <div class="edit-icon bg-positive-1">
              <q-icon name="payments" size="18px" color="positive" />
            </div>
            <span class="text-weight-medium q-ml-sm">Edit Price</span>
          </div>
          <q-input
            v-model.number="editPriceValue"
            type="number"
            outlined
            dense
            placeholder="Enter price"
            class="edit-input"
            min="0"
            step="0.01"
          >
            <template v-slot:prepend>
              <span class="text-grey-6">₱</span>
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right" class="q-pa-md q-pt-none">
          <q-btn flat label="Cancel" color="grey-6" v-close-popup />
          <q-btn
            unelevated
            label="Save"
            color="positive"
            @click="savePriceEdit"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Delete Confirmation Dialog -->
    <q-dialog v-model="deleteDialog" persistent>
      <q-card class="delete-dialog">
        <q-card-section class="q-pa-md text-center">
          <div class="delete-icon bg-negative-1 q-mx-auto">
            <q-icon name="delete" size="28px" color="negative" />
          </div>
          <div class="text-weight-medium q-mt-md">Delete Credit?</div>
          <div class="text-caption text-grey-6 q-mt-xs">
            This action cannot be undone
          </div>
        </q-card-section>
        <q-card-actions align="between" class="q-pa-md q-pt-none">
          <q-btn flat label="Cancel" color="grey-6" v-close-popup class="col" />
          <q-btn
            unelevated
            label="Delete"
            color="negative"
            @click="deleteCredit"
            v-close-popup
            class="col q-ml-sm"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { typographyFormat } from "src/composables/typography/typography-format";
// import AddingCredit from "../../add_button/AddingCredit.vue";

const {
  capitalizeFirstLetter,
  formatPrice,
  formatFullname,
  formatDate,
  formatTime,
} = typographyFormat();
const $q = useQuasar();

const props = defineProps({
  sales_Reports: Array,
  reportLabel: String,
  reportDate: String,
  reportId: Number,
  user: Object,
  user_id: Number,
  created_at: String,
  salesReportId: Number,
  userId: Number,
});

const emit = defineEmits(["update-summary"]);

// State
const filter = ref("");
const sortBy = ref("employee");
const creditReports = ref([]);
const deleteDialog = ref(false);
const quickViewDialog = ref(false);
const currentCredit = ref(null);

// Edit dialogs
const editProductDialog = ref(false);
const editQuantityDialog = ref(false);
const editPriceDialog = ref(false);
const editProductValue = ref(null);
const editQuantityValue = ref(0);
const editPriceValue = ref(0);

// Product options (you may want to fetch these from API)
const productOptions = ref([]);

// Process credit products
const filteredRows = computed(() => {
  const allCredits = creditReports.value.flatMap((report) => {
    return (
      report.credit_products?.map((product) => ({
        ...product,
        total_amount:
          (parseInt(product.pieces) || 0) * (parseFloat(product.price) || 0),
        employee_name: formatFullname(product.credit_user_id),
      })) || []
    );
  });

  if (!filter.value) return allCredits;

  const search = filter.value.toLowerCase();
  return allCredits.filter(
    (credit) =>
      credit.employee_name?.toLowerCase().includes(search) ||
      credit.product?.name?.toLowerCase().includes(search)
  );
});

// Group by employee
const groupedByEmployee = computed(() => {
  const groups = {};

  filteredRows.value.forEach((credit) => {
    const employeeName = formatFullname(credit.credit_user_id);
    if (!groups[employeeName]) {
      groups[employeeName] = {
        employeeName,
        items: [],
        total: 0,
      };
    }
    groups[employeeName].items.push(credit);
    groups[employeeName].total += credit.total_amount;
  });

  return groups;
});

// Sort groups
const sortedGroups = computed(() => {
  const groups = Object.values(groupedByEmployee.value);

  switch (sortBy.value) {
    case "employee":
      return groups.sort((a, b) =>
        a.employeeName.localeCompare(b.employeeName)
      );
    case "amount":
      return groups.sort((a, b) => b.total - a.total);
    case "date":
    default:
      return groups;
  }
});

// Statistics
const uniqueEmployeeCount = computed(() => {
  return Object.keys(groupedByEmployee.value).length;
});

const overallTotal = computed(() => {
  return filteredRows.value.reduce((total, credit) => {
    return total + (credit.total_amount || 0);
  }, 0);
});

const averagePerEmployee = computed(() => {
  if (uniqueEmployeeCount.value === 0) return 0;
  return overallTotal.value / uniqueEmployeeCount.value;
});

const getAverageComparison = computed(() => {
  if (uniqueEmployeeCount.value === 0) return "No data";
  const avg = averagePerEmployee.value;
  if (avg > 1000) return "High average";
  if (avg > 500) return "Medium average";
  return "Low average";
});

const highestAmount = computed(() => {
  if (filteredRows.value.length === 0) return 0;
  return Math.max(...filteredRows.value.map((c) => c.total_amount));
});

// Helper functions
const getInitials = (name) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getCategoryClass = (category) => {
  const classes = {
    bread: "bread",
    selecta: "selecta",
    softdrinks: "softdrinks",
    cake: "cake",
    other: "other",
  };
  return classes[category?.toLowerCase()] || "default";
};

const getCategoryLabel = (category) => {
  if (!category) return "General";
  return category.charAt(0).toUpperCase() + category.slice(1);
};

const getCategoryIcon = (category) => {
  const icons = {
    bread: "bakery_dining",
    selecta: "icecream",
    softdrinks: "local_drink",
    cake: "cake",
    other: "category",
  };
  return icons[category?.toLowerCase()] || "shopping_cart";
};

const getBadgeColor = (category) => {
  const colors = {
    bread: "brown",
    selecta: "red",
    softdrinks: "blue",
    cake: "pink",
    other: "grey",
  };
  return colors[category?.toLowerCase()] || "purple";
};

const getBadgeLabel = (amount) => {
  if (amount > 1000) return "High";
  if (amount > 500) return "Above Avg";
  if (amount > 200) return "Avg";
  if (amount > 100) return "Below Avg";
  return "Low";
};

const getProgressBarClass = (category) => {
  const classes = {
    bread: "bread",
    selecta: "selecta",
    softdrinks: "softdrinks",
    cake: "cake",
    other: "other",
  };
  return classes[category?.toLowerCase()] || "default";
};

const getDialogHeaderClass = (category) => {
  const classes = {
    bread: "bg-brown",
    selecta: "bg-red",
    softdrinks: "bg-blue",
    cake: "bg-pink",
    other: "bg-grey",
  };
  return classes[category?.toLowerCase()] || "bg-purple";
};

const calculatePercentage = (amount) => {
  if (highestAmount.value === 0) return 0;
  return Math.round((amount / highestAmount.value) * 100);
};

// Methods
const openQuickView = (credit) => {
  currentCredit.value = credit;
  quickViewDialog.value = true;
};

const openEditFromQuickView = () => {
  quickViewDialog.value = false;
  openEditDialog(currentCredit.value, "product");
};

const openEditDialog = (credit, field) => {
  currentCredit.value = credit;

  if (field === "product") {
    editProductValue.value = credit.product?.id || null;
    editProductDialog.value = true;
  } else if (field === "pieces") {
    editQuantityValue.value = credit.pieces;
    editQuantityDialog.value = true;
  } else if (field === "price") {
    editPriceValue.value = credit.price;
    editPriceDialog.value = true;
  }
};

const saveProductEdit = async () => {
  if (!currentCredit.value || !editProductValue.value) return;

  try {
    // Find selected product
    const selectedProduct = productOptions.value.find(
      (p) => p.id === editProductValue.value
    );

    const response = await api.put(
      `/api/update-credit-product/${currentCredit.value.id}`,
      {
        product_id: editProductValue.value,
        product_name: selectedProduct?.name,
      }
    );

    // Update local data
    currentCredit.value.product = selectedProduct;

    $q.notify({
      type: "positive",
      message: "Product updated successfully",
      position: "top",
      timeout: 2000,
      icon: "check_circle",
    });

    emitUpdateSummary();
  } catch (error) {
    console.error(error);
    $q.notify({
      type: "negative",
      message: "Failed to update product",
      position: "top",
      icon: "error",
    });
  }
};

const saveQuantityEdit = async () => {
  if (!currentCredit.value || !editQuantityValue.value) return;

  try {
    await api.put(`/api/update-credit-quantity/${currentCredit.value.id}`, {
      pieces: editQuantityValue.value,
    });

    // Update local data
    currentCredit.value.pieces = editQuantityValue.value;

    $q.notify({
      type: "positive",
      message: "Quantity updated successfully",
      position: "top",
      timeout: 2000,
      icon: "check_circle",
    });

    emitUpdateSummary();
  } catch (error) {
    console.error(error);
    $q.notify({
      type: "negative",
      message: "Failed to update quantity",
      position: "top",
      icon: "error",
    });
  }
};

const savePriceEdit = async () => {
  if (!currentCredit.value || !editPriceValue.value) return;

  try {
    await api.put(`/api/update-credit-price/${currentCredit.value.id}`, {
      price: editPriceValue.value,
    });

    // Update local data
    currentCredit.value.price = editPriceValue.value;

    $q.notify({
      type: "positive",
      message: "Price updated successfully",
      position: "top",
      timeout: 2000,
      icon: "check_circle",
    });

    emitUpdateSummary();
  } catch (error) {
    console.error(error);
    $q.notify({
      type: "negative",
      message: "Failed to update price",
      position: "top",
      icon: "error",
    });
  }
};

const confirmDeleteCredit = (credit) => {
  currentCredit.value = credit;
  deleteDialog.value = true;
};

const deleteCredit = async () => {
  if (!currentCredit.value) return;

  try {
    await api.delete(`/api/delete-credit/${currentCredit.value.id}`);

    // Remove from local data
    creditReports.value = creditReports.value.map((report) => ({
      ...report,
      credit_products:
        report.credit_products?.filter(
          (c) => c.id !== currentCredit.value.id
        ) || [],
    }));

    $q.notify({
      type: "positive",
      message: "Credit deleted successfully",
      position: "top",
      timeout: 2000,
      icon: "delete",
    });

    emitUpdateSummary();
  } catch (error) {
    console.error(error);
    $q.notify({
      type: "negative",
      message: "Failed to delete credit",
      position: "top",
      icon: "error",
    });
  }
};

const handleCreditAdded = () => {
  emitUpdateSummary();

  $q.notify({
    type: "positive",
    message: "Credit added successfully",
    position: "top",
    timeout: 2000,
    icon: "add_circle",
  });
};

const emitUpdateSummary = () => {
  emit("update-summary", {
    reportId: props.reportId,
    charges: overallTotal.value,
    over: 0,
  });
};

// Initialize data
watch(
  () => props.sales_Reports,
  (newReports) => {
    if (newReports && newReports[0]?.credit_reports) {
      creditReports.value = newReports[0].credit_reports;
    }
  },
  { immediate: true }
);

// Fetch product options (you may want to implement this)
// const fetchProducts = async () => {
//   try {
//     const response = await api.get('/api/products');
//     productOptions.value = response.data;
//   } catch (error) {
//     console.error('Failed to fetch products', error);
//   }
// };
// fetchProducts();
</script>

<style lang="scss" scoped>
.credits-report-container {
  width: 100%;
  padding: 8px 0;
}

// Summary Cards
.summary-card {
  border-radius: 16px;
  border: 1px solid #f0f0f0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &.hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.12);
    border-color: transparent;
  }

  .summary-icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.bg-gradient-purple {
      background: linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%);
    }

    &.bg-gradient-purple-light {
      background: linear-gradient(135deg, #ba68c8 0%, #8e24aa 100%);
    }

    &.bg-gradient-purple-dark {
      background: linear-gradient(135deg, #7b1fa2 0%, #4a148c 100%);
    }
  }

  .summary-value {
    font-size: 1.4rem;
    font-weight: 700;
    color: #1e293b;
    line-height: 1.2;
  }
}

// Action Bar
.action-bar {
  background: #ffffff;
  border-radius: 30px;
  padding: 4px;

  .search-input {
    :deep(.q-field__control) {
      border-radius: 30px;
      height: 48px;
      border: 1px solid #f0f0f0;
      transition: all 0.2s;

      &:hover {
        border-color: #e0e0e0;
      }

      &.q-field--focused {
        border-color: #9c27b0;
        box-shadow: 0 0 0 3px rgba(156, 39, 176, 0.1);
      }
    }
  }

  .add-credit-btn {
    background: linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%);
    color: white;
    border-radius: 30px;
    padding: 10px 24px;
    font-weight: 500;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 16px rgba(156, 39, 176, 0.3);
    }

    &:active {
      transform: scale(0.98);
    }
  }
}

// Credits Grid
.credits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.credit-card-wrapper {
  animation: fadeInUp 0.4s ease-out;
  animation-fill-mode: both;

  @for $i from 1 through 20 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.05}s;
    }
  }
}

.employee-group {
  animation: fadeIn 0.3s ease-out;
}

.employee-header {
  padding: 8px 0;

  .employee-name {
    font-weight: 600;
    font-size: 1rem;
    color: #1e293b;
  }

  .employee-subtitle {
    font-size: 0.8rem;
    color: #94a3b8;
  }
}

.credit-card {
  border-radius: 20px;
  border: 1px solid #f0f0f0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;

  // cursor: pointer;
  // &:hover {
  //   transform: translateY(-4px);
  //   box-shadow: 0 20px 30px -10px rgba(156, 39, 176, 0.15);
  //   border-color: transparent;
  // }

  .credit-card-header {
    padding: 16px;
    border-bottom: 1px solid #f8f8f8;
    position: relative; /* Added for better positioning */
  }

  .credit-category-badge {
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.3px;

    &.bread {
      background: #efebe9;
      color: #5d4037;
    }
    &.selecta {
      background: #ffebee;
      color: #c62828;
    }
    &.softdrinks {
      background: #e3f2fd;
      color: #1565c0;
    }
    &.cake {
      background: #fce4ec;
      color: #c2185b;
    }
    &.other {
      background: #f5f5f5;
      color: #616161;
    }
    &.default {
      background: #f3e5f5;
      color: #7b1fa2;
    }
  }

  .menu-btn {
    opacity: 1; /* Changed from 0 to 1 */
    transform: translateX(0); /* Changed from 10px to 0 */
    transition: all 0.2s;
    background: rgba(255, 255, 255, 0.8); /* Added subtle background */
    backdrop-filter: blur(4px); /* Added blur effect */

    &:hover {
      background: #f0f0f0;
      transform: scale(1.1); /* Added scale effect on hover */
    }

    &:active {
      transform: scale(0.95); /* Added active state */
    }
  }

  .product-name {
    font-weight: 600;
    font-size: 1rem;
    color: #1e293b;
    margin-top: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .credit-card-body {
    padding: 16px;
    flex: 1;
  }

  .quantity-value {
    font-size: 1.2rem;
    font-weight: 600;
    color: #9c27b0;
  }

  .price-value {
    font-size: 1rem;
    font-weight: 500;
    color: #7b1fa2;
  }

  .progress-section {
    margin-top: 12px;
  }

  .progress-bar-container {
    height: 6px;
    background: #f0f0f0;
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    transition: width 0.3s ease;

    &.bread {
      background: #8d6e63;
    }
    &.selecta {
      background: #ef5350;
    }
    &.softdrinks {
      background: #42a5f5;
    }
    &.cake {
      background: #ec407a;
    }
    &.other {
      background: #9e9e9e;
    }
    &.default {
      background: #ab47bc;
    }
  }

  .credit-card-footer {
    padding: 12px 16px;
    background: #fafafa;
    border-top: 1px solid #f0f0f0;
  }

  .credit-badge {
    font-weight: 500;
    padding: 4px 10px;
  }
}

// Empty State
.empty-state-container {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state {
  text-align: center;
  background: #f8fafc;
  border-radius: 32px;
  border: 2px dashed #e0e0e0;
  animation: pulse 2s infinite;

  .empty-icon-wrapper {
    position: relative;
    display: inline-block;

    .plus-icon {
      position: absolute;
      bottom: -4px;
      right: -8px;
      background: white;
      border-radius: 50%;
      padding: 4px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }

  .add-first-btn {
    background: linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%);
    color: white;
    border-radius: 30px;
    padding: 10px 28px;
    font-weight: 500;
  }
}

// Quick View Dialog
.quick-view-dialog {
  width: 400px;
  max-width: 90vw;
  border-radius: 28px;
  overflow: hidden;

  .dialog-header {
    background: linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%);

    &.bg-brown {
      background: linear-gradient(135deg, #8d6e63 0%, #5d4037 100%);
    }
    &.bg-red {
      background: linear-gradient(135deg, #ef5350 0%, #c62828 100%);
    }
    &.bg-blue {
      background: linear-gradient(135deg, #42a5f5 0%, #1565c0 100%);
    }
    &.bg-pink {
      background: linear-gradient(135deg, #ec407a 0%, #c2185b 100%);
    }
    &.bg-grey {
      background: linear-gradient(135deg, #9e9e9e 0%, #616161 100%);
    }
    &.bg-purple {
      background: linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%);
    }

    .header-icon {
      width: 48px;
      height: 48px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(5px);
    }
  }

  .detail-grid {
    display: grid;
    gap: 16px;
  }

  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .detail-label {
      font-size: 0.75rem;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .detail-value {
      font-size: 1rem;
      color: #1e293b;

      &.pieces {
        font-size: 1.2rem;
        font-weight: 600;
        color: #9c27b0;
      }

      &.price {
        font-size: 1.1rem;
        font-weight: 500;
        color: #7b1fa2;
      }

      &.total-amount {
        font-size: 1.3rem;
        font-weight: 700;
        color: #9c27b0;
      }
    }

    &.total {
      margin-top: 8px;
      padding-top: 12px;
      border-top: 1px dashed #e0e0e0;
    }
  }
}

// Edit Dialogs
.edit-dialog {
  width: 340px;
  max-width: 90vw;
  border-radius: 24px;
  overflow: hidden;

  .edit-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.bg-purple-1 {
      background: #f3e5f5;
    }
    &.bg-secondary-1 {
      background: #fce4ec;
    }
    &.bg-positive-1 {
      background: #e8f5e9;
    }
  }

  .edit-input {
    :deep(.q-field__control) {
      border-radius: 12px;
    }
  }
}

// Delete Dialog
.delete-dialog {
  width: 300px;
  max-width: 80vw;
  border-radius: 24px;
  overflow: hidden;

  .delete-icon {
    width: 64px;
    height: 64px;
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.bg-negative-1 {
      background: #ffebee;
    }
  }
}

// Menu styles
.menu-list {
  border-radius: 16px;

  .q-item {
    min-height: 44px;

    &:hover {
      background: #f3e5f5;
    }

    &:active {
      background: #e1bee7;
    }
  }
}

// Animations
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

// List animations
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}

// Responsive
@media (max-width: 600px) {
  .summary-card {
    .summary-icon-wrapper {
      width: 42px;
      height: 42px;
    }

    .summary-value {
      font-size: 1.2rem;
    }
  }

  .employee-name {
    font-size: 0.95rem;
  }

  .product-name {
    font-size: 0.95rem;
  }

  .quantity-value {
    font-size: 1rem;
  }

  .price-value {
    font-size: 0.9rem;
  }
}
</style>
