<template>
  <!-- max-width: 1000px -->
  <div style="width: 100%">
    <q-table
      title="Employees"
      :rows="employeeRows"
      :columns="employeeColumns"
      row-key="fullname"
      hide-bottom
      v-model:pagination="pagination"
      class="custom-table"
      style="max-width: 100%; height: 460px"
    >
      <!-- style="height: 460px" -->
      <!-- width: 1000px; -->
      <template v-slot:top-right>
        <SearchEmployee />
      </template>
      <template v-slot:body-cell-fullname="props">
        <q-td key="fullname" :props="props">
          <div class="text-subtitle2">
            {{ formatFullname(props.row) }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit Employee Name
            </q-tooltip>
          </div>
          <q-popup-edit
            v-model="props.row"
            @update:model-value="
              (val) => updateEmployeeFullname(props.row, val)
            "
            buttons
            title="Edit Employee Full Name"
            v-slot="{ value, set }"
          >
            <div class="row q-gutter-md">
              <q-input
                class="text-capitalize"
                v-model="value.firstname"
                label="First Name"
                outlined
                flat
                color="positive"
                dense
                autofucos
                @keyup.enter="set(value)"
              />
              <q-input
                class="text-capitalize"
                v-model="value.middlename"
                label="Middle Name"
                outlined
                flat
                color="positive"
                dense
                autofucos
                @keyup.enter="set(value)"
              />
              <q-input
                class="text-capitalize"
                v-model="value.lastname"
                label="Last Name"
                outlined
                flat
                color="positive"
                dense
                autofucos
                @keyup.enter="set(value)"
              />
            </div>
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-employmentType="props">
        <q-td :props="props">
          <q-badge
            :color="
              getEmployementTypeColor(props.row.employment_type?.category)
            "
          >
            {{ props.row.employment_type?.category || "N/A" }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit Employment Type
            </q-tooltip>
            <!-- {{ props.row.employment_type }} -->
          </q-badge>
          <q-popup-edit
            v-model="employmentTypeId"
            @before-show="() => setEmploymentTypeId(props.row)"
            @save="(val) => updateEmploymentType(props.row, val)"
            buttons
            title="Edit Employment Type"
            v-slot="scope"
          >
            <!-- @before-show="(scope) => setEmploymentTypeId(props.row, scope)"
          @update:model-value="(val) => updateEmploymentType(props.row, val)"
          buttons
          title="Edit Employment Type"
          v-slot="scope" -->
            <!-- @update:model-value="(val) => updateEmploymentType(props.row, val)"
          @before-show="setEmploymentTypeId(props.row)"
          @save="
            (val) => {
              console.log('Selected ID:', val);
              updateEmploymentType(props.row, val);
            }
          "
          buttons
          title="Edit Employment Type"
          v-slot="scope" -->
            <q-select
              v-model="scope.value"
              @update:model-value="employmentTypeId"
              dense
              autofocus
              :options="employmentTypeOptions"
              option-label="label"
              option-value="value"
              behavior="menu"
            />
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-address="props">
        <q-td :props="props">
          <div>
            {{ capitalizeAddress(props.row.address) }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit Address
            </q-tooltip>
          </div>
          <q-popup-edit
            @update:model-value="(val) => updateEmployeeAddress(props.row, val)"
            v-model="props.row.address"
            buttons
            title="Edit Address"
            v-slot="scope"
          >
            <q-input
              class="text-capitalize"
              v-model="scope.value"
              dense
              autofocus
              counter
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-phone="props">
        <q-td :props="props">
          <div>
            {{ capitalizeAddress(props.row.phone) }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit Phone
            </q-tooltip>
          </div>
          <q-popup-edit
            @update:model-value="(val) => updateEmployeePhone(props.row, val)"
            v-model="props.row.phone"
            buttons
            title="Edit Phone"
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              dense
              autofocus
              mask="+(63) ### - ### - ####"
              counter
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-birthdate="props">
        <q-td :props="props">
          <div>
            {{ formatDate(props.row.birthdate) }}
            <q-tooltip class="bg-blue-grey-8" :offset="[10, 10]">
              Edit Birthdate
            </q-tooltip>
          </div>
          <q-popup-edit
            @update:model-value="
              (val) => updateEmployeeBirthdate(props.row, val)
            "
            v-model="props.row.birthdate"
            buttons
            title="Edit Birthdate"
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              dense
              autofocus
              type="date"
              hint="mm/dd/yyyy"
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <!-- <EmployeeEdit :edit="props" /> -->
            <!-- padding="xs md" -->
            <q-btn
              round
              dense
              size="md"
              color="black"
              icon="print"
              flat
              @click="handlePrintID(props.row)"
            >
              <q-tooltip class="bg-black" :delay="200"> Print </q-tooltip>
            </q-btn>
          </div>
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
  <q-dialog v-model="dialog" persistent>
    <q-card class="bg-gradient" style="width: 700px; max-width: 80vw">
      <div class="text-white q-ma-sm" align="right">
        <q-btn icon="close" flat dense round v-close-popup />
      </div>
      <div>
        <iframe :src="pdfUrl" width="100%" height="700px" />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import SearchEmployee from "./SearchEmployee.vue";
import { date, useQuasar } from "quasar";
import { useEmployeeStore } from "src/stores/employee";
import { useEmploymentTypeStore } from "src/stores/employment-type";
import { computed, onMounted, ref } from "vue";
import IDLogo from "../../../../../../assets/IDLogo.png";
import GB_LOGO from "../../../../../../assets/GB_LOGO.png";
import EmployeeEdit from "./EmployeeEdit.vue";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const employmentStore = useEmploymentTypeStore();
const employmentTypeOptions = ref([]);
const employeeStore = useEmployeeStore();
const employeeRows = computed(() => employeeStore.employees); // Computed property will automatically update when the store changes

const pagination = ref({
  rowsPerPage: 0,
});

console.log("employees fetch madepaker", employeeRows.value);

onMounted(async () => {
  await reloadTableData();
});

const fetchEmploymentTypeData = async () => {
  await employmentStore.fetchEmploymentType();
  employmentTypeOptions.value = employmentStore.employmentType.map((val) => ({
    label: val.category,
    value: val.id,
  }));
  console.log("Employment Type Options:", employmentTypeOptions.value);
};

onMounted(fetchEmploymentTypeData);

// Temporary ref for q-popup-edit
const employmentTypeId = ref(null);
// Function to set the initial employment type ID before editing

// Set the initial employment type ID before editing
const setEmploymentTypeId = (row) => {
  employmentTypeId.value = row.employment_type?.id || null;
  console.log("Initial employmentTypeId:", employmentTypeId.value);
};

// const setEmploymentTypeId = (row, scope) => {
//   // Set the initial value directly on `scope.value`
//   console.log("Row data:", row);
//   scope.value = row.employment_type?.id || null;
//   console.log("Initial employmentTypeId:", scope.value);
// };

// const setEmploymentTypeId = (row) => {
//   // Initialize employmentTypeId with the current ID of the employment type for the selected row
//   console.log("employmentTypeIdrowsss", row);
//   employmentTypeId.value = row.employment_type?.category || null;
//   console.log("employmentTypeId.value", employmentTypeId.value);
// };

console.log("====================================");
console.log("employmentTypeIdsss", employmentTypeId.value);
console.log("====================================");

const reloadTableData = async () => {
  try {
    employeeRows.value = await employeeStore.fetchEmployeeWithEmploymentType();
    console.log("fetchEmployeeWithEmploymentType", employeeRows.value);
  } catch (error) {
    console.log("employee madepaker", error);
  }
};
const formatDate = (dateString) => {
  return date.formatDate(dateString, "MMMM DD, YYYY");
};

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`;
};

const capitalizeAddress = (address) => {
  if (!address) return "";
  return address
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const updateEmployeeFullname = async (data, val) => {
  console.log("data", data);
  console.log("val", val);

  const employeeFullname = {
    id: data.id, // Use the employee's id from data
    firstname: val.firstname || data.firstname,
    middlename: val.middlename || data.middlename,
    lastname: val.lastname || data.lastname,
  };
  await employeeStore.updateEmployeeFullname(employeeFullname);
};

const updateEmploymentType = async (row, selectedId) => {
  console.log("updateEmploymentType triggered");
  console.log("row", row);
  console.log("New employment type ID:", selectedId);

  const updateEmployeesEmploymentType = {
    id: row.id,
    employment_type_id: selectedId.value,
  };
  await employeeStore.updateEmployeeEmploymentType(
    updateEmployeesEmploymentType
  );
};

// const updateEmploymentType = async (data, val) => {
//   console.log("row", data); // Log the row data
//   console.log("selectedId", val); // Log the selected employment type ID
// };

// const updateEmploymentType = async (row, selectedId) => {
//   console.log("row", row);
//   console.log("selectedId", selectedId);
// };
// try {
//   const response = await api.put(
//     `/api/update-employee-employment-type/${row.id}`,
//     {
//       employment_type_id: selectedId,
//     }
//   );
//   console.log("Employment type updated:", response.data);

//   // Update the row data with the selected employment type
//   const selectedType = employmentTypeOptions.value.find(
//     (option) => option.value === selectedId
//   );

//   if (selectedType) {
//     row.employment_type = {
//       id: selectedId,
//       category: selectedType.label,
//       salary: selectedType.salary,
//     };
//   }
// } catch (error) {
//   console.error("Error updating employment type:", error);
// }

const updateEmployeeAddress = async (data, val) => {
  console.log("data", data);
  console.log("val", val);

  const employeeAddress = {
    id: data.id,
    address: val,
  };

  await employeeStore.updateEmployeeAddress(employeeAddress);
};

const updateEmployeePhone = async (data, val) => {
  console.log("data", data);
  console.log("val", val);

  const employeePhone = {
    id: data.id,
    phone: val,
  };

  await employeeStore.updateEmployeePhone(employeePhone);
};

const updateEmployeeBirthdate = async (data, val) => {
  console.log("data", data);
  console.log("val", val);

  const employeeBirthdate = {
    id: data.id,
    birthdate: val,
  };

  await employeeStore.updateEmployeebirthdate(employeeBirthdate);
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
    field: "address",
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
  {
    name: "actions",
    align: "center",
    label: "Action",
    field: "actions",
  },
];

const $q = useQuasar();
const dialog = ref(false);
const pdfUrl = ref("");

const handlePrintID = (row) => {
  convertImageToBase64(IDLogo, (base64Image) => {
    convertImageToBase64(GB_LOGO, (base64Logo) => {
      const docDefinition = generateDocDefinition(row, base64Image, base64Logo);
      pdfMake.createPdf(docDefinition).getDataUrl((dataUrl) => {
        pdfUrl.value = dataUrl;
        dialog.value = true;
      });
    });
  });
};

const convertImageToBase64 = (url, callback) => {
  const reader = new FileReader();
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";
  xhr.onload = function () {
    if (xhr.status === 200) {
      reader.readAsDataURL(xhr.response);
      reader.onloadend = function () {
        callback(reader.result);
      };
    } else {
      console.error("Failed to load image.");
    }
  };
  xhr.send();
};

const generateDocDefinition = (employee, base64Image, base64Logo) => {
  return {
    pageSize: { width: 323, height: 204 },
    pageMargins: [0, 0, 0, 0],
    background: [
      {
        image: base64Logo, // Add logo as a watermark
        width: 140, // Adjust the size of the watermark as needed
        opacity: 0.1, // Set the opacity for a watermark effect
        absolutePosition: { x: 70, y: 15 }, // Position the watermark on the page
      },
    ],
    content: [
      {
        canvas: [
          {
            type: "rect",
            x: 0,
            y: 0,
            w: 260,
            h: 150,
            lineWidth: 1,
            lineColor: "black",
            dash: { length: 4 }, // Creates the broken line effect
          },
        ],
        absolutePosition: { x: 0, y: 0 },
      },
      {
        alignment: "justify",
        columns: [
          {
            image: base64Image,
            width: 100,
            height: 153,
            alignment: "left",
            margin: [-8, -4, 0, 0],
          },
          {
            stack: [
              {
                text: "GB Bakeshop",
                style: "header",
                color: "red",
                margin: [0, 0, 50, 0],
              },
              {
                text: `Name  : ${formatFullname(employee)}`,
                style: "name",
              },
              {
                text: `Position : ${employee.position}`,
                style: "position",
              },
              // {
              //   text: `Employment Type: ${employee.employment_type?.category}`,
              //   style: "info",
              // },
              {
                text: `Phone  : ${employee.phone}`,
                style: "info",
              },
              {
                qr: `${employee.id.toString()} - ${formatFullname(
                  employee
                )} - ${employee.position}`,
                fit: 87,
                foreground: "red",
                background: "yellow",
                margin: [30, 7, 0, 0],
              },
            ],
          },
        ],
      },
    ],
    styles: {
      header: {
        fontSize: 15,
        bold: true,
        alignment: "center",
        // margin: [5, 10, 0, 0],
      },
      name: {
        fontSize: 8,
        bold: true,
        margin: [5, 1, 0, 0],
      },
      position: {
        fontSize: 8,
        // italics: true,
        margin: [5, 2, 0, 0],
      },
      info: {
        fontSize: 7,
        margin: [5, 2, 0, 0],
      },
      address: {
        fontSize: 7,
        margin: [0, 5, 0, 0],
      },
    },
  };
};

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
.q-btn {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.bg-gradient {
  background: linear-gradient(135deg, #ff31c5, #471b3b);
}

.q-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.gradient-btn {
  border: 5px solid; /* Define border size */
  border-image-slice: 1;
  border-width: 2px; /* Adjust the width as needed */
  border-image-source: linear-gradient(
    45deg,
    #fc0165,
    #2575fc
  ); /* Use your gradient */
  background-color: transparent; /* Set background to transparent if needed */
}

.gradient-btn q-btn {
  background-color: white; /* Keep the button's background white */
  padding: sm md;
  font-size: 1rem;
  color: #000; /* Adjust text color */
}
</style>
