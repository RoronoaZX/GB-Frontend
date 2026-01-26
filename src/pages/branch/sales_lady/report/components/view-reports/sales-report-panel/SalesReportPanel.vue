<template>
  <div>
    <q-table
      flat
      :rows="rows"
      :columns="columns"
      row-key="name"
      :loading="loading"
      :pagination="pagination"
      :rows-per-page-options="[3, 5, 10, 0]"
      @request="emit('request', $event)"
      @update:pagination="emit('update:pagination', $event)"
    >
      <template v-slot:body-cell-reports="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <q-btn
              padding="xs lg"
              rounded
              dense
              size="sm"
              color="light-blue-5"
              text-color="white"
              @click="handleDialog(props.row.AM.sales_reports, 'AM')"
              >AM</q-btn
            >
            <q-btn
              padding="xs lg"
              rounded
              dense
              size="sm"
              color="deep-orange"
              text-color="white"
              @click="handleDialog(props.row.PM.sales_reports, 'PM')"
              >PM</q-btn
            >
          </div>
        </q-td>
      </template>
      <template #loading>
        <q-inner-loading showing>
          <q-spinner-gears size="50px" color="indigo-8" />
        </q-inner-loading>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import ReportDialog from "../ReportDialog.vue";

const props = defineProps({
  rows: Array,
  columns: Array,
  loading: Boolean,
  pagination: Object,
});

const emit = defineEmits(["request", "open-report", "update:pagination"]);

const $q = useQuasar();

const handleDialog = (report, label) => {
  $q.dialog({
    component: ReportDialog,
    componentProps: {
      reports: report,
      reportLabel: label,
    },
  });
};
</script>
