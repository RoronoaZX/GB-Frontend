<template>
  <q-btn unelevated dense color="dark" size="sm" no-caps @click="openDialog">
    <div class="row q-px-xm">
      <q-icon left size="1.5em" name="check" />
      <div>Approve</div>
    </div>
  </q-btn>

  <q-dialog
    v-model="dialog"
    backdrop-filter="blur(4px) saturate(150%) brightness(60%)"
  >
    <q-card>
      {{ props.approve }}
      <q-card-section
        class="q-pa-md q-rounded q-elevate-2 bg-white text-grey-9"
      >
        <div class="text-h5 q-mb-md">Approve Overtime</div>
        <p class="text-body2 q-mb-none">
          Are you sure you want to approve overtime? This action cannot be
          undone.
        </p>
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
            label="Approve"
            color="dark"
            @click="onApproveOvertime"
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

const props = defineProps(["approve"]);
console.log("approve", props.approve);
const dtrStore = useDTRStore();
const userData = computed(() => dtrStore.user);
console.log("userDatafromApprovebutton", userData.value);
const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};

const onApproveOvertime = async () => {
  console.log("Approving overtime for ID:", props.approve.id);

  await dtrStore.approveOvertime({
    id: props.approve.id,
    approved_by: userData.value.employee.id,
  });
  dialog.value = false;
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
