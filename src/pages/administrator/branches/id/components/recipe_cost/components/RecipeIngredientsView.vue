<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    persistent
    position="right"
    backdrop-filter="blur(4px) saturate(150%)"
  >
    <q-card style="width: 900px; max-width: 88vw">
      <!-- Header -->
      <q-card-section class="row items-center bg-background q-py-md">
        <div class="text-h6 text-white row items-center">
          <q-icon name="receipt_long" size="sm" class="q-mr-sm" />
          {{ capitalizeFirstLetter(row.recipe_name || 'N/A') }}
        </div>
        <q-space />
        <q-btn icon="arrow_forward_ios" flat dense round color="white" v-close-popup />
      </q-card-section>

      <!-- Meta Info -->
      <q-card-section class="bg-grey-1 q-py-xs row q-gutter-x-lg text-caption text-grey-7">
        <span>
          <q-icon name="event" size="14px" class="q-mr-xs" />
          {{ formatTimestamp(row.created_at) }}
        </span>
        <span v-if="row.kilo">
          <q-icon name="scale" size="14px" class="q-mr-xs" />
          {{ row.kilo }} kg produced
        </span>
      </q-card-section>

      <q-separator />

      <!-- Ingredients Table -->
      <q-card-section class="q-pa-md">
        <q-table
          flat dense
          :rows="localItems"
          :columns="ingredientColumns"
          row-key="id"
          hide-pagination
          :rows-per-page-options="[0]"
          class="ingredients-table"
        >
          <template v-slot:header="p">
            <q-tr :props="p" class="bg-grey-2">
              <q-th v-for="col in p.cols" :key="col.name" :props="p"
                class="text-weight-bold text-grey-8 text-caption text-uppercase">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body-cell-status="p">
            <q-td :props="p">
              <q-badge :color="p.value === 'confirmed' ? 'positive' : 'warning'" rounded>
                {{ p.value || '—' }}
              </q-badge>
            </q-td>
          </template>

          <template v-slot:body-cell-subtotal="p">
            <q-td :props="p" class="text-weight-bold text-positive">
              {{ formatPrice(p.row.total_cost) }}
            </q-td>
          </template>

          <template v-slot:body-cell-actions="p">
            <q-td :props="p">
              <div class="row items-center justify-center q-gutter-x-xs" v-if="p.row.id && isAdmin">
                <q-btn flat round size="xs" color="primary" icon="edit_note" @click="openEdit(p.row)">
                  <q-tooltip class="bg-primary">Edit Cost</q-tooltip>
                </q-btn>
                <q-btn flat round size="xs" color="blue-grey-6" icon="history" @click="openHistory(p.row)">
                  <q-tooltip class="bg-blue-grey-8">Change History</q-tooltip>
                </q-btn>
              </div>
            </q-td>
          </template>
        </q-table>
      </q-card-section>

      <!-- Total -->
      <q-separator />
      <q-card-section class="row items-center q-py-sm">
        <q-space />
        <span class="text-grey-7 q-mr-sm">Total Recipe Cost:</span>
        <span class="text-weight-bold text-primary text-h6">{{ formatPrice(currentTotal) }}</span>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- ── Edit Cost Dialog ─────────────────────────────────── -->
  <q-dialog v-model="edit.show" persistent>
    <q-card style="min-width: 380px; border-radius: 12px">
      <q-card-section class="bg-primary text-white row items-center">
        <q-icon name="edit_note" class="q-mr-sm" />
        <div class="text-subtitle1 text-weight-bold">
          Edit Cost — {{ edit.item?.raw_material_name }}
        </div>
      </q-card-section>

      <q-card-section class="q-gutter-md q-pt-lg">
        <q-input
          v-model.number="edit.pricePerGram"
          label="Price Per Gram"
          type="number"
          outlined dense
          :hint="`Current: ${edit.item?.price_per_gram}`"
        >
          <template v-slot:prepend><q-icon name="payments" /></template>
        </q-input>

        <q-input
          v-model.number="edit.quantityUsed"
          label="Quantity Used"
          type="number"
          outlined dense
          :hint="`Current: ${edit.item?.quantity_used} ${edit.item?.unit}`"
        >
          <template v-slot:append>
            <span class="text-caption text-grey-6">{{ edit.item?.unit }}</span>
          </template>
          <template v-slot:prepend><q-icon name="scale" /></template>
        </q-input>

        <q-input
          v-model="edit.reason"
          label="Reason for change (optional)"
          outlined dense
          type="textarea"
          rows="2"
        />
      </q-card-section>

      <q-card-actions align="right" class="q-px-md q-pb-md">
        <q-btn flat label="Cancel" @click="edit.show = false" />
        <q-btn
          color="primary"
          label="Save Changes"
          :loading="edit.saving"
          @click="saveEdit"
          unelevated
          style="border-radius: 8px"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- ── Change History Dialog ────────────────────────────── -->
  <q-dialog v-model="history.show">
    <q-card style="min-width: 480px; max-width: 580px; border-radius: 12px">
      <q-card-section class="row items-center bg-dark text-white q-py-sm">
        <q-icon name="history" class="q-mr-sm" />
        <div class="text-subtitle1 text-weight-bold">
          History — {{ history.item?.raw_material_name }}
        </div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>

      <q-card-section class="q-pa-md">
        <div v-if="history.loading" class="flex flex-center q-pa-xl">
          <q-spinner-dots color="primary" size="42px" />
        </div>

        <div v-else-if="history.logs.length === 0" class="text-center q-pa-xl text-grey-6">
          <q-icon name="check_circle_outline" size="3em" />
          <div class="q-mt-sm text-subtitle2">No changes recorded yet.</div>
        </div>

        <q-timeline v-else color="primary" layout="comfortable">
          <q-timeline-entry
            v-for="log in history.logs"
            :key="log.id"
            :subtitle="formatTimestamp(log.changed_at)"
            :title="log.changed_by"
            icon="edit"
          >
            <div class="row items-center q-gutter-x-xs">
              <span class="text-weight-medium">{{ formatField(log.changed_field) }}:</span>
              <q-chip dense color="red-2" text-color="red-9" size="sm">
                {{ log.changed_field === 'price_per_gram' ? '₱' : '' }}{{ log.old_value }}
              </q-chip>
              <q-icon name="arrow_forward" size="14px" color="grey-6" />
              <q-chip dense color="green-2" text-color="green-9" size="sm">
                {{ log.changed_field === 'price_per_gram' ? '₱' : '' }}{{ log.new_value }}
              </q-chip>
            </div>
            <div v-if="log.reason" class="text-caption text-grey-7 q-mt-xs">
              <q-icon name="comment" size="12px" class="q-mr-xs" />{{ log.reason }}
            </div>
          </q-timeline-entry>
        </q-timeline>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useDialogPluginComponent, Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { useUsersStore } from 'src/stores/user';
