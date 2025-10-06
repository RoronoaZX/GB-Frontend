<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="q-pa-md q-rounded q-elevate-2 bg-white text-grey-9">
      <q-card-section class="q-pt-none q-pb-sm">
        <div class="text-h5 q-mb-xs">Decline Report</div>
        <p v-if="!showRemarks">Are you sure you want to decline this report?</p>
      </q-card-section>

      <!-- Textarea appears after clicking "Yes! Decline" -->
      <q-card-section v-if="showRemarks">
        <q-input
          v-model="remarks"
          type=" textarea"
          label="Reason  for declining"
          filled
          autogrow
          dense
          ref="remarksInput"
          :rules="[(val) => !!val || 'Remarks are required']"
        />
      </q-card-section>
      <q-separator class="q-mb-md" />
      <q-card-section>
        <q-card-actions align="right" class="q-pt-none">
          <q-btn
            flat
            dense
            label="No"
            color="primary"
            v-close-popup
            class="q-mr-sm"
          />
          <q-btn
            dense
            :label="showRemarks ? 'Submit Decline' : 'Yes! Decline'"
            color="negative"
            class="q-btn-rounded q-px-lg"
            @click="handleDecline"
          />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { ref } from "vue";

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const showRemarks = ref(false);

const remarks = ref("");
const remarksInput = ref(null);
const loading = ref(false);

const handleDecline = async () => {
  if (!showRemarks.value) {
    // First click -> show textarea
    showRemarks.value = true;
  } else {
    loading.value = true;
    // Validate before submitting
    if (remarksInput.value.validate()) {
      onDialogOK({ remarks: remarks.value });
    }
  }
};
</script>

<style scoped>
.q-card {
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.q-card-section {
  padding: 24px 32px;
}

.q-btn {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.q-btn-rounded {
  border-radius: 50px;
}

.q-btn:active {
  transform: translateY(0);
}

.text-h5 {
  font-weight: 600;
}

.text-body2 {
  color: #666;
}

.q-elevate-2 {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.bg-white {
  background-color: #fff;
}

.text-grey-9 {
  color: #333;
}

.q-separator {
  border-color: #eee;
}
</style>
