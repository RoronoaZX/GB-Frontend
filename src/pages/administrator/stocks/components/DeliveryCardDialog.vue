<template>
  <q-card
    flat
    class="bg-amber-4 q-pa-md rounded-borders-lg row items-center justify-center cursor-pointer custom-shadow-light"
    @click="openDialog"
  >
    <q-icon name="add_circle" size="md" color="white" class="q-mr-sm" />
    <div class="text-h6 text-weight-bold text-white">
      Create Stocks Delivery
    </div>
  </q-card>
  <div>
    <q-dialog v-model="dialog">
      <q-card style="width: 820px; max-width: 80vw">
        <q-card-section class="gradient-btn">
          <div class="row justify-between text-h6 text-white">
            <div>🚚 Deliver Stocks</div>
            <div>
              <q-btn icon="close" flat dense round v-close-popup />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <h6>This is a dialog for delivering stock in branch or warehouse</h6>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn outline>Cancel</q-btn>
          <q-btn>Proceed</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

const dialog = ref(false);

const openDialog = () => {
  dialog.value = true;
};
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
</style>