import { typographyFormat } from 'src/composables/typography/typography-format';

const { capitalizeFirstLetter, formatPrice, formatQuantity, formatTimestamp } = typographyFormat();
const { dialogRef, onDialogHide } = useDialogPluginComponent();

const props = defineProps({
  row: { type: Object, required: true },
});

const userStore = useUsersStore();
const userData = computed(() => userStore.userData);
const userId = computed(() => userData.value?.data?.id || 0);
const isAdmin = computed(() => {
  const role = userData.value?.data?.role;
  return role === "Admin" || role === "Super Admin";
});

// ── Local reactive copy of items so edits reflect instantly ──
const localItems = ref((props.row.items || []).map(i => ({ ...i })));

const currentTotal = computed(() =>
  localItems.value.reduce((sum, i) => sum + (Number(i.total_cost) || 0), 0)
);

// ── Table columns ─────────────────────────────────────────────
const ingredientColumns = [
  { name: 'name',       label: 'Raw Material', align: 'left',   field: r => capitalizeFirstLetter(r.raw_material_name) },
  { name: 'status',     label: 'Status',       align: 'center', field: 'status' },
  { name: 'quantity',   label: 'Qty Used',     align: 'center', field: r => formatQuantity(r.quantity_used, r.unit) },
  { name: 'ppg',        label: 'Price/Gram',   align: 'right',  field: r => formatPrice(r.price_per_gram) },
  { name: 'subtotal',   label: 'Subtotal',     align: 'right',  field: 'total_cost' },
  { name: 'actions',    label: 'Actions',      align: 'center', field: 'actions' },
];

