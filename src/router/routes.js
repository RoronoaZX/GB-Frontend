const routes = [
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/login/LoginPage.vue"),
      },
    ],
  },

  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "dashboard",
        component: () =>
          import(
            "pages/administrator/dashboard/AdministratorDashboardPage.vue"
          ),
      },
      {
        path: "raw_materials",
        component: () =>
          import("pages/administrator/raw_materials/RawMaterialsPage.vue"),
      },
      {
        path: "bir_reports",
        component: () =>
          import("pages/administrator/bir-reports/BirReportsPage.vue"),
      },
      {
        path: "recipe",
        component: () => import("pages/administrator/recipe/RecipePage.vue"),
      },
      {
        path: "warehouse",
        component: () =>
          import("pages/administrator/warehouse/WarehousePage.vue"),
      },
      {
        path: "branches",
        component: () =>
          import("pages/administrator/branches/BranchesPage.vue"),
      },
      {
        path: "branch/:branch_id",
        component: () =>
          import("pages/administrator/branches/id/BranchIdPage.vue"),
        name: "BranchDetail",
      },
      {
        path: "warehouse/:warehouse_id",
        component: () =>
          import("pages/administrator/warehouse/id/WarehouseIdPage.vue"),
        name: "WarehouseDetail",
      },
      {
        path: "products",
        component: () =>
          import("pages/administrator/products/ProductsPage.vue"),
      },
      {
        path: "users",
        component: () => import("pages/administrator/users/UsersPage.vue"),
      },
      {
        path: "users/:user_id",
        component: () => import("pages/administrator/users/id/UserIdPage.vue"),
        name: "UserIdPage",
      },
      {
        path: "payroll",
        component: () => import("pages/administrator/payroll/PayrollPage.vue"),

        children: [
          // When a user navigates to /admin/payroll, automatically redirect them to the dashboard tab.
          {
            path: "",
            redirect: {
              name: "admin-payroll-dashboard",
            },
          },
          // Route for the Dashboard Tab
          {
            path: "dashboard",
            name: "admin-payroll-dashboard",
            component: () =>
              import(
                "pages/administrator/payroll/panel-section/dashboard/DashboardPage.vue"
              ),
          },
          // Route for the Employees Tab
          {
            path: "employees",
            name: "admin-payroll-employees",
            component: () =>
              import(
                "pages/administrator/payroll/panel-section/employees/EmployeesPage.vue"
              ),
          },
          // Route for the Attendance Tab
          {
            path: "attendance",
            name: "admin-payroll-attendance",
            component: () =>
              import(
                "pages/administrator/payroll/panel-section/attendance/AttendancePage.vue"
              ),
            children: [
              {
                path: "",
                redirect: {
                  name: "admin-payroll-attendance-dtr-overview",
                },
              },
              {
                path: "dtr-overview",
                name: "admin-payroll-attendance-dtr-overview",
                component: () =>
                  import(
                    "pages/administrator/payroll/panel-section/attendance/sections/dtr-overview/AttendanceTable.vue"
                  ),
              },
              {
                path: "attendance-summary",
                name: "admin-payroll-attendance-summary",
                component: () =>
                  import(
                    "pages/administrator/payroll/panel-section/attendance/sections/attendance-summary/AttendanceSummary.vue"
                  ),
              },
            ],
          },
          // Route for the Allowances & Deductions Tab
          {
            path: "allowances_deductions",
            name: "admin-payroll-allowances-deductions",
            component: () =>
              import(
                "pages/administrator/payroll/panel-section/allowance-deduction/AllowanceDeductionPage.vue"
              ),
            children: [
              {
                path: "",
                redirect: {
                  name: "admin-payroll-allowances-deductions-allowances",
                },
              },
              {
                path: "allowances_deductions_allowances",
                name: "admin-payroll-allowances-deductions-allowances",
                component: () =>
                  import(
                    "pages/administrator/payroll/panel-section/allowance-deduction/allowance-section/AllowanceTable.vue"
                  ),
              },
              {
                path: "allowances_deductions_benefits",
                name: "admin-payroll-allowances-deductions-benefits",
                component: () =>
                  import(
                    "pages/administrator/payroll/panel-section/allowance-deduction/benefits-section/BenefitsTable.vue"
                  ),
              },
              {
                path: "allowances_deductions_uniforms",
                name: "admin-payroll-allowances-deductions-uniforms",
                component: () =>
                  import(
                    "pages/administrator/payroll/panel-section/allowance-deduction/uniform-section/UniformTable.vue"
                  ),
              },
              {
                path: "allowances_deductions_cash_advance",
                name: "admin-payroll-allowances-deductions-cash-advance",
                component: () =>
                  import(
                    "pages/administrator/payroll/panel-section/allowance-deduction/cash-advance-section/CashAdvanceTable.vue"
                  ),
              },
            ],
          },
          // Route for the Payslips tab
          {
            path: "payslip",
            name: "admin-payroll-payslip",
            component: () =>
              import(
                "pages/administrator/payroll/panel-section/payslip/PayslipPage.vue"
              ),
          },
        ],
      },
      {
        path: "payslip/payroll/employee/:employee_id",
        name: "EmployeeProfile",
        component: () =>
          import(
            "pages/administrator/payroll/panel-section/payslip/details/ViewDetails.vue"
          ),
        children: [
          {
            path: "",
            redirect: {
              name: "employee-profile-page",
            },
          },
          {
            path: "details",
            name: "employee-profile-page",
            component: () =>
              import(
                "pages/administrator/payroll/panel-section/payslip/details/components/personal-info/PersonalInfoPage.vue"
              ),
          },
          {
            path: "time-management-dashboard",
            name: "payslip-payroll-time-management-dashboard",
            component: () =>
              import(
                "pages/administrator/payroll/panel-section/payslip/details/components/time-management/TimeManagementDashboard.vue"
              ),
          },
          {
            path: "payroll",
            name: "employee-payroll-page",
            component: () =>
              import(
                "pages/administrator/payroll/panel-section/payslip/details/components/payroll/EmployeePayroll.vue"
              ),
          },
        ],
      },
      {
        path: "devices",
        component: () => import("pages/devices/DevicesPage.vue"),
      },
      {
        path: "history_log",
        component: () =>
          import("pages/administrator/history_log/HistoryLogPage.vue"),
      },
    ],
  },

  {
    path: "/supervisor",
    meta: { requiresAuth: true },
    component: () => import("layouts/SupervisorLayout.vue"),
    children: [
      {
        path: "reports",
        component: () => import("pages/supervisor/report/ReportPage.vue"),
      },
      {
        path: "dtr",
        component: () => import("pages/supervisor/dtr/DailyTimeRecordPage.vue"),
      },
      {
        path: "employee",
        component: () => import("pages/supervisor/employees/EmployeesPage.vue"),
      },
    ],
  },
  {
    path: "/branch/sales_lady",
    meta: { requiresAuth: true },
    component: () => import("layouts/SalesLadyLayout.vue"),
    children: [
      {
        path: "",
        meta: { requiresAuth: true },
        component: () =>
          import("pages/branch/sales_lady/analytics/AnalyticsPage.vue"),
      },
      {
        path: "products",
        meta: { requiresAuth: true },
        component: () =>
          import("pages/branch/sales_lady/products/ProductsPage.vue"),
      },
      {
        path: "bakers_report",
        component: () =>
          import("pages/branch/sales_lady/bakers_report/BakersReportPage.vue"),
      },
      {
        path: "cake_report",
        component: () =>
          import("pages/branch/sales_lady/cake_report/CakeReportPage.vue"),
      },
      {
        path: "report",
        component: () =>
          import("pages/branch/sales_lady/report/ReportPage.vue"),
      },
      {
        path: "history_logs",
        component: () =>
          import("pages/branch/sales_lady/history_logs/HistoryLogsPage.vue"),
      },
      {
        path: "account",
        component: () =>
          import("pages/branch/sales_lady/account/AccountPage.vue"),
      },
    ],
  },
  {
    path: "/branch/baker",
    meta: { requiresAuth: true },
    component: () => import("layouts/BakersLayout.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("pages/branch/baker/raw_materials/RawMaterialsPage.vue"),
      },
      {
        path: "transaction",
        component: () =>
          import("pages/branch/baker/transaction/TransactionPage.vue"),
      },
      {
        path: "premix",
        component: () => import("pages/branch/baker/premix/PremixPage.vue"),
      },
      {
        path: "report",
        component: () => import("pages/branch/baker/report/ReportPage.vue"),
      },
      {
        path: "account",
        component: () => import("pages/branch/baker/account/AccountPage.vue"),
      },
      {
        path: "create_report",
        component: () =>
          import("pages/branch/baker/report/id/ReportIdCreatePage.vue"),
      },
    ],
  },
  {
    path: "/branch/cake_maker",
    meta: { requiresAuth: true },
    component: () => import("layouts/CakeMakerLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/branch/cake_maker/cake/CakePage.vue"),
      },
      {
        path: "raw_materials",
        component: () =>
          import("pages/branch/cake_maker/raw_materials/RawMaterialsPage.vue"),
      },
      {
        path: "report",
        component: () =>
          import("pages/branch/cake_maker/report/ReportPage.vue"),
      },
      {
        path: "create_report",
        component: () =>
          import("pages/branch/cake_maker/report/id/ReportCreateIdPage.vue"),
      },
    ],
  },
  {
    path: "/warehouse",
    component: () => import("layouts/WarehouseLayout.vue"),
    children: [
      {
        path: "",
        component: () =>
          import(
            "pages/warehouse/transactions/warehouseTransactionHistory.vue"
          ),
      },
      {
        path: "ingredients",
        component: () =>
          import("pages/warehouse/ingredients/WarehouseIngredients.vue"),
      },
      {
        path: "scalling_section",
        component: () =>
          import(
            "pages/warehouse/scalling_section/WarehouseScallingSection.vue"
          ),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
