<template>
  <q-btn dense outline color="red" icon="close" size="sm" @click="openDialog" />

  <q-dialog
    v-model="dialog"
    backdrop-filter="blur(4px) saturate(150%) brightness(60%)"
  >
    <q-card style="max-width: 400px; width: 100%">
      <q-card-section
        class="q-pa-md q-rounded q-elevate-2 bg-white text-grey-9"
      >
        <div class="text-h5 q-mb-md">Decline Overtime</div>
        <div class="q-pa-md">
          <q-input
            v-model="reason"
            filled
            type="textarea"
            placeholder="Reason"
          />
        </div>
      </q-card-section>
      <q-separator class="q-mb-md" />
      <q-card-section>
        <q-card-actions align="right" class="q-pt-none">
          <q-btn
            flat
            dense
            label="Cancel"
            color="primary"
            v-close-popup
            class="q-mr-sm"
          />
          <q-btn
            dense
            label="Decline"
            color="negative"
            :disable="!reason"
            @click="onDecline"
            class="q-btn-rounded q-px-lg"
          />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { useDTRStore } from "src/stores/dtr";

const props = defineProps(["decline"]);
const dtrStore = useDTRStore();
console.log("decline", props.decline);
const userData = computed(() => dtrStore.user);
console.log("userDatafromDeclineButton", userData.value);
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

.q-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.q-btn:active {
  transform: translateY(0);
  box-shadow: none;
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