// ── Edit Dialog ───────────────────────────────────────────────
const edit = ref({ show: false, item: null, pricePerGram: 0, quantityUsed: 0, reason: '', saving: false });

function openEdit(item) {
  edit.value = {
    show:         true,
    item,
    pricePerGram: item.price_per_gram,
    quantityUsed: item.quantity_used,
    reason:       '',
    saving:       false,
  };
}

async function saveEdit() {
  edit.value.saving = true;
  try {
    const item = edit.value.item;
    const calls = [];

    if (Number(edit.value.pricePerGram) !== Number(item.price_per_gram)) {
      calls.push(api.post('/api/recipe-cost-change-log', {
        recipe_cost_id: item.id,
        changed_field:  'price_per_gram',
        new_value:      edit.value.pricePerGram,
        reason:         edit.value.reason || null,
        user_id:        userId.value,
      }));
    }
    if (Number(edit.value.quantityUsed) !== Number(item.quantity_used)) {
      calls.push(api.post('/api/recipe-cost-change-log', {
        recipe_cost_id: item.id,
        changed_field:  'quantity_used',
        new_value:      edit.value.quantityUsed,
        reason:         edit.value.reason || null,
        user_id:        userId.value,
      }));
    }

    if (calls.length === 0) {
      Notify.create({ type: 'info', message: 'No changes detected.', position: 'top' });
      edit.value.show = false;
      return;
    }

    const results = await Promise.all(calls);

    // Update localItems to reflect the new values immediately
    const idx = localItems.value.findIndex(i => i.id === item.id);
    if (idx !== -1) {
      localItems.value[idx].price_per_gram = edit.value.pricePerGram;
      localItems.value[idx].quantity_used  = edit.value.quantityUsed;
      // Use the last response's new_total_cost
      const lastRes = results[results.length - 1].data;
      if (lastRes.new_total_cost !== undefined) {
        localItems.value[idx].total_cost = lastRes.new_total_cost;
      }
    }

    Notify.create({ type: 'positive', message: 'Cost updated and change logged.', position: 'top' });
    edit.value.show = false;
  } catch (err) {
    Notify.create({ type: 'negative', message: 'Failed to save changes.', position: 'top' });
    console.error(err);
  } finally {
    edit.value.saving = false;
  }
}

// ── History Dialog ────────────────────────────────────────────
const history = ref({ show: false, item: null, logs: [], loading: false });

async function openHistory(item) {
  history.value = { show: true, item, logs: [], loading: true };
  try {
    const res = await api.get(`/api/recipe-cost-change-log/${item.id}`);
    history.value.logs = res.data?.data || [];
  } catch (err) {
    Notify.create({ type: 'negative', message: 'Failed to load history.', position: 'top' });
    console.error(err);
  } finally {
    history.value.loading = false;
  }
}

const formatField = (field) => field === 'price_per_gram' ? 'Price/Gram' : 'Qty Used';
</script>

<style scoped>
.bg-background {
  background: linear-gradient(to right, #4b0082, #800080, #9932cc, #d8bfd8);
}
.ingredients-table :deep(.q-table__card) {
  box-shadow: none;
}
.ingredients-table :deep(thead tr th) {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #f5f5f5;
}
</style>
