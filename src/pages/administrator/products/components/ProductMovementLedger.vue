<template>
  <q-dialog v-model="dialogVisible" persistent maximized transition-show="slide-up" transition-hide="slide-down">
    <q-card class="ledger-dialog-card bg-grey-1">
      <!-- Modal Header Toolbar -->
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-icon name="history_edu" size="28px" class="q-mr-sm" />
        <q-toolbar-title class="text-weight-bold">
          Product Movement & 3-Stage Audit Ledger
        </q-toolbar-title>

        <q-btn flat round dense icon="refresh" @click="fetchLedgerData" :loading="loading" class="q-mr-xs">
          <q-tooltip>Refresh Ledger</q-tooltip>
        </q-btn>
        <q-btn flat round dense icon="picture_as_pdf" @click="openPrintDialog" class="q-mr-xs">
          <q-tooltip>Export / Print PDF</q-tooltip>
        </q-btn>
        <q-btn flat round dense icon="close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-toolbar>

      <!-- Main Content Container -->
      <div class="q-pa-md ledger-container" id="printable-ledger-wrapper">
        <!-- Product & Pricing Info Banner -->
        <q-card flat class="q-mb-md banner-card shadow-1 bg-white" id="printable-banner">
          <q-card-section>
            <div class="row items-center justify-between q-col-gutter-md">
              <!-- Product Title -->
              <div class="col-12 col-md-4">
                <div class="row items-center no-wrap">
                  <q-avatar
                    size="48px"
                    :color="getCategoryColor(productInfo.category)"
                    text-color="white"
                    class="q-mr-md text-h6 text-weight-bold"
                  >
                    {{ productInfo.category?.charAt(0) || 'P' }}
                  </q-avatar>
                  <div>
                    <div class="text-h6 text-weight-bolder text-capitalize text-grey-9">
                      {{ productInfo.name || 'Product Ledger' }}
                    </div>
                    <div class="row items-center q-gutter-x-xs q-mt-xs">
                      <q-badge :color="getCategoryColor(productInfo.category)" class="text-bold">
                        {{ productInfo.category }}
                      </q-badge>
                      <span class="text-caption text-grey-7">
                        <q-icon name="place" size="14px" /> {{ branchInfo.branch_name }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Key Metrics Chips -->
              <div class="col-12 col-md-4">
                <div class="row q-gutter-sm justify-center">
                  <div class="metric-box bg-grey-2">
                    <div class="text-caption text-grey-7">Current Stock</div>
                    <div class="text-subtitle1 text-weight-bold text-primary">
                      {{ branchInfo.current_stock ?? 0 }} pcs
                    </div>
                  </div>
                  <div class="metric-box bg-grey-2">
                    <div class="text-caption text-grey-7">Cost Price</div>
                    <div class="text-subtitle1 text-weight-bold text-grey-9">
                      ₱{{ formatCurrency(branchInfo.original_price) }}
                    </div>
                  </div>
                  <div class="metric-box bg-grey-2">
                    <div class="text-caption text-grey-7">Selling Price</div>
                    <div class="text-subtitle1 text-weight-bold text-green-9">
                      ₱{{ formatCurrency(branchInfo.selling_price) }}
                    </div>
                  </div>
                  <div class="metric-box bg-green-1">
                    <div class="text-caption text-green-9">Unit Markup</div>
                    <div class="text-subtitle1 text-weight-bold text-green-10">
                      +₱{{ formatCurrency(branchInfo.unit_markup) }} ({{ branchInfo.markup_percentage }}%)
                    </div>
                  </div>
                </div>
              </div>

              <!-- Date Range Filter -->
              <div class="col-12 col-md-4 text-right print-hide">
                <div class="row items-center justify-end q-gutter-sm">
                  <q-input
                    v-model="fromDate"
                    type="date"
                    outlined
                    dense
                    label="From Date"
                    @update:model-value="fetchLedgerData"
                    style="max-width: 150px"
                  />
                  <q-input
                    v-model="toDate"
                    type="date"
                    outlined
                    dense
                    label="To Date"
                    @update:model-value="fetchLedgerData"
                    style="max-width: 150px"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Audit Trail & Movement Table -->
        <q-card flat class="shadow-1 bg-white table-card" id="printable-ledger">
          <div class="q-pa-md row items-center justify-between border-bottom">
            <div class="text-subtitle1 text-weight-bold text-grey-9">
              <q-icon name="timeline" color="primary" class="q-mr-xs" />
              Chronological Movement History & Verification Chain
            </div>
            <div class="text-caption text-grey-6">
              Showing movements from {{ fromDate }} to {{ toDate }}
            </div>
          </div>

          <div v-if="loading" class="q-pa-xl text-center">
            <q-spinner-dots size="48px" color="primary" />
            <div class="text-grey-7 q-mt-sm">Loading movement history and audit logs...</div>
          </div>

          <div v-else-if="movements.length === 0" class="q-pa-xl text-center text-grey-6">
            <q-icon name="inventory" size="4em" color="grey-4" />
            <div class="text-h6 text-weight-medium q-mt-md">No stock movements recorded</div>
            <div class="text-caption">No deliveries, branch transfers, or sales recorded in this timeframe.</div>
          </div>

          <!-- Movement Data Table -->
          <q-table
            v-else
            :rows="movements"
            :columns="columns"
            row-key="id"
            flat
            :pagination="{ rowsPerPage: 0 }"
            hide-pagination
            class="movement-table"
          >
            <!-- Date & Time -->
            <template v-slot:body-cell-timestamp="props">
              <q-td :props="props">
                <div class="text-weight-bold text-grey-9">{{ formatDate(props.row.timestamp) }}</div>
                <div class="text-caption text-grey-6">{{ formatTime(props.row.timestamp) }}</div>
              </q-td>
            </template>

            <!-- Event Type -->
            <template v-slot:body-cell-type="props">
              <q-td :props="props">
                <div class="row items-center no-wrap q-gutter-x-xs">
                  <q-chip
                    :color="getEventBadgeColor(props.row.type)"
                    :text-color="getEventTextColor(props.row.type)"
                    size="sm"
                    class="text-weight-bold"
                  >
                    <q-icon :name="getEventIcon(props.row.type)" size="14px" class="q-mr-xs" />
                    {{ formatEventType(props.row.type) }}
                  </q-chip>
                  <q-badge
                    v-if="props.row.status"
                    :color="getStatusBadgeColor(props.row.status)"
                    class="text-bold text-uppercase q-ml-xs"
                    size="xs"
                  >
                    {{ formatStatusLabel(props.row.status) }}
                  </q-badge>
                </div>
                <div class="text-caption text-grey-7 q-mt-xs">{{ props.row.reference }}</div>
              </q-td>
            </template>

            <!-- Quantity In / Out -->
            <template v-slot:body-cell-movement="props">
              <q-td :props="props">
                <div v-if="props.row.qty_in" class="text-weight-bold text-green-9 text-subtitle2">
                  +{{ props.row.qty_in }} pcs
                </div>
                <div v-else-if="props.row.qty_out" class="text-weight-bold text-red-8 text-subtitle2">
                  -{{ props.row.qty_out }} pcs
                </div>
                <div v-else class="text-caption text-grey-5">—</div>
              </q-td>
            </template>

            <!-- Running Balance -->
            <template v-slot:body-cell-running_balance="props">
              <q-td :props="props" align="center">
                <q-chip
                  v-if="props.row.running_balance !== null && props.row.running_balance !== undefined"
                  outline
                  color="primary"
                  size="sm"
                  class="text-weight-bolder"
                >
                  {{ props.row.running_balance }} pcs
                </q-chip>
                <span v-else class="text-caption text-grey-5">—</span>
              </q-td>
            </template>

            <!-- 3-Stage Audit Trail -->
            <template v-slot:body-cell-audit_trail="props">
              <q-td :props="props">
                <div class="audit-chain-container q-gutter-y-xs">
                  <!-- Stage 1: Branch Staff -->
                  <div v-if="props.row.audit_trail?.stage_1_received" class="audit-step row items-center no-wrap">
                    <q-badge color="blue-2" text-color="blue-10" class="q-mr-xs text-bold">
                      1. 📥 Branch Staff
                    </q-badge>
                    <span class="text-caption text-weight-medium">
                      {{ props.row.audit_trail.stage_1_received.user_name || props.row.audit_trail.stage_1_received.employee_name || 'Staff' }}
                    </span>
                    <span v-if="props.row.audit_trail.stage_1_received.timestamp" class="text-caption text-grey-6 q-ml-xs">
                      ({{ formatTime(props.row.audit_trail.stage_1_received.timestamp) }})
                    </span>
                  </div>

                  <!-- Stage 2: Supervisor Review -->
                  <div v-if="props.row.audit_trail?.stage_2_checked" class="audit-step row items-center no-wrap">
                    <q-badge
                      :color="props.row.audit_trail.stage_2_checked.employee_id ? 'amber-3' : 'grey-3'"
                      :text-color="props.row.audit_trail.stage_2_checked.employee_id ? 'amber-10' : 'grey-8'"
                      class="q-mr-xs text-bold"
                    >
                      2. 🔍 Supervisor
                    </q-badge>
                    <span class="text-caption text-weight-medium">
                      {{ props.row.audit_trail.stage_2_checked.employee_name || 'Pending Review' }}
                    </span>
                    <span v-if="props.row.audit_trail.stage_2_checked.timestamp" class="text-caption text-grey-6 q-ml-xs">
                      ({{ formatTime(props.row.audit_trail.stage_2_checked.timestamp) }})
                    </span>
                    <q-icon
                      v-if="props.row.audit_trail.stage_2_checked.remark"
                      name="comment"
                      size="14px"
                      color="grey-6"
                      class="q-ml-xs cursor-pointer"
                    >
                      <q-tooltip>{{ props.row.audit_trail.stage_2_checked.remark }}</q-tooltip>
                    </q-icon>
                  </div>

                  <!-- Stage 3: Admin Approval -->
                  <div v-if="props.row.audit_trail?.stage_3_processed" class="audit-step row items-center no-wrap">
                    <q-badge color="green-2" text-color="green-10" class="q-mr-xs text-bold">
                      3. 🛡️ Admin
                    </q-badge>
                    <span class="text-caption text-weight-medium">
                      {{ props.row.audit_trail.stage_3_processed.user_name || 'Admin Confirmed' }}
                    </span>
                    <span v-if="props.row.audit_trail.stage_3_processed.stock_before !== null && props.row.audit_trail.stage_3_processed.stock_before !== undefined" class="text-caption text-purple-9 text-bold q-ml-xs">
                      [{{ props.row.audit_trail.stage_3_processed.stock_before }} → {{ props.row.audit_trail.stage_3_processed.stock_after }}]
                    </span>
                  </div>
                </div>
              </q-td>
            </template>
          </q-table>
        </q-card>
      </div>
    </q-card>

    <!-- PDF Print Preview Dialog (Dashboard Standard) -->
    <q-dialog v-model="printDialog" maximized transition-show="slide-up" transition-hide="slide-down">
      <q-card class="column no-wrap bg-slate-900 text-white" style="height: 100vh; background: #0f172a;">
        <!-- Premium Toolbar -->
        <q-toolbar class="bg-slate-900 text-white q-px-lg q-py-sm shadow-2 pdf-preview-toolbar">
          <q-avatar size="38px" color="red-9" text-color="white" icon="picture_as_pdf" class="q-mr-md shadow-2" />
          <div>
            <div class="text-weight-bold text-subtitle1 row items-center">
              Product Movement & Audit Ledger PDF
              <q-badge color="teal-6" text-color="white" class="q-ml-sm text-bold text-caption" rounded>
                A4 Landscape
              </q-badge>
            </div>
            <div class="text-caption text-grey-4">
              {{ branchInfo.branch_name }} • {{ productInfo.name }} • {{ fromDate }} to {{ toDate }}
            </div>
          </div>

          <q-space />

          <!-- Action Buttons -->
          <div class="row items-center q-gutter-x-sm">
            <q-btn
              unelevated
              no-caps
              color="teal-7"
              text-color="white"
              icon="download"
              label="Download PDF"
              class="pdf-action-btn text-weight-bold q-px-md"
              @click="triggerDownload"
            >
              <q-tooltip anchor="bottom middle" self="top middle">Save PDF document to your device</q-tooltip>
            </q-btn>

            <q-btn
              unelevated
              no-caps
              color="primary"
              text-color="white"
              icon="print"
              label="Print Document"
              class="pdf-action-btn text-weight-bold q-px-md"
              @click="triggerPhysicalPrint"
            >
              <q-tooltip anchor="bottom middle" self="top middle">Send directly to connected printer</q-tooltip>
            </q-btn>

            <q-separator vertical dark inset class="q-mx-sm" />

            <q-btn
              flat
              round
              dense
              icon="close"
              color="grey-4"
              class="pdf-close-btn"
              v-close-popup
            >
              <q-tooltip anchor="bottom middle" self="top middle">Close Preview</q-tooltip>
            </q-btn>
          </div>
        </q-toolbar>

        <!-- PDF Document Frame -->
        <div class="col full-width q-pa-sm" style="background: #1e293b;">
          <iframe
            :src="pdfUrl"
            width="100%"
            height="100%"
            style="border: none; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4); background: #525659;"
          />
        </div>
      </q-card>
    </q-dialog>

    <!-- PDF Download Password Confirmation Dialog -->
    <PasswordAuthDialog
      v-model="passwordConfirmDialog"
      :label="passwordConfirmTarget?.label"
      :description="passwordConfirmTarget?.description"
      v-model:password="passwordConfirmInput"
      v-model:showPassword="passwordConfirmShow"
      :loading="passwordConfirmLoading"
      @confirm="handlePasswordConfirmSubmit"
    />
  </q-dialog>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { api } from "src/boot/axios";
import { date, Notify } from "quasar";
import { usePasswordConfirm } from "src/composables/usePasswordConfirm";
import PasswordAuthDialog from "src/components/PasswordAuthDialog.vue";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.default || pdfFonts.pdfMake?.vfs || pdfFonts;

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  branchId: { type: [Number, String], required: true },
  productId: { type: [Number, String], required: true },
  productName: { type: String, default: "" },
  category: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const {
  passwordConfirmDialog,
  passwordConfirmInput,
  passwordConfirmShow,
  passwordConfirmLoading,
  passwordConfirmTarget,
  promptPasswordConfirm,
  handlePasswordConfirmSubmit,
} = usePasswordConfirm();

const loading = ref(false);
const printDialog = ref(false);
const pdfUrl = ref("");
let currentDocDefinition = null;

const movements = ref([]);
const productInfo = ref({});
const branchInfo = ref({});
const signatories = ref({});

const fromDate = ref(date.formatDate(date.subtractFromDate(new Date(), { days: 30 }), "YYYY-MM-DD"));
const toDate = ref(date.formatDate(new Date(), "YYYY-MM-DD"));

const columns = [
  { name: "timestamp", label: "Date & Time", field: "timestamp", align: "left" },
  { name: "type", label: "Event Type & Reference", field: "type", align: "left" },
  { name: "movement", label: "Movement (Qty)", align: "left" },
  { name: "running_balance", label: "Running Stock Balance", align: "center" },
  { name: "audit_trail", label: "3-Stage Accountability Trail (Branch → Supervisor → Admin)", align: "left" },
];

const formatCurrency = (val) => {
  if (val === null || val === undefined || isNaN(val)) return "0.00";
  return Number(val).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatDate = (val) => {
  if (!val) return "—";
  return date.formatDate(val, "MMM DD, YYYY");
};

const formatTime = (val) => {
  if (!val) return "—";
  return date.formatDate(val, "hh:mm A");
};

const formatEventType = (type) => {
  switch (type) {
    case "opening_stock":
      return "Shift Opening";
    case "delivery_in":
      return "Delivery In";
    case "added_product_in":
      return "Stock Added";
    case "transfer_in":
      return "Transfer In";
    case "transfer_out":
      return "Transfer Out";
    case "admin_adjustment":
      return "Admin Adjustment";
    case "sales_out":
      return "Daily Sales";
    default:
      return type;
  }
};

const getEventBadgeColor = (type) => {
  switch (type) {
    case "opening_stock":
      return "grey-2";
    case "delivery_in":
      return "green-1";
    case "added_product_in":
      return "teal-1";
    case "transfer_in":
      return "indigo-1";
    case "transfer_out":
      return "deep-orange-1";
    case "admin_adjustment":
      return "purple-1";
    case "sales_out":
      return "red-1";
    default:
      return "blue-1";
  }
};

const getEventTextColor = (type) => {
  switch (type) {
    case "opening_stock":
      return "grey-9";
    case "delivery_in":
      return "green-9";
    case "added_product_in":
      return "teal-9";
    case "transfer_in":
      return "indigo-9";
    case "transfer_out":
      return "deep-orange-9";
    case "admin_adjustment":
      return "purple-9";
    case "sales_out":
      return "red-9";
    default:
      return "blue-9";
  }
};

const getEventIcon = (type) => {
  switch (type) {
    case "opening_stock":
      return "history";
    case "delivery_in":
      return "local_shipping";
    case "added_product_in":
      return "add_circle";
    case "transfer_in":
      return "move_to_inbox";
    case "transfer_out":
      return "outbox";
    case "admin_adjustment":
      return "admin_panel_settings";
    case "sales_out":
      return "point_of_sale";
    default:
      return "event";
  }
};

const getStatusBadgeColor = (status) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
    case "approved":
    case "received":
      return "positive";
    case "pending_supervisor":
      return "amber-8";
    case "pending_admin":
    case "pending":
      return "orange-8";
    case "declined":
    case "rejected":
      return "negative";
    default:
      return "blue-grey-6";
  }
};

