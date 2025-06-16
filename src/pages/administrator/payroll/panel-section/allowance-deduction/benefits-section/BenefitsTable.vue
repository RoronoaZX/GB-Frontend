<template>
  <div class="row justify-between q-mb-md" align="right">
    <div class="row q-gutter-md">
      <div>
        <AddDeduction />
      </div>
    </div>
    <SearchBenefit />
  </div>
  <q-table
    class="sticky-header"
    :rows="employeeBenefitRows"
    :columns="employeeBenefitColumns"
    row-key="name"
    hide-bottom
    v-model:pagination="pagination"
  >
    <template v-slot:body-cell-sss="props">
      <q-td :props="props">
        <span>
          {{ props.row.sss ? formatCurrency(props.row.sss) : " - - " }}
          <q-tooltip class="bg-blue-grey-8">Edit SSS</q-tooltip>
        </span>
        <q-popup-edit
          @update:model-value="(val) => updateSSS(props.row, val)"
          v-model="props.row.sss"
          :value="props.row.sss"
          :disable="props.row.sss === null || props.row.sss === undefined"
          :auto-save="true"
          :persistent="true"
          :input-class="'text-center'"
          :options="{ offset: [0, 10] }"
          buttons
          label-set="Save"
          label-cancel="Close"
          v-slot="scope"
        >
          <q-input
            v-model="scope.value"
            :model-value="formatForEdit(scope.value)"
            @update:model-value="scope.value = $event"
            type="text"
            autofocus
            counter
            @keyup.enter="scope.set"
          >
          </q-input>
        </q-popup-edit>
      </q-td>
    </template>
    <template v-slot:body-cell-hdmf="props">
      <q-td :props="props">
        <span>
          {{ props.row.hdmf ? formatCurrency(props.row.hdmf) : " - - -" }}
          <q-tooltip class="bg-blue-grey-8">Edit HDMF</q-tooltip>
        </span>
        <q-popup-edit
          @update:model-value="(val) => updateHDMF(props.row, val)"
          v-model="props.row.hdmf"
          :value="props.row.hdmf"
          :disable="props.row.hdmf === null || props.row.hdmf === undefined"
          :auto-save="true"
          :persistent="true"
          :input-class="'text-center'"
          :options="{ offset: [0, 10] }"
          buttons
          label-set="Save"
          label-cancel="Close"
          v-slot="scope"
        >
          <q-input
            v-model="scope.value"
            :model-value="formatForEdit(scope.value)"
            @update:model-value="scope.value = $event"
            type="text"
            autofocus
            counter
            @keyup.enter="scope.set"
          />
        </q-popup-edit>
      </q-td>
    </template>
    <template v-slot:body-cell-phic="props">
      <q-td :props="props">
        <span>
          {{ props.row.phic ? formatCurrency(props.row.phic) : " - - - " }}
        </span>
        <q-popup-edit
          @update:model-value="(val) => updatePHIC(props.row, val)"
          v-model="props.row.phic"
          :value="props.row.phic"
          :disable="props.row.phic === null || props.row.phic === undefined"
          :auto-save="true"
          :persistent="true"
          :input-class="'text-center'"
          :options="{ offset: [0, 10] }"
          buttons
          label-save="Save"
          label-cancel="Close"
          v-slot="scope"
        >
          <q-input
            v-model="scope.value"
            :v-model="formatForEdit(scope.value)"
            @update:model-value="scope.value = $event"
            type="text"
            autofocus
            counter
            @keyup.enter="scope.set"
          >
          </q-input>
        </q-popup-edit>
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import AddDeduction from "./AddDeduction.vue";
import { useEmployeeBenefitStore } from "stores/benefit";
import SearchBenefit from "./SearchBenefit.vue";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

const employeeBenefitStore = useEmployeeBenefitStore();
const employeeBenefitRows = computed(() => employeeBenefitStore.benefits);
const pagination = ref({
  rowsPerPage: 0,
});

function formatForEdit(val) {
  if (val === null || val === undefined || val === "") {
    return "";
  }
  const num = parseFloat(val);
  if (isNaN(num)) return "";
  return Number.isInteger(num) ? String(parseInt(num)) : String(num);
}

async function updateSSS(data, val) {
  console.log("Updating SSS for", data, "to", val);
  try {
    const response = await api.put(
      "/api/update-employee-sss-benefit/" + data.id,
      {
        sss: val,
      }
    );

    Notify.create({
      message: "SSS updated successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
  } catch (error) {
    console.error("Error updating SSS:", error);
    Notify.create({
      message: "Error updating SSS",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  }
}

async function updateHDMF(data, val) {
  console.log("Updating HDMF for", data, "to", val);
  try {
    const response = await api.put(
      "/api/update-employee-hdmf-benefit/" + data.id,
      {
        hdmf: val,
      }
    );
    Notify.create({
      message: "HDMF updated successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
  } catch (error) {
    console.error("ERROR updating HDMF:", error);
  }
}

async function updatePHIC(data, val) {
  console.log("Updating PHIC for", data, "to", val);
  try {
    const response = await api.put(
      "/api/update-employee-phic-benefit/" + data.id,
      {
        phic: val,
      }
    );
    Notify.create({
      message: " PHIC updated successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
  } catch (error) {
    console.error("Error updating PHIC:", error);
    Notify.create({
      message: "Error updating PHIC",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  }
}

onMounted(async () => {
  await reloadTableData();
});

const reloadTableData = async () => {
  try {
    employeeBenefitRows.value =
      await employeeBenefitStore.fetchEmployeeBenefit();
    console.log("benefit", employeeBenefitRows.value);
  } catch (error) {
    console.log("error fetching", error);
  }
};

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

const formatDate = (dateTime) => {
  if (!dateTime) return " - - "; // Return a placeholder if the value is missing
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) return " - - ";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }); // Format as "Oct. 14, 2024"
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(value);
};

const employeeBenefitColumns = [
  // {
  //   name: "date",
  //   required: true,
  //   label: "Date",
  //   align: "left",
  //   field: (row) => formatDate(row.created_at),
  // },
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => formatFullname(row.employee),
  },
  {
    name: "sss",
    label: "Social Security System (SSS)",
    align: "center",
    field: (row) => formatCurrency(row.sss),
  },
  {
    name: "hdmf",
    label: "Pag-IBIG Fund (HDMF)",
    align: "center",
    field: (row) => formatCurrency(row.hdmf),
  },
  {
    name: "phic",
    label: "Phil - Health (PHIC)",
    align: "center",
    field: (row) => formatCurrency(row.phic),
  },
];
</script>

<style lang="scss" scoped>
.custom-table {
  border-radius: 15px;
  background: #fff;
  color: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}
</style>
