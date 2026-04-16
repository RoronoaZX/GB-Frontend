/**
 * Mock leave request data for testing and documentation
 * Sample leave objects with all required and optional properties
 */

export const mockLeaveData = {
  // Sample Leave Request #1: Pending Sick Leave
  sample1: {
    id: 1,
    status: "pending",
    leave_type: "Sick Leave",
    type: "Sick Leave",
    reason: "Family illness - mother hospitalized",
    start_date: "2026-04-20",
    end_date: "2026-04-22",
    duration_value: 3,
    duration_type: "days",
    created_at: "2026-04-15T09:30:00Z",
    requested_at: "2026-04-15T09:30:00Z",
    handled_by: null,
    branch: { id: 1, name: "Main Branch", location: "Downtown" },
    employee: {
      id: 101,
      firstname: "Jane",
      lastname: "Doe",
      middlename: "Marie",
      position: "Baker",
      sex: "Female",
      phone: "+63-9-661-5819",
      email: "jane.doe@bakeshop.com",
      avatar: null,
      branch: { id: 1, name: "Main Branch" },
    },
  },

  // Sample Leave Request #2: Approved Vacation
  sample2: {
    id: 2,
    status: "approved",
    leave_type: "Vacation",
    type: "Vacation",
    reason: "Family vacation to Boracay",
    start_date: "2026-05-01",
    end_date: "2026-05-07",
    duration_value: 7,
    duration_type: "days",
    created_at: "2026-04-10T14:20:00Z",
    requested_at: "2026-04-10T14:20:00Z",
    handled_by: "Maria Santos - Supervisor",
    branch: { id: 1, name: "Main Branch", location: "Downtown" },
    employee: {
      id: 102,
      firstname: "John",
      lastname: "Smith",
      middlename: "Robert",
      position: "Cake Maker",
      sex: "Male",
      phone: "+63-9-123-4567",
      email: "john.smith@bakeshop.com",
      avatar: null,
      branch: { id: 1, name: "Main Branch" },
    },
  },

  // Sample Leave Request #3: Rejected Leave
  sample3: {
    id: 3,
    status: "rejected",
    leave_type: "Emergency Leave",
    type: "Emergency Leave",
    reason: "Personal emergency",
    start_date: "2026-04-18",
    end_date: "2026-04-18",
    duration_value: 1,
    duration_type: "day",
    created_at: "2026-04-17T16:45:00Z",
    requested_at: "2026-04-17T16:45:00Z",
    handled_by: "Maria Santos - Supervisor",
    branch: { id: 1, name: "Main Branch", location: "Downtown" },
    employee: {
      id: 103,
      firstname: "Maria",
      lastname: "Garcia",
      middlename: "Ines",
      position: "Sales Clerk",
      sex: "Female",
      phone: "+63-9-987-6543",
      email: "maria.garcia@bakeshop.com",
      avatar: null,
      branch: { id: 1, name: "Main Branch" },
    },
  },

  // Sample Leave Request #4: Cancelled Leave
  sample4: {
    id: 4,
    status: "cancelled",
    leave_type: "Maternity Leave",
    type: "Maternity Leave",
    reason: "Maternity",
    start_date: "2026-06-01",
    end_date: "2026-08-31",
    duration_value: 92,
    duration_type: "days",
    created_at: "2026-03-20T10:00:00Z",
    requested_at: "2026-03-20T10:00:00Z",
    handled_by: "HR - Cancelled by Employee Request",
    branch: { id: 2, name: "Branch North", location: "North District" },
    employee: {
      id: 104,
      firstname: "Ana",
      lastname: "Castro",
      middlename: "Sophia",
      position: "Cashier",
      sex: "Female",
      phone: "+63-9-456-7890",
      email: "ana.castro@bakeshop.com",
      avatar: null,
      branch: { id: 2, name: "Branch North" },
    },
  },

  // Sample Leave Request #5: Pending with Long Duration
  sample5: {
    id: 5,
    status: "pending",
    leave_type: "Special Leave",
    type: "Special Leave",
    reason: "Additional rest and recuperation leave",
    start_date: "2026-07-15",
    end_date: "2026-07-29",
    duration_value: 15,
    duration_type: "days",
    created_at: "2026-04-14T08:15:00Z",
    requested_at: "2026-04-14T08:15:00Z",
    handled_by: null,
    branch: { id: 1, name: "Main Branch", location: "Downtown" },
    employee: {
      id: 105,
      firstname: "Robert",
      lastname: "Johnson",
      middlename: "Michael",
      position: "Baker",
      sex: "Male",
      phone: "+63-9-555-6666",
      email: "robert.johnson@bakeshop.com",
      avatar: null,
      branch: { id: 1, name: "Main Branch" },
    },
  },
};

/**
 * Get all mock leave requests
 */
export const getAllMockLeaves = () => Object.values(mockLeaveData);

/**
 * Get mock leaves filtered by status
 */
export const getMockLeavesByStatus = (status) =>
  getAllMockLeaves().filter(
    (leave) => leave.status.toLowerCase() === String(status || "").toLowerCase()
  );

/**
 * Get mock leaves for testing search functionality
 */
export const searchMockLeaves = (query = "") => {
  const term = String(query).toLowerCase();
  return getAllMockLeaves().filter((leave) => {
    const emp = leave.employee || {};
    return (
      emp.firstname?.toLowerCase().includes(term) ||
      emp.lastname?.toLowerCase().includes(term) ||
      emp.position?.toLowerCase().includes(term) ||
      leave.reason?.toLowerCase().includes(term) ||
      leave.leave_type?.toLowerCase().includes(term)
    );
  });
};

/**
 * Get statistics from mock data
 */
export const getMockLeaveStats = () => {
  const leaves = getAllMockLeaves();
  return {
    total: leaves.length,
    pending: getMockLeavesByStatus("pending").length,
    approved: getMockLeavesByStatus("approved").length,
    rejected: getMockLeavesByStatus("rejected").length,
    cancelled: getMockLeavesByStatus("cancelled").length,
  };
};
