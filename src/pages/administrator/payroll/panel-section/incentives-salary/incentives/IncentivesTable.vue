<template>
  <!-- Skeletal Loading Table -->
  <div v-if="tableLoading" class="q-pa-sm">
    <q-markup-table flat class="user-card">
      <thead>
        <tr class="gradient-header text-white">
          <th v-for="col in incentivesBasesColumns" :key="col.name" class="text-center">
            <q-skeleton type="text" width="60%" class="q-mx-auto" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in 3" :key="n">
          <td v-for="col in incentivesBasesColumns" :key="col.name" class="text-center">
            <q-skeleton type="text" width="50%" class="q-mx-auto" />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>

  <q-table v-else class="premium-table" :rows="incentives" :columns="incentivesBasesColumns">
    <template v-slot:header="props">
      <q-tr :props="props" class="gradient-header text-white text-weight-bold">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          class="text-center text-subtitle2"
        >
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body-cell-number_of_employees="props">
      <q-td :props="props" class="cursor-pointer text-center">
        <div class="edit-trigger">
          <q-icon name="edit" size="14px" color="grey-6" class="edit-icon q-mr-xs" />
          <span class="numeric-font text-weight-bold text-slate-8">
            {{ props.row.number_of_employees ? props.row.number_of_employees : " - - " }}
          </span>
        </div>
        <q-popup-edit
          v-model="props.row.number_of_employees"
          v-slot="scope"
          content-class="popup-card"
        >
          <div class="q-pa-md" style="min-width: 280px;">
            <div class="popup-title q-mb-sm">
              Edit Number of Employees
            </div>
            <q-input
              v-model="scope.value"
              :model-value="scope.value"
              @value:model-value="scope.value = $event"
              type="text"
              outlined
              dense
              autofocus
              class="popup-input"
              @keyup.enter="scope.set"
            />
            <div class="row justify-end q-mt-md q-gutter-x-sm">
              <q-btn flat label="Cancel" color="grey-7" no-caps @click="scope.cancel" />
              <q-btn
                unelevated
                label="Save"
                color="teal"
                no-caps
                class="q-px-md rounded-btn"
                @click="() => { openEditConfirm(props.row, scope.value, 'number_of_employees'); scope.cancel(); }"
              />
            </div>
          </div>
        </q-popup-edit>
      </q-td>
    </template>

    <template v-slot:body-cell-target="props">
      <q-td :props="props" class="cursor-pointer text-center">
        <div class="edit-trigger">
          <q-icon name="edit" size="14px" color="grey-6" class="edit-icon q-mr-xs" />
          <span class="numeric-font text-weight-bold text-slate-8">
            {{ props.row.target ? props.row.target : " - - -" }}
          </span>
        </div>
        <q-popup-edit
          v-model="props.row.target"
          v-slot="scope"
          content-class="popup-card"
        >
          <div class="q-pa-md" style="min-width: 280px;">
            <div class="popup-title q-mb-sm">
              Edit Target Kilo
            </div>
            <q-input
              v-model="scope.value"
              :model-value="scope.value"
              @value:model-value="scope.value = $event"
              type="text"
              outlined
              dense
              autofocus
              suffix="kg"
              class="popup-input"
              @keyup.enter="scope.set"
            />
            <div class="row justify-end q-mt-md q-gutter-x-sm">
              <q-btn flat label="Cancel" color="grey-7" no-caps @click="scope.cancel" />
              <q-btn
                unelevated
                label="Save"
                color="teal"
                no-caps
                class="q-px-md rounded-btn"
                @click="() => { openEditConfirm(props.row, scope.value, 'target'); scope.cancel(); }"
              />
            </div>
          </div>
        </q-popup-edit>
      </q-td>
    </template>

    <template v-slot:body-cell-baker_multiplier="props">
      <q-td :props="props" class="cursor-pointer text-center">
        <div class="edit-trigger">
          <q-icon name="edit" size="14px" color="grey-6" class="edit-icon q-mr-xs" />
          <span class="numeric-font text-weight-bold text-teal-8">
            {{ formatMultiplier(props.row.baker_multiplier) }}
          </span>
        </div>
        <q-popup-edit
          v-model="props.row.baker_multiplier"
          v-slot="scope"
          content-class="popup-card"
        >
          <div class="q-pa-md" style="min-width: 280px;">
            <div class="popup-title q-mb-sm">
              Edit Baker Multiplier
            </div>
            <q-input
              v-model="scope.value"
              :model-value="formatNumber(scope.value)"
              @value:model-value="scope.value = $event"
              type="text"
              outlined
              dense
              autofocus
              prefix="x"
              class="popup-input"
              @keyup.enter="scope.set"
            />
            <div class="row justify-end q-mt-md q-gutter-x-sm">
              <q-btn flat label="Cancel" color="grey-7" no-caps @click="scope.cancel" />
              <q-btn
                unelevated
                label="Save"
                color="teal"
                no-caps
                class="q-px-md rounded-btn"
                @click="() => { openEditConfirm(props.row, scope.value, 'baker_multiplier'); scope.cancel(); }"
              />
            </div>
          </div>
        </q-popup-edit>
      </q-td>
    </template>

    <template v-slot:body-cell-lamesador_multiplier="props">
      <q-td :props="props" class="cursor-pointer text-center">
        <div class="edit-trigger">
          <q-icon name="edit" size="14px" color="grey-6" class="edit-icon q-mr-xs" />
          <span class="numeric-font text-weight-bold text-teal-8">
            {{ formatMultiplier(props.row.lamesador_multiplier) }}
          </span>
        </div>
        <q-popup-edit
          v-model="props.row.lamesador_multiplier"
          v-slot="scope"
          content-class="popup-card"
        >
          <div class="q-pa-md" style="min-width: 280px;">
            <div class="popup-title q-mb-sm">
              Edit Lamesador Multiplier
            </div>
            <q-input
              v-model="scope.value"
              :model-value="formatNumber(scope.value)"
              @value:model-value="scope.value = $event"
              type="text"
              outlined
              dense
              autofocus
              prefix="x"
              class="popup-input"
              @keyup.enter="scope.set"
            />
            <div class="row justify-end q-mt-md q-gutter-x-sm">
              <q-btn flat label="Cancel" color="grey-7" no-caps @click="scope.cancel" />
              <q-btn
                unelevated
                label="Save"
                color="teal"
                no-caps
                class="q-px-md rounded-btn"
                @click="() => { openEditConfirm(props.row, scope.value, 'lamesador_multiplier'); scope.cancel(); }"
              />
            </div>
          </div>
        </q-popup-edit>
      </q-td>
    </template>

    <template v-slot:body-cell-hornero_incentives="props">
      <q-td :props="props" class="cursor-pointer text-center">
        <div class="edit-trigger">
          <q-icon name="edit" size="14px" color="grey-6" class="edit-icon q-mr-xs" />
          <span class="numeric-font text-weight-bold text-amber-9">
            {{ formatCurrency(props.row.hornero_incentives) }}
          </span>
        </div>
        <q-popup-edit
          v-model="props.row.hornero_incentives"
          v-slot="scope"
          content-class="popup-card"
        >
          <div class="q-pa-md" style="min-width: 280px;">
            <div class="popup-title q-mb-sm">
              Edit Hornero Incentives
            </div>
            <q-input
              v-model="scope.value"
              :model-value="formatNumber(scope.value)"
              @value:model-value="scope.value = $event"
              type="text"
              outlined
              dense
              autofocus
              prefix="₱"
              class="popup-input"
              @keyup.enter="scope.set"
            />
            <div class="row justify-end q-mt-md q-gutter-x-sm">
              <q-btn flat label="Cancel" color="grey-7" no-caps @click="scope.cancel" />
              <q-btn
                unelevated
                label="Save"
                color="teal"
                no-caps
                class="q-px-md rounded-btn"
                @click="() => { openEditConfirm(props.row, scope.value, 'hornero_incentives'); scope.cancel(); }"
              />
            </div>
          </div>
        </q-popup-edit>
      </q-td>
    </template>
  </q-table>

  <!-- Edit Password Confirmation Dialog -->
  <q-dialog v-model="editPasswordDialog" persistent>
    <q-card class="confirm-card q-pa-md" style="width: 380px; max-width: 90vw; border-radius: 12px;">
      <q-card-section class="row items-center q-pb-none">
        <q-avatar icon="edit_note" color="teal" text-color="white" size="36px" class="q-mr-sm" />
        <div class="text-h6 text-weight-bold text-teal-9">Confirm Edit</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-md">
        <div class="text-body2 text-grey-8 q-mb-md">
          Please enter your password to save the incentive changes.
        </div>
        <q-input
          v-model="editPasswordInput"
          type="password"
          label="Enter Password"
          outlined
          dense
          autofocus
          @keyup.enter="handleEditConfirm"
        />
      </q-card-section>

      <q-card-actions align="right" class="q-pt-none">
        <q-btn flat label="Cancel" color="grey-7" no-caps v-close-popup />
        <q-btn
          unelevated
          label="Confirm Edit"
          color="teal"
          no-caps
          class="q-px-md rounded-btn"
          :loading="editConfirmLoading"
          @click="handleEditConfirm"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useIncentivesBasesStore } from "src/stores/incentive-bases";
