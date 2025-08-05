<template>
  <q-page class="elegant-container q-pa-md">
    <q-card-section>
      <div>
        <q-btn
          color="primary"
          label="Add Baker Incentives"
          @click="openDialog"
          rounded
          class="q-px-lg q-py-sm text-capitalize"
        />
      </div>
    </q-card-section>

    <q-card-section> </q-card-section>

    <q-dialog v-model="dialog">
      <q-card class="dialog-card q-pa-md">
        <q-card-section class="row items-center q-pb-md">
          <div class="text-h6 text-weight-bold text-primary">
            Baker Incentives Settings
          </div>
          <q-space />
          <q-btn icon="close" flat dense round v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row q-col-gutter-md">
            <div class="col-6">
              <q-input
                v-model="incentivesDataToBePass.number_of_employees"
                outlined
                dense
                label="Number of Employees"
                type="number"
                color="primary"
                bg-color="white"
                input-class="q-pl-sm"
                class="role-input"
              />
            </div>
            <div class="col-6">
              <q-input
                v-model="incentivesDataToBePass.target"
                outlined
                dense
                label="Target Kilo"
                type="number"
                color="primary"
                bg-color="white"
                input-class="q-pl-sm"
              />
            </div>
          </div>
          <q-separator class="q-my-lg" />

          <div class="settings-section">
            <div class="text-subtitle1 text-weight-medium text-primary q-mb-md">
              Incentives per Role
            </div>
            <div class="q-gutter-y-md">
              <div class="incentive-row">
                <div class="role-label">Baker</div>
                <q-input
                  v-model="incentivesDataToBePass.baker"
                  outlined
                  dense
                  label="Multiplied by:"
                  type="number"
                  color="primary"
                  bg-color="white"
                  input-class="q-pl-sm"
                />
                <!--
                  filled
                label="Multiplied by"
                  type="number"
                  class="role-input"
                  stack-label -->
              </div>
              <div class="incentive-row">
                <div class="role-label">Lamesador</div>
                <q-input
                  v-model="incentivesDataToBePass.lamesador"
                  outlined
                  dense
                  label="Multiplied by:"
                  type="number"
                  color="primary"
                  bg-color="white"
                  input-class="q-pl-sm"
                />
              </div>
              <div class="incentive-row">
                <div class="role-label">Hornero</div>
                <q-input
                  v-model="incentivesDataToBePass.hornero"
                  outlined
                  dense
                  label="Pesos:"
                  type="number"
                  color="primary"
                  bg-color="white"
                  input-class="q-pl-sm"
                />
              </div>
            </div>
            <div class="q-gutter-y-md"></div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn
            color="primary"
            label="Save"
            @click="save"
            rounded
            class="q-px-lg q-py-sm text-capitalize"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useIncentivesStore } from "src/stores/incentives";
import { Notify } from "quasar";

const useIncenivesStore = useIncentivesStore();
const incentivesData = computed(() => useIncenivesStore.incentives);

const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const incentivesDataToBePass = reactive({
  number_of_employees: 0,
  target: 0,
  baker: 0,
  lamesador: 0,
  hornero: 0,
});

const clear = () => {
  incentivesDataToBePass.number_of_employees = 0;
  incentivesDataToBePass.target = 0;
  incentivesDataToBePass.baker = 0;
  incentivesDataToBePass.lamesador = 0;
  incentivesDataToBePass.hornero = 0;
};

const save = async () => {
  try {
    await useIncenivesStore.createIncentives(incentivesDataToBePass);

    Notify.create({
      message: "Data saved successfully",
      color: "green",
      position: "top",
      timeout: 2000,
    });

    clear();
    dialog.value = false;
  } catch (error) {
    console.log("error", error);

    Notify.create({
      message: "Error saving data",
      color: "red",
      position: "top",
      timeout: 2000,
    });
  }
};
</script>

<style lang="scss" scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 2rem;
  border-radius: 8px;
}

.dialog-card {
  width: 450px;
  max-width: 90vw;
  border-radius: 12px;
  background-color: #f7f8fc;
}

.settings-section .text-h6 {
  color: #333;
  font-weight: 600;
}

.q-card-section.row.items-center {
  border-bottom: 1px solid #e0e0e0;
}

.q-input {
  transition: all 0.3s ease-in-out;
}

.q-input:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.q-btn.q-btn-item {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.q-btn.q-btn-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.incentive-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.role-label {
  font-size: 1rem;
  font-weight: 500;
  color: #555;
  width: 120px; /* Ensures alignment */
}

.role-input {
  flex-grow: 1;
}
</style>
