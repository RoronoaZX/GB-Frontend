<template>
  <div class="q-pa-xm">
    <div class="text-subtitle2 text-weight-light">Softdrinks Report</div>
    <q-list dense separator class="box">
      <q-item>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Product Name</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Beginnigs</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Remainings</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Softdrinks Out</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline" align="center">Sold</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Price</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Sales</q-item-label
          >
        </q-item-section>
        <q-item-section side>
          <q-item-label>
            <span>Action</span>
          </q-item-label>
          <!-- blank -->
        </q-item-section>
      </q-item>
      <div v-for="(softdrinks, index) in softdrinksReports" :key="index">
        <q-item>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ softdrinks.name }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ softdrinks.beginnings }}
              </span>
            </q-item-label>
          </q-item-section>
          <!-- <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ selecta.total }}
              </span>
            </q-item-label>
          </q-item-section> -->
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ softdrinks.remaining }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ softdrinks.out }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ softdrinks.sold }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ formatCurrency(softdrinks.price) }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ formatCurrency(softdrinks.sales) }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section align="center" side>
            <q-item-label>
              <q-btn
                color="red"
                icon="backspace"
                round
                dense
                flat
                @click="removeSoftdrink(index)"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
    <!-- <q-field outlined dense readonly>
      <div class="q-py-sm">
        <div class="q-gutter-md">
          <div>
            <q-item
              v-for="(softdrinks, index) in softdrinksReports"
              :key="index"
            >
              <q-item-section class="q-ma-sm text-subtitle2" side>
                {{ softdrinks.name }}
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Beginnings</q-item-label>
                <q-item-label caption>
                  {{ softdrinks.total }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Remainnings</q-item-label>
                <q-item-label caption>
                  {{ softdrinks.remainings }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Sold</q-item-label>
                <q-item-label caption>
                  {{ softdrinks.sold }}

                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Price</q-item-label>
                <q-item-label caption>
                  {{ formatCurrency(softdrinks.price) }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Sales</q-item-label>
                <q-item-label caption>
                  {{ formatCurrency(softdrinks.sales) }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-btn
                  color="red"
                  icon="close"
                  round
                  dense
                  @click="removeSoftdrink(index)"
                />
              </q-item-section>
            </q-item>
          </div>
        </div>
      </div>
    </q-field> -->
  </div>
  <!-- <q-popup-edit
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
                  </q-popup-edit> -->
</template>

<script setup>
import { computed } from "vue";
import { useSalesReportsStore } from "src/stores/sales-report";

const salesReportsStore = useSalesReportsStore();
const softdrinksReports = computed(() => salesReportsStore.softdrinksReports);

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const removeSoftdrink = (index) => {
  salesReportsStore.removeSoftdrink(index);
};
</script>
<style lang="scss" scoped>
.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
