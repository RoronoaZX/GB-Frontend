<template>
  <q-card class="elegant-card">
    <q-card-section class="row items-center justify-between">
      <div class="row items-center q-gutter-x-sm">
        <q-icon name="location_on" size="sm" color="grey-8" />
        <div class="text-h6 text-weight-regular">Address Information</div>
      </div>
      <q-btn
        outline
        dense
        no-caps
        color="grey-8"
        icon="edit"
        label="Edit"
        class="edit-btn"
      />
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="text-grey-7">Residential Address</div>
      <div class="row items-start justify-between">
        <div class="text-body1">
          {{ capitalizeAddress(employee.address) || "N/A" }}
        </div>
        <!-- <q-btn
                  flat
                  dense
                  no-caps
                  color="primary"
                  label="View on Map"
                  icon-right="chevron_right"
                /> -->
      </div>
      <!-- <div class="text-grey-7 q-mt-sm">Notes</div>
              <a href="#" class="text-primary text-body2">Add Note</a> -->

      <!-- <q-separator class="q-my-lg" />

              <div class="text-grey-7">Citizen ID Address</div>
              <div class="row items-start justify-between">
                <div class="text-body1">
                  2715 Ash Dr. San Jose, South Dakota 83475
                </div>
                <q-btn
                  flat
                  dense
                  no-caps
                  color="primary"
                  label="View on Map"
                  icon-right="chevron_right"
                />
              </div>
              <div class="text-grey-7 q-mt-sm">Notes</div>
              <div
                class="bg-grey-3 q-pa-md rounded-borders q-mt-xs text-grey-8"
              >
                Egestas scelerisque sit curabitur massa eu sit. Dictum aliquet
                diam morbi amet imperdiet amet mollis pretium augue. Consequat
                porttitor euismod.
              </div> -->
    </q-card-section>
  </q-card>
</template>

<script setup>
import { capitalizeAddress } from "src/composables/employeeFunction/useEmployeeFunctions";

// 1. Define the props this component accepts
defineProps({
  employee: {
    type: Object,
    required: true,
  },
});

// 2. Define the events this component can emit
defineEmits(["editClicked"]);
</script>

<style lang="scss" scoped>
/* Scoped styles are great because they only apply here */
.elegant-card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}
.edit-btn {
  border-radius: 6px;
  padding: 0 10px;
  border-color: #e0e0e0;
}
</style>
