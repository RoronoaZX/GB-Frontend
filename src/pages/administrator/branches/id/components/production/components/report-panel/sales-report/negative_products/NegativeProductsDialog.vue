<template>
  <q-dialog
    ref="dialogRef"
    v-model="dialog"
    @hide="onDialogHide"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section style="background-color: #c62828">
        <div class="row justify-between text-white">
          <div class="text-h6">Negative Products</div>
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
          style="width: 500px"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card-section>

      <!-- <q-card-section class="row q-gutter-x-lg">
        <div v-if={(overallTotals.Bread || 0) !== 0}>
          <q-chip outline square color="brown">
            Bread Sales: {{ formatPrice(overallTotals.Bread || 0) }}
          </q-chip>
        </div>
        <div>
          <q-chip outline square color="red-6">
            Selecta Sales: {{ formatPrice(overallTotals.Selecta || 0) }}
          </q-chip>
        </div>
        <div>
          <q-chip outline square color="accent">
            Soft Drinks Sales:
            {{ formatPrice(overallTotals["Soft Drinks"] || 0) }}
          </q-chip>
        </div>
        <div>
          <q-chip outline square color="blue-grey">
            Other Products Sales:
            {{ formatPrice(overallTotals["Other Products"] || 0) }}
          </q-chip>
        </div>
      </q-card-section> -->

      <q-card-section class="row q-gutter-x-lg">
        <div v-if="(overallTotals.Bread || 0) !== 0">
          <q-chip outline square color="brown">
            Bread Sales: {{ formatPrice(overallTotals.Bread || 0) }}
          </q-chip>
        </div>

        <div v-if="(overallTotals.Selecta || 0) !== 0">
          <q-chip outline square color="red-6">
            Selecta Sales: {{ formatPrice(overallTotals.Selecta || 0) }}
          </q-chip>
        </div>

        <div v-if="(overallTotals['Soft Drinks'] || 0) !== 0">
          <q-chip outline square color="accent">
            Soft Drinks Sales:
            {{ formatPrice(overallTotals["Soft Drinks"] || 0) }}
          </q-chip>
        </div>

        <div v-if="(overallTotals['Other Products'] || 0) !== 0">
          <q-chip outline square color="blue-grey">
            Other Products Sales:
            {{ formatPrice(overallTotals["Other Products"] || 0) }}
          </q-chip>
        </div>
      </q-card-section>

      <q-card-section>
        <q-table
          :virtual-scroll-sticky-size-start="48"
          flat
          :columns="negativeProdcutsColumns"
          :rows="filteredRows"
          row-key="name"
          virtual-scroll
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
          hide-bottom
          style="height: 470px"
        >
          <template v-slot:body-cell-type="props">
            <q-td :props="props">
              <span
                :style="{
                  color:
                    props.row.type === 'Bread'
                      ? 'brown'
                      : props.row.type === 'Selecta'
                      ? 'red'
                      : props.row.type === 'Soft Drinks'
                      ? 'purple'
                      : props.row.type === 'Other Products'
                      ? 'teal'
                      : 'grey',
                }"
              >
                {{ props.row.type }}
              </span>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { format, useDialogPluginComponent } from "quasar";
import { computed, ref } from "vue";

import { typographyFormat } from "src/composables/typography/typography-format";

const { formatPrice, capitalizeFirstLetter } = typographyFormat();

const { dialogRef, onDialogHide } = useDialogPluginComponent();
const dialog = ref(false);

const maximizedToggle = ref(true);
const props = defineProps(["negativeProducts"]);

console.log("negativeProducts", props.negativeProducts);

const filter = ref("");
const pagination = ref({
  rowsPerPage: 0,
});

const negativeProdcutsColumns = [
  {
    name: "type",
    label: "Product Type",
    field: "type",
    align: "justify",
  },
  {
    name: "name",
    label: "Product Name",
    field: (row) => row.name,
    format: (val) => capitalizeFirstLetter(val),
    align: "justify",
  },
  {
    name: "price",
    label: "Price",
    field: (row) => row.price,
    format: (val) => formatPrice(val),
    align: "justify",
  },
  {
    name: "beginnings",
    label: "Beginnings (PCS)",
    field: "beginnings",
    align: "center",
  },
  {
    name: "added",
    label: "Added / New Production (PCS)",
    field: "added",
    align: "center",
  },
  {
    name: "remaining",
    label: "Remaining (PCS)",
    field: "remaining",
    align: "center",
  },
  {
    name: "out",
    label: "Out (PCS)",
    field: "out",
    align: "center",
  },
  {
    name: "sold",
    label: "Product Sold (PCS)",
    field: "sold",
    align: "center",
  },
  {
    name: "sales",
    label: "Sales (PCS)",
    field: (row) => row.sales,
    format: (val) => formatPrice(val),
    align: "justify",
  },
];

const filteredRows = computed(() => {
  if (!filter.value || !filter.value.trim()) {
    // If there's no filter, return all rows
    return props.negativeProducts || [];
  }

  const search = filter.value.trim().toLowerCase();
  return (props.negativeProducts || []).filter((row) => {
    // Perform filtering on relevant fields
    return (
      row.name?.toLowerCase().includes(search) ||
      row.type?.toLowerCase().includes(search) ||
      String(row.price).includes(search) ||
      String(row.sales).includes(search)
    );
  });
});

const overallTotals = computed(() => {
  // Initialize totals
  const totals = {
    Bread: 0,
    Selecta: 0,
    "Soft Drinks": 0,
    "Other Products": 0,
  };

  filteredRows.value.forEach((row) => {
    const type = row.type;

    if (!totals.hasOwnProperty(type)) return; // SKIP UNKNOWN TYPES

    const beginnings = Number(row.beginnings) || 0;
    const newProduction = Number(row.new_production) || Number(row.added) || 0;
    const remaining = Number(row.remaining) || 0;
    const out = Number(row.out) || 0;
    const price = Number(row.price) || 0;

    const totalValue = beginnings + newProduction;
    const sold = totalValue - (remaining + out);
    const salesAmount = sold * price;

    // ✅  Add all sales, negative or positive
    totals[type] += salesAmount;
  });

  return totals;
});
</script>
