<template>
  <q-card flat bordered class="summary-card q-pa-md">
    <q-list dense>
      <slot name="pre-summary" />

      <q-item>
        <q-item-section avatar>
          <q-icon name="money" color="blue-grey" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-body1 text-weight-medium">
            Rate / Day: <span class="text-blue-grey">{{ salary }}</span>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-icon name="event_note" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-body1 text-weight-medium">
            Total Days: <span class="text-primary">{{ totalDays }}</span>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-icon name="wallet" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-body1 text-weight-bold">
            Expected Salary:
            <span class="text-primary">{{ expectedSalary }}</span>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced inset="item" />

      <q-item>
        <q-item-section avatar>
          <q-icon name="timer" color="teal" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-body1 text-weight-medium">
            Working Hours: <span class="text-teal">{{ workingHours }}</span>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-icon name="payments" color="teal" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-body1 text-weight-bold">
            Working Cost: <span class="text-teal">{{ workingCost }}</span>
          </q-item-label>
        </q-item-section>
      </q-item>

      <slot name="post-summary" />
    </q-list>
  </q-card>
</template>

<script setup>
const props = defineProps([
  "salary",
  "totalDays",
  "expectedSalary",
  "workingHours",
  "workingCost",
]);
</script>

<style scoped>
.summary-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}
</style>