const formatStatusLabel = (status) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
      return "Confirmed";
    case "received":
      return "Received";
    case "pending_supervisor":
      return "Pending Supv";
    case "pending_admin":
      return "Pending Admin";
    case "pending":
      return "Pending";
    case "declined":
      return "Declined";
    default:
      return status;
  }
};

const getCategoryColor = (cat) => {
  switch (cat?.toLowerCase()) {
    case "selecta":
      return "red-6";
    case "softdrinks":
      return "orange-7";
    case "nestle":
      return "brown-6";
    default:
      return "blue-grey-6";
  }
};

const fetchLedgerData = async () => {
  if (!props.branchId || !props.productId) return;
  loading.value = true;
  try {
    const res = await api.get(`/api/product-movement/${props.branchId}/${props.productId}`, {
      params: {
        from: fromDate.value,
        to: toDate.value,
      },
    });

    if (res.data.success) {
      movements.value = res.data.movements || [];
      productInfo.value = res.data.product || {};
      branchInfo.value = res.data.branch_info || {};
      signatories.value = res.data.signatories || {};
    }
  } catch (error) {
    Notify.create({
      type: "negative",
      message: error.response?.data?.message || "Failed to load product movement ledger",
      position: "top-right",
    });
  } finally {
    loading.value = false;
  }
};

