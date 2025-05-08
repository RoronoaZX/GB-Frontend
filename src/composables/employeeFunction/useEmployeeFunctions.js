// function to be use in the
// pages/administrator/payroll/panel-section/employees

import { date } from "quasar";
import { useEmployeeStore } from "src/stores/employee";

const employeeStore = useEmployeeStore();

export const updateEmployeeFullname = async (data, val) => {
  const employeeFullname = {
    id: data.id,
    firstname: val.firstname || data.firstname,
    middlename: val.middlename || data.middlename,
    lastname: val.lastname || data.lastname,
  };
  await employeeStore.updateEmployeeFullname(employeeFullname);
};

export const updateEmploymentType = async (row, selectedId) => {
  const updateEmployeesEmploymentType = {
    id: row.id,
    employment_type_id: selectedId.value,
  };
  await employeeStore.updateEmployeeEmploymentType(
    updateEmployeesEmploymentType
  );
};

export const updateEmployeeAddress = async (data, val) => {
  const employeeAddress = {
    id: data.id,
    address: val,
  };
  await employeeStore.updateEmployeeAddress(employeeAddress);
};

export const updateEmployeePhone = async (data, val) => {
  const employeePhone = {
    id: data.id,
    phone: val,
  };
  await employeeStore.updateEmployeePhone(employeePhone);
};

export const updateEmployeeBirthdate = async (data, val) => {
  const employeeBirthdate = {
    id: data.id,
    birthdate: val,
  };
  await employeeStore.updateEmployeebirthdate(employeeBirthdate);
};

export function formatFullname(row) {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

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
    name: "actions",
    align: "center",
    label: "Action",
    field: "actions",
  },
];

// Add any other functions like updateEmployeePhone, etc. here if they're reusable
