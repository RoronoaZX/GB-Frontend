<template>
  <q-dialog ref="dialogRef">
    <q-card style="width: 500px">
      <q-card-section class="row bg-primary text-white">
        <div class="text-h6">Uniform List</div>
        <q-space />
        <div>
          <q-btn icon="close" flat dense round v-close-popup />
        </div>
      </q-card-section>

      <q-card-section>
        <div class="q-my-md">
          <div>T-Shirt</div>
          <q-list bordered separator>
            <q-item>
              <q-item-section> Size </q-item-section>
              <q-item-section> Qty </q-item-section>
              <q-item-section side> Price </q-item-section>
            </q-item>

            <q-item
              v-for="(uniform, index) in uniformList.t_shirts"
              :key="index"
            >
              <q-item-section>
                {{ uniform.size }}
              </q-item-section>
              <q-item-section>
                {{ uniform.pcs }}
              </q-item-section>
              <q-item-section side>
                {{ uniform.price }}
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-h6"> Total : </q-item-section>
              <q-item-section />
              <q-item-section />
              <q-item-section side class="text-h6">
                {{ formatCurrency(tShirtTotal) }}
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div>
          <div>Pants</div>
          <q-list bordered separator>
            <q-item>
              <q-item-section> Size </q-item-section>
              <q-item-section> Qty </q-item-section>
              <q-item-section side> Price </q-item-section>
            </q-item>

            <q-item v-for="(uniform, index) in uniformList.pants" :key="index">
              <q-item-section> {{ uniform.size }} </q-item-section>
              <q-item-section> {{ uniform.pcs }} </q-item-section>
              <q-item-section side> {{ uniform.price }} </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-h6"> Total : </q-item-section>
              <q-item-section />
              <q-item-section />
              <q-item-section side class="text-h6">
                {{ formatCurrency(pantsTotal) }}
              </q-item-section>
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

const props = defineProps(["uniformList"]);
console.log("uniformList", props.uniformList);

const emit = defineEmits(["update:total"]);

const tShirtTotal = computed(() => {
  return props.uniformList?.t_shirts?.reduce((sum, item) => {
    return sum + parseFloat(item.price || 0);
  }, 0);
});

const pantsTotal = computed(() => {
  return props.uniformList?.pants?.reduce((sum, item) => {
    return sum + parseFloat(item.price || 0);
  }, 0);
});

const formatCurrency = (value) => {
  const number = parseFloat(value || 0);
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

// watch(
//   () => props.uniformList,
//   (newList) => {
//     const rawTotal = newList?.reduce((acc, item) => {
//       return acc + parseFloat(item.total_price || 0);
//     }, 0);
//     emit("update:total", rawTotal);
//   },
//   {
//     immediate: true,
//     deep: true,
//   }
// );
</script>

<style lang="scss" scoped></style>