// ── Executive Dashboard-Style PDF Export & Print Definition ──
const generateLedgerDocDefinition = () => {
  const branchName = branchInfo.value.branch_name || "Branch";
  const prodName = productInfo.value.name || props.productName || "Product";
  const catName = productInfo.value.category || props.category || "General";
  const currStock = branchInfo.value.current_stock ?? 0;
  const costPrice = branchInfo.value.original_price ?? 0;
  const sellPrice = branchInfo.value.selling_price ?? 0;
  const unitMarkup = branchInfo.value.unit_markup ?? Math.max(0, sellPrice - costPrice);
  const markupPct = branchInfo.value.markup_percentage ?? (sellPrice > 0 ? Math.round((unitMarkup / sellPrice) * 100) : 0);

  let totalIn = 0;
  let totalOut = 0;
  movements.value.forEach((m) => {
    if (m.qty_in) totalIn += Number(m.qty_in);
    if (m.qty_out) totalOut += Number(m.qty_out);
  });

  const tableBody = [
    [
      { text: "Date & Time", style: "tableHeader", alignment: "left", fillColor: "#0f172a" },
      { text: "Event Type & Reference", style: "tableHeader", alignment: "left", fillColor: "#0f172a" },
      { text: "In", style: "tableHeader", alignment: "center", fillColor: "#0f172a" },
      { text: "Out", style: "tableHeader", alignment: "center", fillColor: "#0f172a" },
      { text: "Balance", style: "tableHeader", alignment: "center", fillColor: "#0f172a" },
      { text: "Stage 1: Branch Staff", style: "tableHeader", alignment: "left", fillColor: "#0f172a" },
      { text: "Stage 2: Supervisor Check", style: "tableHeader", alignment: "left", fillColor: "#0f172a" },
      { text: "Stage 3: Admin Status", style: "tableHeader", alignment: "left", fillColor: "#0f172a" },
    ]
  ];

  if (movements.value.length === 0) {
    tableBody.push([
      { text: "No stock movement records found for this timeframe.", colSpan: 8, style: "tableCell", alignment: "center" },
      {}, {}, {}, {}, {}, {}, {}
    ]);
  } else {
    movements.value.forEach((m) => {
      const stage1 = m.audit_trail?.stage_1_received?.employee_name || m.audit_trail?.stage_1_received?.user_name || "—";
      const stage2Name = m.audit_trail?.stage_2_checked?.employee_name || "—";
      const stage2Remark = m.audit_trail?.stage_2_checked?.remark ? ` (${m.audit_trail.stage_2_checked.remark})` : "";
      const stage2 = stage2Name + stage2Remark;
      const stage3 = m.audit_trail?.stage_3_processed?.user_name || "System Recorded";

      tableBody.push([
        { text: m.timestamp || "—", style: "tableCell", alignment: "left" },
        { text: `${formatEventType(m.type)}\n${m.reference || ''}`, style: "tableCell", alignment: "left" },
        { text: m.qty_in ? `+${m.qty_in}` : "—", style: "tableCell", alignment: "center", bold: !!m.qty_in, color: m.qty_in ? "#15803d" : "#64748b" },
        { text: m.qty_out ? `-${m.qty_out}` : "—", style: "tableCell", alignment: "center", bold: !!m.qty_out, color: m.qty_out ? "#b91c1c" : "#64748b" },
        { text: `${m.running_balance ?? '—'} pcs`, style: "tableCell", alignment: "center", bold: true, color: "#0f172a" },
        { text: stage1, style: "tableCell", alignment: "left" },
        { text: stage2, style: "tableCell", alignment: "left" },
        { text: stage3, style: "tableCell", alignment: "left" },
      ]);
    });
  }

  return {
    pageSize: "A4",
    pageOrientation: "landscape",
    pageMargins: [30, 30, 30, 30],
    content: [
      // ── Executive Header Banner ──
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                fillColor: "#0f172a",
                stack: [
                  { text: "GB BAKESHOP PRODUCT MOVEMENT & 3-STAGE AUDIT LEDGER", color: "#ffffff", fontSize: 13, bold: true, alignment: "center", margin: [0, 6, 0, 2] },
                  { text: `LOCATION: ${branchName.toUpperCase()} | SKU: ${prodName.toUpperCase()} (${catName.toUpperCase()}) | TIMEFRAME: ${fromDate.value} TO ${toDate.value}`, color: "#38bdf8", fontSize: 8, bold: true, alignment: "center", margin: [0, 0, 0, 6] }
                ],
                border: [false, false, false, false]
              }
            ]
          ]
        },
        margin: [0, 0, 0, 10]
      },

      // ── Executive Summary KPI Boxes ──
      {
        columns: [
          {
            table: {
              widths: ["*"],
              body: [[{
                fillColor: "#f8fafc",
                borderColor: "#cbd5e1",
                stack: [
                  { text: "CURRENT STOCK", fontSize: 7, color: "#64748b", bold: true },
                  { text: `${currStock} PCS`, fontSize: 13, bold: true, color: "#0f172a", margin: [0, 2, 0, 0] }
                ]
              }]]
            },
            layout: "lightHorizontalLines"
          },
          {
            table: {
              widths: ["*"],
              body: [[{
                fillColor: "#f8fafc",
                borderColor: "#cbd5e1",
                stack: [
                  { text: "COST PRICE (COGS)", fontSize: 7, color: "#64748b", bold: true },
                  { text: `₱${formatCurrency(costPrice)}`, fontSize: 13, bold: true, color: "#334155", margin: [0, 2, 0, 0] }
                ]
              }]]
            },
            layout: "lightHorizontalLines"
          },
          {
            table: {
              widths: ["*"],
              body: [[{
                fillColor: "#f8fafc",
                borderColor: "#cbd5e1",
                stack: [
                  { text: "SELLING PRICE", fontSize: 7, color: "#64748b", bold: true },
                  { text: `₱${formatCurrency(sellPrice)}`, fontSize: 13, bold: true, color: "#15803d", margin: [0, 2, 0, 0] }
                ]
              }]]
            },
            layout: "lightHorizontalLines"
          },
          {
            table: {
              widths: ["*"],
              body: [[{
                fillColor: "#ecfdf5",
                borderColor: "#a7f3d0",
                stack: [
                  { text: "UNIT MARKUP & MARGIN", fontSize: 7, color: "#047857", bold: true },
                  { text: `+₱${formatCurrency(unitMarkup)} (${markupPct}%)`, fontSize: 13, bold: true, color: "#065f46", margin: [0, 2, 0, 0] }
                ]
              }]]
            },
            layout: "lightHorizontalLines"
          },
          {
            table: {
              widths: ["*"],
              body: [[{
                fillColor: "#f8fafc",
                borderColor: "#cbd5e1",
                stack: [
                  { text: "TOTAL INBOUND IN PERIOD", fontSize: 7, color: "#64748b", bold: true },
                  { text: `+${totalIn} PCS`, fontSize: 13, bold: true, color: "#15803d", margin: [0, 2, 0, 0] }
                ]
              }]]
            },
            layout: "lightHorizontalLines"
          },
          {
            table: {
              widths: ["*"],
              body: [[{
                fillColor: "#f8fafc",
                borderColor: "#cbd5e1",
                stack: [
                  { text: "TOTAL OUTBOUND IN PERIOD", fontSize: 7, color: "#64748b", bold: true },
                  { text: `-${totalOut} PCS`, fontSize: 13, bold: true, color: "#b91c1c", margin: [0, 2, 0, 0] }
                ]
              }]]
            },
            layout: "lightHorizontalLines"
          }
        ],
        columnGap: 8,
        margin: [0, 0, 0, 12]
      },

      // ── Movement Table ──
      {
        table: {
          headerRows: 1,
          widths: ["11%", "21%", "6%", "6%", "9%", "16%", "16%", "15%"],
          body: tableBody
        },
        layout: {
          fillColor: (rowIndex) => rowIndex === 0 ? "#0f172a" : (rowIndex % 2 === 0 ? "#f8fafc" : "#ffffff"),
          hLineWidth: (i, node) => i === 0 || i === 1 || i === node.table.body.length ? 1 : 0.5,
          vLineWidth: () => 0,
          hLineColor: () => "#e2e8f0"
        },
        margin: [0, 0, 0, 16]
      },

      // ── Sign-off & Accountability ──
      {
        columns: [
          {
            stack: [
              { text: "Prepared By (Branch Staff / Cashier):", fontSize: 7.5, bold: true, color: "#475569" },
              {
                text: (signatories.value?.prepared_by?.name || "Branch Staff / Cashier").toUpperCase(),
                fontSize: 8.5,
                bold: true,
                color: "#0f172a",
                margin: [0, 16, 0, 1]
              },
              { text: "____________________________________", color: "#94a3b8", margin: [0, 0, 0, 2] },
              { text: "Signature over Printed Name", fontSize: 6.5, color: "#64748b", italics: true }
            ]
          },
          {
            stack: [
              { text: "Inspected & Verified By (Supervisor):", fontSize: 7.5, bold: true, color: "#475569" },
              {
                text: (signatories.value?.verified_by?.name || "Branch Supervisor").toUpperCase(),
                fontSize: 8.5,
                bold: true,
                color: "#0f172a",
                margin: [0, 16, 0, 1]
              },
              { text: "____________________________________", color: "#94a3b8", margin: [0, 0, 0, 2] },
              { text: "Signature over Printed Name", fontSize: 6.5, color: "#64748b", italics: true }
            ]
          },
          {
            stack: [
              { text: "Acknowledged & Approved (Admin / Owner):", fontSize: 7.5, bold: true, color: "#475569" },
              {
                text: (signatories.value?.authorized_by?.name || "Superadmin / Owner").toUpperCase(),
                fontSize: 8.5,
                bold: true,
                color: "#0f172a",
                margin: [0, 16, 0, 1]
              },
              { text: "____________________________________", color: "#94a3b8", margin: [0, 0, 0, 2] },
              { text: "Signature over Printed Name", fontSize: 6.5, color: "#64748b", italics: true }
            ]
          }
        ],
        margin: [0, 10, 0, 0]
      }
    ],
    footer: function (currentPage, pageCount) {
      return {
        columns: [
          { text: "GB Bakeshop Management System • 3-Stage Audit Ledger", style: "footerText", alignment: "left", margin: [30, 0, 0, 0] },
          { text: `Page ${currentPage.toString()} of ${pageCount.toString()}`, style: "footerText", alignment: "right", margin: [0, 0, 30, 0] }
        ]
      };
    },
    styles: {
      tableHeader: {
        bold: true,
        fontSize: 7.5,
        color: "#ffffff",
        margin: [0, 3, 0, 3]
      },
      tableCell: {
        fontSize: 7,
        color: "#334155",
        margin: [0, 2, 0, 2]
      },
      footerText: {
        fontSize: 6.5,
        color: "#64748b",
        italics: true
      }
    },
    defaultStyle: {
      font: "Roboto"
    }
  };
};

