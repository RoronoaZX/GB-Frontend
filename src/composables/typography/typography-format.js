import { date as quasarDate, date } from "quasar";

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

  const formatDate = (dateString) => {
    return date.formatDate(dateString, "MMMM DD, YYYY");
  };

  const formatTime = (dateString) => {
    return date.formatDate(dateString, "hh:mm A");
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

  const formatPricePerGram = (val) => {
    if (val == null) return "No Price";
    // return `₱${parseFloat(val).toFixed(2)}`
    return `₱${Number(val).toFixed(4)}`; // always show 2 decimals
  };

  const formatPrice = (val) => {
    if (val == null) return "No Price";
    // return `₱${parseFloat(val).toFixed(2)}`
    return `₱ ${Number(val).toFixed(2)}`; // always show 2 decimals
  };

  const formatRecipeTarget = (target) => {
    const numericTarget = Number(target) || 0;

    return parseFloat(numericTarget.toFixed(3)).toString();
  };

  const trimTrailingZeros = (value) => {
    if (value == null || isNaN(value)) return 0;
    return parseFloat(parseFloat(value).toString());
  };

  const getRecipeBadgeStatusColor = (status) => {
    switch (status) {
      case "inactive":
        return "grey";
      case "active":
        return "green";
      default:
        return "grey";
    }
  };

  return {
    capitalizeFirstLetter,
    formatFullname,
    formatDate,
    formatTime,
    formatTimestamp,
    formatQuantity,
    formatRequestQuantity,
    formatPricePerGram,
    formatPrice,
    formatRecipeTarget,
    getRecipeBadgeStatusColor,
    trimTrailingZeros,
  };
}
