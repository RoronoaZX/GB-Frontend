<template>
  <div class="cutoff-summary-container q-pa-md">
    <!-- Top Action Bar -->
    <div class="q-mb-lg">
      <q-card flat bordered class="q-pa-md bg-white rounded-card shadow-sm">
        <div class="row items-center justify-between q-col-gutter-md">
          <!-- Left: Cut-off Period Selector -->
          <div class="col-12 col-md-5 flex items-center q-gap-md no-wrap">
            <q-select
              outlined
              dense
              v-model="selectedPeriod"
              :options="periodOptions"
              label="Select Cut-off Period"
              class="bg-white col-grow rounded-borders"
              emit-value
              map-options
              @update:model-value="onPeriodChange"
              :loading="loadingPeriods"
            >
              <template v-slot:prepend>
                <q-icon name="date_range" color="teal" />
              </template>
            </q-select>
          </div>

          <!-- Middle: Employee Search -->
          <div class="col-12 col-md-4">
            <q-input
              outlined
              dense
              v-model="filterQuery"
              placeholder="Search employee or designation..."
              class="bg-white rounded-borders"
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="search" color="grey-6" />
              </template>
            </q-input>
          </div>

          <!-- Right: PDF Preview & Excel Buttons -->
          <div class="col-12 col-md-3 flex justify-end q-gutter-sm">
            <q-btn
              color="teal-8"
              icon="picture_as_pdf"
              label="Export PDF"
              no-caps
              unelevated
              class="font-weight-bold shadow-1"
              @click="openPdfDialog"
              :disable="!summaryData.length || loading"
            />
            <q-btn
              color="emerald-7"
              class="bg-teal-9 text-white font-weight-bold shadow-1"
              icon="table_view"
              label="Export Excel"
              no-caps
              unelevated
              @click="exportToExcel"
              :disable="!summaryData.length || loading"
            />
          </div>
        </div>
      </q-card>
    </div>

    <!-- Active Location Banner Info -->
    <div class="q-mb-md flex items-center justify-between bg-teal-1 text-teal-10 q-pa-sm rounded-borders border-teal">
      <div class="flex items-center">
        <q-icon name="place" size="20px" class="q-mr-xs" />
        <span class="text-weight-bold text-uppercase">Active Location Context:</span>
        <span class="q-ml-xs text-weight-medium">{{ activeEstablishmentLabel }}</span>
      </div>
      <div class="text-caption text-weight-bold text-grey-8">
        Total Filtered Staff: {{ filteredSummary.length }}
      </div>
    </div>

    <!-- Metric Cards Overview -->
    <div class="row q-col-gutter-md q-mb-lg" v-if="selectedPeriod">
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered class="metric-card bg-teal-1 text-teal-10 q-pa-sm">
          <q-card-section class="q-pa-xs flex items-center justify-between">
            <div>
              <div class="text-caption text-weight-bold text-uppercase tracking-wider">Total Employees</div>
              <div class="text-h5 text-weight-bolder font-mono q-mt-xs">{{ filteredSummary.length }}</div>
            </div>
            <q-avatar icon="groups" color="teal-3" text-color="teal-10" size="42px" />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered class="metric-card bg-blue-1 text-blue-10 q-pa-sm">
          <q-card-section class="q-pa-xs flex items-center justify-between">
            <div>
              <div class="text-caption text-weight-bold text-uppercase tracking-wider">Gross Earnings</div>
              <div class="text-h5 text-weight-bolder font-mono q-mt-xs">{{ formatCurrency(grandTotals.gross) }}</div>
            </div>
            <q-avatar icon="payments" color="blue-3" text-color="blue-10" size="42px" />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered class="metric-card bg-red-1 text-red-10 q-pa-sm">
          <q-card-section class="q-pa-xs flex items-center justify-between">
            <div>
              <div class="text-caption text-weight-bold text-uppercase tracking-wider">Total Deductions</div>
              <div class="text-h5 text-weight-bolder font-mono q-mt-xs">{{ formatCurrency(grandTotals.deductions) }}</div>
            </div>
            <q-avatar icon="remove_circle_outline" color="red-3" text-color="red-10" size="42px" />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered class="metric-card bg-emerald-1 text-teal-10 q-pa-sm gradient-net-card">
          <q-card-section class="q-pa-xs flex items-center justify-between text-white">
            <div>
              <div class="text-caption text-weight-bold text-uppercase tracking-wider opacity-90">Net Payroll</div>
              <div class="text-h5 text-weight-bolder font-mono q-mt-xs">{{ formatCurrency(grandTotals.net) }}</div>
            </div>
            <q-avatar icon="account_balance_wallet" color="white" text-color="teal-9" size="42px" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Main Summary Table Card -->
    <q-card flat bordered class="rounded-card shadow-sm bg-white overflow-hidden">
      <!-- Loading State -->
      <div v-if="loading" class="q-pa-xl text-center">
        <q-spinner-dots size="50px" color="teal" />
        <div class="text-grey-7 text-subtitle1 q-mt-md font-weight-medium">
          Loading saved payslips for cut-off summary...
        </div>
      </div>

      <!-- No Cutoff Selected State -->
      <div v-else-if="!selectedPeriod" class="q-pa-xl text-center text-grey-7">
        <q-icon name="find_in_page" size="4em" color="teal-4" />
        <div class="text-h6 q-mt-md text-slate-7">No Cut-off Period Selected</div>
        <p class="text-body2">Please select an available cut-off period from the dropdown above to view the summary list.</p>
      </div>

      <!-- Empty Data State -->
      <div v-else-if="filteredSummary.length === 0" class="q-pa-xl text-center text-grey-7">
        <q-icon name="folder_off" size="4em" color="amber-7" />
        <div class="text-h6 q-mt-md">No saved payslips found for this location</div>
        <p class="text-body2">There are no saved payslip records matching the active establishment context ({{ activeEstablishmentLabel }}) for the selected cut-off range ({{ selectedPeriod.from }} - {{ selectedPeriod.to }}).</p>
      </div>

      <!-- Data Table -->
      <div v-else class="table-responsive">
        <table class="payroll-summary-table full-width">
          <thead>
            <tr>
              <th class="text-left">Employee Name</th>
              <th class="text-left">Designation</th>
              <th class="text-center">Days</th>
              <th class="text-right">Rate/Day</th>
              <th class="text-right">Basic Pay</th>
              <th class="text-right">Overtime</th>
              <th class="text-right">Night Diff</th>
              <th class="text-right">Holiday</th>
              <th class="text-right">Allowances</th>
              <th class="text-right highlight-col">Gross Income</th>
              <th class="text-right">Deductions</th>
              <th class="text-right highlight-col-net">Net Pay</th>
              <th class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in filteredSummary" :key="row.id" class="summary-row">
              <td class="text-left font-weight-bold text-slate-8">
                {{ formatFullname(row.employee) }}
              </td>
              <td class="text-left text-grey-7">
                {{ row.employee?.position || row.employee?.designation?.name || 'N/A' }}
              </td>
              <td class="text-center font-mono">
                {{ row.total_days || 0 }}
              </td>
              <td class="text-right font-mono">
                {{ formatCurrency(row.rate_per_day) }}
              </td>
              <td class="text-right font-mono">
                {{ formatCurrency(row.payslip_earnings?.working_hours_pay || row.rate_per_day * row.total_days) }}
              </td>
              <td class="text-right font-mono">
                {{ formatCurrency(row.payslip_earnings?.overtime_pay || 0) }}
              </td>
              <td class="text-right font-mono">
                {{ formatCurrency(row.payslip_earnings?.night_diff_pay || 0) }}
              </td>
              <td class="text-right font-mono">
                {{ formatCurrency(row.payslip_earnings?.holidays_pay || 0) }}
              </td>
              <td class="text-right font-mono">
                {{ formatCurrency((parseFloat(row.payslip_earnings?.allowances_pay || 0) + parseFloat(row.payslip_earnings?.incentives_pay || 0))) }}
              </td>
              <td class="text-right font-mono font-weight-bold highlight-col">
                {{ formatCurrency(row.total_earnings) }}
              </td>
              <td class="text-right font-mono text-negative">
                {{ formatCurrency(row.total_deductions) }}
              </td>
              <td class="text-right font-mono font-weight-bolder highlight-col-net text-teal-9">
                {{ formatCurrency(row.net_income) }}
              </td>
              <td class="text-center">
                <div class="row items-center justify-center q-gutter-x-xs">
                  <q-btn
                    dense
                    flat
                    round
                    color="teal"
                    icon="visibility"
                    @click="openDetailsModal(row)"
                  >
                    <q-tooltip>View Detailed Payslip Record</q-tooltip>
                  </q-btn>
                  <q-btn
                    dense
                    flat
                    round
                    color="teal-8"
                    icon="email"
                    @click="openSendEmailModal(row)"
                  >
                    <q-tooltip>Send Payslip via Email</q-tooltip>
                  </q-btn>
                </div>
              </td>
            </tr>
          </tbody>
          <!-- Grand Totals Footer -->
          <tfoot>
            <tr class="grand-totals-row">
              <td colspan="2" class="text-left font-weight-bolder text-uppercase">GRAND TOTALS ({{ filteredSummary.length }} Employees)</td>
              <td class="text-center font-mono font-weight-bold">{{ grandTotals.days }}</td>
              <td class="text-right font-mono">-</td>
              <td class="text-right font-mono font-weight-bold">{{ formatCurrency(grandTotals.basicPay) }}</td>
              <td class="text-right font-mono font-weight-bold">{{ formatCurrency(grandTotals.overtime) }}</td>
              <td class="text-right font-mono font-weight-bold">{{ formatCurrency(grandTotals.nightDiff) }}</td>
              <td class="text-right font-mono font-weight-bold">{{ formatCurrency(grandTotals.holiday) }}</td>
              <td class="text-right font-mono font-weight-bold">{{ formatCurrency(grandTotals.allowances) }}</td>
              <td class="text-right font-mono font-weight-bolder highlight-col">{{ formatCurrency(grandTotals.gross) }}</td>
              <td class="text-right font-mono font-weight-bold text-negative">{{ formatCurrency(grandTotals.deductions) }}</td>
              <td class="text-right font-mono font-weight-bolder highlight-col-net text-teal-10 text-subtitle2">{{ formatCurrency(grandTotals.net) }}</td>
              <td class="text-center font-mono">-</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </q-card>

    <!-- Detailed Payslip Record Modal Dialog (Matches Run Payslip Layout) -->
    <q-dialog v-model="detailsModal" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 750px; max-width: 95vw;" class="rounded-card bg-white overflow-hidden shadow-10">
        <!-- Header Banner -->
        <q-card-section class="bg-teal-8 text-white row items-center justify-between q-py-sm">
          <div class="row items-center col-grow">
            <q-icon name="receipt_long" size="sm" class="q-mr-sm" />
            <div class="text-h6 text-weight-bolder">Run Payslip Record</div>
          </div>
          <div class="row items-center q-gutter-sm">
            <q-btn
              color="white"
              text-color="teal-9"
              icon="picture_as_pdf"
              label="Export PDF"
              no-caps
              unelevated
              dense
              class="q-px-sm font-weight-bold"
              @click="exportIndividualPayslipPdf(selectedRow)"
            />
            <q-btn
              color="white"
              text-color="teal-9"
              icon="send"
              label="Send Email"
              no-caps
              unelevated
              dense
              class="q-px-sm font-weight-bold"
              @click="openSendEmailModal(selectedRow)"
            />
            <q-btn icon="close" flat round dense v-close-popup class="text-white" />
          </div>
        </q-card-section>

        <!-- Body Section -->
        <q-card-section class="q-pa-md" v-if="selectedRow">
          <!-- Top Info Row -->
          <div class="row q-col-gutter-md text-caption text-weight-medium q-mb-md">
            <div class="col-12 col-sm-6">
              <div class="row justify-between q-mb-xs">
                <span class="text-grey-7">Employee Name:</span>
                <span class="text-weight-bold text-slate-9">{{ formatFullname(selectedRow.employee) }}</span>
              </div>
              <div class="row justify-between q-mb-xs">
                <span class="text-grey-7">Payroll Release Date:</span>
                <span class="text-weight-bold">{{ selectedPeriod?.payroll_release_date || 'N/A' }}</span>
              </div>
              <div class="row justify-between q-mb-xs">
                <span class="text-grey-7">Rate / Day:</span>
                <span class="text-weight-bold">{{ formatCurrency(selectedRow.rate_per_day) }}</span>
              </div>
              <div class="row justify-between">
                <span class="text-grey-7">Total Days:</span>
                <span class="text-weight-bold">{{ selectedRow.total_days || 0 }}</span>
              </div>
            </div>

            <div class="col-12 col-sm-6">
              <div class="row justify-between q-mb-xs">
                <span class="text-grey-7">From: <strong class="text-black">{{ selectedPeriod?.from }}</strong></span>
                <span class="text-grey-7">To: <strong class="text-black">{{ selectedPeriod?.to }}</strong></span>
              </div>

              <!-- Undertime / Lates Box -->
              <div class="border-red-light bg-red-1 rounded-borders q-pa-sm q-mt-xs">
                <div class="text-center text-negative text-uppercase text-weight-bold q-mb-xs" style="font-size: 11px;">
                  Undertime / Lates
                </div>
                <div class="row justify-around text-caption">
                  <div>Total Hours: <strong class="text-negative">{{ computeUndertimeFormatted(selectedRow) }}</strong></div>
                  <div>Cost: <strong class="text-negative">{{ formatCurrency(selectedRow.payslip_earnings?.undertime_pay || selectedRow.payslip_deductions?.undertime_total || 0) }}</strong></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Earnings vs Deductions Side by Side Cards -->
          <div class="row q-col-gutter-md">
            <!-- Left: Earning Summary -->
            <div class="col-12 col-sm-6">
              <q-card flat bordered class="rounded-borders q-pa-sm bg-grey-1 full-height">
                <div class="text-subtitle2 text-weight-bolder text-teal-9 flex items-center border-b-teal q-pb-xs q-mb-sm">
                  <q-icon name="attach_money" color="teal" size="20px" class="q-mr-xs" />
                  Earning Summary
                </div>

                <div class="q-gutter-y-xs text-caption">
                  <div class="row justify-between">
                    <span class="text-grey-8">Regular Pay</span>
                    <span class="text-weight-bold">{{ formatCurrency(selectedRow.payslip_earnings?.working_hours_pay || selectedRow.rate_per_day * selectedRow.total_days) }}</span>
                  </div>
                  <div class="row justify-between">
                    <span class="text-grey-8">Overtime Pay</span>
                    <span>{{ formatCurrency(selectedRow.payslip_earnings?.overtime_pay || 0) }}</span>
                  </div>
                  <div class="row justify-between">
                    <span class="text-grey-8">Holiday Pay</span>
                    <span>{{ formatCurrency(selectedRow.payslip_earnings?.holidays_pay || 0) }}</span>
                  </div>
                  <div class="row justify-between">
                    <span class="text-grey-8">Night Differential</span>
                    <span>{{ formatCurrency(selectedRow.payslip_earnings?.night_diff_pay || 0) }}</span>
                  </div>
                  <div class="row justify-between">
                    <span class="text-grey-8">Total Allowance</span>
                    <span>{{ formatCurrency(selectedRow.payslip_earnings?.allowances_pay || 0) }}</span>
                  </div>
                  <div class="row justify-between">
                    <span class="text-grey-8">Quota Incentive</span>
                    <span>{{ formatCurrency(selectedRow.payslip_earnings?.incentives_pay || 0) }}</span>
                  </div>
                </div>

                <q-separator class="q-my-sm" />

                <div class="row justify-between text-subtitle2 text-weight-bolder text-teal-9">
                  <span>TOTAL INCOME:</span>
                  <span>{{ formatCurrency(selectedRow.total_earnings) }}</span>
                </div>
              </q-card>
            </div>

            <!-- Right: Deductions Summary -->
            <div class="col-12 col-sm-6">
              <q-card flat bordered class="rounded-borders q-pa-sm bg-grey-1 full-height">
                <div class="text-subtitle2 text-weight-bolder text-negative flex items-center border-b-red q-pb-xs q-mb-sm">
                  <q-icon name="remove_circle_outline" color="negative" size="20px" class="q-mr-xs" />
                  Deductions Summary
                </div>

                <div class="q-gutter-y-xs text-caption">
                  <div class="row justify-between">
                    <span class="text-grey-8">Credits</span>
                    <span>{{ formatCurrency(selectedRow.payslip_deductions?.credit_total || 0) }}</span>
                  </div>
                  <div class="row justify-between">
                    <span class="text-grey-8">Uniform</span>
                    <span>{{ formatCurrency(selectedRow.payslip_deductions?.uniform_total || 0) }}</span>
                  </div>
                  <div class="row justify-between">
                    <span class="text-grey-8">Penalty</span>
                    <span>{{ formatCurrency(selectedRow.payslip_deductions?.penalty_total || 0) }}</span>
                  </div>
                  <div class="row justify-between">
                    <span class="text-grey-8">Cash Advance</span>
                    <span>{{ formatCurrency(selectedRow.payslip_deductions?.cash_advance_total || 0) }}</span>
                  </div>
                  <div class="row justify-between">
                    <span class="text-grey-8">Shorts / Charges</span>
                    <span>{{ formatCurrency(selectedRow.payslip_deductions?.employee_charge_total || 0) }}</span>
                  </div>
                  <div class="row justify-between">
                    <span class="text-grey-8">Undertime / Lates</span>
                    <span>{{ formatCurrency(selectedRow.payslip_earnings?.undertime_pay || selectedRow.payslip_deductions?.undertime_total || 0) }}</span>
                  </div>
                  <div class="row justify-between">
                    <span class="text-grey-8">SSS</span>
                    <span>{{ formatCurrency(selectedRow.payslip_deductions?.sss_total || 0) }}</span>
                  </div>
                  <div class="row justify-between">
                    <span class="text-grey-8">Pag-IBIG Housing Fund</span>
                    <span>{{ formatCurrency(selectedRow.payslip_deductions?.pagibig_total || 0) }}</span>
                  </div>
                  <div class="row justify-between">
                    <span class="text-grey-8">PhilHealth Insurance</span>
                    <span>{{ formatCurrency(selectedRow.payslip_deductions?.philhealth_total || 0) }}</span>
                  </div>
                </div>

                <q-separator class="q-my-sm" />

                <div class="row justify-between text-subtitle2 text-weight-bolder text-negative">
                  <span>TOTAL DEDUCTIONS:</span>
                  <span>{{ formatCurrency(selectedRow.total_deductions) }}</span>
                </div>
              </q-card>
            </div>
          </div>
        </q-card-section>

        <!-- Footer Section -->
        <q-card-section class="bg-grey-2 q-pa-md border-t">
          <div class="row items-center justify-between">
            <div class="text-caption text-grey-8">
              <div>Uniform Balance: <strong>{{ formatCurrency(selectedRow.payslip_deductions?.uniform_balance || 0) }}</strong></div>
              <div>Credit Balance: <strong>{{ formatCurrency(selectedRow.payslip_deductions?.credit_balance || 0) }}</strong></div>
              <div>Cash Advance Balance: <strong>{{ formatCurrency(selectedRow.payslip_deductions?.cash_advance_balance || 0) }}</strong></div>
            </div>

            <div class="text-right">
              <div class="text-caption text-uppercase text-weight-bold text-grey-7">NET INCOME</div>
              <div class="text-h4 text-weight-bolder text-teal-9 font-mono">{{ formatCurrency(selectedRow.net_income) }}</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- PDF Viewer Modal Dialog (Matches Admin Dashboard PDF Pattern) -->
    <q-dialog
      v-model="pdfDialog"
      maximized
      persistent
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <div class="q-pa-md" style="width: 100%">
        <q-card class="bg-dark column full-height">
          <q-card-section
            class="row justify-between items-center bg-primary text-white q-py-sm"
          >
            <div class="row items-center">
              <q-icon name="picture_as_pdf" size="sm" class="q-mr-sm" />
              <div class="text-h6 font-weight-bold">
                Payroll Cut-off Summary Register PDF
              </div>
            </div>
            <div>
              <q-btn
                dense
                flat
                icon="download"
                class="q-mr-sm"
                @click="triggerDownloadPdf"
              >
                <q-tooltip>Download PDF</q-tooltip>
              </q-btn>
              <q-btn
                dense
                flat
                icon="print"
                class="q-mr-sm"
                @click="triggerPhysicalPrintPdf"
              >
                <q-tooltip>Print Document</q-tooltip>
              </q-btn>
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip>Close</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-card-section class="col q-pa-none">
            <iframe
              :src="pdfUrl"
              width="100%"
              height="100%"
              style="border: none"
            />
          </q-card-section>
        </q-card>
      </div>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { usePayslipStore } from "src/stores/payslip";
