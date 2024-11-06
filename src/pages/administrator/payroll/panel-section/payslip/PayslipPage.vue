<template>
  <div align="right">
    <!-- v-model="searchQuery"
    @update:model-value="search" -->
    <q-input
      class="q-pb-lg"
      outlined
      placeholder="Search"
      debounce="1000"
      flat
      dense
      rounded
      style="width: 100%; max-width: 600px"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
  <div class="row q-gutter-lg">
    <!-- class="col-xs-12 col-sm-6 col-md-4 col-lg-3" -->
    <!-- <div v-for="card in cards" :key="card.id">
      <q-card
        class="q-pa-md q-mt-lg user-card"
        style="
          box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          background: linear-gradient(135deg, #f3f4f6, #e0e0e0);
        "
      >
        <q-card-section class="text-center q-pa-md" style="position: relative">
          <div>
            <q-avatar
              size="80px"
              color="primary"
              text-color="white"
              class="q-ma-lg"
              style="
                margin: 0 auto;
                position: absolute;
                top: -40px;
                left: 50%;
                transform: translateX(-50%);
              "
            >
              <img :src="card.avatar" />
            </q-avatar>
          </div>

          <div class="q-mt-lg" style="margin-top: 60px">
            <div class="text-h5 text-weight-bold elegant-name text-capitalize">
              {{ card.name }}
            </div>

            <q-chip
              text-color="white"
              class="q-mt-sm elegant-chip"
              style="
                background-color: #3b82f6;
                font-size: 14px;
                padding: 5px 10px;
              "
            >
              {{ card.position }}
            </q-chip>
            <q-chip
              outline
              square
              color="deep-orange"
              class="q-mt-sm elegant-chip"
            >
              Regular
            </q-chip>
          </div>
        </q-card-section>

        <q-separator class="q-ma-sm" />
        <div align="center">
          <q-btn
            padding="sm md"
            label="Open Payslip"
            size="md"
            class="gradient-btn text-darrk"
          ></q-btn>
        </div>
      </q-card>
    </div> -->

    <q-intersection v-for="card in cards" :key="card.id" class="q-ma-md">
      <!-- q-intersection to detect when the card is visible in the viewport -->

      <q-card
        class="q-pa-md q-mt-lg user-card"
        style="
          box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          background: linear-gradient(135deg, #f3f4f6, #e0e0e0);
        "
      >
        <q-card-section class="text-center q-pa-md" style="position: relative">
          <div>
            <q-avatar
              size="80px"
              color="primary"
              text-color="white"
              class="q-ma-lg"
              style="
                margin: 0 auto;
                position: absolute;
                top: -40px;
                left: 50%;
                transform: translateX(-50%);
              "
            >
              <img :src="card.avatar" />
            </q-avatar>
          </div>

          <div class="q-mt-lg" style="margin-top: 60px">
            <div class="text-h5 text-weight-bold elegant-name text-capitalize">
              {{ card.name }}
            </div>

            <q-chip
              text-color="white"
              class="q-mt-sm elegant-chip"
              style="
                background-color: #3b82f6;
                font-size: 14px;
                padding: 5px 10px;
              "
            >
              {{ card.position }}
            </q-chip>
            <q-chip
              outline
              square
              color="deep-orange"
              class="q-mt-sm elegant-chip"
            >
              Regular
            </q-chip>
          </div>
        </q-card-section>

        <q-separator class="q-ma-sm" />
        <div align="center">
          <q-btn
            padding="sm md"
            label="Open Payslip"
            size="md"
            class="gradient-btn text-darrk"
          ></q-btn>
        </div>
      </q-card>
    </q-intersection>
  </div>
</template>

<script setup>
import { ref } from "vue";

const cards = ref([
  {
    id: 1,
    name: "John D. Doe",
    position: "Admin",
    color: "primary",
    avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
  },
  {
    id: 2,
    name: "Jane Doe",
    position: "Admin",
    color: "primary",
    avatar: "https://cdn.quasar.dev/img/avatar2.jpg",
  },
  {
    id: 3,
    name: "Sam Smith",
    position: "Admin",
    color: "primary",
    avatar: "https://cdn.quasar.dev/img/avatar1.jpg",
  },
  {
    id: 4,
    name: "Chris Evans",
    position: "Admin",
    color: "primary",
    avatar: "https://cdn.quasar.dev/img/avatar4.jpg",
  },
  {
    id: 5,
    name: "Alex Doesss",
    position: "Admin",
    color: "primary",
    avatar: "https://cdn.quasar.dev/img/avatar6.jpg",
  },
  {
    id: 6,
    name: "John D. Doe",
    position: "Admin",
    color: "primary",
    avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
  },
  {
    id: 7,
    name: "Jane Doe",
    position: "Admin",
    color: "primary",
    avatar: "https://cdn.quasar.dev/img/avatar2.jpg",
  },
  {
    id: 8,
    name: "Sam Smith",
    position: "Admin",
    color: "primary",
    avatar: "https://cdn.quasar.dev/img/avatar1.jpg",
  },
  {
    id: 9,
    name: "Chris Evans",
    position: "Admin",
    color: "primary",
    avatar: "https://cdn.quasar.dev/img/avatar4.jpg",
  },
  {
    id: 10,
    name: "Alex Doe",
    position: "Admin",
    color: "primary",
    avatar: "https://cdn.quasar.dev/img/avatar6.jpg",
  },
]);
</script>

<style lang="scss" scoped>
.user-card {
  border-radius: 15px;
  background: #fff;
  color: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.elegant-name {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  color: #555;
}

.elegant-chip {
  background-color: #007bff;
  border-radius: 8px;
  color: #fff;
}

.elegant-chip-outline {
  border-color: #007bff;
  color: #007bff;
}
.gradient-btn {
  background: linear-gradient(120deg, #16cc8c, #93f9b9);
  border: none;
}
</style>
