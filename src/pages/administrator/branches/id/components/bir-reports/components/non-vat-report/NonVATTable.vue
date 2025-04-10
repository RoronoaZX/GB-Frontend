<template>
  <q-table
    class="table-container sticky-header"
    :columns="columns"
    :rows="rows"
    row-key="name"
    v-model:pagination="paginationRef"
    :rows-per-page-options="[0]"
    hide-bottom
    :loading="loading"
  >
    <!-- Editable receipt_no -->
    <template v-slot:body-cell-receipt_no="props">
      <q-td :props="props" align="center">
        <span>{{ props.row.receipt_no }}</span>
        <q-popup-edit
          v-model="props.row.receipt_no"
          @update:model-value="(val) => updateReceiptNo(props.row, val)"
          auto-save
          v-slot="scope"
        >
          <q-input
            v-model="scope.value"
            dense
            autofocus
            counter
            @keyup.enter="scope.set"
          />
        </q-popup-edit>
      </q-td>
    </template>

    <!-- Editable description -->
    <template v-slot:body-cell-description="props">
      <q-td :props="props" align="center">
        <span>{{ props.row.description.toUpperCase() }}</span>
        <q-popup-edit
          v-model="props.row.description"
          @update:model-value="(val) => updateDescription(props.row, val)"
          auto-save
          v-slot="scope"
        >
          <q-input
            v-model="scope.value"
            dense
            autofocus
            counter
            @keyup.enter="scope.set"
          />
        </q-popup-edit>
      </q-td>
    </template>

    <!-- Editable address -->
    <template v-slot:body-cell-address="props">
      <q-td :props="props" align="center">
        <span>{{ props.row.address.toUpperCase() }}</span>
        <q-popup-edit
          v-model="props.row.address"
          @update:model-value="(val) => updateAddress(props.row, val)"
          auto-save
          v-slot="scope"
        >
          <q-input
            v-model="scope.value"
            dense
            autofocus
            counter
            @keyup.enter="scope.set"
          />
        </q-popup-edit>
      </q-td>
    </template>

    <!-- Editable tin_no -->
    <template v-slot:body-cell-tin_no="props">
      <q-td :props="props" align="center">
        <span>{{ props.row.tin_no }}</span>
        <q-popup-edit
          v-model="props.row.tin_no"
          @update:model-value="(val) => updateTinNo(props.row, val)"
          auto-save
          v-slot="scope"
        >
          <q-input
            v-model="scope.value"
            dense
            autofocus
            counter
            @keyup.enter="scope.set"
          />
        </q-popup-edit>
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";

defineProps({
  rows: Array,
  columns: Array,
  filter: String,
  pagination: Object,
  loading: Boolean,
  updateReceiptNo: Function,
  updateDescription: Function,
  updateAddress: Function,
  updateTinNo: Function,
});

const emit = defineEmits(["update:pagination"]);

const paginationRef = ref({ ...props.pagination });

// Watch and emit changes to the parent
watch(paginationRef, (val) => {
  emit("update:pagination", val);
});
</script>
