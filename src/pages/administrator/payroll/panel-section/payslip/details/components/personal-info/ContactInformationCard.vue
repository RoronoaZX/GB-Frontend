<template>
  <q-card class="elegant-card">
    <q-card-section class="row items-center justify-between">
      <div class="row items-center q-gutter-x-sm">
        <q-icon name="contact_page" size="sm" color="grey-8" />
        <div class="text-h6 text-weight-regular">Contact Information</div>
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
      <div class="text-body1">Personal Contact</div>
      <div class="text-grey-7 q-mt-sm">Phone Number</div>
      <div
        class="contact-box bg-blue-1 text-primary q-pa-sm rounded-borders q-mt-xs"
      >
        {{ employee.phone || "Not Provided" }}
      </div>
      <div class="text-grey-7 q-mt-md">Email</div>
      <div
        class="contact-box bg-blue-1 text-primary q-pa-sm rounded-borders q-mt-xs"
      >
        {{ employee?.user_designation?.email || "Not Provided" }}
      </div>

      <q-separator class="q-my-lg" />

      <div class="text-body1">Other Contact</div>
      <div class="text-grey-7 q-mt-sm">Not Provided</div>
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
