<template>
  <div>
    <!-- class="q-pa-sm" -->
    <q-card class="my-holiday-card">
      <!-- Card Header -->
      <q-card-section class="bg-primary text-white q-py-md">
        <div class="row items-center no-wrap">
          <div class="col">
            <h6 class="q-ma-none text-h6 text-weight-bold">Holiday List 🎉</h6>
          </div>
          <div class="col-auto">
            <q-icon name="event" size="24px" />
          </div>
        </div>
      </q-card-section>

      <!-- Column Header -->
      <q-list separator>
        <div class="row bg-grey-2 text-weight-bold text-grey-8 q-px-md q-py-sm">
          <div class="col-3">Date</div>
          <div class="col-6 text-center">Name</div>
          <div class="col-3 text-right">Type</div>
        </div>

        <!-- Holiday Rows -->
        <template v-if="dtrHolidays && dtrHolidays.length > 0">
          <div
            v-for="holiday in dtrHolidays"
            :key="holiday.id"
            class="row q-hoverable q-px-md q-py-sm items-center"
          >
            <div class="col-3 text-primary">
              {{ holiday.date }}
            </div>
            <div class="col-6 text-center">
              {{ holiday.name }}
            </div>
            <div class="col-3 text-right">
              <q-badge
                :color="getHolidayTypeColor(holiday.type)"
                text-color="white"
                class="q-px-sm q-py-xs"
              >
                {{ holiday.type }}
              </q-badge>
            </div>
          </div>
        </template>

        <!-- Empty State -->
        <template v-else>
          <q-item>
            <q-item-section class="text-center text-grey-6 q-py-md">
              No holidays found for this period.
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-card>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["dtrHolidays"]);
console.log("dtrHolidays", props.dtrHolidays);

const getHolidayTypeColor = (type) => {
  if (type === "Regular Holiday") {
    return "teal";
  } else if (type === "Special (Non-Working) Holiday") {
    return "orange-8";
  }
  return "grey";
};
</script>

<style lang="scss" scoped>
.my-holiday-card {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.q-hoverable:hover {
  background-color: var(--q-primary-lighter, #e3f2fd) !important;
  cursor: pointer;
}
</style>
