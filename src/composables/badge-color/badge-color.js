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

  const getTransactionBreadBadgeCategoryColor = (category) => {
    switch (category) {
      case "declined":
        return "red";
      case "received":
        return "green";
      case "pending":
        return "orange";
      default:
        return "grey";
    }
  };

  const currentTabIndicatorColor = (tabName) => {
    switch (tabName) {
      case "pendingReports":
        return "warning";
      case "confirmReports":
        return "green-13";
      case "declineReports":
        return "red-6";
      default:
        return "light-green-13";
    }
  };

  const getHeaderClass = (status) => {
    switch (status) {
      case "pending":
        return "pending-header";
      case "confirmed":
        return "confirm-header";
      case "declined":
        return "decline-header";
      case "process":
        return "process-header";
      case "completed":
        return "completed-header";
      case "to deliver":
        return "to-deliver-header";
      case "to receive":
        return "to-receive-header";
      case "received":
        return "receive-header";
      default:
        return "";
    }
  };

  const getUserBadgePositionColor = (role) => {
    switch (role) {
      case "Super Admin":
        return "blue-10"; // Royal Blue
      case "Admin":
        return "purple-10"; // Dark Purple
      case "Supervisor":
        return "teal-7"; // Teal
      case "Scaler":
        return "green-8"; // Dark Green
      case "Lamesador":
        return "orange-5"; // Orange
      case "Hornero":
        return "red-6"; // Red
      case "Baker":
        return "brown"; // Warm Brown (closest match in Quasar)
      case "Cake Maker":
        return "brown-4"; // Warm Brown (closest match in Quasar)
      case "Cashier":
        return "green-5"; // Light Green
      case "Sales Clerk":
        return "blue-5"; // Light Blue
      case "Utility":
        return "grey-7"; // Gray
      case "Not Yet Assigned":
        return "grey-4"; // Light Gray
      default:
        return "grey-4"; // Default Light Gray
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
    getTransactionBreadBadgeCategoryColor,
    currentTabIndicatorColor,
    getHeaderClass,
    getUserBadgePositionColor,
  };
}
