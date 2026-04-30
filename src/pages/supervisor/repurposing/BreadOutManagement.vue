<template>
  <q-page class="q-pa-md bg-grey-1">
    <div class="row items-center q-mb-md">
      <div class="text-h5 text-weight-bold">Bread Out &amp; Repurposing Management</div>
    </div>

    <!-- Pending Bread Outs Table -->
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <div class="text-h6 q-mb-md">Pending Bread from Branches</div>
        <q-table
          :rows="pendingBreadOuts"
          :columns="columns"
          row-key="id"
          :loading="loading"
          flat
        >
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-chip color="orange" text-color="white" size="sm" dense>
                {{ props.row.status.toUpperCase() }}
              </q-chip>
            </q-td>
          </template>
          
          <template v-slot:body-cell-actions="props">
            <q-td :props="props" align="center">
              <q-btn
                color="primary"
                icon="autorenew"
                label="Process"
                size="sm"
                @click="openProcessDialog(props.row)"
                unelevated
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <!-- Action Dialog -->
    <q-dialog v-model="processDialog" persistent>
      <q-card style="min-width: 450px; border-radius: 12px;">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Process Bread Out</div>
          <div class="text-subtitle2">
            {{ selectedRow?.branch?.name }} - {{ selectedRow?.product?.name }} (Qty: {{ selectedRow?.quantity }})
          </div>
        </q-card-section>

        <q-card-section class="q-pt-md">
          <div class="q-mb-md">Select Action:</div>
          <q-btn-toggle
            v-model="actionType"
            spread
            class="q-mb-md"
            no-caps
            rounded
            unelevated
            toggle-color="primary"
            color="white"
            text-color="primary"
            :options="[
              {label: 'Toasted Bread', value: 'toasted'},
              {label: 'Bread Crumbs', value: 'crumbs'},
              {label: 'Spoilage', value: 'spoiled'}
            ]"
          />

          <!-- Toasted Specific Fields -->
          <div v-if="actionType === 'toasted'" class="q-gutter-md">
            <q-select
              v-model="outputProduct"
              :options="productOptions"
              label="Select Toasted Product Output"
              outlined
              dense
            />
            <q-select
              v-model="destinationBranch"
              :options="branchOptions"
              label="Destination Branch (For Toasted Stock)"
              outlined
              dense
            />
            <q-input
              v-model.number="outputQuantity"
              type="number"
              label="Quantity Produced"
              outlined
              dense
            />
          </div>

          <!-- Crumbs Specific Fields -->
          <div v-if="actionType === 'crumbs'" class="q-gutter-md">
            <q-select
              v-model="outputRawMaterial"
              :options="rawMaterialOptions"
              label="Select Raw Material Output (Crumbs)"
              outlined
              dense
            />
            <q-input
              v-model.number="outputQuantity"
              type="number"
              label="Quantity Produced"
              outlined
              dense
            />
          </div>

          <!-- Spoilage Specific Fields -->
          <div v-if="actionType === 'spoiled'" class="q-gutter-md">
            <q-input
              v-model.number="outputQuantity"
              type="number"
              label="Quantity Spoiled"
              outlined
              dense
            />
            <q-input
              v-model="spoilageReason"
              type="textarea"
              label="Reason for Spoilage"
              outlined
              rows="3"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary q-px-md q-pb-md">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="primary" label="Confirm &amp; Process" @click="submitProcess" :loading="processing" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar } from "quasar";
import { useBreadOutStore } from "src/stores/bread-out";
import { api } from "src/boot/axios";

const $q = useQuasar();
const breadOutStore = useBreadOutStore();

const pendingBreadOuts = ref([]);
const loading = ref(false);
const processDialog = ref(false);
const processing = ref(false);
const selectedRow = ref(null);

const actionType = ref('toasted');
const outputQuantity = ref(1);
const spoilageReason = ref('');

// Options Data
const rawProducts = ref([]);
const rawBranches = ref([]);
const rawMaterialsData = ref([]);

