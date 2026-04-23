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
    if (!unit) return `${quantity}`;

    const normalizedUnit = unit.toLowerCase();

    if (normalizedUnit === "pcs" || normalizedUnit === "piece" || normalizedUnit === "pieces") {
      return `${quantity} pcs`;
    }

    if (normalizedUnit === "grams" || normalizedUnit === "g" || normalizedUnit === "gram") {
      const kg = Number(quantity) / 1000;
      // If it's a whole number or simple decimal, trim it
      const formattedKg = parseFloat(kg.toFixed(3));
      return `${formattedKg} kg`;
    }

    if (normalizedUnit === "kg" || normalizedUnit === "kilogram" || normalizedUnit === "kilograms") {
      return `${trimTrailingZeros(quantity)} kg`;
    }

    return `${quantity} ${unit}`;
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
