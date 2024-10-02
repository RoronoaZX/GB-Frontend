<template>
  <q-btn
    color="info"
    icon="visibility"
    size="md"
    flat
    round
    dense
    @click="open_branch_status_dialog"
  >
    <q-tooltip class="bg-info" :delay="200">View</q-tooltip>
  </q-btn>
  <q-dialog v-model="brancheStatusDialog" full-width>
    <!-- style="width: 1000px; max-width: 90vw;" -->
    <q-card class="my-card">
      <q-card-section
        class="row justify-between"
        style="background-color: #ef4444"
      >
        <div class="text-h6 text-white">
          <q-icon name="fa-solid fa-store" />
          Branch 1
        </div>
        <div class="text-white">
          <q-btn flat round dense icon="close" v-close-popup />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6 q-ml-lg">Raw Materials Status</div>
        <div class="q-pa-lg card-grid">
          <q-card
            bordered
            dense
            v-for="card in cards"
            :key="card.id"
            class="card"
          >
            <q-card-section>
              <div>{{ card.title }}</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div class="row justify-between">
                <div class="text-h6">
                  <strong>{{ card.description }}</strong>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from "vue";

const brancheStatusDialog = ref();

const open_branch_status_dialog = () => {
  brancheStatusDialog.value = true;
};

const searchTerm = ref("");

// const filterCards = computed(() => {
//     return cards.filter(card =>{
//         return card.title.toLowerCase().includes(searchTerm.value.toLowerCase()) || card.description.toLowerCase().includes(searchTerm.value.toLowerCase)
//     })
// })

const cards = [
  {
    id: 1,
    title: "Bread Group 1",
    description: "20kg",
  },
  {
    id: 2,
    title: "Bread Group 2",
    description: "40kg",
  },
  {
    id: 3,
    title: "Bread Group 3",
    description: "50kg",
  },
  {
    id: 4,
    title: "Bread Group 4",
    description: "10kg",
  },
  {
    id: 5,
    title: "Bread Group 5",
    description: "30kg",
  },
  {
    id: 6,
    title: "Bread Group 6",
    description: "70kg",
  },
  {
    id: 7,
    title: "Bread Group 7",
    description: "30kg",
  },
  {
    id: 8,
    title: "Bread Group 8 ",
    description: "70kg",
  },
  {
    id: 9,
    title: "Bread Group 9",
    description: "30kg",
  },
  {
    id: 10,
    title: "Bread Group 10 ",
    description: "70kg",
  },
];
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.card {
  max-width: 100%;
}
</style>
