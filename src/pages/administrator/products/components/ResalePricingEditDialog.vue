<template>
  <q-dialog v-model="dialogVisible" persistent>
    <q-card style="width: 550px; max-width: 95vw;" class="rounded-borders q-pa-sm">
      <!-- Card Header -->
      <q-card-section class="row items-center q-pb-none">
        <div class="row items-center">
          <q-avatar color="primary" text-color="white" icon="edit_note" size="42px" class="q-mr-sm shadow-1" />
          <div>
            <div class="text-h6 text-weight-bold text-grey-9">Edit Pricing & Stock</div>
            <div class="text-caption text-grey-7">
              Adjust branch cost, resale price, and physical stock with admin authorization
            </div>
          </div>
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-separator class="q-my-md" />

      <!-- Product & Branch Overview Banner -->
      <q-card-section class="q-pt-none">
        <div class="bg-grey-2 q-pa-sm rounded-borders row items-center justify-between">
          <div>
            <div class="text-subtitle1 text-weight-bolder text-capitalize text-grey-9">
              {{ item?.product_name }}
            </div>
            <div class="text-caption text-grey-7 row items-center q-gutter-x-xs">
              <q-icon name="place" size="14px" color="grey-6" />
              <span>{{ item?.branch_name }}</span>
            </div>
          </div>
          <q-badge
            :color="getCategoryColor(item?.category)"
            class="text-bold text-uppercase q-px-sm q-py-xs"
          >
            {{ item?.category || 'Other' }}
          </q-badge>
        </div>

        <!-- Live Financial Metric Preview -->
        <div class="row q-col-gutter-sm q-mt-sm">
          <div class="col-6">
            <div class="q-pa-xs rounded-borders bg-blue-1 text-center">
              <div class="text-caption text-blue-9 text-weight-medium">Unit Markup</div>
              <div class="text-subtitle2 text-bold text-blue-10">
                ₱{{ formatCurrency(computedMarkup) }}
              </div>
            </div>
          </div>
          <div class="col-6">
            <div
              class="q-pa-xs rounded-borders text-center"
              :class="computedMargin >= 20 ? 'bg-green-1 text-green-10' : (computedMargin > 0 ? 'bg-amber-1 text-amber-10' : 'bg-red-1 text-red-10')"
            >
              <div class="text-caption text-weight-medium">Profit Margin</div>
              <div class="text-subtitle2 text-bold">
                {{ computedMargin }}%
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <!-- Edit Form -->
      <q-card-section class="q-pt-none">
        <q-form @submit="handleSubmit" class="q-gutter-y-sm">
          <div class="row q-col-gutter-sm">
            <!-- Cost Price -->
            <div class="col-12 col-sm-6">
              <q-input
                v-model.number="form.original_price"
                type="number"
                step="0.01"
                min="0"
                outlined
                dense
                label="Original Cost (COGS) *"
                prefix="₱"
                :rules="[val => val >= 0 || 'Cost cannot be negative']"
              >
                <template v-slot:prepend>
                  <q-icon name="shopping_bag" color="grey-6" />
                </template>
              </q-input>
            </div>

            <!-- Selling Price -->
            <div class="col-12 col-sm-6">
              <q-input
                v-model.number="form.selling_price"
                type="number"
                step="0.01"
                min="0"
                outlined
                dense
                label="Branch Selling Price *"
                prefix="₱"
                :rules="[val => val >= 0 || 'Price cannot be negative']"
              >
                <template v-slot:prepend>
                  <q-icon name="sell" color="primary" />
                </template>
              </q-input>
            </div>
          </div>

          <!-- Stock on Hand -->
          <div>
            <q-input
              v-model.number="form.total_quantity"
              type="number"
              min="0"
              outlined
              dense
              label="Stock on Hand (Units) *"
              suffix="pcs"
              :rules="[val => val >= 0 || 'Stock cannot be negative']"
            >
              <template v-slot:prepend>
                <q-icon name="inventory_2" color="teal-7" />
              </template>
            </q-input>
          </div>

          <!-- Reason / Remark -->
          <div>
            <q-input
              v-model="form.reason"
              type="textarea"
              rows="2"
              outlined
              dense
              label="Reason for Adjustment (Optional)"
              placeholder="e.g. Physical inventory recount, supplier price update..."
            >
              <template v-slot:prepend>
                <q-icon name="notes" color="grey-6" />
              </template>
            </q-input>
          </div>

          <q-separator class="q-my-xs" />

          <!-- Admin Password Re-Authentication -->
          <div class="bg-amber-1 q-pa-sm rounded-borders">
            <div class="text-caption text-bold text-amber-10 row items-center q-mb-xs">
              <q-icon name="security" size="16px" class="q-mr-xs" />
              Administrator Authorization Required
            </div>
            <div class="text-caption text-grey-8 q-mb-sm">
              Please enter your Superadmin password to authorize and sign this adjustment in the audit log.
            </div>
            <q-input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              outlined
              dense
              bg-color="white"
              label="Admin Password *"
              placeholder="Enter your password"
              :rules="[val => !!val || 'Password is required to commit changes']"
            >
              <template v-slot:prepend>
                <q-icon name="lock" color="amber-10" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="showPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>
          </div>

          <!-- Actions -->
          <div class="row justify-end q-gutter-x-sm q-pt-sm">
            <q-btn flat label="Cancel" color="grey-7" v-close-popup />
            <q-btn
              type="submit"
              color="primary"
              icon="verified_user"
              label="Authenticate & Save"
              :loading="submitting"
              class="text-bold"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useResalePricingStore } from "src/stores/resale-pricing";

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  item: { type: Object, default: () => ({}) },
});

const emit = defineEmits(["update:modelValue", "updated"]);

const resaleStore = useResalePricingStore();

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const submitting = ref(false);
const showPassword = ref(false);

const form = ref({
  original_price: 0,
  selling_price: 0,
  total_quantity: 0,
  reason: "",
  password: "",
});

watch(
  () => props.item,
  (newItem) => {
    if (newItem) {
      form.value = {
        original_price: newItem.original_price || 0,
        selling_price: newItem.selling_price || 0,
        total_quantity: newItem.current_stock || 0,
        reason: "",
        password: "",
      };
    }
  },
  { immediate: true }
);

const computedMarkup = computed(() => {
  const sell = Number(form.value.selling_price) || 0;
  const cost = Number(form.value.original_price) || 0;
  return Math.max(0, sell - cost);
});

const computedMargin = computed(() => {
  const sell = Number(form.value.selling_price) || 0;
  const markup = computedMarkup.value;
  if (sell <= 0) return 0;
  return Math.round((markup / sell) * 10000) / 100;
});

const formatCurrency = (val) => {
  if (val === null || val === undefined || isNaN(val)) return "0.00";
  return Number(val).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const getCategoryColor = (cat) => {
  switch (cat?.toLowerCase()) {
    case "selecta":
      return "red-6";
    case "softdrinks":
      return "orange-7";
    case "nestle":
      return "brown-6";
    default:
      return "teal-7";
  }
};

const handleSubmit = async () => {
  if (!props.item?.branch_id || !props.item?.product_id) return;
  submitting.value = true;
  try {
    const payload = {
      branch_id: props.item.branch_id,
      product_id: props.item.product_id,
      original_price: form.value.original_price,
      selling_price: form.value.selling_price,
      total_quantity: form.value.total_quantity,
      reason: form.value.reason,
      password: form.value.password,
    };

    const res = await resaleStore.updatePricingAndStock(payload);
    if (res.success) {
      dialogVisible.value = false;
      emit("updated");
    }
  } finally {
    submitting.value = false;
  }
};
</script>
