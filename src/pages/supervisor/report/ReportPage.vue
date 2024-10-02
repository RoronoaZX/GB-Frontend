<template>
  <div class="q-pa-md row q-col-gutter-md">
    <div
      v-for="branch in branches"
      :key="branch.id"
      class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
    >
      <q-card class="my-card">
        <q-img src="https://cdn.quasar.dev/img/mountains.jpg" />
        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%)"
          />
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ branch.name }}
            </div>
            <div
              class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
            >
              <q-icon name="place" />
              {{ branch.location }}
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">$・Italian, Cafe</div>
          <div class="text-caption text-grey">
            Small plates, salads & sandwiches in an intimate setting.
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { useSupervisorStore } from "src/stores/supervisor";
import { computed, onMounted } from "vue";

const supervisorStore = useSupervisorStore();
const branches = computed(() => supervisorStore.supervisors);
const employeeData = computed(() => supervisorStore.user);
const employee_id = employeeData?.value?.data?.employee_id;
console.log("employee_id", employee_id);

onMounted(async () => {
  await reloadBranchData(employee_id);
});

const reloadBranchData = async (employee_id) => {
  try {
    branches.value = await supervisorStore.fetchSupervisorUnderBranch(
      employee_id
    );
    console.log("branches", branches.value);
  } catch (error) {
    console.log("error fetching recipe: ", error);
  }
};
</script>

<style lang="scss" scoped>
.data-error {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
.elegant-container {
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  color: #333;
}

.elegant-search {
  margin-bottom: 2rem;
  border: 1px solid #ccc;
  border-radius: 25px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

.skeleton-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.skeleton-wrapper .col-xs-12 {
  margin-bottom: 1rem;
}

.skeleton-card {
  height: 100%;
  border-radius: 15px;
  background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  animation: shimmer 1.5s infinite linear;
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.user-card {
  height: 100%;
  border-radius: 15px;
  background: #fff;
  color: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}

.text-center {
  text-align: center;
}

.q-mb-sm {
  margin-bottom: 0.5rem;
}

.elegant-name {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  color: #555;
}

.elegant-chip {
  background-color: #007bff;
  border-radius: 8px;
  color: #fff;
}

.elegant-chip-outline {
  border-color: #007bff;
  color: #007bff;
}

.elegant-detail {
  display: flex;
  align-items: center;
  color: #777;
}

.elegant-btn {
  color: #007bff;
  border-color: #007bff;
  font-weight: 600;
}
</style>
