// function to be use in the
// pages/administrator/payroll/panel-section/employees

import { date, Loading, Notify } from "quasar";
import { useEmployeeStore } from "src/stores/employee";
import { useBranchesStore } from "src/stores/branch";
import { useWarehousesStore } from "src/stores/warehouse";
import { useEmploymentTypeStore } from "src/stores/employment-type";
import { computed, onMounted, ref } from "vue";

const employeeStore = useEmployeeStore();
const branchesStore = useBranchesStore();
const warehousesStore = useWarehousesStore();
const employmentStore = useEmploymentTypeStore();

const branchList = computed(() => branchesStore.branches);
const warehouseList = computed(() => warehousesStore.warehouses);
const employmentTypeList = computed(() => employmentStore.employmentType);

export const getOptions = (row) => {
  if (!row?.designation?.designation_type) return [];

  return row.designation.designation_type === "branch"
    ? branchList.value
    : warehouseList.value;
};

export const getEmploymentTypeOptions = (row) => {
  return;
};

const fetchBranchesData = async () => {
  const branch = await branchesStore.fetchBranches();
};

onMounted(fetchBranchesData);

const fetchWarehouseData = async () => {
  const warehouse = await warehousesStore.fetchWarehouses();
};

onMounted(fetchWarehouseData);

const fetchEmploymentTypeData = async () => {
  await employmentStore.fetchEmploymentType();
  console.log("employmentTypeList.value", employmentTypeList.value);
};

onMounted(fetchEmploymentTypeData);

export const employmentTypeOptions = computed(() =>
  employmentTypeList.value.map((type) => ({
    label: type.category, // shown in dropdown
    value: type.id, // selected value sent to API
  }))
);

export const tableLoading = ref(false);

