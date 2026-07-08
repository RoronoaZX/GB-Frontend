<template>
  <q-btn
    label="Add Incentives"
    @click="openDialog"
    rounded
    unelevated
    icon="add"
    class="gradient-btn q-px-lg q-py-sm text-capitalize text-white"
  />
  <q-dialog v-model="dialog" backdrop-filter="blur(4px)">
    <q-card class="premium-dialog-card q-pa-md">
      <q-card-section class="row items-center q-pb-md header-section">
        <div class="text-h6 text-weight-bold text-slate-8">
          Baker Incentives Settings
        </div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup color="grey-6" />
      </q-card-section>

      <q-card-section class="q-pt-md">
        <!-- Formula Builder Helper Card -->
        <div class="formula-helper-card q-pa-md q-mb-lg">
          <div class="row items-center justify-between q-mb-sm">
            <div class="text-caption text-weight-bold text-teal-8 text-uppercase tracking-wider">
              Formula Simulation
            </div>
            <q-badge color="teal-1" text-color="teal-9" class="q-px-sm" label="Live View" />
          </div>
          <div class="row items-center justify-around text-center no-wrap">
            <div class="col-3">
              <div class="text-subtitle2 text-weight-bolder text-slate-8">
                {{ incentivesDataToBePass.target || 0 }}<span class="text-caption text-grey-6 q-ml-xs">kg</span>
              </div>
              <div class="text-caption text-grey-5 text-weight-medium">Target</div>
            </div>
            <div class="col-1 text-grey-4 text-weight-thin text-h6">×</div>
            <div class="col-3">
              <div class="text-subtitle2 text-weight-bolder text-teal-8">
                x{{ incentivesDataToBePass.baker || 0 }}
              </div>
              <div class="text-caption text-grey-5 text-weight-medium">Baker</div>
            </div>
            <div class="col-1 text-grey-4 text-weight-thin text-h6">+</div>
            <div class="col-3">
              <div class="text-subtitle2 text-weight-bolder text-amber-8">
                ₱{{ incentivesDataToBePass.hornero || 0 }}
              </div>
              <div class="text-caption text-grey-5 text-weight-medium">Hornero</div>
            </div>
          </div>
        </div>

        <div class="row q-col-gutter-md">
          <div class="col-6">
            <q-input
              v-model="incentivesDataToBePass.number_of_employees"
              outlined
              dense
              label="Number of Employees"
              type="number"
              color="teal"
              bg-color="white"
              class="premium-input"
            />
          </div>
          <div class="col-6">
            <q-input
              v-model="incentivesDataToBePass.target"
              outlined
              dense
              label="Target Kilo"
              type="number"
              color="teal"
              bg-color="white"
              suffix="kg"
              class="premium-input"
            />
          </div>
        </div>
        <q-separator class="q-my-lg" />

        <div class="settings-section">
          <div class="text-subtitle2 text-weight-bold text-slate-8 q-mb-md">
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
                color="teal"
                bg-color="white"
                prefix="x"
                class="premium-input role-input"
              />
            </div>
            <div class="incentive-row">
              <div class="role-label">Lamesador</div>
              <q-input
                v-model="incentivesDataToBePass.lamesador"
                outlined
                dense
                label="Multiplied by:"
                type="number"
                color="teal"
                bg-color="white"
                prefix="x"
                class="premium-input role-input"
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
                color="teal"
                bg-color="white"
                prefix="₱"
                class="premium-input role-input"
              />
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md q-pt-lg action-section">
        <q-btn
          flat
          label="Cancel"
          color="grey-7"
          v-close-popup
          no-caps
          class="q-px-lg rounded-btn"
        />
        <q-btn
          color="teal"
          label="Save Settings"
          @click="save"
          unelevated
          no-caps
          class="q-px-lg q-py-sm rounded-btn save-btn"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useIncentivesBasesStore } from "src/stores/incentive-bases";
import { Notify } from "quasar";

const useIncenivesStore = useIncentivesBasesStore();
const incentivesData = computed(() => useIncenivesStore.incentivesBases);
const emit = defineEmits(["created"]);

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

    emit("created");

    Notify.create({
      message: "Data saved successfully",
      color: "green",
      position: "top",
      timeout: 2000,
    });

    dialog.value = false;
    clear();
  } catch (error) {
    /* console.log("error", error); */

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
.gradient-btn {
  background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%) !important;
  box-shadow: 0 4px 10px rgba(13, 148, 136, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(13, 148, 136, 0.3);
  }
}

.premium-dialog-card {
  width: 480px;
  max-width: 95vw;
  border-radius: 16px !important;
  box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 10px 10px -5px rgba(15, 23, 42, 0.04) !important;
  background-color: #ffffff;
}

.header-section {
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  
  .text-h6 {
    color: #0f172a;
    font-size: 1.1rem;
  }
}

.formula-helper-card {
  background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%);
  border: 1px solid rgba(13, 148, 136, 0.15);
  border-radius: 12px;
  box-shadow: inset 0 2px 4px rgba(13, 148, 136, 0.02);
}

.premium-input {
  :deep(.q-field__control) {
    border-radius: 8px;
    transition: all 0.2s ease-in-out;
  }
  
  :deep(.q-field__control:focus-within) {
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);
  }
}

.incentive-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 16px;
  background-color: #f8fafc;
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(13, 148, 136, 0.25);
    background-color: #f1f5f9;
  }
}

.role-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #334155;
  width: 100px;
}

.role-input {
  flex-grow: 1;
}

.action-section {
  border-top: 1px solid rgba(226, 232, 240, 0.8);
}

.rounded-btn {
  border-radius: 8px;
}

.save-btn {
  font-weight: 600;
  background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%) !important;
  box-shadow: 0 4px 10px rgba(13, 148, 136, 0.2);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 6px 15px rgba(13, 148, 136, 0.3);
  }
}
</style>
