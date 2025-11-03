<template>
  <q-table
    :rows="employementType || []"
    :columns="salaryColumns"
    row-key="id"
    :loading="tableLoading"
  >
    <template v-slot:body-cell-salary="props">
      <q-td :props="props" class="cursor-pointer">
        <span>
          {{ props.row.salary ? formatPrice(props.row.salary) : " - - " }}
        </span>
        <q-popup-edit
          v-model="props.row.salary"
          @update:model-value="(val) => updateSalary(props.row, val)"
          v-slot="scope"
        >
          <div class="q-pa-md" style="min-width: 300px; max-width: 400px">
            <div class="text-h6 text-primary text-center q-mb-sm">
              Edit Salary
            </div>

            <div class="text-subtitle2 q-mb-md">
              Category: {{ props.row.category }}
            </div>

            <q-input
              v-model="scope.value"
              type="text"
              outlined
              dense
              autofocus
              counter
              :model-value="formatforEdit(scope.value)"
              @update:model-value="scope.value = $event"
              @keyup.enter="scope.set"
            />

            <div class="row justify-end q-mt-md">
              <q-btn flat label="Close" color="primary" @click="scope.cancel" />
              <q-btn flat label="Save" color="primary" @click="scope.set" />
            </div>
          </div>
        </q-popup-edit>
      </q-td>
    </template>
    <template #loading>
      <q-inner-loading showing>
        <q-spinner-ios size="50px" color="grey-10" />
      </q-inner-loading>
    </template>
  </q-table>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useEmploymentTypeStore } from "src/stores/employment-type";
import { typographyFormat } from "src/composables/typography/typography-format";
import { Notify } from "quasar";

const { formatPrice } = typographyFormat();

const employmentTypeStore = useEmploymentTypeStore();
const employementType = computed(() => employmentTypeStore.employmentType);
const tableLoading = ref(false);

const fetchEmploymentType = async () => {
  tableLoading.value = true;
  try {
    await employmentTypeStore.fetchEmploymentType();
    console.log("Employment Type List:", employementType.value);
  } catch (error) {
    console.log("Error fetching employment types:", error);
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

const updateSalary = async (data, val) => {
  console.log("updateSalary", data, val);
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
    console.log("Error updating amount:", error);

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
];
</script>

<style lang="scss" scoped></style>
