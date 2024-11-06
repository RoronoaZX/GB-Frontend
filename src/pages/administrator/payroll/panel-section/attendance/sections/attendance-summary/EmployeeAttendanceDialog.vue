<template>
  <div>
    <q-btn
      padding="sm md"
      size="sm"
      icon="print"
      dense
      label="PRINT"
      class="gradient-btn text-white"
      @click="openDialog"
    />
  </div>
  <q-dialog
    v-model="dialog"
    full-height
    position="right"
    backdrop-filter="blur(4px) saturate(150%)"
  >
    <q-card style="width: 820px; max-width: 80vw">
      <q-card-section class="gradient-btn">
        <div class="row justify-between text-h6 text-white">
          <div>🗓️ Daily Time Record</div>
          <div>
            <q-btn rounded flat dense icon="arrow_forward_ios" v-close-popup>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <div>
        <iframe :src="pdfUrl" width="100%" height="700px" />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const pagination = ref({
  rowsPerPage: 0,
});
const dialog = ref(false);

const openDialog = () => {
  dialog.value = true;
};

const columns = [
  {
    name: "number_of_days",
    required: true,
    label: "NOD",
    align: "center",
    field: (row) => row.entry,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "in",
    align: "center",
    label: "IN",
    field: "in",
    sortable: true,
  },
  {
    name: "out",
    label: "OUT",
    align: "center",
    field: "out",
    align: "center",
    sortable: true,
  },
  {
    name: "total_working_hours",
    label: "Total Working",
    align: "center",
    field: "total_working_hours",
    align: "center",
    sortable: true,
  },
  {
    name: "overtime",
    label: "Overtime",
    field: "overtime",
    align: "center",
  },
  {
    name: "undertime",
    label: "Undertime",
    field: "undertime",
    align: "center",
  },
];

const rows = [
  {
    entry: 1,
    in: "Oct 16, 2024 | 8:51 AM",
    out: "Oct 16, 2024 | 1:08 PM",
    total_working_hours: "4 Hrs : 17 Min",
    overtime: "4 Hrs : 42 Min",
    undertime: "- - -",
  },
  {
    entry: 2,
    in: "Oct 16, 2024 | 8:51 AM",
    out: "Oct 16, 2024 | 1:08 PM",
    total_working_hours: "4 Hrs : 17 Min",
    overtime: "- - -",
    undertime: "- - -",
  },
  {
    entry: 3,
    in: "Oct 16, 2024 | 8:51 AM",
    out: "Oct 16, 2024 | 1:08 PM",
    total_working_hours: "4 Hrs : 17 Min",
    overtime: "4 Hrs : 42 Min",
    undertime: "4 Hrs : 42 Min",
  },
  {
    entry: 4,
    in: "Oct 16, 2024 | 8:51 AM",
    out: "Oct 16, 2024 | 1:08 PM",
    total_working_hours: "4 Hrs : 17 Min",
    overtime: "- - -",
    undertime: "- - -",
  },
  {
    entry: 5,
    in: "Oct 16, 2024 | 8:51 AM",
    out: "Oct 16, 2024 | 1:08 PM",
    total_working_hours: "4 Hrs : 17 Min",
    overtime: "4 Hrs : 42 Min",
    undertime: "- - -",
  },
  {
    entry: 6,
    in: "Oct 16, 2024 | 8:51 AM",
    out: "Oct 16, 2024 | 1:08 PM",
    total_working_hours: "4 Hrs : 17 Min",
    overtime: "4 Hrs : 42 Min",
    undertime: "- - -",
  },
  {
    entry: 7,
    in: "Oct 16, 2024 | 8:51 AM",
    out: "Oct 16, 2024 | 1:08 PM",
    total_working_hours: "4 Hrs : 17 Min",
    overtime: "- - -",
    undertime: "- - -",
  },
  {
    entry: 8,
    in: "Oct 16, 2024 | 8:51 AM",
    out: "Oct 16, 2024 | 1:08 PM",
    total_working_hours: "4 Hrs : 17 Min",
    overtime: "- - -",
    undertime: "- - -",
  },
  {
    entry: 9,
    in: "Oct 16, 2024 | 8:51 AM",
    out: "Oct 16, 2024 | 1:08 PM",
    total_working_hours: "4 Hrs : 17 Min",
    overtime: "- - -",
    undertime: "- - -",
  },
  {
    entry: 10,
    in: "Oct 16, 2024 | 8:51 AM",
    out: "Oct 16, 2024 | 1:08 PM",
    total_working_hours: "4 Hrs : 17 Min",
    overtime: "- - -",
    undertime: "- - -",
  },
  {
    entry: 11,
    in: "Oct 16, 2024 | 8:51 AM",
    out: "Oct 16, 2024 | 1:08 PM",
    total_working_hours: "4 Hrs : 17 Min",
    overtime: "- - -",
    undertime: "- - -",
  },
  {
    entry: 12,
    in: "Oct 16, 2024 | 8:51 AM",
    out: "Oct 16, 2024 | 1:08 PM",
    total_working_hours: "4 Hrs : 17 Min",
    overtime: "- - -",
    undertime: "- - -",
  },
  {
    entry: 13,
    in: "Oct 16, 2024 | 8:51 AM",
    out: "Oct 16, 2024 | 1:08 PM",
    total_working_hours: "4 Hrs : 17 Min",
    overtime: "- - -",
    undertime: "- - -",
  },
  {
    entry: 14,
    in: "Oct 16, 2024 | 8:51 AM",
    out: "Oct 16, 2024 | 1:08 PM",
    total_working_hours: "4 Hrs : 17 Min",
    overtime: "- - -",
    undertime: "- - -",
  },
  {
    entry: 15,
    in: "Oct 16, 2024 | 8:51 AM",
    out: "Oct 16, 2024 | 1:08 PM",
    total_working_hours: "4 Hrs : 17 Min",
    overtime: "- - -",
    undertime: "- - -",
  },
  {
    entry: 16,
    in: "Oct 16, 2024 | 8:51 AM",
    out: "Oct 16, 2024 | 1:08 PM",
    total_working_hours: "4 Hrs : 17 Min",
    overtime: "- - -",
    undertime: "- - -",
  },
];
</script>

<style lang="scss" scoped>
.gradient-btn {
  background: linear-gradient(45deg, #103432, #2575fc);
  border: none;
}

.full-height-table {
  max-height: none;
}
.q-table td {
  padding: 7px;
}
</style>
