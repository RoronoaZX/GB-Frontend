<template>
  <div class="employment-section">
    <div class="section-title">
      <q-icon name="assignment_ind" size="18px" />
      <span>Employment Details</span>
    </div>
    <div class="details-grid">
      <div class="detail-box">
        <span class="detail-label">Employment Type</span>
        <span>{{ employee?.employment_type?.category || "N/A" }}</span>
      </div>
      <div class="detail-box">
        <span class="detail-label">Designation</span>
        <span>{{
          capitalizeFirstLetter(
            employee?.designation?.designation_type || "N/A"
          )
        }}</span>
      </div>
      <div class="detail-box">
        <span class="detail-label">Work Schedule</span>
        <span
          >{{ employee?.branch_employee?.time_in || "08:00" }} -
          {{ employee?.branch_employee?.time_out || "17:00" }}</span
        >
      </div>
      <div class="detail-box">
        <span class="detail-label">Sex</span>
        <span>{{ employee?.sex || "Not specified" }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { typographyFormat } from "src/composables/typography/typography-format";

const { capitalizeFirstLetter } = typographyFormat();

defineProps(["employee"]);
</script>

<style scoped>
.employment-section {
  margin-bottom: 16px;
}
.section-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 12px;
}
.section-title .q-icon {
  color: #667eea;
}
.details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
.detail-box {
  background: #f8fafc;
  border-radius: 16px;
  padding: 10px;
}
.detail-label {
  display: block;
  font-size: 10px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}
.detail-value {
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
}
</style>
