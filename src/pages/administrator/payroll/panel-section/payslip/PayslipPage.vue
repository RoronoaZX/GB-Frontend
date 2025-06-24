<!-- <template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-lg">

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


            <div class="text-center q-pt-sm">
              <q-avatar size="90px">

                <q-img
                  :src="employee.avatar || defaultAvatar"
                  :error-src="defaultAvatar"
                  spinner-color="primary"
                  style="height: 90px; width: 90px"
                />
              </q-avatar>
              <div class="text-h6 q-mt-md">{{ formatFullname(employee) }}</div>
              <div class="text-caption text-grey-7">
                {{ employee.position }}
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">

            <div class="text-body2 text-grey-8">
              <div class="info-line">
                <q-icon name="storefront" size="sm" class="q-mr-sm" />
                <span>{{ employee?.designation?.name || "N/A" }}</span>
              </div>

              <div class="info-line">
                <q-icon name="schedule" size="sm" class="q-mr-sm" />
                <span>{{ employee.employment_type.category || "N/A" }}</span>
              </div>
            </div>


            <div class="row items-center q-mt-sm">
              <q-icon name="email" size="sm" class="text-grey-8 q-mr-md" />
              <a
                :href="'mailto:' + (employee?.user_designation?.email || '')"
                class="contact-pill"
              >
                {{ employee?.user_designation?.email || "N/A" }}
              </a>

            </div>
            <div class="row items-center q-mt-sm">
              <q-icon name="phone" size="sm" class="text-grey-8 q-mr-md" />
              <span class="contact-pill">{{ employee.phone }}</span>
            </div>
          </q-card-section>


          <q-card-section class="q-pt-none">
            <div
              class="row items-center justify-between text-caption text-grey-7"
            >
              <span> </span>
              <a
                href="#"
                :style="getLinkStyle(employee.status)"
                class="text-weight-bold"
                style="text-decoration: none"
              >
                View details
                <q-icon name="arrow_forward_ios" size="0.7em" class="q-ml-xs" />
              </a>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template> -->

<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-lg">
      <!-- Loop through each employee and create a card -->
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
              <div class="text-h6 q-mt-md">{{ formatFullname(employee) }}</div>
              <div class="text-caption text-grey-7">
                {{ employee.position }}
              </div>
            </div>
          </q-card-section>

          <!-- ========================================================= -->
          <!-- START: CORRECTED INFO SECTION                           -->
          <!-- This block replaces your old info layout with the QList -->
          <!-- ========================================================= -->
          <q-card-section class="q-pt-none">
            <q-list dense>
              <!-- First row with Designation (main) and Employment Type (side) -->
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
          <!-- ========================================================= -->
          <!-- END: CORRECTED INFO SECTION                             -->
          <!-- ========================================================= -->

          <!-- Footer section: Join Date and View Details -->
          <q-card-section class="q-pt-none">
            <div
              class="row items-center justify-between text-caption text-grey-7"
            >
              <span> </span>
              <a
                href="#"
                :style="getLinkStyle(employee.status)"
                class="text-weight-bold"
                style="text-decoration: none"
              >
                View details
                <q-icon name="arrow_forward_ios" size="0.7em" class="q-ml-xs" />
              </a>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useEmployeeStore } from "src/stores/employee";
import { formatFullname } from "src/composables/employeeFunction/useEmployeeFunctions";
import defaultAvatar from "src/assets/boy-avatar.png";

const employeeStore = useEmployeeStore();
const employeesSample = computed(() => employeeStore.employees); // Fetch employees from the store

const employeesData = ref([]);

const fetchEmployees = async () => {
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
  }
};

onMounted(() => {
  fetchEmployees();
});
// Fetch employees from the store

// --- DATA ---
// UPDATED: Employee data with realistic avatar placeholders
// const employees = ref([
//   // https://i.pravatar.cc/150?img=12
//   {
//     id: "#EMP01",
//     name: "Bagus Fikri",
//     role: "CEO",
//     avatar: "", // Realistic photo
//     status: "Active",
//     department: "Managerial",
//     employmentType: "Fulltime",
//     email: "bagusfikri@gmail.com",
//     phone: "+62 123 123 123",
//     joinDate: "29 Oct, 2020",
//   },
//   {
//     id: "#EMP02",
//     name: "Ihdizein",
//     role: "Illustrator",
//     avatar: "https://i.pravatar.cc/150?img=1", // Realistic photo
//     status: "Active",
//     department: "Managerial",
//     employmentType: "Fulltime",
//     email: "ihdizain@gmail.com",
//     phone: "(40) 768 082 716",
//     joinDate: "1 Feb, 2019",
//   },
//   {
//     id: "#EMP03",
//     name: "Mufti Hidayat",
//     role: "Project Manager",
//     avatar: "https://i.pravatar.cc/150?img=32", // Realistic photo
//     status: "Active",
//     department: "Managerial",
//     employmentType: "Fulltime",
//     email: "muftih@gmail.com",
//     phone: "(63) 130 689 256",
//     joinDate: "1 Feb, 2021",
//   },
//   {
//     id: "#EMP04",
//     name: "Fauzan Ardhiansyah",
//     role: "UI Designer",
//     avatar: "https://i.pravatar.cc/150?img=60", // Realistic photo
//     status: "Active",
//     department: "Managerial",
//     employmentType: "Fulltime",
//     email: "heloozan@gmail.com",
//     phone: "(64) 630 613 343",
//     joinDate: "21 Sep, 2018",
//   },
//   // Added other statuses for completeness, they can be removed if not needed
//   {
//     id: "#EMP05",
//     name: "Raihan Fikri",
//     role: "QC & Research",
//     avatar: "https://i.pravatar.cc/150?img=5",
//     status: "Invited",
//     department: "Human Resources",
//     employmentType: "Fulltime",
//     email: "raihan@gmail.com",
//     phone: "(+62) 812 345 678",
//     joinDate: "5 Mar, 2022",
//   },
// ]);

// --- HELPERS ---
// UPDATED: This object defines the styling for each status type to match the new image
const statusConfig = {
  Active: {
    label: "Active",
    chipColor: "green-6", // grey chip background
    chipTextColor: "white", // white grey text/icon
    icon: "lens",
    borderColor: "#68B984", // Green border at the bottom
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
  /* text-align: left; is the default and looks best with ellipsis */

  transition: background-color 0.3s;
}

.contact-pill:hover {
  background-color: #dbe8ff;
}
</style>