import { useBranchesStore } from "src/stores/branch";
import { useWarehousesStore } from "src/stores/warehouse";
import { formatFullname } from "src/composables/employeeFunction/useEmployeeFunctions";
import { Notify, useQuasar } from "quasar";
import SendPayrollEmailDialog from "../details/components/payroll/SendPayrollEmailDialog.vue";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.default;

const $q = useQuasar();
const payslipStore = usePayslipStore();
const branchesStore = useBranchesStore();
const warehousesStore = useWarehousesStore();

// Reactive State
const loadingPeriods = ref(false);
const loading = ref(false);
const periodOptions = ref([]);
const selectedPeriod = ref(null);
const filterQuery = ref("");
const summaryData = ref([]);

// PDF State
const pdfDialog = ref(false);
const pdfUrl = ref("");
let currentDocDefinition = null;

// Payslip Record Details Modal State
const detailsModal = ref(false);
const selectedRow = ref(null);

const openDetailsModal = (row) => {
  selectedRow.value = row;
  detailsModal.value = true;
};

const openSendEmailModal = (row) => {
  if (!row) return;
  const employeeData = row.employee || row;
  const payslipId = row.id || null;

  $q.dialog({
    component: SendPayrollEmailDialog,
    componentProps: {
      employee: employeeData,
      initialPayslipId: payslipId,
    },
  }).onOk((data) => {
    if (data && data.saved && employeeData) {
      employeeData.personal_email = data.email;
    }
  });
};