const outputProduct = ref(null);
const destinationBranch = ref(null);
const outputRawMaterial = ref(null);

const columns = [
  { name: 'date', align: 'left', label: 'Date', field: row => new Date(row.created_at).toLocaleDateString(), sortable: true },
  { name: 'branch', align: 'left', label: 'Branch', field: row => row.branch?.name, sortable: true },
  { name: 'product', align: 'left', label: 'Original Product', field: row => row.product?.name, sortable: true },
  { name: 'quantity', align: 'center', label: 'Quantity', field: 'quantity', sortable: true },
  { name: 'status', align: 'center', label: 'Status', field: 'status' },
  { name: 'actions', align: 'center', label: 'Actions', field: 'actions' }
];

const productOptions = computed(() => {
  return rawProducts.value.map(p => ({
    label: p.name,
    value: p.id
  }));
});

const branchOptions = computed(() => {
  return rawBranches.value.map(b => ({
    label: b.name,
    value: b.id
  }));
});

const rawMaterialOptions = computed(() => {
  return rawMaterialsData.value.map(rm => ({
    label: rm.name + ' (' + rm.unit + ')',
    value: rm.id
  }));
});

const fetchData = async () => {
  loading.value = true;
  try {
    const res = await breadOutStore.fetchBreadOuts({ status: 'pending' });
    if (res) {
      pendingBreadOuts.value = res;
    }
    
    // Fetch dropdown data
    const [productsRes, branchesRes, rmRes] = await Promise.all([
      api.get('/api/products'),
      api.get('/api/branches'),
      api.get('/api/raw-materials')
    ]);
    
    rawProducts.value = productsRes.data.filter(p => p.category === 'Toasted'); // Or however Toasted is categorized
    if (rawProducts.value.length === 0) {
        rawProducts.value = productsRes.data; // fallback
    }
    rawBranches.value = branchesRes.data;
    rawMaterialsData.value = rmRes.data;
  } catch (error) {
    console.error("Failed to load data", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});

const openProcessDialog = (row) => {
  selectedRow.value = row;
  actionType.value = 'toasted';
  outputQuantity.value = row.quantity;
  spoilageReason.value = '';
  
  // Set default branch to the branch that sent it
  const defaultBranch = rawBranches.value.find(b => b.id === row.branch_id);
  if (defaultBranch) {
    destinationBranch.value = { label: defaultBranch.name, value: defaultBranch.id };
  } else {
    destinationBranch.value = null;
  }

  processDialog.value = true;
};

const submitProcess = async () => {
  if (actionType.value === 'toasted' && (!outputProduct.value || !destinationBranch.value || outputQuantity.value <= 0)) {
    $q.notify({ type: 'warning', message: 'Please complete all Toasted fields' });
    return;
  }
  if (actionType.value === 'crumbs' && (!outputRawMaterial.value || outputQuantity.value <= 0)) {
    $q.notify({ type: 'warning', message: 'Please complete all Crumbs fields' });
    return;
  }
  if (actionType.value === 'spoiled' && outputQuantity.value <= 0) {
    $q.notify({ type: 'warning', message: 'Please enter valid spoilage quantity' });
    return;
  }

  processing.value = true;
  try {
    let res;
    if (actionType.value === 'spoiled') {
      res = await breadOutStore.processSpoilage({
        bread_out_id: selectedRow.value.id,
        quantity: outputQuantity.value,
        reason: spoilageReason.value
      });
    } else {
      res = await breadOutStore.processConversion({
        bread_out_id: selectedRow.value.id,
        action_type: actionType.value,
        output_id: actionType.value === 'toasted' ? outputProduct.value.value : outputRawMaterial.value.value,
        output_quantity: outputQuantity.value,
        destination_branch_id: actionType.value === 'toasted' ? destinationBranch.value.value : null
      });
    }

    if (res.success) {
      processDialog.value = false;
      fetchData(); // refresh list
    }
  } finally {
    processing.value = false;
  }
};
</script>

<style scoped>
.my-card {
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}
</style>
