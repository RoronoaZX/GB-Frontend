<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-sm-6 col-md-3">
        <q-card
          flat
          class="bg-teal-7 text-white text-center q-pa-md rounded-borders-lg custom-shadow-light"
        >
          <div class="text-h4 text-weight-bold">16</div>
          <div class="text-subtitle1 text-weight-bold">New Delivery</div>
          <div class="text-caption">
            <q-icon name="check_circle_outline" class="q-mr-xs" />Updated every
            new delivery
          </div>
        </q-card>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-3">
        <q-card
          flat
          class="bg-white q-pa-md rounded-borders-lg custom-shadow-light"
        >
          <div class="row justify-between items-center q-mb-xs">
            <div class="text-h6 text-grey-6">Total Delivery</div>
            <q-icon name="analytics" color="grey-5" size="sm" />
          </div>
          <div class="text-h4 text-weight-bold">86</div>
          <!-- <div class="text-caption text-grey-6">+2.5% than usual</div> -->
        </q-card>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-3">
        <q-card
          flat
          class="bg-white q-pa-md rounded-borders-lg custom-shadow-light"
        >
          <div class="row justify-between items-center q-mb-xs">
            <div class="text-h6 text-grey-6">Waiting List</div>
            <q-icon name="access_time" color="grey-5" size="sm" />
          </div>
          <div class="text-h4 text-weight-bold">9</div>
          <!-- <div class="text-caption text-grey-6">+3.2% than usual</div> -->
        </q-card>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-3">
        <DeliveryCardDialog />
      </div>

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
            <q-item v-for="order in orderList" :key="order.id" class="q-py-md">
              <q-item-section avatar>
                <q-avatar
                  rounded
                  :color="order.color"
                  text-color="white"
                  class="text-weight-bold"
                >
                  {{ order.id }}
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label
                  class="text-subtitle1 text-weight-bold text-grey-8"
                  >{{ order.customerName }}</q-item-label
                >
                <q-item-label caption class="text-grey-6"
                  >{{ order.itemCount }} items</q-item-label
                >
              </q-item-section>
              <q-item-section side>
                <div
                  class="row items-center text-caption"
                  :class="`text-${order.statusColor}`"
                >
                  <q-icon
                    name="fiber_manual_record"
                    :color="order.statusColor"
                    size="8px"
                    class="q-mr-xs"
                  />
                  {{ order.statusText }}
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <div class="col-xs-12 col-md-4">
        <q-card
          flat
          class="bg-white q-pa-md rounded-borders-lg custom-shadow-light"
        >
          <div class="text-h6 text-weight-bold q-mb-sm text-grey-8">
            Warehouse / Branch Stocks
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
                <!-- :label="payment.buttonText" -->
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <div class="col-xs-12 col-md-4">
        <q-card
          flat
          class="bg-white q-pa-md rounded-borders-lg custom-shadow-light"
        >
          <div class="row justify-between items-center q-mb-sm">
            <div class="text-h6 text-weight-bold text-grey-8">Activity</div>
            <div
              class="text-primary text-caption cursor-pointer text-weight-medium"
            >
              View All
            </div>
          </div>
          <div class="row text-grey-6 q-mb-sm text-caption text-weight-medium">
            <div class="col-1">Rank</div>
            <div class="col-grow q-ml-sm">Name</div>
            <div class="col-3 text-right">Orders</div>
          </div>
          <q-list separator>
            <q-item
              v-for="(dish, index) in popularDishes"
              :key="dish.name"
              class="q-py-md"
            >
              <q-item-section class="col-1 text-weight-bold text-grey-8">{{
                index + 1
              }}</q-item-section>
              <q-item-section avatar>
                <q-avatar size="40px" rounded>
                  <img :src="dish.image" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label
                  class="text-subtitle1 text-weight-bold text-grey-8"
                  >{{ dish.name }}</q-item-label
                >
              </q-item-section>
              <q-item-section side class="text-weight-bold text-grey-6">{{
                dish.orders
              }}</q-item-section>
            </q-item>
          </q-list>
        </q-card>

        <q-card
          flat
          class="bg-white q-pa-md rounded-borders-lg q-mt-md custom-shadow-light"
        >
          <div class="row justify-between items-center q-mb-sm">
            <div class="text-h6 text-weight-bold text-grey-8">Out of Stock</div>
            <div
              class="text-primary text-caption cursor-pointer text-weight-medium"
            >
              View All
            </div>
          </div>
          <q-list separator>
            <q-item v-for="item in outOfStock" :key="item.name">
              <q-item-section>
                <q-item-label
                  class="text-subtitle1 text-weight-bold text-grey-8"
                  >{{ item.name }}</q-item-label
                >
              </q-item-section>
              <q-item-section side class="text-caption text-weight-medium">
                <div :class="`text-${item.color}`">
                  Available: {{ item.available }}
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import DeliveryCardDialog from "./components/StocksDeliveryButton.vue";

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
</style>
