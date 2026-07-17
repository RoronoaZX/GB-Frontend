<template>
  <div>
    <q-dialog v-model="dialog" persistent>
      <q-card class="holiday-card">
        <!-- Close Button -->
        <q-btn icon="close" flat round dense v-close-popup class="close-btn" />

        <q-card-section class="">
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
            @submit.prevent="saveHoliday"
            @reset="resetForm"
            class="q-gutter-y-md"
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

            <q-select
              outlined
              v-model="holidayForm.scope"
              :options="scopeOptions"
              label="Holiday Scope *"
              behavior="menu"
              :rules="[(val) => !!val || 'Holiday scope is required']"
              bg-color="grey-2"
              emit-value
              map-options
            />

            <q-select
              v-if="holidayForm.scope === 'custom'"
              outlined
              v-model="holidayForm.branch_ids"
              :options="branchOptions"
              label="Select Branch(es)"
              behavior="menu"
              bg-color="grey-2"
              emit-value
              map-options
              multiple
              use-chips
              :rules="[() => (holidayForm.branch_ids?.length > 0 || holidayForm.warehouse_ids?.length > 0) || 'Please select at least one branch or warehouse']"
            />

            <q-select
              v-if="holidayForm.scope === 'custom'"
              outlined
              v-model="holidayForm.warehouse_ids"
              :options="warehouseOptions"
              label="Select Warehouse(s)"
              behavior="menu"
              bg-color="grey-2"
              emit-value
              map-options
              multiple
              use-chips
              :rules="[() => (holidayForm.branch_ids?.length > 0 || holidayForm.warehouse_ids?.length > 0) || 'Please select at least one branch or warehouse']"
            />

            <div class="row q-gutter-md justify-center q-pt-sm">
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
import { reactive, ref, watch, onMounted, computed } from "vue";
import { useHolidaysStore } from "src/stores/holidays";
import { useBranchesStore } from "src/stores/branch";
import { useWarehousesStore } from "src/stores/warehouse";
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

const emit = defineEmits(["refreshHolidays"]);

const dialog = ref(false);
const holidaysStore = useHolidaysStore();
const branchesStore = useBranchesStore();
const warehousesStore = useWarehousesStore();

const holidayOriginalData = props.holidayToEdit;

const branchOptions = computed(() => {
  return branchesStore.branches.map((b) => ({
    label: b.name,
    value: b.id,
  }));
});

const warehouseOptions = computed(() => {
  return warehousesStore.warehouses.map((w) => ({
    label: w.name,
    value: w.id,
  }));
});

const scopeOptions = [
  { label: "Nationwide / All", value: "all" },
  { label: "Specific Locations", value: "custom" },
];

onMounted(async () => {
  try {
    await Promise.all([
      branchesStore.fetchBranches(),
      warehousesStore.fetchWarehouses(),
    ]);
  } catch (error) {
    console.error("Failed to load branches or warehouses:", error);
  }
});

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
  scope: "all",
  branch_ids: [],
  warehouse_ids: [],
};

const holidayForm = reactive({ ...initialHolidayForm });

const holidayTypes = ["Regular Holiday", "Special (Non-Working) Holiday"];

// Define resetForm BEFORE the watch block that uses it
const resetForm = () => {
  Object.assign(holidayForm, {
    id: null,
    name: "",
    date: "",
    type: null,
    scope: "all",
    branch_ids: [],
    warehouse_ids: [],
  });
};

// Now, the watch block can safely call resetForm because it's already defined
watch(
  () => props.holidayToEdit,
  (newVal) => {
    if (props.editMode && newVal) {
      Object.assign(holidayForm, {
        id: newVal.id,
        name: newVal.name,
        date: newVal.date ? newVal.date.replaceAll("-", "/") : "",
        type: newVal.type,
        scope: newVal.scope || "all",
        branch_ids: newVal.branches ? newVal.branches.map((b) => b.id) : [],
        warehouse_ids: newVal.warehouses ? newVal.warehouses.map((w) => w.id) : [],
      });
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

const saveHoliday = async () => {
  Loading.show();

  const payload = {
    ...holidayForm,
    date: holidayForm.date ? holidayForm.date.replaceAll("/", "-") : "",
  };

  // Sanitize conditional values based on scope
  if (payload.scope === "all") {
    payload.branch_ids = [];
    payload.warehouse_ids = [];
  }

  try {
    if (props.editMode) {
      await holidaysStore.updateHoliday(
        holidayForm.id,
        payload,
        holidayOriginalData
      );
    } else {
      await holidaysStore.createHoliday(payload);
    }
    emit("refreshHolidays");
    resetForm();
    dialog.value = false;
  } catch (error) {
    console.error("Error saving holiday:", error);
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
  /* console.log("Holiday Form Submitted:", holidayForm); */
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
