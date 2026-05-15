<template>
  <q-dialog v-model="show" full-width>
    <q-card class="elegant-card">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bolder text-grey-8">Branch Activity History</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <TableComponents :filters="filters" title="Branch Specific Activity Logs" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import TableComponents from 'src/pages/administrator/history_log/components/TableComponents.vue';

const props = defineProps({
  branchId: {
    type: [String, Number],
    required: true
  }
});

const show = ref(false);

const filters = computed(() => ({
  branch_id: props.branchId
}));

const open = () => {
  show.value = true;
};

defineExpose({
  open
});
</script>

<style scoped lang="scss">
.elegant-card {
  border-radius: 24px;
  background: #ffffff;
}
</style>
