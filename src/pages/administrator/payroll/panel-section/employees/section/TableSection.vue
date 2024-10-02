<template>
  <div>
    <q-table
      title="Employees"
      :rows="employeeRows"
      :columns="employeeColumns"
      row-key="fullname"
      hide-bottom
      style="width: 900px"
      class="custom-table"
    >
      <template v-slot:top-right>
        <q-input
          outlined
          dense
          rounded
          debounce="300"
          v-model="filter"
          placeholder="Search Employee"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-fullname="props">
        <q-td key="fullname" :props="props">
          <div class="text-subtitle2">
            {{ formatFullname(props.row) }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-employmentType="props">
        <q-td key="fullname" :props="props">
          <q-badge
            :color="
              getEmployementTypeColor(props.row.employment_type?.category)
            "
          >
            {{ props.row.employment_type?.category }}
          </q-badge>
        </q-td>
      </template>
    </q-table>
  </div>
  <!-- for profile pic-->
  <!-- <template v-slot:body-cell-profile="props">
        <q-td :props="props" align="center">
          <img
            :src="props.row.profile"
            alt="Profile"
            style="width: 30px; height: 30px; border-radius: 50%"
          />
        </q-td>
      </template> -->
</template>

<script setup>
import { date } from "quasar";
import { useEmployeeStore } from "src/stores/employee";
import { computed, onMounted } from "vue";

const employeeStore = useEmployeeStore();
const employeeRows = computed(() => employeeStore.employees); // Computed property will automatically update when the store changes

console.log("employees fetch madepaker", employeeRows.value);

onMounted(async () => {
  await reloadTableData();
});

const reloadTableData = async () => {
  try {
    employeeRows.value = await employeeStore.fetchEmployeeWithEmploymentType();
  } catch (error) {
    console.log("employee madepaker", error);
  }
};
const formatDate = (dateString) => {
  return date.formatDate(dateString, "MMMM DD, YYYY");
};

const formatFullname = (row) => {
  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  const middleInitial = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  return `${capitalize(row.firstname)} ${middleInitial} ${capitalize(
    row.lastname
  )}`;
};

const employeeColumns = [
  {
    name: "fullname",
    required: true,
    label: "Full Name",
    align: "center",
    field: (row) => formatFullname(row),
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "employmentType",
    label: "Employment Type",
    align: "center",
    field: (row) =>
      row.employment_type ? row.employment_type.category : "N/A",
    format: (val) => `${val}`,
  },

  {
    name: "address",
    required: true,
    label: "Address",
    align: "center",
    field: (row) => {
      const capitalizeWords = (address) => {
        return address
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
      };
      return capitalizeWords(row.address);
    },
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "phone",
    required: true,
    label: "Phone",
    align: "center",
    field: "phone",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "birthdate",
    required: true,
    label: "Birthdate",
    align: "center",
    field: "birthdate",
    format: (val) => formatDate(val),
    sortable: true,
  },
];

const getEmployementTypeColor = (employmentType) => {
  switch (employmentType) {
    case "Regular":
      return "blue-8";
    case "Trainee":
      return "orange-5";
    case "Part-time":
      return "teal-5";
    default:
      return "grey";
  }
};
</script>

<style lang="scss" scoped>
.custom-table {
  border-radius: 15px;
  background: #fff;
  color: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}
</style>
