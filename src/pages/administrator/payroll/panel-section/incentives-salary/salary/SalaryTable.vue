<template>
  <!-- Skeletal Loading Table -->
  <div v-if="tableLoading" class="q-pa-sm">
    <q-markup-table flat class="user-card">
      <thead>
        <tr class="gradient-header text-white">
          <th v-for="col in salaryColumns" :key="col.name" class="text-center">
            <q-skeleton type="text" width="60%" class="q-mx-auto" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in 3" :key="n">
          <td v-for="col in salaryColumns" :key="col.name" class="text-center">
            <q-skeleton type="text" width="50%" class="q-mx-auto" />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>

  <q-table
    v-else
    class="premium-table"
    :rows="employementType || []"
    :columns="salaryColumns"
    row-key="id"
  >
    <template v-slot:header="props">
      <q-tr :props="props" class="gradient-header text-weight-bold">
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

    <template v-slot:body-cell-salary="props">
      <q-td :props="props" class="cursor-pointer text-center">
        <div class="edit-trigger">
          <q-icon name="edit" size="14px" color="grey-6" class="edit-icon q-mr-xs" />
          <span class="numeric-font text-teal-9 text-weight-bold">
            {{ props.row.salary ? formatPrice(props.row.salary) : " - - " }}
          </span>
        </div>
        <q-popup-edit
          v-model="props.row.salary"
          v-slot="scope"
          content-class="popup-card"
        >
          <div class="q-pa-md" style="min-width: 280px;">
            <div class="popup-title q-mb-sm">
              Edit Salary Rate
            </div>

            <div class="text-caption text-grey-7 q-mb-md">
              Category: <span class="text-weight-bold text-dark">{{ props.row.category }}</span>
            </div>

            <q-input
              v-model="scope.value"
              type="text"
              outlined
              dense
              autofocus
              prefix="₱"
              class="popup-input"
              :model-value="formatforEdit(scope.value)"
              @update:model-value="scope.value = $event"
              @keyup.enter="() => { openEditConfirm(props.row, scope.value, 'salary'); scope.cancel(); }"
            />

            <div class="row justify-end q-mt-md q-gutter-x-sm">
              <q-btn flat label="Cancel" color="grey-7" no-caps @click="scope.cancel" />
              <q-btn
                unelevated
                label="Save"
                color="teal"
                no-caps
                class="q-px-md rounded-btn"
                @click="() => { openEditConfirm(props.row, scope.value, 'salary'); scope.cancel(); }"
              />
            </div>
          </div>
        </q-popup-edit>
      </q-td>
    </template>

    <template v-slot:body-cell-action="props">
      <q-td :props="props" class="text-center">
        <q-btn
          v-if="isSuperAdmin"
          dense
          flat
          round
          color="negative"
          icon="delete"
          size="sm"
          @click="openDeleteConfirm(props.row)"
        >
          <q-tooltip class="bg-red-8">Delete Salary Type</q-tooltip>
        </q-btn>
        <span v-else class="text-grey-5">- - -</span>
      </q-td>
    </template>
  </q-table>

  <!-- Delete Password Confirmation Dialog -->
  <q-dialog v-model="passwordConfirmDialog" persistent>
    <q-card class="confirm-card q-pa-md" style="width: 380px; max-width: 90vw; border-radius: 12px;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bold text-negative">
          Confirm Deletion
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-md">
        <div class="text-body2 text-grey-8 q-mb-md">
          Please confirm your password to delete the salary rate/type for <strong>{{ recordToDelete?.category }}</strong>.
        </div>
        <q-input
          v-model="passwordToConfirm"
          type="password"
          label="Enter Password"
          outlined
          dense
          autofocus
          @keyup.enter="handleDeleteConfirm"
        />
      </q-card-section>

      <q-card-actions align="right" class="q-pt-none">
        <q-btn flat label="Cancel" color="grey-7" no-caps v-close-popup />
        <q-btn
          unelevated
          label="Delete"
          color="negative"
          no-caps
          class="q-px-md rounded-btn"
          :loading="confirmLoading"
          @click="handleDeleteConfirm"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

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
          Please enter your password to save changes to
          <strong>{{ pendingEditRecord?.row?.category }}</strong> salary rate.
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
import { computed, onMounted, ref } from "vue";
import { useEmploymentTypeStore } from "src/stores/employment-type";
import { useUsersStore } from "src/stores/user";
import { typographyFormat } from "src/composables/typography/typography-format";
import { Notify } from "quasar";

