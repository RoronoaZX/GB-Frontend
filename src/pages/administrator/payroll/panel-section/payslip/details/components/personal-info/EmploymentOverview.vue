<template>
  <q-card class="elegant-card">
    <q-card-section>
      <div class="row items-center q-gutter-x-sm">
        <q-icon name="work_outline" size="sm" color="grey-8" />
        <div class="text-h6 text-weight-regular">Employment Overview</div>
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="row">
        <div class="col-6">
          <div class="text-grey-7">Date Started</div>
          <div class="text-body1">2020-Current (4 Years)</div>
        </div>
        <div class="col-3">
          <div class="text-grey-7">Job Role</div>
          <div class="text-body1">
            {{ employee?.position || "N/A" }}
          </div>
        </div>
        <div class="col-3">
          <div class="text-grey-7">Employment Status</div>
          <div class="text-body1">
            {{ employee?.employment_type?.category || "N/A" }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
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