import { useUsersStore } from "src/stores/user";
import { computed, onMounted, ref } from "vue";
import { Notify, useQuasar } from "quasar";

const incentivesStore = useIncentivesBasesStore();
const userStore = useUsersStore();
const incentives = computed(() => incentivesStore.incentivesBases);
const $q = useQuasar();
const editedValue = ref(null);

const tableLoading = ref(false);

// Edit Password Confirmation State
const editPasswordDialog = ref(false);
const editPasswordInput = ref("");
const pendingEditRecord = ref(null); // stores { row, val, field }
const editConfirmLoading = ref(false);

const updateNumberEmployee = async (data, val) => {
  /* console.log("updateNumberEmployee", data, val); */
  try {
    tableLoading.value = true;
    await incentivesStore.updateNumberEmployee(data, val);
  } catch (error) {
    console.error("Error updating number of employees:", error);
  } finally {
    tableLoading.value = false;
  }
};

const updateTargetKilo = async (data, val) => {
  /* console.log("updateTargetKilo", data, val); */
  try {
    tableLoading.value = true;
    await incentivesStore.updateTargetKilo(data, val);
  } catch (error) {
    console.error("Error updating target kilo:", error);
  } finally {
    tableLoading.value = false;
  }
};

const updateBakerMultiplier = async (data, val) => {
  /* console.log("updateBakerMultiplier", data, val); */
  try {
    tableLoading.value = true;
    await incentivesStore.updateBakerMultiplier(data, val);
  } catch (error) {
    console.error("Error updating baker multiplier:", error);
  } finally {
    tableLoading.value = false;
  }
};

