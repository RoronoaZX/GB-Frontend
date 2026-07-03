import { useQuasar } from "quasar";

export function badgeColor() {
  const $q = useQuasar();

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
      case "Nestle":
        return "blue-6";
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
    const isDark = $q.dark.isActive;
    switch (role) {
      case "Super Admin":
        return isDark ? "indigo-3" : "blue-10"; // Light indigo vs Royal Blue
      case "Admin":
        return isDark ? "purple-3" : "purple-10"; // Light Purple vs Dark Purple
      case "Supervisor":
        return isDark ? "teal-4" : "teal-7"; // Light Teal vs Dark Teal
      case "Scaler":
        return isDark ? "green-4" : "green-8"; // Light Green vs Dark Green
      case "Lamesador":
        return isDark ? "orange-4" : "orange-5"; // Light Orange vs Orange
      case "Hornero":
        return isDark ? "red-4" : "red-6"; // Light Red vs Red
      case "Baker":
        return isDark ? "amber-3" : "brown"; // Light Amber vs Warm Brown
      case "Cake Maker":
        return isDark ? "amber-4" : "brown-4"; // Light Amber vs Warm Brown
      case "Cashier":
        return isDark ? "green-3" : "green-5"; // Light Green vs Green
      case "Sales Clerk":
        return isDark ? "blue-3" : "blue-5"; // Light Blue vs Blue
      case "Utility":
        return isDark ? "grey-4" : "grey-7"; // Gray
      case "Not Yet Assigned":
        return isDark ? "grey-5" : "grey-4"; // Light Gray
      default:
        return isDark ? "grey-5" : "grey-4"; // Default
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