const openPrintDialog = () => {
  currentDocDefinition = generateLedgerDocDefinition();
  pdfMake.createPdf(currentDocDefinition).getDataUrl((dataUrl) => {
    pdfUrl.value = dataUrl;
    printDialog.value = true;
  });
};

const triggerPhysicalPrint = () => {
  if (currentDocDefinition) {
    const productLabel = (productInfo.value.name || "Product").replace(/\s+/g, "_");
    promptPasswordConfirm({
      label: `Product Movement Ledger (Print - ${productLabel})`,
      description: "Please enter your admin password to authorize printing the confidential",
      onConfirm: () => {
        pdfMake.createPdf(currentDocDefinition).print();
      },
    });
  }
};

const triggerDownload = () => {
  if (currentDocDefinition) {
    const branchLabel = (branchInfo.value.branch_name || "Branch").replace(/\s+/g, "_");
    const productLabel = (productInfo.value.name || "Product").replace(/\s+/g, "_");
    promptPasswordConfirm({
      label: `Product Movement Ledger PDF (${productLabel})`,
      description: "Please enter your admin password to authorize downloading the confidential",
      onConfirm: () => {
        const filename = `GB_Movement_Ledger_${branchLabel}_${productLabel}_${fromDate.value}_to_${toDate.value}.pdf`;
        pdfMake.createPdf(currentDocDefinition).download(filename);
      },
    });
  }
};

watch(
  () => [props.modelValue, props.branchId, props.productId],
  ([visible, bId, pId]) => {
    if (visible && bId && pId) {
      fetchLedgerData();
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.ledger-dialog-card {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.ledger-container {
  max-width: 1300px;
  margin: 0 auto;
  width: 100%;
}

.banner-card {
  border-radius: 12px;
}

.metric-box {
  padding: 8px 14px;
  border-radius: 8px;
  text-align: center;
  min-width: 90px;
}

.table-card {
  border-radius: 12px;
}

.border-bottom {
  border-bottom: 1px solid #f0f0f0;
}

.audit-chain-container {
  display: flex;
  flex-direction: column;
}

.pdf-preview-toolbar {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  min-height: 60px;
}

.pdf-action-btn {
  border-radius: 8px;
  font-size: 13px;
  letter-spacing: 0.3px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
  }
}

.pdf-close-btn {
  transition: all 0.2s ease-in-out;
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff !important;
  }
}

@media print {
  body * {
    visibility: hidden;
  }
  #printable-ledger-wrapper,
  #printable-ledger-wrapper * {
    visibility: visible;
  }
  #printable-ledger-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    margin: 0;
    padding: 10px;
  }
  .print-hide {
    display: none !important;
  }
}
</style>
