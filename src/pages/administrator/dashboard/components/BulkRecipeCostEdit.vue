<template>
  <q-dialog v-model="show" persistent backdrop-filter="blur(4px)">
    <q-card style="min-width: 500px; border-radius: 16px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bold">Bulk Cost Update</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <div class="text-caption text-grey-7 q-mb-md">
          Select recipes and update their ingredient costs simultaneously.
        </div>

        <q-form @submit="onSubmit" class="q-gutter-md">
          <!-- Selection Table -->
          <q-table
            :rows="recipeCosts"
            :columns="columns"
            row-key="id"
            selection="multiple"
            v-model:selected="selected"
            flat
            bordered
            dense
            :pagination="{ rowsPerPage: 5 }"
            class="q-mb-md"
          >
            <template v-slot:body-cell-recipe="props">
              <q-td :props="props">
                <div class="text-weight-bold">{{ props.row.recipe_name }}</div>
                <div class="text-caption text-grey-6">{{ props.row.raw_material_name }}</div>
              </q-td>
            </template>
          </q-table>

          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <q-select
                v-model="form.changed_field"
                label="Field to Update"
                :options="[
                  { label: 'Price per Gram', value: 'price_per_gram' },
                  { label: 'Quantity Used', value: 'quantity_used' }
                ]"
                emit-value
                map-options
                outlined
                dense
              />
            </div>
            <div class="col-6">
              <q-input
                v-model.number="form.new_value"
                type="number"
                step="0.0001"
                label="New Value"
                outlined
                dense
                suffix="PHP"
              />
            </div>
          </div>

          <q-input
            v-model="form.reason"
            type="textarea"
            label="Reason for Adjustment"
            outlined
            dense
            rows="2"
          />

          <div class="row justify-end q-mt-lg">
            <q-btn label="Cancel" flat color="grey-7" v-close-popup />
            <q-btn
              label="Update Selected"
              color="primary"
              unelevated
              type="submit"
              :loading="loading"
              :disable="selected.length === 0"
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

const props = defineProps({
  modelValue: Boolean,
  recipeCosts: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue", "updated"]);

const show = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const loading = ref(false);
const selected = ref([]);
const form = reactive({
  changed_field: "price_per_gram",
  new_value: 0,
  reason: "",
});

const columns = [
  { name: "recipe", label: "Recipe / Ingredient", align: "left" },
  { name: "current", label: "Current Price", align: "right", field: row => row.price_per_gram },
];

const onSubmit = async () => {
  if (selected.value.length === 0) return;

  loading.value = true;
  try {
    const res = await api.post("/api/bulk-update-recipe-costs", {
      ids: selected.value.map(s => s.id),
      changed_field: form.changed_field,
      new_value: form.new_value,
      reason: form.reason,
    });

    if (res.data.success) {
      Notify.create({
        type: "positive",
        message: res.data.message,
      });
      emit("updated");
      show.value = false;
      selected.value = [];
    }
  } catch (err) {
    console.error("Bulk update failed:", err);
    Notify.create({
      type: "negative",
      message: "Failed to perform bulk update",
    });
  } finally {
    loading.value = false;
  }
};
</script>
