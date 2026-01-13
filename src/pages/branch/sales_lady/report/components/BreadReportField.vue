<template>
  <div class="q-pa-xm">
    <div class="text-subtitle2 text-weight-light">Bread Report</div>
    <q-list dense separator class="box">
      <q-item>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Product Name</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Price</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Beginnigs</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >New Prod</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Remainings</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Bread Out</q-item-label
          >
        </q-item-section>
        <!-- <q-item-section>
          <q-item-label class="text-overline" align="center">Sold</q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-overline" align="center"
            >Sales</q-item-label
          >
        </q-item-section> -->
        <q-item-section side>
          <q-item-label>
            <span>Action</span>
          </q-item-label>
          <!-- blank -->
        </q-item-section>
      </q-item>
      <div v-for="(bread, index) in breadReports" :key="index">
        <q-item>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ bread.name }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ formatCurrency(bread.price) }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ bread.beginnings }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ bread.new_production }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ bread.remaining }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span> {{ bread.bread_out }} </span>
            </q-item-label>
          </q-item-section>
          <!-- <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ bread.bread_sold }}
              </span>
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-caption" align="center">
              <span>
                {{ formatCurrency(bread.sales) }}
              </span>
            </q-item-label>
          </q-item-section> -->
          <q-item-section side>
            <q-btn
              color="red"
              icon="backspace"
              round
              dense
              flat
              @click="removeBread(index)"
            />
          </q-item-section>
        </q-item>
      </div>
    </q-list>

    <!-- <q-field outlined dense readonly>
      <div class="q-py-sm">
        <div class="q-gutter-md">
          <div>
            <q-item v-for="(bread, index) in breadReports" :key="index">
              <q-item-section class="q-ma-sm text-subtitle2" side>
                {{ bread.name }}
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Beginnings</q-item-label>
                <q-item-label caption>
                  {{ bread.total }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Remainnings</q-item-label>
                <q-item-label caption>
                  {{ bread.remaining }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Bread Out</q-item-label>
                <q-item-label caption>
                  {{ bread.bread_out }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Sold</q-item-label>
                <q-item-label caption>
                  {{ bread.bread_sold }} -->
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
    <!-- </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Price</q-item-label>
                <q-item-label caption>
                  {{ formatCurrency(bread.price) }}
                </q-item-label>
              </q-item-section>

              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-item-label>Sales</q-item-label>
                <q-item-label caption>
                  {{ formatCurrency(bread.sales) }}
                </q-item-label>
              </q-item-section>
              <q-item-section class="q-ma-sm q-gutter-sm" side>
                <q-btn
                  color="red"
                  icon="close"
                  round
                  dense
                  @click="removeBread(index)"
                />
              </q-item-section>
            </q-item>
          </div>
        </div>
      </div>
    </q-field> -->
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useSalesReportsStore } from "src/stores/sales-report";

const salesReportsStore = useSalesReportsStore();
const breadReports = computed(() => salesReportsStore.breadReports);

console.log("Bread Reportssss:", breadReports.value);

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const removeBread = (index) => {
  salesReportsStore.removeBread(index);
};
</script>

<style lang="scss" scoped>
.bg-backgroud {
  background: linear-gradient(to right, #4b0082, #800080, #9932cc, #d8bfd8);
}

.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>
