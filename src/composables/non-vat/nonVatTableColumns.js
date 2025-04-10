// src/composables/useBirReportTableColumns.js
import { date as quasarDate } from "quasar";

const formatDate = (dateString) => {
  return quasarDate.formatDate(dateString, "MMMM D, YYYY");
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
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

/**
 * Returns the column definitions for the Bir Reports table.
 */
export function useBirReportTableColumns() {
  const columns = [
    {
      name: "inputted_by",
      label: "Inputted By",
      align: "center",
      field: (row) => formatFullname(row?.user?.employee || "No User"),
    },
    {
      name: "created_at",
      label: "Date",
      align: "center",
      field: (row) => row.created_at,
      format: formatDate,
    },
    {
      name: "receipt_no",
      label: "Receipt No.",
      align: "center",
      field: (row) => row.receipt_no,
    },
    {
      name: "description",
      label: "Description",
      align: "center",
      field: (row) => row.description,
      format: (val) => val.toUpperCase(),
    },
    {
      name: "address",
      label: "Address",
      align: "center",
      field: (row) => row.address,
      format: (val) => val.toUpperCase(),
    },
    {
      name: "tin_no",
      label: "TIN No.",
      align: "center",
      field: (row) => row.tin_no,
    },
    {
      name: "amount",
      label: "Gross",
      align: "center",
      field: (row) => formatPrice(row.amount),
    },
    {
      name: "purchase",
      label: "Purchase",
      align: "center",
      field: (row) => formatPrice((row.amount / 1.12).toFixed(2)),
    },
    {
      name: "input_tax",
      label: "Input Tax",
      align: "center",
      field: (row) => formatPrice(((row.amount / 1.12) * 0.12).toFixed(2)),
    },
  ];

  const pagination = {
    rowsPerPage: 0,
  };

  return {
    columns,
    pagination,
  };
}
