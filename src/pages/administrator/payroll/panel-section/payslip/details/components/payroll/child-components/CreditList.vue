<template>
  <q-dialog ref="dialogRef">
    <q-card style="width: 500px">
      <q-card-section class="row bg-primary text-white">
        <div class="text-h6">Credit List</div>
        <q-space />
        <div>
          <q-btn icon="close" flat dense round v-close-popup />
        </div>
      </q-card-section>

      <q-card-section>
        <div>
          <q-list bordered separator>
            <q-item>
              <q-item-section>Product Name</q-item-section>
              <q-item-section>Price</q-item-section>
              <q-item-section>Pieces</q-item-section>
              <q-item-section side>Amount</q-item-section>
            </q-item>

            <q-item v-for="(credit, index) in creditList" :key="index">
              <q-item-section>
                {{ credit.product_name }}
              </q-item-section>
              <q-item-section>
                {{ credit.price }}
              </q-item-section>
              <q-item-section>
                {{ credit.pieces }}
              </q-item-section>
              <q-item-section side>
                {{ credit.total_price }}
              </q-item-section>
            </q-item>

            <q-item class="bg-grey-2 text-weight-bold">
              <q-item-section> Total : </q-item-section>
              <q-item-section />
              <q-item-section />
              <q-item-section side>
                {{ formatCurrency(totalAmount) }}</q-item-section
              >
            </q-item>
          </q-list>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";
import { computed, watch } from "vue";

const { dialogRef, onDialogHide } = useDialogPluginComponent();

const props = defineProps(["creditList"]);

console.log("creditListsssss", props.creditList);

const emit = defineEmits(["update:total"]);

const totalAmount = computed(() => {
  return props.creditList
    ?.reduce((sum, item) => {
      return sum + parseFloat(item.total_price || 0);
    }, 0)
    .toFixed(2);
});

const formatCurrency = (value) => {
  const number = parseFloat(value || 0);
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(number);
};

watch(
  () => props.creditList,
  (newList) => {
    const rawTotal = newList?.reduce((acc, item) => {
      return acc + parseFloat(item.total_amount || 0);
    }, 0);
    emit("update:total", rawTotal); // Emit the raw total
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>
