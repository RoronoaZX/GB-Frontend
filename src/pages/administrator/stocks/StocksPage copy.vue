<!-- <template>
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

           <q-list separator>
            <q-item
              v-for="payment in paymentList"
              :key="payment.id"
              class="q-py-md"
            >
              <q-item-section avatar>
                <q-avatar
                  rounded
                  :color="payment.color"
                  text-color="white"
                  class="text-weight-bold"
                >
                  {{ payment.id }}
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label
                  class="text-subtitle1 text-weight-bold text-grey-8"
                  >{{ payment.customerName }}</q-item-label
                >
                <q-item-label caption class="text-grey-6">{{
                  payment.orderId
                }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  unelevated
                  :color="payment.buttonColor"
                  text-color="white"
                  label="View Stocks"
                  size="sm"
                  class="rounded-borders-sm"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
     <div>
      <q-dialog v-model="deliveryDialog">
        <q-card style="min-width: 1200px; max-width: 1500px">

          <q-card-section class="row items-center justify-between">
            <div class="text-h6 text-weight-bold">Delivery Details</div>
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>


          <q-card-section>
            <div v-if="selectedDelivery">
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
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Close" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template> -->

<!-- <script setup>
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
</script> -->

<!-- <style scoped>
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
</style> -->

<!-- class RawMaterialsDeliveryController extends Controller
{
    public function index(Request $request)
    {
        try {
            // Get pagination parameters from the request, default to 10 items per page
            $perPage = $request->input('per_page', 10);
            $search = $request->input('search');

            $query = RawMaterialsDelivery::with('items.rawMaterial', 'warehouse', 'branch')->latest();

            // Apply search filter if provided
            if ($search) {
                $query->whereHas('to_data', function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%');
                })->orWhere('from_name', 'like', '%' . $search . '%')
                  ->orWhere('status', 'like', '%' . $search . '%');
            }

            $deliveries = $query->paginate($perPage);

            return response()->json([
                'message' => 'Deliveries fetched successfully',
                'data'  => $deliveries->map(function ($delivery) {
                    return [
                        'id'     => $delivery->id,
                        'from_id' => $delivery->from_id,
                        'from_designation' => $delivery->from_desisnation,
                        'from_name' => $delivery->from_name,
                        'to_id' => $delivery->to_id,
                        'to_designation' => $delivery->to_designation,
                        'to_data' => $delivery->to_data, // 👈 dynamic warehouse or branch
                        'remarks' => $delivery->remarks,
                        'status' => $delivery->status,
                        'items' => $delivery->items->map(function ($item) {
                            return [
                                'id' => $item->id,
                                'unit_type' => $item->unit_type,
                                'category' => $item->category,
                                'quantity' => $item->quantity,
                                'price_per_unit' => $item->price_per_unit,
                                'price_per_gram' => $item->price_per_gram,
                                'gram' => $item->gram,
                                'pcs' => $item->pcs,
                                'kilo' => $item->kilo,

                                // 👇 include raw material details
                                'raw_material' => $item->rawMaterial ? [
                                    'id' => $item->rawMaterial->id,
                                    'name' => $item->rawMaterial->name,
                                    'code' => $item->rawMaterial->code,
                                    'category' => $item->rawMaterial->category,
                                    'unit' => $item->rawMaterial->unit,
                                ] : null,
                                ];
                        }),
                        'created_at' => $delivery->created_at,
                        'updated_at' => $delivery->updated_at,
                    ];
                }),
                'pagination' => [
                    'total'        => $deliveries->total(),
                    'per_page'     => $deliveries->perPage(),
                    'current_page' => $deliveries->currentPage(),
                    'last_page'    => $deliveries->lastPage(),
                    'from'         => $deliveries->firstItem(),
                    'to'           => $deliveries->lastItem(),
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch deliveries',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
} -->

<!-- import { defineStore } from 'pinia';
import { api } from 'src/boot/axios'; // Assuming you have an axios instance

export const useStockDelivery = defineStore('stock-delivery', {
  state: () => ({
    deliveryStocks: {
      data: [],
      pagination: {
        total: 0,
        per_page: 10,
        current_page: 1,
        last_page: 1,
        from: 0,
        to: 0,
      },
    },
    loading: false,
    error: null,
  }),

  actions: {
    async fetchDeliveryStocks(page = 1, per_page = 10, search = '') {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get('/api/raw-materials-deliveries', {
          params: {
            page: page,
            per_page: per_page,
            search: search, // Pass the search term
          },
        });
        this.deliveryStocks.data = response.data.data;
        this.deliveryStocks.pagination = response.data.pagination;
      } catch (error) {
        this.error = error;
        console.error('Error fetching delivery stocks:', error);
      } finally {
        this.loading = false;
      }
    },
  },
}); -->

<!-- <template>
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
                v-for="delivery in deliveryList"
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
                    {{ delivery.to_data?.name || "N/A" }}
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

              <q-item v-if="pagination.last_page > 1" class="q-pt-md">
                <q-item-section>
                  <q-pagination
                    v-model="pagination.current_page"
                    :max="pagination.last_page"
                    :max-pages="5"
                    boundary-numbers
                    direction-links
                    icon-first="skip_previous"
                    icon-last="skip_next"
                    icon-prev="fast_rewind"
                    icon-next="fast_forward"
                    @update:model-value="onPageChange"
                  />
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
          Search input for details section if needed, currently not connected to backend
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
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-xs-12 col-sm-4">
                  <span class="text-grey-7 text-caption">From:</span>
                  <div class="text-subtitle1 text-weight-bold">
                    {{ selectedDelivery.from_name || "No Name" }}
                  </div>
                </div>
                <div class="col-xs-12 col-sm-4">
                  <span class="text-grey-7 text-caption">To:</span>
                  <div class="text-subtitle1 text-weight-bold">
                    {{ selectedDelivery.to_data?.name || "No Name" }}
                  </div>
                </div>

                <div class="col-xs-12 col-sm-4">
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
              </div>

              <div>
                <span class="text-grey-7 text-caption">Items:</span>
                <q-list dense separator class="box">
                  <q-item class="bg-grey-1 text-weight-bold">
                    <q-item-section>
                      <q-item-label>Raw Materials Name</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Raw Materials Code</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Stock Category</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Quantity</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Price per Unit</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Price per Gram</q-item-label>
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
                  </q-item>
                </q-list>
                <div v-else class="text-caption text-grey-6 q-mt-md">
                  No items in this delivery.
                </div>
              </div>
            </div>
            <div v-else class="text-h6 text-grey-6 q-mt-xl text-center">
              Select a delivery from the list to see details.
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template> -->

<!-- <template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="q-mb-md" align="right">
      <DeliveryCard />
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
            v-model="searchQuery"
            @update:model-value="onSearch"
          >
            <template>
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
                v-for="delivery in deliveryList"
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
                    {{ delivery.to_data?.name || "N/A" }}
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

              <q-item v-if="pagination.last_page > 1" class="q-pt-md">
                <q-item-section>
                  <q-pagination
                    v-mode="pagination.current_page"
                    :max="pagination.last_page"
                    :max-pages="5"
                    boundary-numbers
                    direction-links
                    icon-first="skip_previous"
                    icon_last="skip_next"
                    icon-prev="fast_rewind"
                    icon-next="fast_forward"
                    @update:model-value="onPageChange"
                  />
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
          Search input for details section needed, currently not connected to
          backend
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
              <div class="row q-col-gutter-md q-mb-md">
                <div class="col-xs-12 col-sm-4">
                  <span class="text-grey-7 text-caption">From:</span>
                  <div class="text-subtitle1 text-weight-bold">
                    {{ selectedDelivery.from_name || "No Name" }}
                  </div>
                </div>
                <div class="col-xs-12 col-sm-4">
                  <span class="text-grey-7 text-caption">To:</span>
                  <div>{{ selectedDelivery.to_dat?.name || "No Name" }}</div>
                </div>
              </div>

              <div class="col-xs-12 col-sm-4">
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

              <div>
                <span class="text-grey-7 text-caption"> Items: </span>
                <q-list dense separator class="box">
                  <q-item class="bg-grey-1 text-weight-bold">
                    <q-item-section>
                      <q-item-label>Raw Materials Name</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Raw Materials Code</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Stocks Category</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Quantity</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Price per Unit</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Price per Gram</q-item-label>
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
                        {{ formatPrice(item.price_per_unit) }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <div v-else class="text-caption text-grey-6 q-mt-md">
                  No items in this delivery.
                </div>
              </div>
            </div>
            <div v-else class="text-h6 text-grey-6 q-mt-xl text-center">
              Select a delivery from the list to see details
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template> -->

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import DeliveryCardDialog from "./components/StocksDeliveryButton.vue";
import { useStockDelivery } from "src/stores/stock-delivery";
import { useQuasar } from "quasar"; // Import useQuasar for potential loading bar/notifications

const stocksDeliveryStore = useStockDelivery();
const $q = useQuasar(); // Initialize Quasar

// Computed properties to access store state
const deliveryList = computed(() => stocksDeliveryStore.deliveryStocks.data);
const loading = computed(() => stocksDeliveryStore.loading);
const pagination = computed(
  () => stocksDeliveryStore.deliveryStocks.pagination
);

const selectedDelivery = ref(null);
const searchQuery = ref(""); // New ref for search input

// Debounce for search input to prevent too many API calls
let searchTimeout = null;
const onSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    fetchDeliveryStocks(1); // Reset to page 1 on new search
  }, 500); // 500ms debounce
};

// Function to fetch deliveries with current pagination and search parameters
const fetchDeliveryStocks = async (page = 1) => {
  $q.loading.show(); // Show loading indicator
  try {
    await stocksDeliveryStore.fetchDeliveryStocks(
      page,
      pagination.value.per_page,
      searchQuery.value
    );
    // If deliveryList becomes empty after search/pagination, clear selected delivery
    if (!deliveryList.value.length && selectedDelivery.value) {
      selectedDelivery.value = null;
    }
    // If there's a selected delivery and it's no longer in the current page, deselect it
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
  fetchDeliveryStocks(pagination.value.current_page); // Fetch initial data
});

// Watch for changes in the delivery list from the store
// No longer needed to directly watch deliveryStocks for `deliveryList.value = deliveryStocks.value;`
// as `deliveryList` is now a computed property directly accessing `stocksDeliveryStore.deliveryStocks.data`

const openDialog = (delivery) => {
  selectedDelivery.value = delivery;
  // deliveryDialog.value = true; // Uncomment if you still use this dialog
};

const onPageChange = (newPage) => {
  fetchDeliveryStocks(newPage);
};

const formatQuantity = (val) => {
  if (val == null || isNaN(parseFloat(val))) return "No Quantity";
  return parseFloat(val);
};

const formatPrice = (val) => {
  if (val == null || isNaN(Number(val))) return "No Price";
  return `₱${Number(val).toFixed(2)}`;
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

// Removed unused refs like orderList, paymentList, popularDishes, outOfStock
</script>

<!-- <style scoped>
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
</style> -->