const udpateLamesadorMultiplier = async (data, val) => {
  /* console.log("udpateLamesadorMultiplier", data, val); */
  try {
    tableLoading.value = true;
    await incentivesStore.updateLamesadorMultiplier(data, val);
  } catch (error) {
    console.error("Error updating lamesador multiplier:", error);
  } finally {
    tableLoading.value = false;
  }
};

const updateHorneroIncentives = async (data, val) => {
  /* console.log("updateHorneroIncentives", data, val); */
  try {
    tableLoading.value = true;
    await incentivesStore.updateHorneroIncentives(data, val);
  } catch (error) {
    console.error("Error updating hornero multiplier:", error);
  } finally {
    tableLoading.value = false;
  }
};

// ─── Edit Confirmation ────────────────────────────────────────────────────────
const openEditConfirm = (row, val, field) => {
  pendingEditRecord.value = { row, val, field };
  editPasswordInput.value = "";
  editPasswordDialog.value = true;
};

const dispatchEdit = async (row, val, field) => {
  switch (field) {
    case "number_of_employees": await incentivesStore.updateNumberEmployee(row, val);     break;
    case "target":              await incentivesStore.updateTargetKilo(row, val);          break;
    case "baker_multiplier":    await incentivesStore.updateBakerMultiplier(row, val);     break;
    case "lamesador_multiplier":await incentivesStore.updateLamesadorMultiplier(row, val); break;
    case "hornero_incentives":  await incentivesStore.updateHorneroIncentives(row, val);   break;
  }
  await fetchIncentivesData();
};

