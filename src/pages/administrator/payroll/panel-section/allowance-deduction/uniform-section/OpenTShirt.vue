<template>
  <q-dialog v-model="show">
    <q-card>
      <q-card-section class="row items-center q-pa-sm bg-primary text-white">
        <div class="text-h6">{{ label }} Details</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-list v-if="items.length">
          <q-item v-for="(item, index) in items" :key="index">
            <q-item-section>
              <div>Size: {{ item.size }}</div>
              <div>Pieces: {{ item.pcs }}</div>
              <div>Price: ₱{{ item.price }}</div>
            </q-item-section>
          </q-item>
        </q-list>
        <div v-else class="text-grey text-center q-mt-md">
          No data available
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: Boolean,
  items: Array,
  label: {
    type: String,
    default: "Uniform",
  },
});

const emit = defineEmits(["update:modelValue"]);
const show = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>
