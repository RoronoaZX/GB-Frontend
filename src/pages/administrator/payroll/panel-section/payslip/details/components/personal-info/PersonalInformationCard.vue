<template>
  <q-card class="elegant-card" dense bordered>
    <q-card-section class="row items-center justify-between">
      <div class="row items-center q-gutter-x-sm">
        <q-icon name="person_outline" size="sm" color="grey-8" />
        <div class="text-h6 text-weight-regular">Personassl Information</div>
      </div>
      <q-btn
        outline
        dense
        no-caps
        color="grey-8"
        icon="edit"
        label="Edit"
        class="edit-btn"
        @click="$emit('editClicked')"
      />
    </q-card-section>
    <q-card-section v-if="employee" class="q-pt-none">
      <div class="row q-col-gutter-x-xl q-col-gutter-y-lg">
        <div class="col-6">
          <div class="text-grey-7">Full Name</div>
          <div class="text-body1">
            {{ formatFullname(employee) }}
          </div>
        </div>
        <div class="col-6">
          <div class="text-grey-7">Gender</div>
          <div class="text-body1">{{ employee.sex || "N/A" }}</div>
        </div>
        <div class="col-6">
          <div class="text-grey-7">Birthdate</div>
          <div class="text-body1">{{ employee.birthdate || "N/A" }}</div>
        </div>
        <div class="col-6">
          <div class="text-grey-7">Age</div>
          <div class="text-body1">{{ employee.age || "N/A" }}</div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import {
  formatFullname,
  capitalizeAddress,
} from "src/composables/employeeFunction/useEmployeeFunctions";

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
