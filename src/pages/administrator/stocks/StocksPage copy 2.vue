<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="q-mb-md" align="right">
      <DeliveryCardDialog />
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-md-4">
        <q-card
          flat
          class="bg-white q-pa-md rounded-borders-lg custom-shadow-light"
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
          >
            <template v-slot:append>
              <q-icon name="search" color="grey-6" />
            </template>
          </q-input>
          <q-list separator>
            <template v-if="loading">
              <q-item>
                <q-item-section>
                  <q-skeleton type="text" width="80%" />
                  <q-skeleton type="text" width="40%" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-skeleton type="text" width="70%" />
                  <q-skeleton type="text" width="30%" />
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
                :class="{
                  'selected-delivery-item':
                    selectedDelivery && delivery.id === selectedDelivery.id,
                }"
              >
                <q-item-section>
                  <q-item-label
                    class="text-subtitle1 text-weight-bold text-grey-8"
                  >
                    {{ delivery.to_data?.name || "" }}
                  </q-item-label>
                  <q-item-label caption class="text-grey-6">
                    {{ delivery.items.length }} items
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
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
                    {{ delivery.status || "No Status" }}
                  </div>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-card>
      </div>

      <div class="col-xs-12 col-md-8">
        <q-card
          flat
          class="bg-white q-pa-md rounded-borders-lg custom-shadow-light"
        >
          <div class="text-h6 text-weight-bold q-mb-sm text-grey-8">
            Items / Raw materials Delivery Details
          </div>
          <q-input
            outlined
            dense
            placeholder="Search warehouse / branch"
            class="q-mb-sm"
            bg-color="grey-1"
            input-class="text-grey-8"
            label-color="grey-6"
          >
            <template v-slot:append>
              <q-icon name="search" color="grey-6" />
            </template>
          </q-input>
          <q-card-section>
            <div v-if="selectedDelivery">
              <div class="row q-col-gutter-md">
                <div class="q-mb-sm">
                  <span class="text-grey-7 text-caption">From:</span>
                  <div class="text-subtitle1 text-weight-bold">
                    {{ selectedDelivery.from_name || "No Name" }}
                  </div>
                </div>
                <div class="q-mb-sm">
                  <span class="text-grey-7 text-caption">To:</span>
                  <div class="text-subtitle1 text-weight-bold">
                    {{ selectedDelivery.to_data?.name || "No Name" }}
                  </div>
                </div>

                <div class="q-mb-sm">
                  <span class="text-grey-7 text-caption">Status:</span>
                  <div class="row items-center">
                    <q-icon
                      name="fiber_manual_record"
                      :color="getStatusColor(selectedDelivery.status)"
                      size="10px"
                      class="q-mr-xs"
                    />
                    {{ selectedDelivery.status || "No Status" }}
                  </div>
                </div>

                <div class="q-mb-sm">
                  <span class="text-grey-7 text-caption">Items:</span>
                  <q-list dense separator class="box">
                    <q-item>
                      <q-item-section>
                        <q-item-label class="text-overline">
                          Raw Materials Name
                        </q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label> Raw Materials Code </q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="text-overline">
                          Stock Category
                        </q-item-label>
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
                          {{ formatQuantity(item.quantity || "No Quantity") }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>
                          {{ formatPrice(item.price_per_unit || "No Price") }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>
                          {{ formatPrice(item.price_per_gram || "No Price") }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import DeliveryCardDialog from "./components/StocksDeliveryButton.vue";
import { useStockDelivery } from "src/stores/stock-delivery";

const stocksDeliveryStore = useStockDelivery();
const deliveryStocks = computed(() => stocksDeliveryStore.deliveryStocks);
console.log("Delivery Stocks (computed):", deliveryStocks.value);
const deliveryList = ref([]);
const loading = ref(false); // loading flag

// const dialog = ref(false)
const deliveryDialog = ref(false);
const selectedDelivery = ref(null);
const openDialog = (delivery) => {
  // Logic to open the dialog
  console.log("Open Delivery Dialog");
  selectedDelivery.value = delivery || null;
  deliveryDialog.value = true;
};

const fetchDeliveryStocks = async () => {
  try {
    loading.value = true;
    await stocksDeliveryStore.fetchDeliveryStocks();
    console.log("Delivery Stocks:", deliveryStocks.value);
    deliveryList.value = deliveryStocks.value;
  } catch (error) {
    console.error("Error fetching delivery stocks:", error);
  } finally {
    loading.value = false;
  }
};
onMounted(fetchDeliveryStocks);

// 🔎 Watch for updates
watch(deliveryStocks, (newVal) => {
  console.log("Delivery Stocks updated:", newVal);
});

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
      return "orange-7";
    case "in progress":
      return "blue-7";
    case "completed":
      return "green-7";
    case "cancelled":
      return "red-6";
    default:
      return "grey-6";
  }
};

const orderList = ref([
  {
    id: "A4",
    customerName: "Branch 1",
    itemCount: 5,
    color: "teal-7",
    statusColor: "green-7",
    statusText: "Ready",
  },
  {
    id: "B2",
    customerName: "Warehouse 1",
    itemCount: 4,
    color: "blue-7",
    statusColor: "orange-7",
    statusText: "In Progress",
  },
  {
    id: "TA",
    customerName: "Branch 2",
    itemCount: 6,
    color: "amber-7",
    statusColor: "orange-7",
    statusText: "In Progress",
  },
  {
    id: "TA",
    customerName: "Branch 3",
    itemCount: 6,
    color: "amber-7",
    statusColor: "orange-7",
    statusText: "In Progress",
  },
  {
    id: "A9",
    customerName: "Branch 4",
    itemCount: 8,
    color: "teal-7",
    statusColor: "green-7",
    statusText: "Completed",
  },
  {
    id: "C2",
    customerName: "Warehouse 2",
    itemCount: 4,
    color: "blue-7",
    statusColor: "blue-7",
    statusText: "Completed",
  },
]);

const paymentList = ref([
  {
    id: "A9",
    customerName: "Warehouse 4",
    orderId: "#Order 912",
    color: "teal-7",
    buttonText: "Pay Now",
    buttonColor: "grey-10",
  },
  {
    id: "C2",
    customerName: "Warehouse 3",
    orderId: "#Order 908",
    color: "blue-7",
    buttonText: "Pay Now",
    buttonColor: "grey-10",
  },
  {
    id: "A2",
    customerName: "Branch 3",
    orderId: "#Order 904",
    color: "teal-7",
    buttonText: "Pay Now",
    buttonColor: "grey-10",
  },
  {
    id: "A3",
    customerName: "branch 1",
    orderId: "#Order 903",
    color: "teal-7",
    buttonText: "Pay Now",
    buttonColor: "grey-10",
  },
  {
    id: "B4",
    customerName: "Branch 2",
    orderId: "#Order 897",
    color: "blue-7",
    buttonText: "Pay Now",
    buttonColor: "grey-10",
  },
  {
    id: "B7",
    customerName: "Branch 5",
    orderId: "#Order 892",
    color: "blue-7",
    buttonText: "Pay Now",
    buttonColor: "grey-10",
  },
]);

const popularDishes = ref([
  {
    name: "Act. 1",
    orders: 23,
    image: "https://cdn.quasar.dev/img/avatar.png",
  },
  {
    name: "Act. 2",
    orders: 20,
    image: "https://cdn.quasar.dev/img/avatar.png",
  },
  {
    name: "Act. 3",
    orders: 13,
    image: "https://cdn.quasar.dev/img/avatar.png",
  },
  {
    name: "Act. 4",
    orders: 12,
    image: "https://cdn.quasar.dev/img/avatar.png",
  },
]);

const outOfStock = ref([
  {
    name: "Raw Materials 1",
    available: "04:00 PM",
    color: "orange-7",
  },
  { name: "Raw Materials 2", available: "03:30 PM", color: "orange-7" },
  { name: "Raw Materials 3", available: "04:20 PM", color: "orange-7" },
  { name: "Raw Materials 4", available: "Tomorrow", color: "grey-6" },
]);
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

.gradient-btn {
  background: linear-gradient(45deg, #103432, #d2bd00);
  border: none;
}

.q-btn {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.q-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-cancel {
  background: linear-gradient(45deg, #ef5350, #e53935);
  color: #fff;
  font-weight: bold;
}

.rounded-borders-lg {
  border-radius: 12px; /* Slightly larger border-radius for smoother corners */
}

.rounded-borders-sm {
  border-radius: 6px;
}

/* Custom light shadow for an elegant, floating effect */
.custom-shadow-light {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.03);
}

.bg-grey-2 {
  background-color: #f5f7fa !important; /* A very light grey background for the page */
}

.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