// Reverse-compute undertime hours from undertime_pay and hourly rate
// undertime_pay is stored; hours are NOT stored in DB so we derive them
const computeUndertimeFormatted = (row) => {
  const undertimePay = parseFloat(row?.payslip_earnings?.undertime_pay || row?.payslip_deductions?.undertime_total || 0);
  if (undertimePay <= 0) return '0h 0m';
  const ratePerDay = parseFloat(row?.rate_per_day || 0);
  if (ratePerDay <= 0) return 'N/A';
  const hourlyRate = ratePerDay / 8; // standard 8-hour workday
  const totalHours = undertimePay / hourlyRate;
  const hrs = Math.floor(totalHours);
  const mins = Math.round((totalHours - hrs) * 60);
  return `${hrs}h ${mins}m`;
};

// Generate Individual Payslip Doc Definition (Portrait A4 Payslip layout)
const generateIndividualPayslipDefinition = (row) => {
  const period = selectedPeriod.value;
  const fromStr = period ? period.from : 'N/A';
  const toStr = period ? period.to : 'N/A';
  const releaseStr = period ? (period.payroll_release_date || 'N/A') : 'N/A';
  const reportDate = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  const formatMoney = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return "₱0.00";
    return `₱${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const basicPay = parseFloat(row.payslip_earnings?.working_hours_pay || (row.rate_per_day * row.total_days) || 0);
  const otPay = parseFloat(row.payslip_earnings?.overtime_pay || 0);
  const ndPay = parseFloat(row.payslip_earnings?.night_diff_pay || 0);
  const holPay = parseFloat(row.payslip_earnings?.holidays_pay || 0);
  const allowPay = parseFloat(row.payslip_earnings?.allowances_pay || 0) + parseFloat(row.payslip_earnings?.incentives_pay || 0);
  const gross = parseFloat(row.total_earnings || 0);

  const credit = parseFloat(row.payslip_deductions?.credit_total || 0);
  const uniform = parseFloat(row.payslip_deductions?.uniform_total || 0);
  const penalty = parseFloat(row.payslip_deductions?.penalty_total || 0);
  const ca = parseFloat(row.payslip_deductions?.cash_advance_total || 0);
  const charge = parseFloat(row.payslip_deductions?.employee_charge_total || 0);
  const undertime = parseFloat(row.payslip_earnings?.undertime_pay || row.payslip_deductions?.undertime_total || 0);
  const sss = parseFloat(row.payslip_deductions?.sss_total || 0);
  const pagibig = parseFloat(row.payslip_deductions?.pagibig_total || 0);
  const philhealth = parseFloat(row.payslip_deductions?.philhealth_total || 0);
  const deductions = parseFloat(row.total_deductions || 0);
  const net = parseFloat(row.net_income || 0);

  return {
    pageSize: "A4",
    pageOrientation: "portrait",
    pageMargins: [40, 40, 40, 40],
    content: [
      // Company Header Banner
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                fillColor: "#0f172a",
                stack: [
                  { text: "GB BAKESHOP - OFFICIAL PAYSLIP RECORD", color: "#ffffff", fontSize: 13, bold: true, alignment: "center", margin: [0, 8, 0, 2] },
                  { text: `PAYROLL CUT-OFF: ${fromStr.toUpperCase()} TO ${toStr.toUpperCase()}   |   RELEASE DATE: ${releaseStr.toUpperCase()}`, color: "#38bdf8", fontSize: 8, bold: true, alignment: "center", margin: [0, 0, 0, 8] }
                ],
                border: [false, false, false, false]
              }
            ]
          ]
        },
        margin: [0, 0, 0, 20]
      },

      // Employee Information Grid
      {
        columns: [
          {
            width: "50%",
            stack: [
              { text: `Employee Name: ${formatFullname(row.employee)}`, fontSize: 10, bold: true, margin: [0, 0, 0, 4] },
              { text: `Designation: ${row.employee?.position || row.employee?.designation?.name || 'N/A'}`, fontSize: 9, color: "#475569", margin: [0, 0, 0, 4] },
              { text: `Rate per Day: ${formatMoney(row.rate_per_day)}`, fontSize: 9, color: "#475569", margin: [0, 0, 0, 4] },
              { text: `Total Days Worked: ${row.total_days || 0}`, fontSize: 9, color: "#475569" },
            ]
          },
          {
            width: "50%",
            alignment: "right",
            stack: [
              { text: `Date Generated: ${reportDate}`, fontSize: 9, color: "#475569", margin: [0, 0, 0, 6] },
              {
                table: {
                  widths: ["*"],
                  body: [
                    [
                      {
                        fillColor: "#fef2f2",
                        borderColor: "#fecaca",
                        stack: [
                          { text: "UNDERTIME / LATES", fontSize: 7, color: "#991b1b", bold: true, alignment: "center" },
                          { text: `Hours: ${computeUndertimeFormatted(row)}   |   Cost: ${formatMoney(undertime)}`, fontSize: 8, bold: true, color: "#7f1d1d", alignment: "center", margin: [0, 2, 0, 0] }
                        ]
                      }
                    ]
                  ]
                }
              }
            ]
          }
        ],
        margin: [0, 0, 0, 20]
      },

      { canvas: [{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, lineColor: "#cbd5e1" }], margin: [0, 0, 0, 15] },

      // Earnings vs Deductions Split
      {
        columns: [
          // Earning Summary
          {
            width: "48%",
            stack: [
              { text: "EARNING SUMMARY", fontSize: 9, bold: true, color: "#0d9488", margin: [0, 0, 0, 6] },
              {
                table: {
                  widths: ["*", "auto"],
                  body: [
                    [{ text: "Regular Pay", fontSize: 8 }, { text: formatMoney(basicPay), fontSize: 8, alignment: "right" }],
                    [{ text: "Overtime Pay", fontSize: 8 }, { text: formatMoney(otPay), fontSize: 8, alignment: "right" }],
                    [{ text: "Holiday Pay", fontSize: 8 }, { text: formatMoney(holPay), fontSize: 8, alignment: "right" }],
                    [{ text: "Night Differential", fontSize: 8 }, { text: formatMoney(ndPay), fontSize: 8, alignment: "right" }],
                    [{ text: "Total Allowance", fontSize: 8 }, { text: formatMoney(allowPay), fontSize: 8, alignment: "right" }],
                    [{ text: "Quota Incentive", fontSize: 8 }, { text: formatMoney(row.payslip_earnings?.incentives_pay || 0), fontSize: 8, alignment: "right" }],
                    [{ text: "TOTAL INCOME", fontSize: 8.5, bold: true, color: "#0d9488" }, { text: formatMoney(gross), fontSize: 8.5, bold: true, color: "#0d9488", alignment: "right" }]
                  ]
                },
                layout: "lightHorizontalLines"
              }
            ]
          },
          // Spacer
          { width: "4%", text: "" },
          // Deductions Summary
          {
            width: "48%",
            stack: [
              { text: "DEDUCTIONS SUMMARY", fontSize: 9, bold: true, color: "#dc2626", margin: [0, 0, 0, 6] },
              {
                table: {
                  widths: ["*", "auto"],
                  body: [
                    [{ text: "Credits", fontSize: 8 }, { text: formatMoney(credit), fontSize: 8, alignment: "right" }],
                    [{ text: "Uniform", fontSize: 8 }, { text: formatMoney(uniform), fontSize: 8, alignment: "right" }],
                    [{ text: "Penalty", fontSize: 8 }, { text: formatMoney(penalty), fontSize: 8, alignment: "right" }],
                    [{ text: "Cash Advance", fontSize: 8 }, { text: formatMoney(ca), fontSize: 8, alignment: "right" }],
                    [{ text: "Shorts / Charges", fontSize: 8 }, { text: formatMoney(charge), fontSize: 8, alignment: "right" }],
                    [{ text: "Undertime / Lates", fontSize: 8 }, { text: formatMoney(undertime), fontSize: 8, alignment: "right" }],
                    [{ text: "SSS", fontSize: 8 }, { text: formatMoney(sss), fontSize: 8, alignment: "right" }],
                    [{ text: "Pag-IBIG Housing Fund", fontSize: 8 }, { text: formatMoney(pagibig), fontSize: 8, alignment: "right" }],
                    [{ text: "PhilHealth Insurance", fontSize: 8 }, { text: formatMoney(philhealth), fontSize: 8, alignment: "right" }],
                    [{ text: "TOTAL DEDUCTIONS", fontSize: 8.5, bold: true, color: "#dc2626" }, { text: formatMoney(deductions), fontSize: 8.5, bold: true, color: "#dc2626", alignment: "right" }]
                  ]
                },
                layout: "lightHorizontalLines"
              }
            ]
          }
        ],
        margin: [0, 0, 0, 15]
      },

      { canvas: [{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, lineColor: "#cbd5e1" }], margin: [0, 0, 0, 15] },

      // Balances & Net Pay Block
      {
        columns: [
          {
            width: "50%",
            stack: [
              { text: `Uniform Balance: ${formatMoney(row.payslip_deductions?.uniform_balance || 0)}`, fontSize: 8, color: "#475569", margin: [0, 0, 0, 4] },
              { text: `Credit Balance: ${formatMoney(row.payslip_deductions?.credit_balance || 0)}`, fontSize: 8, color: "#475569", margin: [0, 0, 0, 4] },
              { text: `Cash Advance Balance: ${formatMoney(row.payslip_deductions?.cash_advance_balance || 0)}`, fontSize: 8, color: "#475569" }
            ]
          },
          {
            width: "50%",
            alignment: "right",
            stack: [
              { text: "NET TAKE-HOME PAY", fontSize: 9, bold: true, color: "#0f766e", margin: [0, 0, 0, 2] },
              { text: formatMoney(net), fontSize: 16, bold: true, color: "#0d9488" }
            ]
          }
        ],
        margin: [0, 0, 0, 25]
      },

      // Acknowledgment Signatures
      {
        columns: [
          {
            stack: [
              { text: "____________________________________", alignment: "center" },
              { text: "EMPLOYEE SIGNATURE", fontSize: 8, bold: true, alignment: "center", margin: [0, 4, 0, 0] },
              { text: "I acknowledge receipt of this pay.", fontSize: 7, color: "#64748b", alignment: "center" }
            ]
          },
          {
            stack: [
              { text: "____________________________________", alignment: "center" },
              { text: "APPROVED BY", fontSize: 8, bold: true, alignment: "center", margin: [0, 4, 0, 0] },
              { text: "General Manager / Admin", fontSize: 7, color: "#64748b", alignment: "center" }
            ]
          }
        ],
        margin: [0, 15, 0, 0]
      }
    ]
  };
};

const exportIndividualPayslipPdf = (row) => {
  if (!row) return;
  currentDocDefinition = generateIndividualPayslipDefinition(row);
  pdfMake.createPdf(currentDocDefinition).getDataUrl((dataUrl) => {
    pdfUrl.value = dataUrl;
    pdfDialog.value = true;
  });
};

// Active Establishment Label Helper
const activeEstablishmentLabel = computed(() => {
  const estVal = payslipStore.selectedEstablishment;
  if (!estVal || estVal === "global") return "Network Global (All Establishments)";

  if (estVal.startsWith("branch-")) {
    const branchId = parseInt(estVal.replace("branch-", ""), 10);
    const branch = (branchesStore.branches || []).find((b) => b.id === branchId);
    return branch ? `Branch: ${branch.name}` : "Specific Branch";
  } else if (estVal.startsWith("warehouse-")) {
    const warehouseId = parseInt(estVal.replace("warehouse-", ""), 10);
    const warehouse = (warehousesStore.warehouses || []).find((w) => w.id === warehouseId);
    return warehouse ? `Warehouse: ${warehouse.name}` : "Specific Warehouse";
  }

  return "Network Global";
});

// Format Currency Utility
const formatCurrency = (val) => {
  const num = parseFloat(val);
  if (isNaN(num)) return "₱0.00";
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(num);
};

// Fetch Available Cutoff Periods
const loadCutoffPeriods = async () => {
  loadingPeriods.value = true;
  try {
    const periods = await payslipStore.fetchCutoffPeriods();
    if (periods && periods.length > 0) {
      periodOptions.value = periods.map((p) => ({
        label: `${p.from}  to  ${p.to}  (Release: ${p.payroll_release_date || 'N/A'})`,
        value: p,
      }));

      // Automatically select the most recent cut-off period
      selectedPeriod.value = periodOptions.value[0].value;
      await loadSummaryData();
    }
  } catch (err) {
    console.error("Error loading cut-off periods:", err);
  } finally {
    loadingPeriods.value = false;
  }
};

// Fetch Summary Data for Selected Period
const loadSummaryData = async () => {
  if (!selectedPeriod.value) return;
  loading.value = true;
  try {
    const data = await payslipStore.fetchCutoffSummary(
      selectedPeriod.value.from,
      selectedPeriod.value.to
    );
    summaryData.value = data || [];
  } catch (err) {
    console.error("Error loading cut-off summary data:", err);
  } finally {
    loading.value = false;
  }
};

const onPeriodChange = () => {
  loadSummaryData();
};

// Computed Filtered Summary List (Filtered by Search Query AND Establishment)
const filteredSummary = computed(() => {
  let filtered = summaryData.value || [];

  // Filter by Establishment Location (Branch vs Warehouse vs Global)
  const estVal = payslipStore.selectedEstablishment;
  if (estVal && estVal !== "global") {
    if (estVal.startsWith("branch-")) {
      const branchId = parseInt(estVal.replace("branch-", ""), 10);
      filtered = filtered.filter(
        (item) =>
          item.employee?.branch_employee?.branch_id === branchId ||
          item.employee?.branch_employee?.branch?.id === branchId
      );
    } else if (estVal.startsWith("warehouse-")) {
      const warehouseId = parseInt(estVal.replace("warehouse-", ""), 10);
      filtered = filtered.filter(
        (item) =>
          item.employee?.warehouse_employee?.warehouse_id === warehouseId ||
          item.employee?.warehouse_employee?.warehouse?.id === warehouseId
      );
    }
  }

  if (filterQuery.value) {
    const q = filterQuery.value.toLowerCase();
    filtered = filtered.filter((item) => {
      const name = formatFullname(item.employee).toLowerCase();
      const pos = (item.employee?.position || "").toLowerCase();
      return name.includes(q) || pos.includes(q);
    });
  }

  return filtered;
});

// Computed Grand Totals
const grandTotals = computed(() => {
  const totals = {
    days: 0,
    basicPay: 0,
    overtime: 0,
    nightDiff: 0,
    holiday: 0,
    allowances: 0,
    gross: 0,
    deductions: 0,
    net: 0,
  };

  filteredSummary.value.forEach((item) => {
    totals.days += parseInt(item.total_days || 0, 10);
    totals.basicPay += parseFloat(item.payslip_earnings?.working_hours_pay || (item.rate_per_day * item.total_days) || 0);
    totals.overtime += parseFloat(item.payslip_earnings?.overtime_pay || 0);
    totals.nightDiff += parseFloat(item.payslip_earnings?.night_diff_pay || 0);
    totals.holiday += parseFloat(item.payslip_earnings?.holidays_pay || 0);
    totals.allowances += parseFloat(item.payslip_earnings?.allowances_pay || 0) + parseFloat(item.payslip_earnings?.incentives_pay || 0);
    totals.gross += parseFloat(item.total_earnings || 0);
    totals.deductions += parseFloat(item.total_deductions || 0);
    totals.net += parseFloat(item.net_income || 0);
  });

  return totals;
});

// Formal PDF Generation Logic (Includes Employee Signature column & Establishment Header)
const generatePdfDocDefinition = () => {
  const period = selectedPeriod.value;
  const fromStr = period ? period.from : 'N/A';
  const toStr = period ? period.to : 'N/A';
  const releaseStr = period ? (period.payroll_release_date || 'N/A') : 'N/A';
  const reportDate = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  const formatMoney = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return "₱0.00";
    return `₱${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const tableBody = [
    [
      { text: "Employee Name", style: "tableHeader", alignment: "left" },
      { text: "Designation", style: "tableHeader", alignment: "left" },
      { text: "Days", style: "tableHeader", alignment: "center" },
      { text: "Rate/Day", style: "tableHeader", alignment: "right" },
      { text: "Basic Pay", style: "tableHeader", alignment: "right" },
      { text: "Overtime", style: "tableHeader", alignment: "right" },
      { text: "Night Diff", style: "tableHeader", alignment: "right" },
      { text: "Holiday", style: "tableHeader", alignment: "right" },
      { text: "Allowances", style: "tableHeader", alignment: "right" },
      { text: "Gross Income", style: "tableHeader", alignment: "right" },
      { text: "Deductions", style: "tableHeader", alignment: "right" },
      { text: "Net Pay", style: "tableHeader", alignment: "right" },
      { text: "Signature", style: "tableHeader", alignment: "center" },
    ]
  ];

  filteredSummary.value.forEach((row) => {
    const basicPay = parseFloat(row.payslip_earnings?.working_hours_pay || (row.rate_per_day * row.total_days) || 0);
    const otPay = parseFloat(row.payslip_earnings?.overtime_pay || 0);
    const ndPay = parseFloat(row.payslip_earnings?.night_diff_pay || 0);
    const holPay = parseFloat(row.payslip_earnings?.holidays_pay || 0);
    const allowPay = parseFloat(row.payslip_earnings?.allowances_pay || 0) + parseFloat(row.payslip_earnings?.incentives_pay || 0);
    const gross = parseFloat(row.total_earnings || 0);
    const deduct = parseFloat(row.total_deductions || 0);
    const net = parseFloat(row.net_income || 0);

    tableBody.push([
      { text: formatFullname(row.employee), style: "tableCell", bold: true },
      { text: row.employee?.position || row.employee?.designation?.name || 'N/A', style: "tableCell" },
      { text: (row.total_days || 0).toString(), style: "tableCell", alignment: "center" },
      { text: formatMoney(row.rate_per_day), style: "tableCellAmount" },
      { text: formatMoney(basicPay), style: "tableCellAmount" },
      { text: formatMoney(otPay), style: "tableCellAmount" },
      { text: formatMoney(ndPay), style: "tableCellAmount" },
      { text: formatMoney(holPay), style: "tableCellAmount" },
      { text: formatMoney(allowPay), style: "tableCellAmount" },
      { text: formatMoney(gross), style: "tableCellAmount", bold: true },
      { text: formatMoney(deduct), style: "tableCellAmount", color: "#dc2626" },
      { text: formatMoney(net), style: "tableCellAmount", bold: true, color: "#0d9488" },
      { text: "____________________", style: "tableCell", alignment: "center", color: "#94a3b8" },
    ]);
  });

  // Grand totals row
  tableBody.push([
    { text: `GRAND TOTALS (${filteredSummary.value.length})`, style: "tableTotalHeader", colSpan: 2, alignment: "left" },
    {},
    { text: grandTotals.value.days.toString(), style: "tableTotalCell", alignment: "center" },
    { text: "-", style: "tableTotalCell", alignment: "right" },
    { text: formatMoney(grandTotals.value.basicPay), style: "tableTotalCell", alignment: "right" },
    { text: formatMoney(grandTotals.value.overtime), style: "tableTotalCell", alignment: "right" },
    { text: formatMoney(grandTotals.value.nightDiff), style: "tableTotalCell", alignment: "right" },
    { text: formatMoney(grandTotals.value.holiday), style: "tableTotalCell", alignment: "right" },
    { text: formatMoney(grandTotals.value.allowances), style: "tableTotalCell", alignment: "right" },
    { text: formatMoney(grandTotals.value.gross), style: "tableTotalCell", alignment: "right", bold: true },
    { text: formatMoney(grandTotals.value.deductions), style: "tableTotalCell", alignment: "right", color: "#dc2626" },
    { text: formatMoney(grandTotals.value.net), style: "tableTotalCell", alignment: "right", bold: true, color: "#0f766e" },
    { text: "-", style: "tableTotalCell", alignment: "center" },
  ]);

  return {
    pageSize: "A4",
    pageOrientation: "landscape",
    pageMargins: [20, 20, 20, 20],
    content: [
      // Header Banner
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                fillColor: "#0f172a",
                stack: [
                  { text: "GB BAKESHOP - OVERALL PAYROLL CUT-OFF SUMMARY REGISTER", color: "#ffffff", fontSize: 13, bold: true, alignment: "center", margin: [0, 8, 0, 2] },
                  { text: `LOCATION: ${activeEstablishmentLabel.value.toUpperCase()}   |   CUT-OFF PERIOD: ${fromStr.toUpperCase()} TO ${toStr.toUpperCase()}   |   RELEASE DATE: ${releaseStr.toUpperCase()}`, color: "#38bdf8", fontSize: 7.5, bold: true, alignment: "center", margin: [0, 0, 0, 8] }
                ],
                border: [false, false, false, false]
              }
            ]
          ]
        },
        margin: [0, -5, 0, 12]
      },

      // Executive KPI Metric Cards
      {
        columns: [
          {
            table: {
              widths: ["*"],
              body: [
                [
                  {
                    fillColor: "#f0fdf4",
                    borderColor: "#bbf7d0",
                    stack: [
                      { text: "TOTAL EMPLOYEES", fontSize: 7, color: "#166534", bold: true },
                      { text: filteredSummary.value.length.toString(), fontSize: 13, bold: true, color: "#14532d", margin: [0, 2, 0, 0] }
                    ]
                  }
                ]
              ]
            }
          },
          {
            table: {
              widths: ["*"],
              body: [
                [
                  {
                    fillColor: "#eff6ff",
                    borderColor: "#bfdbfe",
                    stack: [
                      { text: "GROSS EARNINGS", fontSize: 7, color: "#1e40af", bold: true },
                      { text: formatMoney(grandTotals.value.gross), fontSize: 13, bold: true, color: "#1e3a8a", margin: [0, 2, 0, 0] }
                    ]
                  }
                ]
              ]
            }
          },
          {
            table: {
              widths: ["*"],
              body: [
                [
                  {
                    fillColor: "#fef2f2",
                    borderColor: "#fecaca",
                    stack: [
                      { text: "TOTAL DEDUCTIONS", fontSize: 7, color: "#991b1b", bold: true },
                      { text: formatMoney(grandTotals.value.deductions), fontSize: 13, bold: true, color: "#7f1d1d", margin: [0, 2, 0, 0] }
                    ]
                  }
                ]
              ]
            }
          },
          {
            table: {
              widths: ["*"],
              body: [
                [
                  {
                    fillColor: "#ccfbf1",
                    borderColor: "#99f6e4",
                    stack: [
                      { text: "NET PAYROLL", fontSize: 7, color: "#115e59", bold: true },
                      { text: formatMoney(grandTotals.value.net), fontSize: 13, bold: true, color: "#134e4a", margin: [0, 2, 0, 0] }
                    ]
                  }
                ]
              ]
            }
          }
        ],
        columnGap: 10,
        margin: [0, 0, 0, 12]
      },

      // Main Register Table (13 Columns Total - Widths sum to 100%)
      {
        table: {
          headerRows: 1,
          widths: ["12%", "7%", "4%", "6.5%", "8%", "7%", "7%", "7%", "7.5%", "9%", "8%", "9%", "11%"],
          body: tableBody
        },
        layout: {
          fillColor: (rowIndex) => {
            if (rowIndex === 0) return "#1e293b";
            if (rowIndex === tableBody.length - 1) return "#f1f5f9";
            return rowIndex % 2 === 0 ? "#f8fafc" : "#ffffff";
          },
          hLineWidth: (i, node) => (i === 0 || i === 1 || i === node.table.body.length - 1 || i === node.table.body.length) ? 1.2 : 0.5,
          vLineWidth: () => 0.5,
          vLineColor: () => "#cbd5e1",
          hLineColor: (i, node) => (i === 0 || i === 1 || i === node.table.body.length - 1 || i === node.table.body.length) ? "#475569" : "#e2e8f0"
        },
        margin: [0, 0, 0, 15]
      },

      // Official Signatures Block
      {
        unbreakable: true,
        columns: [
          {
            stack: [
              { text: "____________________________________", alignment: "center" },
              { text: "PREPARED BY", fontSize: 8, bold: true, alignment: "center", margin: [0, 4, 0, 0] },
              { text: "Payroll Officer", fontSize: 7, color: "#64748b", alignment: "center" }
            ]
          },
          {
            stack: [
              { text: "____________________________________", alignment: "center" },
              { text: "CHECKED BY", fontSize: 8, bold: true, alignment: "center", margin: [0, 4, 0, 0] },
              { text: "Accounting Head", fontSize: 7, color: "#64748b", alignment: "center" }
            ]
          },
          {
            stack: [
              { text: "____________________________________", alignment: "center" },
              { text: "APPROVED BY", fontSize: 8, bold: true, alignment: "center", margin: [0, 4, 0, 0] },
              { text: "General Manager / Admin", fontSize: 7, color: "#64748b", alignment: "center" }
            ]
          }
        ],
        margin: [0, 15, 0, 0]
      }
    ],
    styles: {
      tableHeader: { fontSize: 6.5, bold: true, color: "#ffffff", fillColor: "#1e293b", margin: [0, 2, 0, 2] },
      tableCell: { fontSize: 6.5, margin: [0, 2, 0, 2] },
      tableCellAmount: { fontSize: 6.5, alignment: "right", margin: [0, 2, 0, 2] },
      tableTotalHeader: { fontSize: 7, bold: true, color: "#0f172a", margin: [0, 3, 0, 3] },
      tableTotalCell: { fontSize: 7, bold: true, color: "#0f172a", margin: [0, 3, 0, 3] }
    }
  };
};

