<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-lg">
      <!-- ========================================================= -->
      <!-- START: SKELETON LOADER                                  -->
      <!-- This block is displayed when `loading` is true          -->
      <!-- ========================================================= -->
      <template v-if="loading">
        <div v-for="n in 8" :key="n" class="col-12 col-sm-6 col-md-4 col-lg-3">
          <q-card flat bordered>
            <q-card-section>
              <!-- Top section: Status Chip and More Button -->
              <div class="row items-center justify-between no-wrap">
                <q-skeleton type="QChip" width="85px" height="24px" />
                <q-skeleton type="QBtn" />
              </div>

              <!-- Middle section: Avatar, Name, and Role -->
              <div class="text-center q-pt-sm">
                <q-skeleton type="QAvatar" size="90px" class="q-mx-auto" />
                <q-skeleton
                  type="text"
                  height="28px"
                  width="60%"
                  class="q-mt-md q-mx-auto"
                />
                <q-skeleton
                  type="text"
                  height="20px"
                  width="40%"
                  class="q-mt-xs q-mx-auto"
                />
              </div>
            </q-card-section>

            <!-- Info Section Skeleton -->
            <q-card-section class="q-pt-none">
              <q-list dense>
                <q-item class="q-px-none">
                  <q-item-section avatar style="min-width: 40px">
                    <q-skeleton type="QAvatar" size="24px" />
                  </q-item-section>
                  <q-item-section>
                    <q-skeleton type="text" width="60%" />
                  </q-item-section>
                  <q-item-section side>
                    <q-skeleton type="text" width="65px" />
                  </q-item-section>
                </q-item>
                <q-item class="q-px-none">
                  <q-item-section avatar style="min-width: 40px">
                    <q-skeleton type="QAvatar" size="24px" />
                  </q-item-section>
                  <q-item-section>
                    <q-skeleton type="text" width="85%" />
                  </q-item-section>
                </q-item>
                <q-item class="q-px-none">
                  <q-item-section avatar style="min-width: 40px">
                    <q-skeleton type="QAvatar" size="24px" />
                  </q-item-section>
                  <q-item-section>
                    <q-skeleton type="text" width="70%" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>

            <!-- Footer section skeleton -->
            <q-card-section class="q-pt-none">
              <div class="row items-center justify-end">
                <q-skeleton type="text" width="90px" height="20px" />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>

      <!-- ========================================================= -->
      <!-- START: EMPLOYEE CARDS (Main Content)                    -->
      <!-- ========================================================= -->
      <template v-else>
        <div
          v-for="employee in employeesData"
          :key="employee.id"
          class="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <q-card
            class="employee-card"
            flat
            bordered
            :style="getCardStyle(employee.status)"
          >
            <q-card-section>
              <!-- Top section: Status Chip and More Button -->
              <div class="row items-center justify-between no-wrap">
                <q-chip
                  :icon="getStatusChip(employee.status).icon"
                  :color="getStatusChip(employee.status).chipColor"
                  :text-color="getStatusChip(employee.status).chipTextColor"
                  class="text-weight-bold"
                  size="xs"
                >
                  {{ getStatusChip(employee.status).label }}
                </q-chip>
                <q-btn icon="more_horiz" round flat dense>
                  <q-menu>
                    <q-list style="min-width: 100px">
                      <q-item clickable v-close-popup>
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>Delete</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>

              <!-- Middle section: Avatar, Name, and Role -->
              <div class="text-center q-pt-sm">
                <q-avatar size="90px">
                  <q-img
                    :src="employee.avatar || defaultAvatar"
                    :error-src="defaultAvatar"
                    spinner-color="primary"
                    style="height: 90px; width: 90px"
                  />
                </q-avatar>
                <div class="text-h6 q-mt-md">
                  {{ formatFullname(employee) }}
                </div>
                <div class="text-caption text-grey-7">
                  {{ employee.position }}
                </div>
              </div>
            </q-card-section>

            <!-- Info Section -->
            <q-card-section class="q-pt-none">
              <q-list dense>
                <!-- Designation and Employment Type -->
                <q-item class="q-px-none">
                  <q-item-section avatar style="min-width: 40px">
                    <q-icon name="storefront" color="grey-8" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-grey-8 ellipsis">
                      {{ employee?.designation?.name || "N/A" }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <div class="row items-center no-wrap text-grey-8">
                      <q-icon name="schedule" class="q-mr-xs" />
                      <span>{{
                        employee.employment_type.category || "N/A"
                      }}</span>
                    </div>
                  </q-item-section>
                </q-item>

                <!-- Email Row -->
                <q-item class="q-px-none">
                  <q-item-section avatar style="min-width: 40px">
                    <q-icon name="email" color="grey-8" />
                  </q-item-section>
                  <q-item-section>
                    <a
                      :href="
                        'mailto:' + (employee?.user_designation?.email || '')
                      "
                      class="contact-pill"
                    >
                      {{ employee?.user_designation?.email || "N/A" }}
                    </a>
                  </q-item-section>
                </q-item>

                <!-- Phone Row -->
                <q-item class="q-px-none">
                  <q-item-section avatar style="min-width: 40px">
                    <q-icon name="phone" color="grey-8" />
                  </q-item-section>
                  <q-item-section>
                    <a
                      :href="'tel:' + (employee.phone || '').replace(/\D/g, '')"
                      class="contact-pill"
                    >
                      {{ employee.phone || "N/A" }}
                    </a>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>

            <!-- Footer section: View Details -->
            <q-card-section class="q-pt-none">
              <div
                class="row items-center justify-between text-caption text-grey-7"
              >
                <span> </span>
                <!-- CORRECTED LINK: Use <a> tag with @click.prevent -->
                <a
                  href="#"
                  :style="getLinkStyle(employee.status)"
                  class="text-weight-bold"
                  style="text-decoration: none; cursor: pointer"
                  @click.prevent="handleViewDetailsClick(employee)"
                >
                  View details
                  <q-icon
                    name="arrow_forward_ios"
                    size="0.7em"
                    class="q-ml-xs"
                  />
                </a>
              </div>
            </q-card-section>

            <q-inner-loading
              :showing="goBackLoading"
              label="Returning..."
              label-class="text-primary"
              label-style="font-size: 1.1em"
            >
              <q-spinner-ios size="50px" color="primary" />
            </q-inner-loading>
          </q-card>
        </div>
      </template>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { useEmployeeStore } from "src/stores/employee";
import { formatFullname } from "src/composables/employeeFunction/useEmployeeFunctions";
import defaultAvatar from "src/assets/boy-avatar.png";

const employeeStore = useEmployeeStore();
const router = useRouter(); // Get the router instance

// Reactive state
const employeesSample = computed(() => employeeStore.employees);
const employeesData = ref([]);
const loading = ref(true); // For initial page skeleton
const loadingEmployeeId = ref(null); // For individual card loading

const fetchEmployees = async () => {
  loading.value = true; // Set loading to true before fetching
  try {
    // Simulate fetching data from the store
    employeesSample.value =
      await employeeStore.fetchEmployeeWithEmploymentTypeAndDesignation();
    // Assign the fetched data to the employeesData ref
    const { data, current_page, per_page, total } = employeesSample.value;
    employeesData.value = data;
    console.log("Fetched employees:", employeesData.value);
  } catch (error) {
    console.error("Error fetching employees:", error);
  } finally {
    loading.value = false; // Set loading to false after fetching
  }
};

onMounted(() => {
  fetchEmployees();
});

// Click handler for "View details"
const handleViewDetailsClick = (employee) => {
  // Immediately show the loading spinner for the clicked card
  loadingEmployeeId.value = employee.id;

  // Set a failsafe timeout. After 5 seconds, hide the spinner
  // for this card, no matter what. This prevents it from getting stuck.
  setTimeout(() => {
    if (loadingEmployeeId.value === employee.id) {
      loadingEmployeeId.value = null;
    }
  }, 5000);

  // Navigate to the new page after a short delay (300ms)
  // This gives the user time to see the spinner animation start.
  setTimeout(() => {
    router.push({
      name: "EmployeeProfile",
      params: { employee_id: employee.id },
    });
  }, 300);
};

// Clean up loading state when leaving the page
onBeforeRouteLeave(() => {
  loadingEmployeeId.value = null;
});

// --- HELPERS ---
const statusConfig = {
  Active: {
    label: "Active",
    chipColor: "green-6",
    chipTextColor: "white",
    icon: "lens",
    borderColor: "#68B984",
  },
  Invited: {
    label: "Invited",
    chipColor: "grey-10",
    chipTextColor: "white",
    icon: "check",
    borderColor: "#333333",
  },
  Inactive: {
    label: "Inactive",
    chipColor: "grey-4",
    chipTextColor: "grey-8",
    icon: "pause",
    borderColor: "#BDBDBD",
  },
};

function getStatusChip(status) {
  return statusConfig[status] || statusConfig.Inactive;
}

function getCardStyle(status) {
  const color = (statusConfig[status] || statusConfig.Inactive).borderColor;
  return {
    borderBottom: `4px solid ${color}`,
  };
}

function getLinkStyle(status) {
  const color = (statusConfig[status] || statusConfig.Inactive).borderColor;
  return {
    color: color,
  };
}
</script>

<style lang="scss" scoped>
.employee-card {
  border-radius: 12px;
  transition: transform 0.2s, box-shadow 0.2s;
  background: white;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.1);
  }
}

.details-box {
  background-color: #f8f9fa;
  border-radius: 8px;
  font-size: 0.8rem;
}

.q-avatar img {
  object-fit: cover;
  object-position: center;
}

.contact-pill {
  /* Core layout styles */
  display: block;
  width: 100%;
  padding: 4px 12px;
  border-radius: 16px;
  background-color: #eaf2ff;
  color: #0052cc;

  /* Text handling and appearance */
  font-size: 0.9em;
  text-decoration: none;
  cursor: pointer;

  /* --- KEY ADDITIONS FOR ELLIPSIS --- */
  white-space: nowrap; /* Prevents the text from wrapping to a new line */
  overflow: hidden; /* Hides any text that overflows the container */
  text-overflow: ellipsis; /* Adds the "..." to indicate truncated text */

  transition: background-color 0.3s;
}

.contact-pill:hover {
  background-color: #dbe8ff;
}
</style>
