<template>
  <q-dialog v-model="internalValue" backdrop-filter="blur(6px) saturate(150%)">
    <q-card
      style="max-width: 400px; width: 90vw"
      class="bg-transparent no-shadow"
    >
      <!-- class="bg-white rounded-borders shadow-10" -->
      <!-- Close Button -->
      <q-card-actions align="right" class="q-pa-sm">
        <q-btn
          flat
          rounded
          dense
          icon="close"
          @click="close"
          class="text-white"
        />
      </q-card-actions>
      <!-- <q-btn flat dense icon="close" round @click="close" color="grey-7" /> -->

      <!-- Main Content -->
      <q-card-section class="q-pa-md">
        <template v-if="items.length > 0">
          <div
            v-for="(item, i) in items"
            :key="i"
            class="q-pa-md q-mb-md rounded-borders bg-grey-2 shadow-2"
          >
            <div class="text-subtitle1 text-primary text-weight-bold">
              {{ label }}
            </div>
            <q-separator spaced color="grey-4" />

            <q-item dense>
              <q-item-section avatar>
                <q-icon name="straighten" color="blue-grey-7" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption class="text-grey-7">Size</q-item-label>
                <q-item-label class="text-weight-medium">{{
                  item.size || "N/A"
                }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item dense>
              <q-item-section avatar>
                <q-icon name="inventory_2" color="blue-grey-7" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption class="text-grey-7"
                  >Quantity</q-item-label
                >
                <q-item-label class="text-weight-medium"
                  >{{ item.pcs || 0 }} pcs</q-item-label
                >
              </q-item-section>
            </q-item>

            <q-item dense>
              <q-item-section avatar>
                <q-icon name="attach_money" color="blue-grey-7" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption class="text-grey-7">Amount</q-item-label>
                <q-item-label class="text-weight-medium"
                  >₱{{
                    parseFloat(item.price).toFixed(2) || "0.00"
                  }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </div>
        </template>

        <!-- No Items -->
        <template v-else>
          <div class="q-pa-md q-mb-md rounded-borders bg-grey-2 shadow-2">
            <div class="text-subtitle1 text-primary text-weight-bold">
              {{ label }}
            </div>
            <q-separator spaced color="grey-4" />

            <q-item dense>
              <q-item-section avatar>
                <q-icon name="straighten" color="blue-grey-7" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption class="text-grey-7">Size</q-item-label>
                <q-item-label class="text-weight-medium">N/A</q-item-label>
              </q-item-section>
            </q-item>

            <q-item dense>
              <q-item-section avatar>
                <q-icon name="inventory_2" color="blue-grey-7" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption class="text-grey-7"
                  >Quantity</q-item-label
                >
                <q-item-label class="text-weight-medium">0 pcs</q-item-label>
              </q-item-section>
            </q-item>

            <q-item dense>
              <q-item-section avatar>
                <q-icon name="attach_money" color="blue-grey-7" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption class="text-grey-7">Amount</q-item-label>
                <q-item-label class="text-weight-medium">₱0.00</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </template>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- <q-dialog v-model="internalValue" backdrop-filter="blur(4px)">
    <q-card class="bg-transparent no-shadow">
      <q-card-actions align="right">
        <q-btn
          flat
          rounded
          dense
          icon="close"
          @click="close"
          class="text-white"
        />
      </q-card-actions>
      <q-card-section class="q-pa-md">
        <template v-if="items.length > 0">
          <div
            v-for="(item, i) in items"
            :key="i"
            class="q-pa-md q-mb-md rounded-borders shadow-1 bg-grey-1"
          >
            <div class="text-h6 text-primary">{{ label }}</div>
            <q-separator class="q-my-sm" />

            <div class="text-body1 q-mb-xs">
              <q-icon name="straighten" class="q-mr-sm text-grey-8" />
              <strong>Size:</strong> {{ item.size || "N/A" }}
            </div>

            <div class="text-body1 q-mb-xs">
              <q-icon name="inventory_2" class="q-mr-sm text-grey-8" />
              <strong>Quantity:</strong> {{ item.pcs || 0 }} pcs
            </div>

            <div class="text-body1">
              <q-icon name="attach_money" class="q-mr-sm text-grey-8" />
              <strong>Amount:</strong> ₱{{
                parseFloat(item.price).toFixed(2) || "0.00"
              }}
            </div>
          </div>
        </template>

        <template v-else>
          <div class="q-pa-md q-mb-md rounded-borders shadow-1 bg-grey-1">
            <div class="text-h6 text-primary">{{ label }}</div>
            <q-separator class="q-my-sm" />

            <div class="text-body1 q-mb-xs">
              <q-icon name="straighten" class="q-mr-sm text-grey-8" />
              <strong>Size:</strong> N/A
            </div>

            <div class="text-body1 q-mb-xs">
              <q-icon name="inventory_2" class="q-mr-sm text-grey-8" />
              <strong>Quantity:</strong> 0 pcs
            </div>

            <div class="text-body1">
              <q-icon name="attach_money" class="q-mr-sm text-grey-8" />
              <strong>Amount:</strong> ₱0.00
            </div>
          </div>
        </template>
      </q-card-section>
    </q-card>
  </q-dialog> -->
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: Boolean,
  items: Array,
  label: String,
});

const emit = defineEmits(["update:modelValue"]);

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

function close() {
  emit("update:modelValue", false);
}
</script>
