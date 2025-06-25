<template>
  <q-card class="q-my-md" flat bordered>
    <q-card-section>
      <div class="row items-center no-wrap">
        <!-- Left Section: Day & Clock-in -->
        <div class="col-2">
          <div class="text-weight-bold">{{ log.dayLabel }}</div>
          <div class="text-grey-7">Clock-in</div>
          <div class="text-body1 text-weight-medium">{{ log.clockIn }}</div>
        </div>

        <!-- Middle Section: Timeline -->
        <div class="col-8 q-px-md">
          <ActivityTimeline :activities="log.activities" />
        </div>

        <!-- Right Section: Clock-out, Duration, Status -->
        <div class="col-2 text-right">
          <div v-if="log.statusLabel" class="q-mb-sm">
            <q-chip
              outline
              color="green"
              text-color="green"
              icon="check_circle"
              size="sm"
            >
              {{ log.statusLabel }}
            </q-chip>
          </div>
          <div class="text-grey-7">Clock-out</div>
          <div class="text-body1 text-weight-medium">{{ log.clockOut }}</div>
          <div class="text-grey-7 q-mt-sm">Duration</div>
          <div class="text-body1 text-weight-medium">{{ log.duration }}</div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import ActivityTimeline from "./ActivityTimeline.vue";

defineProps({
  log: { type: Object, required: true },
});
</script>
