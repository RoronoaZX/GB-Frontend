<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card style="width: 870px; max-width: 80vw">
      <q-card-section style="background-color: #795548">
        <div class="row justify-between text-white">
          <div class="text-h6">Bread Report</div>
          <q-btn icon="close" flat dense round v-close-popup>
            <q-tooltip class="bg-blue-grey-6" :delay="200">Close</q-tooltip>
          </q-btn>
        </div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="q-pb-lg q-pl-sm dynamic-width"
          v-model="filter"
          outlined
          placeholder="Search"
          debounce="1000"
          flat
          dense
          rounded
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section>
        <q-table
          :filter="filter"
          :virtual-scroll-sticky-size-start="48"
          flat
          :columns="breadReportColumns"
          :rows="filteredRows"
          row-key="name"
          virtual-scroll
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
          hide-bottom
          style="height: 350px"
          class="table-container sticky-header"
        >
          <template v-slot:body-cell-name="props">
            <q-td :props="props">
              <span>{{
                `${capitalizeFirstLetter(props.row.bread.name)}`
              }}</span>
            </q-td>
          </template>
          <template v-slot:body-cell-price="props">
            <q-td :props="props">
              <span>{{ `${formatPrice(props.row.price)}` }}</span>
              <q-popup-edit
                @update:model-value="(val) => updatedPrice(props.row, val)"
                v-model="props.row.price"
                auto-save
                v-slot="scope"
              >
                <q-input
                  v-model="scope.value"
                  dense
                  mask="#####"
                  autofocus
                  counter
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
          </template>
          <template v-slot:body-cell-beginnings="props">
            <q-td :props="props">
              <span>{{ `${props.row.beginnings}` }}</span>
              <q-popup-edit
                @update:model-value="(val) => updatedBeginnings(props.row, val)"
                v-model="props.row.beginnings"
                auto-save
                v-slot="scope"
              >
                <q-input
                  v-model="scope.value"
                  dense
                  mask="#####"
                  autofocus
                  counter
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
          </template>
          <template v-slot:body-cell-remaining="props">
            <q-td :props="props">
              <span>{{ `${props.row.remaining}` }}</span>
              <q-popup-edit
                @update:model-value="(val) => updatedRemaining(props.row, val)"
                v-model="props.row.remaining"
                auto-save
                v-slot="scope"
              >
                <q-input
                  v-model="scope.value"
                  dense
                  mask="#####"
                  autofocus
                  counter
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
          </template>
          <template v-slot:body-cell-bread_out="props">
            <q-td :props="props">
              <span>{{ `${props.row.bread_out}` }}</span>
              <q-popup-edit
                @update:model-value="(val) => updatedBreadOut(props.row, val)"
                v-model="props.row.bread_out"
                auto-save
                v-slot="scope"
              >
                <q-input
                  v-model="scope.value"
                  dense
                  mask="#####"
                  autofocus
                  counter
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
          </template>
          <!-- <template v-slot:body-cell-sales="props">
            <q-td :props="props">
              <span>{{ `${formatPrice(props.row.sales)}` }}</span>
            </q-td>
          </template> -->
        </q-table>
      </q-card-section>
      <q-card-section>
        <div class="row justify-end q-mt-md">
          <div class="text-h6">
            Overall Total Sales: {{ formatPrice(overallTotal || "0") }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { api } from "src/boot/axios";
import { computed, ref } from "vue";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const props = defineProps(["reports"]);
const filter = ref("");
// Log to verify the structure of props.reports
console.log("Reports data structure:", props.reports);

const capitalizeFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const updatedPrice = async (data, val) => {
  console.log("update data of the price", data);
  console.log("update val of the price", val);
  try {
    const response = await api.put(
      "/api/update-bread-sales-price-report/" + data.id,
      {
        price: parseInt(val),
      }
    );
    console.log("reponse", response.data);
  } catch (error) {
    console.error(error);
  }
};
const updatedBeginnings = async (data, val) => {
  console.log("update data of the beginnings", data);
  console.log("update val of the beginnings", val);
  try {
    const response = await api.put(
      "/api/update-bread-sales-beginnings-report/" + data.id,
      {
        beginnings: parseInt(val),
      }
    );
    console.log("reponse", response.data);
  } catch (error) {
    console.error(error);
  }
};
const updatedRemaining = async (data, val) => {
  console.log("update data of the new updatedRemaining", data);
  console.log("update val of the new updatedRemaining", val);
  try {
    const response = await api.put(
      "/api/update-bread-sales-remaining-report/" + data.id,
      {
        remaining: parseInt(val),
      }
    );
    console.log("reponse", response.data);
  } catch (error) {
    console.error(error);
  }
};
const updatedBreadOut = async (data, val) => {
  console.log("update data of the new updatedRemaining", data);
  console.log("update val of the new updatedRemaining", val);
  try {
    const response = await api.put(
      "/api/update-bread-sales-breadOut-report/" + data.id,
      {
        bread_out: parseInt(val),
      }
    );
    console.log("reponse", response.data);
  } catch (error) {
    console.error(error);
  }
};

const breadReportColumns = [
  {
    name: "name",
    label: "Bread Name",
    field: (row) => {
      console.log("Row data:", row); // Debug each row's data
      return row.bread.name || "N/A"; // Adjust this according to your data
    },
  },
  {
    name: "price",
    label: "Price",
    field: "price",
  },
  {
    name: "beginnings",
    label: "Beginnings (PCS)",
    field: "beginnings",
    format: (val) => `${val}`,
  },
  {
    name: "new_production",
    label: "New Production (PCS)",
    field: "new_production",
    format: (val) => `${val}`,
  },
  {
    name: "remaining",
    label: "Remaining (PCS)",
    field: "remaining",
    format: (val) => `${val}`,
  },
  {
    name: "bread_out",
    label: "Bread Out (PCS)",
    field: "bread_out",
    format: (val) => `${val}`,
  },

  {
    name: "total",
    label: "Bread Total (PCS)",
    field: "total",
    field: (row) => (row.beginnings || 0) + (row.new_production || 0),
  },
  {
    name: "breadSold",
    label: "Bread Sold (PCS)",
    field: (row) => {
      const total = (row.beginnings || 0) + (row.new_production || 0);
      const totalBreadDifference = (row.remaining || 0) + (row.bread_out || 0);
      return total - totalBreadDifference;
    },
    format: (val) => `${val}`,
  },
  {
    name: "sales",
    label: "Total Sales",
    field: (row) => {
      const total = (row.beginnings || 0) + (row.new_production || 0);
      const totalBreadDifference = (row.remaining || 0) + (row.bread_out || 0);
      const breadSold = total - totalBreadDifference;
      return breadSold * (row.price || 0);
    },
    format: (val) => `${formatPrice(val)}`, // Formats sales to 2 decimal places
  },
];

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

// Replace this with your actual filtered rows logic
const filteredRows = computed(() => {
  if (!filter.value || !filter.value.trim()) {
    // If there's no filter, return all rows
    return props.reports || [];
  }

  const search = filter.value.trim().toLowerCase(); // Normalize the filter input
  return (props.reports || []).filter((row) => {
    // Perform filtering on relevant fields
    return (
      row.bread.name.toLowerCase().includes(search) || // Bread name
      row.price.toString().includes(search) || // Price
      row.sales.toString().includes(search) // Sales
    );
  });
});

const overallTotal = computed(() => {
  const total = filteredRows.value.reduce((total, row) => {
    // Dynamically calculate the sales value using the field function
    const totalValue = (row.beginnings || 0) + (row.new_production || 0);
    const totalBreadDifference = (row.remaining || 0) + (row.bread_out || 0);
    const breadSold = totalValue - totalBreadDifference;
    const salesAmount = breadSold * (row.price || 0);

    console.log(`Adding salesAmount: ${salesAmount} to total: ${total}`);
    return total + salesAmount;
  }, 0);

  console.log("Overall Total Sales computed as:", total);
  return total;
});

console.log("Overall Total Sales:", overallTotal.value);
</script>

<style scoped></style>
