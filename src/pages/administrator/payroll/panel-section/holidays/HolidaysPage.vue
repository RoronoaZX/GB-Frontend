<template>
  <!-- style="background-color: #f0f7f4" -->
  <q-page class="q-pa-md">
    <div class="q-mb-md">
      <HolidaysDialog />
    </div>
    <div class="row justify-between">
      <div class="col-6 col-md-4">
        <q-card flat class="calendar-card">
          <q-card-section>
            <q-date
              v-model="selectedDate"
              :events="eventDates"
              minimal
              flat
              class="full-width"
              color="primary"
              text-color="dark"
              event-color="primary"
            />
          </q-card-section>
        </q-card>
      </div>

      <!-- My Courses Section -->
      <div class="col-6">
        <div class="q-mb-md row justify-between items-center">
          <!-- <span class="text-h6 text-weight-medium">My courses</span>
          <q-btn
            flat
            dense
            round
            color="primary"
            icon="add"
            label="new"
            no-caps
            class="text-weight-bold"
          /> -->
        </div>
        <q-list separator>
          <q-card
            v-for="course in courses"
            :key="course.title"
            class="q-mb-md course-card"
            flat
          >
            <q-item class="q-pa-md">
              <q-item-section avatar>
                <q-avatar rounded size="56px">
                  <q-img :src="course.icon" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-medium">{{
                  course.title
                }}</q-item-label>
                <q-item-label caption>
                  views: {{ course.views }} orders: {{ course.orders }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn icon="more_horiz" flat round dense />
              </q-item-section>
            </q-item>
          </q-card>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import HolidaysDialog from "./HolidaysDialog.vue";
</script>

<style lang="scss" scoped>
.q-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px; /* This gives the card itself rounded corners */
}

.course-card {
  // background-color: #e6f4ea;
  border-radius: 20px;
  width: 540px;
}

.calendar-card {
  background-color: #e6f4ea;
  border-radius: 20px;
  width: 500px;
}

.promotion-card {
  background-color: #4caf50; // A darker green
  border-radius: 20px;
}

.learn-more-btn {
  font-weight: bold;
}

:deep(.q-date__header) {
  background-color: #e6f4ea;
  border-radius: 20px 20px 0 0;
}

:deep(.q-date__navigation) {
  background-color: #e6f4ea;
}

:deep(.q-date__view) {
  background-color: #e6f4ea;
}

:deep(.q-date__event) {
  background-color: #4caf50 !important;
  border-radius: 50%;
  width: 6px;
  height: 6px;
  bottom: 6px;
}

:deep(.q-date__today) {
  background-color: rgba(76, 175, 80, 0.3);
  border-radius: 50%;
}

:deep(.q-date__calendar-item--selected) {
  background: #4caf50;
  color: white;
  border-radius: 50%;
}
</style>