const { formatPrice } = typographyFormat();

const employmentTypeStore = useEmploymentTypeStore();
const userStore = useUsersStore();

const employementType = computed(() => employmentTypeStore.employmentType);
const tableLoading = ref(false);

// Deletion State
const passwordConfirmDialog = ref(false);
const passwordToConfirm = ref("");
const recordToDelete = ref(null);
const confirmLoading = ref(false);

// Edit Password Confirmation State
const editPasswordDialog = ref(false);
const editPasswordInput = ref("");
const pendingEditRecord = ref(null); // stores { row, val, field }
const editConfirmLoading = ref(false);

const currentUserRole = computed(() => userStore.userData?.data?.role || localStorage.getItem("role"));
const isSuperAdmin = computed(() => currentUserRole.value === "Super Admin");

const openDeleteConfirm = (row) => {
  recordToDelete.value = row;
  passwordToConfirm.value = "";
  passwordConfirmDialog.value = true;
};

const handleDeleteConfirm = async () => {
  if (!passwordToConfirm.value) {
    Notify.create({
      message: "Password is required",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
    return;
  }

  confirmLoading.value = true;
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

    const isValid = await userStore.verifyUserPassword(userId, passwordToConfirm.value);
    if (!isValid) {
      Notify.create({
        message: "Incorrect password",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
      return;
    }

    // Call delete API via store
    await employmentTypeStore.deleteSalaryType(recordToDelete.value.id);
    Notify.create({
      message: "Salary type deleted successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
    passwordConfirmDialog.value = false;
    await fetchEmploymentType(); // Reload the table
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Failed to delete salary type";
    Notify.create({
      message: errorMsg,
      color: "negative",
      position: "top",
      timeout: 3000,
    });
  } finally {
    confirmLoading.value = false;
  }
};

const fetchEmploymentType = async () => {
  tableLoading.value = true;
  try {
    await employmentTypeStore.fetchEmploymentType();
  } catch (error) {
    /* console.log("Error fetching employment types:", error); */
  } finally {
    tableLoading.value = false;
  }
};

onMounted(fetchEmploymentType);

const formatforEdit = (val) => {
  if (val === null || val === undefined || val === "") {
    return "";
  }
  const num = parseFloat(val);
  if (isNaN(num)) return "";
  return Number.isInteger(num) ? String(parseInt(num)) : String(num);
};

// ─── Edit Confirmation ───────────────────────────────────────────────────────
const openEditConfirm = (row, val, field) => {
  pendingEditRecord.value = { row, val, field };
  editPasswordInput.value = "";
  editPasswordDialog.value = true;
};

const dispatchEdit = async (row, val) => {
  await employmentTypeStore.updateSalary(row, val);
  await fetchEmploymentType();
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

    const { row, val } = pendingEditRecord.value;
    await dispatchEdit(row, val);

    Notify.create({
      message: "Salary updated successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
    editPasswordDialog.value = false;
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to update salary";
    Notify.create({ message: msg, color: "negative", position: "top", timeout: 3000 });
  } finally {
    editConfirmLoading.value = false;
  }
};
// ─────────────────────────────────────────────────────────────────────────────

const updateSalary = async (data, val) => {
  tableLoading.value = true;

  try {
    await employmentTypeStore.updateSalary(data, val);

    Notify.create({
      message: "Salary updated successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
  } catch (error) {
    Notify.create({
      message: "Failed to update amount",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  } finally {
    tableLoading.value = false;
  }
};

const salaryColumns = [
  {
    name: "category",
    required: true,
    label: "Category",
    align: "center",
    field: (row) => row.category || "N/A",
    format: (val) => `${val}`,
  },
  {
    name: "salary",
    required: true,
    label: "Salary",
    align: "center",
    field: (row) => row.salary || "N/A",
    format: (val) => `${val}`,
  },
  {
    name: "action",
    label: "Action",
    align: "center",
  },
];
</script>

<style lang="scss" scoped>
.gradient-header {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%) !important;
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
