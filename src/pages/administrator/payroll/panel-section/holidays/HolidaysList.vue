<template>
  <q-scroll-area style="height: 320px">
    <q-list>
      <q-card
        v-for="holiday in holidays"
        :key="holiday.id"
        :class="getHolidayClass(holiday.type)"
        class="q-mb-sm holiday-card"
        flat
      >
        <div class="text-grey-7 q-mx-sm" align="right">
          <q-btn icon="more_horiz" round flat dense>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section @click="emitEdit(holiday)" align="center">
                    Edit
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section @click="emitDelete(holiday)" align="center">
                    Delete
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <q-item class="q-py-md items-center">
          <q-item-section side class="type-section">
            <div class="text-weight-light">
              {{ holiday.type }}
            </div>
          </q-item-section>
          <q-separator vertical class="holiday-separator" />
          <q-item-section class="q-ml-md">
            <q-item-label class="text-grey-7 text-weight-bold date-info">
              {{ holiday.monthYear }}
            </q-item-label>
            <q-item-label caption class="day-of-week">
              {{ holiday.dayOfWeek }}
            </q-item-label>
          </q-item-section>
          <q-separator vertical class="holiday-separator" />
          <q-item-section class="q-ml-sm">
            <q-item-label class="text-blue-grey-7 text-weight-bold date-name">
              {{ holiday.name }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </q-list>
  </q-scroll-area>
</template>

<script setup>
const props = defineProps({
  holidays: {
    type: Array,
    required: true,
  },
});

// Define the events this component can emit
const emit = defineEmits(["edit-holidays", "delete-holiday"]);

// Methods to emit events to the parent
const emitEdit = (holiday) => {
  emit("edit-holiday", holiday);
};

const emitDelete = (holiday) => {
  emit("delete-holiday", holiday);
};

// This display logic now with the component that uses it
const getHolidayClass = (type) => {
  return type === "Regular Holiday"
    ? "holiday--regular-card"
    : type === "Special (Non-Working) Holiday"
    ? "holiday--special-card"
    : "";
};
</script>

<style lang="scss" scoped>
.holiday-card {
  border-radius: 12px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  color: #333;
}

.holiday--regular-card {
  background-color: #e1bee7;
}

.holiday--special-card {
  background-color: #ffccbc;
}

.type-section {
  min-width: 100px;
  text-align: left;
  padding-left: 20px;
  .q-item-label {
    font-size: 0.75em;
    opacity: 0.8;
    white-space: nowrap;
  }
}

.holiday-separator {
  background-color: rgba(0, 0, 0, 0.12);
  margin: 0 10px;
}

.date-info {
  font-size: 1.1em;
}

.day-of-week {
  font-size: 0.85em;
  opacity: 0.9;
}

.date-name {
  font-size: 1.1em;
  white-space: normal;
  line-height: 1.3;
}
</style>
