export function badgeColor() {
  const getStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "pending":
        return "warning";
      case "in progress":
        return "blue-7";
      case "confirmed":
        return "positive";
      case "declined":
        return "negative";
      default:
        return "grey-6";
    }
  };

  const getRawMaterialBadgeCategoryColor = (category) => {
    switch (category) {
      case "Ingredients":
        return "teal";
      case "Packaging Materials":
        return "brown-6";
      default:
        return "grey";
    }
  };

  const getRawMaterialsBadgeUnitColor = (unit) => {
    switch (unit) {
      case "Grams":
        return "info";
      case "Pcs":
        return "accent";
      default:
        return "grey";
    }
  };

  const getRecipeBadgeCategoryColor = (category) => {
    switch (category) {
      case "Filling":
        return "teal";
      case "Dough":
        return "brown-6";
      default:
        return "grey";
    }
  };

  const getWarehouseStatusBadgeColor = (status) => {
    return status === "Open" ? "info" : "accent";
  };

  const getPremixBadgeStatusColor = (status) =>
    ({
      pending: "warning",
      declined: "red-6",
      confirmed: "green",
      process: "primary",
      completed: "dark",
      "to deliver": "brown-9",
      "to receive": "amber-10",
      received: "secondary",
    }[status] || "grey");

  const getBranchBadgeStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "info";
      case "Open soon":
        return "warning";
      case "Close":
        return "accent";
      default:
        return "grey";
    }
  };

  const getProductBadgeCategoryColor = (category) => {
    switch (category) {
      case "Bread":
        return "brown";
      case "Selecta":
        return "red-6";
      case "Softdrinks":
        return "accent";
      default:
        return "grey";
    }
  };

  const getPremixBadgeActiveInactiveStatusColor = (status) => {
    if (status === "active") {
      return "teal-5";
    } else if (status === "inactive") {
      return "negative";
    }
  };

  return {
    getStatusColor,
    getRawMaterialBadgeCategoryColor,
    getRawMaterialsBadgeUnitColor,
    getRecipeBadgeCategoryColor,
    getWarehouseStatusBadgeColor,
    getPremixBadgeStatusColor,
    getBranchBadgeStatusColor,
    getProductBadgeCategoryColor,
    getPremixBadgeActiveInactiveStatusColor,
  };
}
