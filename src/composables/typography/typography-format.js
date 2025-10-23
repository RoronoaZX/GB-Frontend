import { date as quasarDate } from "quasar";

export function typographyFormat() {
  const capitalizeFirstLetter = (text) => {
    if (!text) return "";

    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatFullname = (row) => {
    const capitalize = (str) =>
      str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

    const firstname = row.firstname
      ? capitalize(row.firstname)
      : "No Firstname";
    const middlename = row.middlename
      ? capitalize(row.middlename).charAt(0) + "."
      : "";
    const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

    return `${firstname} ${middlename} ${lastname}`;
  };

  const formatTimestamp = (val) => {
    return quasarDate.formatDate(val, "MMM DD, YYYY || hh:mm A");
  };

  const formatQuantity = (quantity, unit) => {
    if (unit === "Pcs") {
      return `${quantity} pcs`; // Keep as is for pieces
    }

    if (unit === "Grams") {
      if (quantity >= 1000) {
        let kg = quantity / 1000;
        let formattedKg =
          kg % 1 === 0 ? kg.toString() : kg.toString().replace(/^0+/, "");
        return `${formattedKg} kgs`;
      }
      return `${quantity} g`;
    }

    return `${quantity} ${unit}`; // Default case if unit is different
  };

  const formatRequestQuantity = (quantity) => {
    const num = Number(quantity); // Convert to number
    if (isNaN(num)) return ""; // Handle invalid values

    if (num % 1 === 0) {
      return num.toString(); // Whole numbers (remove decimals)
    }
    return num.toString(); // Keep decimals as is
  };

  return {
    capitalizeFirstLetter,
    formatFullname,
    formatTimestamp,
    formatQuantity,
    formatRequestQuantity,
  };
}
