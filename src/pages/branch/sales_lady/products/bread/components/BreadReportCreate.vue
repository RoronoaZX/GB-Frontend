<template>
  <div>
    <q-btn
      class="q-pa-sm"
      color="red"
      dense
      elevated
      icon-right="task_alt"
      label="Check Report"
      @click="openDialog"
    />
  </div>
  <div>
    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section>
          <div align="right">
            <q-btn rounded flat dense icon="close" v-close-popup />
          </div>
          <div class="text-h6" align="center">Checking Bread Report</div>
        </q-card-section>
        <q-card-section>
          <div class="q-pa-xm q-gutter-sm"></div>
          <div class="q-pa-xm q-gutter-sm">
            <q-field outlined dense readonly>
              <div class="q-py-sm">
                <div class="q-gutter-md">
                  <div>
                    <q-item v-for="(bread, index) in breadList" :key="index">
                      <q-item-section class="q-ma-sm text-subtitle2" side>
                        {{ bread.name }}
                      </q-item-section>
                      <q-item-section class="q-ma-sm q-gutter-sm" side>
                        <q-item-label>Sold</q-item-label>
                        <q-item-label caption>
                          {{ bread.sold }}
                          <q-popup-edit
                            dense
                            buttons
                            label-set="Save"
                            label-cancel="Close"
                            v-slot="scope"
                          >
                            <q-input
                              type="number"
                              dense
                              autofocus
                              counter
                              @keyup.enter="scope.set"
                            >
                            </q-input>
                          </q-popup-edit>
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="q-ma-sm q-gutter-sm" side>
                        <q-item-label>Price</q-item-label>
                        <q-item-label caption>
                          {{ bread.price }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="q-ma-sm q-gutter-sm" side>
                        <q-item-label>Beginning</q-item-label>
                        <q-item-label caption>
                          {{ bread.beginning }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="q-ma-sm q-gutter-sm" side>
                        <q-item-label>Sales</q-item-label>
                        <q-item-label caption>
                          {{ bread.sales }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="q-ml-sm" side>
                        <q-btn
                          color="red-5"
                          rounded
                          outline
                          dense
                          label="Submit"
                        />
                      </q-item-section>
                    </q-item>
                  </div>
                </div>
              </div>
            </q-field>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};
const breadList = reactive([
  {
    name: "Whole Wheat",
    sold: 10,
    price: 5,
    beginning: 20,
    sales: 30,
  },
  {
    name: "Sourdough",
    sold: 15,
    price: 7,
    beginning: 25,
    sales: 40,
  },
  {
    name: "Pan de Coco",
    sold: 15,
    price: 4,
    beginning: 25,
    sales: 40,
  },
  // Add more bread items as needed
]);
</script>

<style lang="scss" scoped></style>