export const updateEmployeeFullname = async (data, val) => {
  tableLoading.value = true;
  try {
    const employeeFullname = {
      id: data.id,
      firstname: val.firstname || data.firstname,
      middlename: val.middlename || data.middlename,
      lastname: val.lastname || data.lastname,
    };
    await employeeStore.updateEmployeeFullname(employeeFullname);
    Notify.create({
      message: "Fullname updated successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
  } catch (error) {
    console.error("Error updating fullname:", error);
    Notify.create({
      message: "Failed to update amount",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  } finally {
    tableLoading.value = false;
  }
};

export const updateEmploymentType = async (employmenTypeOgj, val, reloadFn) => {
  console.log("✅ employmenTypeOgj() calledsss!");
  console.log("🧩 New employmenTypeOgj ID:", val);
  console.log("📦 Original employmenTypeOgj object:", employmenTypeOgj);

  tableLoading.value = true;

  try {
    const employmentType = {
      employee_id: employmenTypeOgj.id,
      employment_type_id: val,
    };

    console.log("update employmentType", employmentType);
    await employeeStore.updateEmployeeEmploymentType(employmentType);

    if (typeof reloadFn === "function") {
      reloadFn();
    }
  } catch (error) {
    console.log(error);
  } finally {
    tableLoading.value = false;
  }

  // try {
  //   const updateEmployeesEmploymentType = {
  //     id: row.id,
  //     employment_type_id: selectedId.value,
  //   };
  //   await employeeStore.updateEmployeeEmploymentType(
  //     updateEmployeesEmploymentType
  //   );
  //   Notify.create({
  //     message: "Employment type updated successfully",
  //     color: "positive",
  //     position: "top",
  //     timeout: 2000,
  //   });
  // } catch (error) {
  //   console.error("Error updating employment type:", error);
  //   Notify.create({
  //     message: "Failed to update employment type",
  //     color: "negative",
  //     position: "top",
  //     timeout: 2000,
  //   });
  // } finally {
  //   tableLoading.value = false;
  // }
};

export const updateEmployeePosition = async (data, val) => {
  tableLoading.value = true;
  try {
    const employeePosition = {
      id: data.id,
      position: val,
    };
    await employeeStore.updatedEmployeePosition(employeePosition);
  } catch (error) {
    console.error("Error updating position:", error);

    Notify.create({
      message: "Failed to update position",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  } finally {
    tableLoading.value = false;
  }
};

export const updateEmployeeAddress = async (data, val) => {
  tableLoading.value = true;
  try {
    const employeeAddress = {
      id: data.id,
      address: val,
    };
    await employeeStore.updateEmployeeAddress(employeeAddress);
    Notify.create({
      message: "Address updated successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    Notify.create({
      message: "Failed to update address",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  } finally {
    tableLoading.value = false;
  }
};

export const updateEmployeePhone = async (data, val) => {
  tableLoading.value = true;
  try {
    const employeePhone = {
      id: data.id,
      phone: val,
    };
    await employeeStore.updateEmployeePhone(employeePhone);
    Notify.create({
      message: "Phone number updated successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
  } catch (error) {
    console.error("Error updating phone number:", error);
    Notify.create({
      message: "Failed to update phone number",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  } finally {
    tableLoading.value = false;
  }
};

export const updateEmployeeBirthdate = async (data, val) => {
  tableLoading.value = true;
  try {
    const employeeBirthdate = {
      id: data.id,
      birthdate: val,
    };
    await employeeStore.updateEmployeebirthdate(employeeBirthdate);
    Notify.create({
      message: "Birthdate updated successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
  } catch (error) {
    Notify.create({
      message: "Failed to update birthdate",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  } finally {
    tableLoading.value = false;
  }
};

export const updateEmployeeDesignation = async (
  designationObj,
  val,
  reloadFn
) => {
  console.log("✅ updateEmployeeDesignation() calledsss!");
  console.log("🧩 New designation ID:", val);
  console.log("📦 Original designation object:", designationObj);

  tableLoading.value = true;
  try {
    const employeeDesignation = {
      id: designationObj.designation_type_id,
      designation_id: val,
      designation_type: designationObj.designation_type,
    };

    console.log("Employee Designation:", employeeDesignation);
    await employeeStore.updateEmployeeDesignation(employeeDesignation);

    // ✅ Call reload function after successful update
    if (typeof reloadFn === "function") {
      reloadFn();
    }
  } catch (error) {
    console.log("designation error:", error);
  } finally {
    tableLoading.value = false;
  }
};

// export const updateEmployeeDesignation = async (designationObj, val) => {
//   console.log("✅ updateEmployeeDesignation() calledsss!");
//   console.log("🧩 New designation ID:", val);
//   console.log("📦 Original designation object:", designationObj);

//   tableLoading.value = true;
//   try {
//     const employeeDesignation = {
//       id: designationObj.designation_type_id,
//       designation_id: val,
//       designation_type: designationObj.designation_type,
//     };

//     console.log("Employee Designation:", employeeDesignation);
//     await employeeStore.updateEmployeeDesignation(employeeDesignation);
//   } catch (error) {
//     console.log("desognation error:", error);
//   } finally {
//     tableLoading.value = false;
//   }
// };
export const updateEmployeeTimeIn = async (data, val) => {
  console.log("updateEmployeeTimeIn composables", data, val);
  tableLoading.value = true;
  try {
    const employeeTimeIn = {
      designation_type: data.designation_type,
      designation_id: data.designation_type_id,
      time_in: val,
    };
    await employeeStore.updateEmployeeTimeIn(employeeTimeIn);
  } catch (error) {
    console.error("Error updating time in:", error);
  } finally {
    tableLoading.value = false;
  }
};

export const updateEmployeeTimeOut = async (data, val) => {
  console.log("updateEmployeeTimeOut composables", data, val);
  tableLoading.value = true;
  try {
    const employeeTimeOut = {
      designation_type: data.designation_type,
      designation_id: data.designation_type_id,
      time_out: val,
    };
    await employeeStore.updateEmployeeTimeOut(employeeTimeOut);
    Notify.create({
      message: "Time OUT updated successfully",
      color: "positive",
      position: "top",
      timeout: 2000,
    });
  } catch (error) {
    console.error("Error updating time out:", error);
    Notify.create({
      message: "Failed to update amount",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  } finally {
    tableLoading.value = false;
  }
};

export const validateTimeFormat = (val) => {
  // Regex to match "HH:MM AM/PM" format.
  // HH: 01-12
  // MM: 00-59
  // AM/PM: AM or PM
  const timeRegex = /^(0[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/;
  return (
    timeRegex.test(val) || "Time format must be HH:MM AM/PM (e.g., 01:00 AM)"
  );
};

export function formatFullname(row) {
  const capitalizeWords = (str) =>
    str
      ? str
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "";

  const firstname = row.firstname
    ? capitalizeWords(row.firstname)
    : "No Firstname";
  const middlename = row.middlename
    ? capitalizeWords(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalizeWords(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`;
}

export function capitalizeAddress(address) {
  if (!address) return "";
  return address
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function formatDate(dateString) {
  return date.formatDate(dateString, "MMMM DD, YYYY");
}
export const getEmployementTypeColor = (employmentType) => {
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
export const employeeColumns = [
  {
    name: "fullname",
    required: true,
    label: "Full Name",
    align: "left",
    field: (row) => formatFullname(row),
    format: (val) => `${val}`,
    sortable: true,
    style: "position: sticky; left: 0 ; background: white; z-index: 1;",
    headerStyle: "position: sticky; left: 0; background: white; z-index: 2;",
  },
  {
    name: "position",
    required: true,
    label: "Position",
    align: "center",
    field: "position",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "employmentType",
    label: "Employment Type",
    align: "center",
    field: (row) => row.employment_type.category || "N/A",
    format: (val) => `${val}`,
  },

  {
    name: "address",
    required: true,
    label: "Address",
    align: "left",
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
    name: "designation",
    required: true,
    label: "Designation",
    align: "center",
    field: (row) => row.designation?.name || "N/A",
    sortable: true,
  },
  {
    name: "time_in",
    required: true,
    label: "Time In",
    align: "center",
    field: (row) => row.designation?.time_in || "N/A",
    sortable: true,
  },
  {
    name: "time_out",
    required: true,
    label: "Time Out",
    align: "center",
    field: (row) => row.designation?.time_out || "N/A",
    sortable: true,
  },
  {
    name: "actions",
    align: "center",
    label: "Action",
    field: "actions",
  },
];

// Add any other functions like updateEmployeePhone, etc. here if they're reusable
