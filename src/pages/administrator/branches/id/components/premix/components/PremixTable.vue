<template>
  <div class="row justify-between">
    <div>
      <q-input
        class="q-pb-lg q-pl-md"
        v-model="filter"
        outlined
        placeholder="Search"
        debounce="1000"
        style="width: 450px; max-width: 1500px; min-width: 100px"
        flat
        dense
        rounded
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div class="q-my-sm">
      <PremixCreate />
    </div>
  </div>
  <div class="spinner-wrapper" v-if="loading">
    <q-spinner-dots size="50px" color="primary" />
  </div>
  <div v-else>
    <div v-if="filteredRows.length === 0" class="data-error">
      <q-icon name="warning" color="warning" size="4em" />
      <div class="q-ml-sm text-h6">No data available</div>
    </div>
    <q-table
      class="table-container sticky-header"
      :filter="filter"
      :virtual-scroll-sticky-size-start="48"
      flat
      :columns="branchPremixColumns"
      :rows="filteredRows"
      row-key="name"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
      style="height: 450px"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge outline :color="getBadgeStatusColor(props.row.status)">
            <!-- :label="props.row.status" -->
            {{ capitalizeFirstLetter(props.row.status) }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Change Status
            </q-tooltip>
            <q-popup-edit
              @update:model-value="(val) => updatePremixStatus(props.row, val)"
              v-model="props.row.status"
              auto-save
              v-slot="scope"
            >
              <span>{{ props.row.name }}</span>
              <q-select
                v-model="scope.value"
                dense
                label="status"
                autofocus
                :options="status"
                counter
                mask="###"
                @keyup.enter="scope.set"
              >
              </q-select>
            </q-popup-edit>
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-available_stocks="props">
        <q-td :props="props" class="cursor-pointer">
          <span>
            <template v-if="Number(props.row.available_stocks) >= 1">
              <q-badge outline class="text-positive">
                {{
                  Number(props.row.available_stocks) % 1 === 0
                    ? Number(props.row.available_stocks)
                    : Number(props.row.available_stocks)
                        .toFixed(2)
                        .replace(/\.?0+$/, "")
                }}
                kgs</q-badge
              >
            </template>
            <template v-else>
              <q-badge outline class="text-red-6">
                {{ (Number(props.row.available_stocks) * 1000).toFixed(0) }}
                grams</q-badge
              >
            </template>
            <!-- {{
              Number(props.row.available_stocks) >= 1
                ? Number(props.row.available_stocks) + " kgs"
                : (Number(props.row.available_stocks) * 1000).toString() +
                  " grams"
            }} -->
          </span>
          <q-popup-edit
            @update:model-value="(val) => updateAvailableStocks(props.row, val)"
            v-model.number="props.row.available_stocks"
            auto-save
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              dense
              type="number"
              step="0.01"
              autofocus
              counter
              suffix="kgs"
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import PremixCreate from "./PremixCreate.vue";
import { usePremixStore } from "/src/stores/premix";
import { api } from "src/boot/axios";
import { useRoute } from "vue-router";
import { Notify } from "quasar";

const premixStore = usePremixStore();
const premixRows = computed(() => premixStore.premixes);
console.log("premixRows", premixRows.value);
const route = useRoute();
const branchId = route.params.branch_id;
const loading = ref(false);
const filter = ref("");
const showNoDataMessage = ref(false);
const pagination = ref({
  rowsPerPage: 0,
});
const status = ["inactive", "active"];
const branchPremix = ref([]);

const filteredRows = computed(() => {
  if (!filter.value) {
    return premixRows.value;
  }
  return premixRows.value.filter((row) =>
    row.name.toLowerCase().includes(filter.value.toLowerCase())
  );
});

onMounted(async () => {
  if (branchId) {
    await reloadTableData(branchId);
  }
});

const reloadTableData = async (branchId) => {
  try {
    loading.value = true;
    const response = await premixStore.fetchBranchPremix(branchId);
    premixRows.value = response;
    console.log("premix branch fetch data", premixRows.value);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const updateAvailableStocks = async (data, val) => {
  console.log("data", data.id);
  console.log("val", val);
  try {
    const response = await api.put(
      "/api/branch-premix-update-stocks/" + data.id,
      {
        available_stocks: val,
      }
    );
    if (response.status == 200) {
      const i = branchPremix.value.findIndex((item) => item.id == data.id);
      branchPremix.value[i] = val;
    }
    Notify.create({
      type: "positive",
      message: "Premix available stocks edited successfully",
      // position: "top",
    });
  } catch (error) {
    console.error("Error updating recipe target:", error);
    Notify.create({
      type: "negative",
      message: "Failed to edit premix available stocks",
      // position: "top",
    });
  }
};

const updatePremixStatus = async (data, val) => {
  try {
    const response = await api.put(
      "/api/branch-premix-update-status/" + data.id,
      {
        status: val,
      }
    );
    if (response.status == 200) {
      const i = branchPremix.value.findIndex((item) => item.id == data.id);
      branchPremix.value[i] = val;
    }
    Notify.create({
      type: "positive",
      message: "Premix status edited successfully",
      // position: "top",
    });
  } catch (error) {
    console.error("Error updating recipe target:", error);
    Notify.create({
      type: "negative",
      message: "Failed to edit premix status",
      // position: "top",
    });
  }
};

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const getBadgeStatusColor = (status) => {
  if (status === "active") {
    return "teal-5";
  } else if (status === "inactive") {
    return "negative";
  }
};
const branchPremixColumns = [
  {
    name: "name",
    label: "Premix Name",
    align: "center",
    field: (row) => row.name,
  },
  {
    name: "available_stocks",
    label: "Available Stocks",
    align: "center",
    field: "available_stocks",
  },
  {
    name: "status",
    label: "Status",
    align: "center",
    field: "status",
  },
];
</script>

<style lang="scss" scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 2rem;
  border-radius: 8px;
}
.absolute-full {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.spinner-wrapper {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
.data-error {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-container {
  max-height: 450px; /* Adjust as needed */
  overflow: hidden;
}

.q-table-container {
  overflow: hidden !important; /* Target the container generated by q-table */
}
</style>