const handleEditConfirm = async () => {
  if (!editPasswordInput.value) {
    Notify.create({
      message: "Password is required",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
    return;
  }

  editConfirmLoading.value = true;
  try {
    const userId = userStore.userData?.data?.id;
    if (!userId) {
      Notify.create({
        message: "User session not found. Please log in again.",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
      return;
    }

    const isValid = await userStore.verifyUserPassword(userId, editPasswordInput.value);
    if (!isValid) {
      Notify.create({
        message: "Incorrect password. Edit was not saved.",
        color: "negative",
        position: "top",
        timeout: 2500,
      });
      return;
    }

    const { row, val, field } = pendingEditRecord.value;
    await dispatchEdit(row, val, field);

    Notify.create({
      message: "Record updated successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
    editPasswordDialog.value = false;
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to update record";
    Notify.create({ message: msg, color: "negative", position: "top", timeout: 3000 });
  } finally {
    editConfirmLoading.value = false;
  }
};
// ─────────────────────────────────────────────────────────────────────────────

const fetchIncentivesData = async () => {
  tableLoading.value = true;
  try {
    await incentivesStore.fetchIncentivesBases();
  } catch (error) {
    console.error("Error fetching incentives bases:", error);
  } finally {
    tableLoading.value = false;
  }
};
onMounted(fetchIncentivesData);

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`.trim();
};
const formatCurrency = (value) => {
  const numericValue = parseFloat(value) || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
};

const formatMultiplier = (val) => {
  const num = parseFloat(val);
  if (isNaN(num) || num === 0) return "0";

  return `x${num % 1 === 0 ? num.toFixed(0) : num}`;
};

const formatNumber = (val) => {
  if (!val) return "0";
  const num = parseFloat(val);
  if (isNaN(num)) return val;

  return num % 1 === 0
    ? num.toString()
    : num.toString().replace(/0+$/, "").replace(/\.$/, "");
};

// 🔥 expose to parent
defineExpose({ fetchIncentivesData });

const incentivesBasesColumns = [
  {
    name: "number_of_employees",
    required: true,
    label: "Number of Employee",
    align: "center",
    field: (row) => row.number_of_employees,
  },
  {
    name: "target",
    required: true,
    label: "Target Kilo",
    align: "center",
    field: (row) => row.target,
  },
  {
    name: "baker_multiplier",
    required: true,
    label: "Baker Multiplier",
    align: "center",
    field: (row) => row.baker_multiplier,
    // format: (val) => {
    //   const num = parseFloat(val);
    //   if (!num) return "0";
    //   return `x${num % 1 === 0 ? num.toFixed(0) : num}`;
    // },
  },
  {
    name: "lamesador_multiplier",
    required: true,
    label: "Lamesador Multiplier",
    align: "center",
    field: (row) => row.lamesador_multiplier,
    format: (val) => {
      const num = parseFloat(val);
      if (!num) return "0";
      return `x${num % 1 === 0 ? num.toFixed(0) : num}`;
    },
  },
  {
    name: "hornero_incentives",
    required: true,
    label: "Hornero Incentives",
    align: "center",
    field: (row) => row.hornero_incentives,
    format: (val) => formatCurrency(val),
  },
];
</script>

<style lang="scss" scoped>
.gradient-header {
  background: linear-gradient(135deg, #0f766e 0%, #0d9488 100%) !important;
  color: #ffffff !important;
}

.premium-table {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(226, 232, 240, 0.8);
  
  :deep(.q-table__card) {
    box-shadow: none;
  }

  :deep(thead tr) {
    height: 48px;
  }

  :deep(tbody tr) {
    transition: background-color 0.2s ease;
    &:hover {
      background-color: rgba(241, 245, 249, 0.5) !important;
    }
  }
}

.numeric-font {
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 0.95rem;
}

.edit-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(13, 148, 136, 0.08);
    .edit-icon {
      color: #0d9488;
      transform: scale(1.15);
    }
  }

  .edit-icon {
    transition: all 0.2s ease;
  }
}

:deep(.popup-card) {
  border-radius: 12px !important;
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.1) !important;
  border: 1px solid rgba(226, 232, 240, 0.8) !important;
  background: #ffffff !important;
}

.popup-title {
  color: #0f172a;
  font-weight: 700;
  font-size: 1.05rem;
}

.popup-input {
  :deep(.q-field__control) {
    border-radius: 8px;
    transition: all 0.2s ease-in-out;
  }
  :deep(.q-field__control:focus-within) {
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);
  }
}

.rounded-btn {
  border-radius: 8px;
}
</style>
