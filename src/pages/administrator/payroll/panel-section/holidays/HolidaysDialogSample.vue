<template>
  <div>
    <q-dialog v-model="dialog" persistent>
      <q-card class="holiday-card">
        <!-- Close Button -->
        <q-btn icon="close" flat round dense v-close-popup class="close-btn" />

        <q-card-section class="q-pa-lg">
          <div class="text-center q-mb-xl">
            <q-icon name="celebration" color="primary" size="3.5rem" />
            <div class="text-h4 text-weight-bold text-grey-9 q-mt-md">
              {{ editMode ? "Edit Holiday" : "Holiday Management" }}
            </div>
            <div class="text-subtitle1 text-grey-7 q-mt-sm">
              {{
                editMode
                  ? "Update holiday details."
                  : "Add holiday details with ease."
              }}
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
              hint="yyyy/mm/dd"
              bg-color="grey-2"
            >
              <!-- :rules="['date']" -->
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

            <div class="row q-gutter-md justify-center q-pt-md">
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
import { reactive, ref, watch } from "vue";
import { useHolidaysStore } from "src/stores/holidays";
import { Loading } from "quasar";

const props = defineProps({
  editMode: {
    type: Boolean,
    default: false,
  },
  holidayToEdit: {
    type: Object,
    default: () => ({}),
  },
  currentYear: {
    type: Number,
    default: new Date().getFullYear(),
  },
  currentMonth: {
    type: Number,
    default: new Date().getMonth() + 1,
  },
});

console.log(
  "props holiday to edit: ",
  props.holidayToEdit,
  props.currentYear,
  props.currentMonth
);

const emit = defineEmits(["refreshHolidays"]);

const dialog = ref(false);
const holidaysStore = useHolidaysStore();
const year = props.currentYear;
const month = props.currentMonth;

// Define openDialog and closeDialog if they are called before watch.
const openDialog = () => {
  dialog.value = true;
};

// Define initial form state BEFORE any functions that might use it
const initialHolidayForm = {
  id: null, // Add an ID field for editing
  name: "",
  date: "", // YYYY/MM/DD format
  type: null,
};

const holidayForm = reactive({ ...initialHolidayForm });

const holidayTypes = ["Regular Holiday", "Special (Non-Working) Holiday"];

// Define resetForm BEFORE the watch block that uses it
const resetForm = () => {
  Object.assign(holidayForm, initialHolidayForm);
};

// Now, the watch block can safely call resetForm because it's already defined
watch(
  () => props.holidayToEdit,
  (newVal) => {
    if (props.editMode && newVal) {
      // Add check for non-empty object
      Object.assign(holidayForm, newVal);
    } else {
      resetForm(); // <-- resetForm is now guaranteed to be initialized
    }
  },
  { immediate: true }
);

const save = async () => {
  Loading.show();

  try {
    if (props.editMode) {
      console.log("Holiday Form Submitted:", holidayForm);
      // Call your update API
      await holidaysStore.updateHoliday(
        holidayForm.id,
        holidayForm,
        props.holidayToEdit
      );
    } else {
      // Call your create API
      await holidaysStore.createHolidays(holidayForm);
    }
    emit("refreshHolidays"); // Tell the parent to refresh data
    resetForm();
    dialog.value = false;
  } catch (error) {
    console.log(error);
  } finally {
    Loading.hide();
  }
};

// Expose openDialog and closeDialog to the parent component
defineExpose({
  openDialog,
});
</script>

<!-- <script setup>
import { reactive, ref, watch } from "vue";
import { useHolidaysStore } from "src/stores/holidays";

const props = defineProps({
  editMode: {
    type: Boolean,
    default: false,
  },
  holidayToEdit: {
    type: Object,
    default: () => ({}),
  },
});

const dialog = ref(false);
const holidaysStore = useHolidaysStore();

const initialHolidayForm = {
  id: null,
  name: "",
  date: "", // YYYY/MM/DD format
  type: null,
};

const holidayForm = reactive({ ...initialHolidayForm });

const holidayTypes = ["Regular Holiday", "Special (Non-Working) Holiday"];

// const resetForm = () => {
//   Object.assign(holidayForm, initialHolidayForm);
// };

// Expose openDialog for parent component to control the dialog
const openDialog = () => {
  dialog.value = true;
};

// Expose closeDialog for parent component to control the dialog
const closeDialog = () => {
  dialog.value = false;
};

// Watch for changes in holiday to edit prop to populate the form
watch(
  () => props.holidayToEdit,
  (newVal) => {
    if (props.editMode && newVal) {
      Object.assign(holidayForm, newVal);
    } else {
      resetForm(); // Reset form if not in edit mode or no holiday is provided
    }
  },
  {
    immediate: true,
  } // Run immediately when component is mounted
);

const save = async () => {
  console.log("Holiday Form Submitted:", holidayForm);
  // On success, you might want to close the dialog
  // dialog.value = false;
  if (props.editMode) {
    // Call your update API
    await holidaysStore.updateHoliday(holidayForm.id, holidayForm);
  } else {
    // Call your create API
    await holidaysStore.createHolidays(holidayForm);
  }
  resetForm();
  dialog.value = false;
};

// Expose openDialog and closeDialog to the parent component
defineExpose({
  openDialog,
  closeDialog,
});
</script> -->

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