const openPdfDialog = () => {
  currentDocDefinition = generatePdfDocDefinition();
  pdfMake.createPdf(currentDocDefinition).getDataUrl((dataUrl) => {
    pdfUrl.value = dataUrl;
    pdfDialog.value = true;
  });
};

const triggerPhysicalPrintPdf = () => {
  if (currentDocDefinition) {
    pdfMake.createPdf(currentDocDefinition).print();
  }
};

const triggerDownloadPdf = () => {
  if (currentDocDefinition) {
    const period = selectedPeriod.value;
    const fromStr = period ? period.from : 'N/A';
    const toStr = period ? period.to : 'N/A';
    const estSlug = (activeEstablishmentLabel.value || 'Global').replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `GB_Bakeshop_Payroll_Summary_${estSlug}_${fromStr}_to_${toStr}.pdf`;
    pdfMake.createPdf(currentDocDefinition).download(filename);
  }
};

// Styled Excel Export Handler (Outputs HTML-formatted .xls matching PDF layout)
const exportToExcel = () => {
  if (!filteredSummary.value.length) return;

  const period = selectedPeriod.value;
  const fromStr = period ? period.from : 'N/A';
  const toStr = period ? period.to : 'N/A';
  const releaseStr = period ? (period.payroll_release_date || 'N/A') : 'N/A';
  const reportDate = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  const formatMoney = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return "&#8369;0.00";
    return `&#8369;${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  let rowsHtml = "";
  filteredSummary.value.forEach((row, index) => {
    const basicPay = parseFloat(row.payslip_earnings?.working_hours_pay || (row.rate_per_day * row.total_days) || 0);
    const otPay = parseFloat(row.payslip_earnings?.overtime_pay || 0);
    const ndPay = parseFloat(row.payslip_earnings?.night_diff_pay || 0);
    const holPay = parseFloat(row.payslip_earnings?.holidays_pay || 0);
    const allowPay = parseFloat(row.payslip_earnings?.allowances_pay || 0) + parseFloat(row.payslip_earnings?.incentives_pay || 0);
    const gross = parseFloat(row.total_earnings || 0);
    const deduct = parseFloat(row.total_deductions || 0);
    const net = parseFloat(row.net_income || 0);
    const bg = index % 2 === 0 ? "#f8fafc" : "#ffffff";

    rowsHtml += `
      <tr style="background-color: ${bg}; height: 26px;">
        <td style="border: 1px solid #cbd5e1; font-weight: bold; text-align: left; padding: 4px 8px;">${formatFullname(row.employee)}</td>
        <td style="border: 1px solid #cbd5e1; text-align: left; padding: 4px 8px;">${row.employee?.position || row.employee?.designation?.name || 'N/A'}</td>
        <td style="border: 1px solid #cbd5e1; text-align: center; padding: 4px 8px;">${row.total_days || 0}</td>
        <td style="border: 1px solid #cbd5e1; text-align: right; padding: 4px 8px;">${formatMoney(row.rate_per_day)}</td>
        <td style="border: 1px solid #cbd5e1; text-align: right; padding: 4px 8px;">${formatMoney(basicPay)}</td>
        <td style="border: 1px solid #cbd5e1; text-align: right; padding: 4px 8px;">${formatMoney(otPay)}</td>
        <td style="border: 1px solid #cbd5e1; text-align: right; padding: 4px 8px;">${formatMoney(ndPay)}</td>
        <td style="border: 1px solid #cbd5e1; text-align: right; padding: 4px 8px;">${formatMoney(holPay)}</td>
        <td style="border: 1px solid #cbd5e1; text-align: right; padding: 4px 8px;">${formatMoney(allowPay)}</td>
        <td style="border: 1px solid #cbd5e1; text-align: right; font-weight: bold; background-color: #f0fdf4; padding: 4px 8px;">${formatMoney(gross)}</td>
        <td style="border: 1px solid #cbd5e1; text-align: right; color: #dc2626; padding: 4px 8px;">${formatMoney(deduct)}</td>
        <td style="border: 1px solid #cbd5e1; text-align: right; font-weight: bold; color: #0d9488; background-color: #ccfbf1; padding: 4px 8px;">${formatMoney(net)}</td>
        <td style="border: 1px solid #cbd5e1; text-align: center; color: #94a3b8; padding: 4px 8px;">____________________</td>
      </tr>
    `;
  });

  const excelTemplate = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>Payroll Cut-off Summary</x:Name>
              <x:WorksheetOptions>
                <x:DisplayGridlines/>
              </x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 11px; }
        table { border-collapse: collapse; width: 100%; }
        th { background-color: #1e293b; color: #ffffff; font-weight: bold; font-size: 10px; border: 1px solid #475569; padding: 6px; text-transform: uppercase; }
        td { font-size: 10px; }
      </style>
    </head>
    <body>
      <table>
        <!-- Header Banner -->
        <tr>
          <td colspan="13" style="background-color: #0f172a; color: #ffffff; font-size: 16px; font-weight: bold; text-align: center; height: 35px; vertical-align: middle;">
            GB BAKESHOP - OVERALL PAYROLL CUT-OFF SUMMARY REGISTER
          </td>
        </tr>
        <tr>
          <td colspan="13" style="background-color: #0f172a; color: #38bdf8; font-size: 10px; font-weight: bold; text-align: center; height: 25px; vertical-align: middle;">
            LOCATION: ${activeEstablishmentLabel.value.toUpperCase()}   |   CUT-OFF PERIOD: ${fromStr.toUpperCase()} TO ${toStr.toUpperCase()}   |   RELEASE DATE: ${releaseStr.toUpperCase()}   |   DATE GENERATED: ${reportDate.toUpperCase()}
          </td>
        </tr>
        <tr><td colspan="13" style="height: 10px;"></td></tr>

        <!-- KPI Metric Cards Row -->
        <tr>
          <td colspan="3" style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 8px; text-align: center;">
            <div style="color: #166534; font-weight: bold; font-size: 9px;">TOTAL EMPLOYEES</div>
            <div style="color: #14532d; font-weight: bold; font-size: 16px;">${filteredSummary.value.length}</div>
          </td>
          <td colspan="3" style="background-color: #eff6ff; border: 1px solid #bfdbfe; padding: 8px; text-align: center;">
            <div style="color: #1e40af; font-weight: bold; font-size: 9px;">GROSS EARNINGS</div>
            <div style="color: #1e3a8a; font-weight: bold; font-size: 16px;">${formatMoney(grandTotals.value.gross)}</div>
          </td>
          <td colspan="3" style="background-color: #fef2f2; border: 1px solid #fecaca; padding: 8px; text-align: center;">
            <div style="color: #991b1b; font-weight: bold; font-size: 9px;">TOTAL DEDUCTIONS</div>
            <div style="color: #7f1d1d; font-weight: bold; font-size: 16px;">${formatMoney(grandTotals.value.deductions)}</div>
          </td>
          <td colspan="4" style="background-color: #ccfbf1; border: 1px solid #99f6e4; padding: 8px; text-align: center;">
            <div style="color: #115e59; font-weight: bold; font-size: 9px;">NET PAYROLL</div>
            <div style="color: #134e4a; font-weight: bold; font-size: 16px;">${formatMoney(grandTotals.value.net)}</div>
          </td>
        </tr>
        <tr><td colspan="13" style="height: 15px;"></td></tr>

        <!-- Data Table Header -->
        <tr style="height: 30px;">
          <th style="width: 180px; text-align: left;">Employee Name</th>
          <th style="width: 120px; text-align: left;">Designation</th>
          <th style="width: 60px; text-align: center;">Days</th>
          <th style="width: 90px; text-align: right;">Rate/Day</th>
          <th style="width: 100px; text-align: right;">Basic Pay</th>
          <th style="width: 90px; text-align: right;">Overtime</th>
          <th style="width: 90px; text-align: right;">Night Diff</th>
          <th style="width: 90px; text-align: right;">Holiday</th>
          <th style="width: 100px; text-align: right;">Allowances</th>
          <th style="width: 110px; text-align: right;">Gross Income</th>
          <th style="width: 100px; text-align: right;">Deductions</th>
          <th style="width: 110px; text-align: right;">Net Pay</th>
          <th style="width: 140px; text-align: center;">Employee Signature</th>
        </tr>

        <!-- Data Table Rows -->
        ${rowsHtml}

        <!-- Grand Totals Row -->
        <tr style="background-color: #e6fffa; height: 30px;">
          <td colspan="2" style="border: 2px solid #0d9488; font-weight: bold; text-align: left; padding: 6px; color: #0f766e;">GRAND TOTALS (${filteredSummary.value.length} Employees)</td>
          <td style="border: 2px solid #0d9488; font-weight: bold; text-align: center; padding: 6px; color: #0f766e;">${grandTotals.value.days}</td>
          <td style="border: 2px solid #0d9488; font-weight: bold; text-align: right; padding: 6px; color: #0f766e;">-</td>
          <td style="border: 2px solid #0d9488; font-weight: bold; text-align: right; padding: 6px; color: #0f766e;">${formatMoney(grandTotals.value.basicPay)}</td>
          <td style="border: 2px solid #0d9488; font-weight: bold; text-align: right; padding: 6px; color: #0f766e;">${formatMoney(grandTotals.value.overtime)}</td>
          <td style="border: 2px solid #0d9488; font-weight: bold; text-align: right; padding: 6px; color: #0f766e;">${formatMoney(grandTotals.value.nightDiff)}</td>
          <td style="border: 2px solid #0d9488; font-weight: bold; text-align: right; padding: 6px; color: #0f766e;">${formatMoney(grandTotals.value.holiday)}</td>
          <td style="border: 2px solid #0d9488; font-weight: bold; text-align: right; padding: 6px; color: #0f766e;">${formatMoney(grandTotals.value.allowances)}</td>
          <td style="border: 2px solid #0d9488; font-weight: bold; text-align: right; padding: 6px; color: #0f766e;">${formatMoney(grandTotals.value.gross)}</td>
          <td style="border: 2px solid #0d9488; font-weight: bold; text-align: right; padding: 6px; color: #dc2626;">${formatMoney(grandTotals.value.deductions)}</td>
          <td style="border: 2px solid #0d9488; font-weight: bold; text-align: right; padding: 6px; color: #0d9488; font-size: 11px;">${formatMoney(grandTotals.value.net)}</td>
          <td style="border: 2px solid #0d9488; font-weight: bold; text-align: center; padding: 6px; color: #0f766e;">-</td>
        </tr>

        <tr><td colspan="13" style="height: 30px;"></td></tr>

        <!-- Official Signatures Block -->
        <tr>
          <td colspan="4" style="text-align: center; vertical-align: top;">
            <div>____________________________________</div>
            <div style="font-weight: bold; font-size: 10px; margin-top: 4px;">PREPARED BY</div>
            <div style="color: #64748b; font-size: 9px;">Payroll Officer</div>
          </td>
          <td colspan="4" style="text-align: center; vertical-align: top;">
            <div>____________________________________</div>
            <div style="font-weight: bold; font-size: 10px; margin-top: 4px;">CHECKED BY</div>
            <div style="color: #64748b; font-size: 9px;">Accounting Head</div>
          </td>
          <td colspan="5" style="text-align: center; vertical-align: top;">
            <div>____________________________________</div>
            <div style="font-weight: bold; font-size: 10px; margin-top: 4px;">APPROVED BY</div>
            <div style="color: #64748b; font-size: 9px;">General Manager / Admin</div>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(["\uFEFF" + excelTemplate], { type: "application/vnd.ms-excel;charset=utf-8" });
  const estSlug = (activeEstablishmentLabel.value || 'Global').replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `Payroll_Cutoff_Summary_${estSlug}_${selectedPeriod.value.from}_to_${selectedPeriod.value.to}.xls`;
  
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  Notify.create({
    type: "positive",
    message: `Exported styled Excel spreadsheet: ${filename}`,
    timeout: 3000,
  });
};

onMounted(() => {
  loadCutoffPeriods();
  try {
    branchesStore.fetchBranches();
    warehousesStore.fetchWarehouses();
  } catch (err) {}
});
</script>

<style lang="scss" scoped>
.cutoff-summary-container {
  background-color: #f8fafc;
  min-height: 100vh;
}

.rounded-card {
  border-radius: 12px;
}

.font-mono {
  font-family: "JetBrains Mono", "Fira Code", monospace;
}

.border-teal {
  border: 1px solid #99f6e4;
}

.signature-cell {
  letter-spacing: -1px;
}

.metric-card {
  border-radius: 12px;
  transition: transform 0.2s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
}

.gradient-net-card {
  background: linear-gradient(135deg, #0ca289 0%, #0d9488 100%) !important;
}

/* Table Styling */
.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.payroll-summary-table {
  border-collapse: collapse;
  width: 100%;
  font-size: 0.875rem;

  th,
  td {
    padding: 12px 14px;
    border-bottom: 1px solid #e2e8f0;
    white-space: nowrap;
  }

  thead {
    background-color: #f1f5f9;
    color: #334155;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;

    th {
      border-bottom: 2px solid #cbd5e1;
    }
  }

  tbody tr:hover {
    background-color: #f8fafc;
  }

  .highlight-col {
    background-color: #f0fdf4;
  }

  .highlight-col-net {
    background-color: #ccfbf1;
  }

  tfoot {
    background-color: #f8fafc;

    tr.grand-totals-row {
      td {
        border-top: 2px solid #0ca289;
        border-bottom: 2px double #0ca289;
        background-color: #e6fffa;
        color: #0f766e;
      }
    }
  }
}

.border-red-light {
  border: 1px solid #fecaca;
}

.border-b-teal {
  border-bottom: 2px solid #0d9488;
}

.border-b-red {
  border-bottom: 2px solid #ef4444;
}
</style>
