<template>
  <div>
    <q-btn
      color="accent"
      icon="visibility"
      size="md"
      flat
      round
      dense
      @click="openDialog"
    />
  </div>
  <q-dialog v-model="dialog">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">{{ report.name }}</div>
          <q-btn
            class="close-btn"
            color="grey-8"
            flat
            round
            dense
            icon="close"
            @click="dialog = false"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <div>Baker: {{ formatFullname(report.employee) }}</div>
        <div>
          Branch:
          {{ report.branch_premix.branch_recipe.branch.name }}
        </div>
        <div>
          Status:
          <q-badge color="primary" outlined> {{ report.status }} </q-badge>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6" align="center">Premix</div>
      </q-card-section>
      <q-card-section>
        <q-list dense separator class="box">
          <q-item>
            <q-item-section>
              <q-item-label class="text-overline">Premix Name</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label class="text-overline"
                >Request Quantity / kgs</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-h6">
                {{ report.name }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label class="text-h6">
                {{ report.quantity }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section class="report-actions q-gutter-sm" align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn color="cyan-7" label="Completed" class="action-btn" />
        <!-- @click="confirmReport" -->
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { useWarehousesStore } from "src/stores/warehouse";
import { usePremixStore } from "src/stores/premix";
import { Notify } from "quasar";

const warehouseStore = useWarehousesStore();
const userData = computed(() => warehouseStore.user);
console.log("userdata", userData.value);
const warehouseEmployeeId = userData.value.data.employee_id;
const premixStore = usePremixStore();
const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

console.log("report", props.report);

// const branchPremixId = props.report.branch_premix_id;

const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`;
};
</script>

<style lang="scss" scoped></style>
