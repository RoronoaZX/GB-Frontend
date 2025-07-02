<template>
  <q-page>
    <!-- {{ employeesData }} -->
    <q-tab-panel name="personal">
      <div class="row q-col-gutter-lg q-mt-none">
        <div class="col-12 col-md-8">
          <div class="column q-gutter-y-lg">
            <PersonalInformationCard
              :employee="employeesData"
              @editClicked="handleEdit('personal')"
            />

            <AddressInformationCard
              :employee="employeesData"
              @editClicked="handleEdit('address')"
            />

            <EmploymentOverview
              :employee="employeesData"
              @editClicked="handleEdit('employment')"
            />
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="column q-gutter-y-lg">
            <ContactInformationCard
              :employee="employeesData"
              @editClicked="handleEdit('contact')"
            />
          </div>
        </div>
      </div>
    </q-tab-panel>
  </q-page>
</template>
<script setup>
import PersonalInformationCard from "./PersonalInformationCard.vue";
import AddressInformationCard from "./AddressInformationCard.vue";
import EmploymentOverview from "./EmploymentOverview.vue";
import ContactInformationCard from "./ContactInformationCard.vue";

const props = defineProps(["employeesData"]);
</script>

<style lang="scss" scoped>
.elegant-card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  // transition: box-shadow 0.3s ease-in-out;
}

.elegant-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.age-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
}
.contact-box {
  font-weight: 500;
}
.edit-btn {
  border-radius: 6px;
  padding: 0 10px;
  border-color: #e0e0e0; /* Softer outline color */
}
</style>
