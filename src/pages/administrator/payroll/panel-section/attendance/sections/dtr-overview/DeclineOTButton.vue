<template>
  <!-- ── Reject trigger button ── -->
  <q-btn unelevated dense no-caps class="ot-reject-btn" @click="openDialog">
    <span class="ot-reject-label">Reject</span>
    <q-tooltip
      anchor="top middle"
      self="bottom middle"
      :offset="[0, 6]"
      class="ot-tooltip ot-tooltip--reject"
    >
      Reject OT
    </q-tooltip>
  </q-btn>

  <!-- ── Confirmation dialog ── -->
  <q-dialog
    v-model="dialog"
    backdrop-filter="blur(4px) saturate(150%) brightness(60%)"
  >
    <q-card class="decline-card" style="max-width: 400px; width: 100%">
      <q-card-section class="decline-card__header">
        <div class="decline-card__icon-wrap">
          <q-icon name="cancel" size="28px" color="white" />
        </div>
        <div>
          <div class="decline-card__title">Reject Overtime</div>
          <div class="decline-card__subtitle">Provide a reason before declining.</div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="decline-card__body">
        <q-input
          v-model="reason"
          filled
          type="textarea"
          label="Reason for rejection"
          rows="3"
          class="decline-card__input"
        />
      </q-card-section>

      <q-card-actions align="right" class="decline-card__actions">
        <q-btn flat dense label="Cancel" color="grey-7" no-caps v-close-popup />
        <q-btn
          unelevated
          label="Reject"
          no-caps
          :disable="!reason"
          class="decline-card__confirm-btn"
          @click="onDecline"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { useDTRStore } from "src/stores/dtr";

const props = defineProps(["decline"]);
const dtrStore = useDTRStore();
/* console.log("decline", props.decline); */
const userData = computed(() => dtrStore.user);
/* console.log("userDatafromDeclineButton", userData.value); */
const dialog = ref(false);
const reason = ref("");

const openDialog = async () => {
  dialog.value = true;
};

const onDecline = async () => {
  try {
    await dtrStore.declineOvertime({
      id: props.decline.id,
      declined_by: userData.value.employee.id,
      reason: reason.value,
    });
    dialog.value = false;
  } catch (error) {
    console.error("Error declining overtime:", error);
  }
};
</script>

<style scoped>
/* ── Reject trigger button ───────────────────────── */
.ot-reject-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0 8px !important;
  height: 24px;
  min-height: 24px;
  background: #fff1f2 !important;
  color: #dc2626 !important;
  border-radius: 0 !important;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  box-shadow: none;
  border: none;
  transition: background 0.18s ease, color 0.18s ease;
}

.ot-reject-btn:hover {
  background: #fca5a5 !important;
  color: #7f1d1d !important;
}

.ot-reject-btn:focus-visible {
  outline: 2px solid #f87171;
  outline-offset: -2px;
}

.ot-reject-btn:active {
  background: #ef4444 !important;
  color: #fff !important;
}

.ot-reject-icon {
  flex-shrink: 0;
}

.ot-reject-label {
  line-height: 1;
}

/* ── Tooltip ─────────────────────────────────────── */
.ot-tooltip {
  font-size: 0.72rem;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 6px;
}

.ot-tooltip--reject {
  background: #7f1d1d !important;
  color: #fef2f2 !important;
}

/* ── Confirmation card ───────────────────────────── */
.decline-card {
  border-radius: 16px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.14);
  overflow: hidden;
}

.decline-card__header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 22px 24px 18px !important;
  background: #7f1d1d;
  color: #fef2f2;
}

.decline-card__icon-wrap {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.decline-card__title {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.3;
}

.decline-card__subtitle {
  font-size: 0.75rem;
  opacity: 0.65;
  margin-top: 2px;
}

.decline-card__body {
  padding: 18px 24px 8px !important;
}

.decline-card__input :deep(.q-field__control) {
  border-radius: 8px;
}

.decline-card__actions {
  padding: 12px 20px 18px !important;
  gap: 8px;
}

.decline-card__confirm-btn {
  background: #b91c1c !important;
  color: #fff !important;
  border-radius: 8px !important;
  padding: 6px 20px !important;
  font-size: 0.82rem;
  font-weight: 600;
  transition: background 0.18s ease;
}

.decline-card__confirm-btn:hover {
  background: #991b1b !important;
}

.decline-card__confirm-btn:disabled {
  opacity: 0.45;
}
</style>
