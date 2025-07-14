<template>
  <div>
    <!-- This button would be on your main page to open the dialog -->
    <HolidayButton @click="openDialog" />
  </div>
  <div>
    <q-dialog v-model="dialog" persistent>
      <q-card class="holiday-card">
        <!-- Close Button -->
        <q-btn icon="close" flat round dense v-close-popup class="close-btn" />

        <q-card-section class="q-pa-lg">
          <div class="text-center q-mb-xl">
            <q-icon name="celebration" color="primary" size="3.5rem" />
            <div class="text-h4 text-weight-bold text-grey-9 q-mt-md">
              Holiday Management
            </div>
            <div class="text-subtitle1 text-grey-7 q-mt-sm">
              Add holiday details with ease.
            </div>
          </div>

          <q-form
            @submit.prevent="save"
            @reset="resetForm"
            class="q-gutter-y-lg"
          >
            <q-input
              outlined
              v-model="holidayForm.name"
              label="Holiday Name *"
              lazy-rules
              :rules="[(val) => !!val || 'Holiday name is required']"
              bg-color="grey-2"
            />

            <q-input
              outlined
              v-model="holidayForm.date"
              label="Holiday Date *"
              mask="date"
              :rules="['date']"
              bg-color="grey-2"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="holidayForm.date" color="primary">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-select
              outlined
              v-model="holidayForm.type"
              :options="holidayTypes"
              label="Holiday Type *"
              behavior="menu"
              :rules="[(val) => !!val || 'Holiday type is required']"
              bg-color="grey-2"
            />

            <div class="row q-gutter-md justify-center q-pt-lg">
              <q-btn
                label="Reset"
                type="reset"
                color="grey-8"
                flat
                class="q-px-xl q-py-sm form-btn"
              />
              <q-btn
                label="Save Holiday"
                type="submit"
                color="primary"
                unelevated
                class="q-px-xl q-py-sm form-btn save-btn"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useHolidaysStore } from "src/stores/holidays";
import HolidayButton from "src/components/buttons/HolidayButton.vue";

const dialog = ref(false);
const holidaysStore = useHolidaysStore();

const openDialog = () => {
  dialog.value = true;
};

const initialHolidayForm = {
  name: "",
  date: "", // YYYY/MM/DD format
  type: null,
};

const holidayForm = reactive({ ...initialHolidayForm });

const holidayTypes = ["Regular Holiday", "Special Non-Working Holiday"];

const save = async () => {
  console.log("Holiday Form Submitted:", holidayForm);
  // On success, you might want to close the dialog
  // dialog.value = false;
  await holidaysStore.createHolidays(holidayForm);
  resetForm();
};

const resetForm = () => {
  Object.assign(holidayForm, initialHolidayForm);
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

.holiday-card {
  font-family: "Inter", sans-serif;
  width: 550px;
  max-width: 95vw;
  border-radius: 24px;
  background-color: #ffffff;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  position: relative; // Needed for positioning the close button
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  color: #9e9e9e;
  z-index: 10;
}

.text-h4 {
  font-weight: 700;
  color: #333;
}

.text-subtitle1 {
  color: #6c757d;
}

// Style for outlined inputs to achieve the desired look
:deep(.q-field--outlined .q-field__control) {
  border-radius: 12px;
  border: 1px solid #e0e0e0;
}

:deep(.q-field--outlined.q-field--focus .q-field__control) {
  border-color: var(--q-primary);
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2); // Soft focus glow
}

:deep(.q-field__label) {
  color: #6c757d;
}

.form-btn {
  border-radius: 12px;
  font-weight: 600;
  text-transform: none; // Keep button text casing as is
  transition: all 0.3s ease;
}

.save-btn {
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px -10px var(--q-primary);
  }
}
</style>
