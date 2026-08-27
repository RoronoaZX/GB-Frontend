<template>
  <!-- ── Approve trigger button ── -->
  <q-btn unelevated dense no-caps class="ot-approve-btn" @click="openDialog">
    <span class="ot-approve-label">Approve</span>
    <q-tooltip
      anchor="top middle"
      self="bottom middle"
      :offset="[0, 6]"
      class="ot-tooltip ot-tooltip--approve"
    >
      Approve OT
    </q-tooltip>
  </q-btn>

  <!-- ── Confirmation dialog ── -->
  <q-dialog
    v-model="dialog"
    backdrop-filter="blur(4px) saturate(150%) brightness(60%)"
  >
    <q-card class="approve-card">
      <q-card-section class="approve-card__header">
        <div class="approve-card__icon-wrap">
          <q-icon name="check_circle" size="28px" color="white" />
        </div>
        <div>
          <div class="approve-card__title">Approve Overtime</div>
          <div class="approve-card__subtitle">This action cannot be undone.</div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="approve-card__body">
        <p class="approve-card__message">
          Are you sure you want to approve this overtime request?
        </p>
      </q-card-section>

      <q-card-actions align="right" class="approve-card__actions">
        <q-btn flat dense label="Cancel" color="grey-7" no-caps v-close-popup />
        <q-btn
          unelevated
          label="Approve"
          no-caps
          class="approve-card__confirm-btn"
          @click="onApproveOvertime"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { useDTRStore } from "src/stores/dtr";

const props = defineProps(["approve"]);
/* console.log("approve", props.approve); */
const dtrStore = useDTRStore();
const userData = computed(() => dtrStore.user);
/* console.log("userDatafromApprovebutton", userData.value); */
const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const onApproveOvertime = async () => {
  /* console.log("Approving overtime for ID:", props.approve.id); */

  await dtrStore.approveOvertime({
    id: props.approve.id,
    approved_by: userData.value.employee.id,
  });
  dialog.value = false;
};
</script>

<style scoped>
/* ── Approve trigger button ──────────────────────── */
.ot-approve-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0 10px !important;
  height: 24px;
  min-height: 24px;
  background: #1e293b !important;
  color: #f8fafc !important;
  border-radius: 0 !important;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  box-shadow: none;
  border: none;
  transition: background 0.18s ease, box-shadow 0.18s ease;
}

.ot-approve-btn:hover {
  background: #334155 !important;
  box-shadow: 0 2px 8px rgba(30, 41, 59, 0.28) !important;
}

.ot-approve-btn:focus-visible {
  outline: 2px solid #64748b;
  outline-offset: -2px;
}

.ot-approve-btn:active {
  background: #0f172a !important;
  box-shadow: none !important;
}

.ot-approve-icon {
  flex-shrink: 0;
}

.ot-approve-label {
  line-height: 1;
}

/* ── Tooltip ─────────────────────────────────────── */
.ot-tooltip {
  font-size: 0.72rem;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 6px;
}

.ot-tooltip--approve {
  background: #1e293b !important;
  color: #f1f5f9 !important;
}

/* ── Confirmation card ───────────────────────────── */
.approve-card {
  width: 380px;
  max-width: 92vw;
  border-radius: 16px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.14);
  overflow: hidden;
}

.approve-card__header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 22px 24px 18px !important;
  background: #1e293b;
  color: #f8fafc;
}

.approve-card__icon-wrap {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.approve-card__title {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.3;
}

.approve-card__subtitle {
  font-size: 0.75rem;
  opacity: 0.65;
  margin-top: 2px;
}

.approve-card__body {
  padding: 18px 24px 8px !important;
}

.approve-card__message {
  font-size: 0.875rem;
  color: #374151;
  margin: 0;
  line-height: 1.6;
}

.approve-card__actions {
  padding: 12px 20px 18px !important;
  gap: 8px;
}

.approve-card__confirm-btn {
  background: #1e293b !important;
  color: #f8fafc !important;
  border-radius: 8px !important;
  padding: 6px 20px !important;
  font-size: 0.82rem;
  font-weight: 600;
  transition: background 0.18s ease;
}

.approve-card__confirm-btn:hover {
  background: #334155 !important;
}
</style>
