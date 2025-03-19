<template>
  <div class="q-mt-lg">
    <div class="q-gutter-x-md" align="center">
      <q-btn
        label="Denomination"
        rounded
        style="width: 150px"
        color="light-blue-6"
        class="user-button"
        @click="openDialog"
      />
    </div>
    <q-dialog v-model="dialog" persistent>
      <q-card style="width: 700px">
        <q-card-section class="bg-gradient text-white">
          <div class="row justify-between">
            <div class="text-h6">Demomination Report</div>
            <div>
              <q-btn flat round dense icon="close" @click="closeBtn" />
            </div>
          </div>
        </q-card-section>

        <div class="q-pa-md row q-gutter-md justify-between">
          <div class="col-6">
            <div class="row justify-between text-weight-light text-h6 q-mt-md">
              <div>1000 Bills:</div>
              <div>
                <q-input
                  style="width: 100px"
                  v-model="denominationData.oneThousandBills"
                  outlined
                  flat
                  dense
                  suffix="pcs"
                />
              </div>
            </div>
            <div class="row justify-between text-weight-light text-h6 q-mt-md">
              <div>500 Bills:</div>
              <div>
                <q-input
                  style="width: 100px"
                  v-model="denominationData.fiveHundredBills"
                  outlined
                  flat
                  dense
                  suffix="pcs"
                />
              </div>
            </div>
            <div class="row justify-between text-weight-light text-h6 q-mt-md">
              <div>200 Bills:</div>
              <div>
                <q-input
                  style="width: 100px"
                  v-model="denominationData.twoHundredBills"
                  outlined
                  flat
                  dense
                  suffix="pcs"
                />
              </div>
            </div>
            <div class="row justify-between text-weight-light text-h6 q-mt-md">
              <div>100 Bills:</div>
              <div>
                <q-input
                  style="width: 100px"
                  v-model="denominationData.oneHundredBills"
                  outlined
                  flat
                  dense
                  suffix="pcs"
                />
              </div>
            </div>
            <div class="row justify-between text-weight-light text-h6 q-mt-md">
              <div>50 Bills:</div>
              <div>
                <q-input
                  style="width: 100px"
                  v-model="denominationData.fiftyBills"
                  outlined
                  flat
                  dense
                  suffix="pcs"
                />
              </div>
            </div>
            <div class="row justify-between text-weight-light text-h6 q-mt-md">
              <div>20 Bills:</div>
              <div>
                <q-input
                  style="width: 100px"
                  v-model="denominationData.twentyBills"
                  outlined
                  flat
                  dense
                  suffix="pcs"
                />
              </div>
            </div>
          </div>
          <div class="col-5">
            <div class="row justify-between text-weight-light text-h6 q-mt-md">
              <div>20 coins:</div>
              <div>
                <q-input
                  style="width: 100px"
                  v-model="denominationData.twentyCoins"
                  outlined
                  flat
                  dense
                  suffix="pcs"
                />
              </div>
            </div>
            <div class="row justify-between text-weight-light text-h6 q-mt-md">
              <div>10 coins:</div>
              <div>
                <q-input
                  style="width: 100px"
                  v-model="denominationData.tenCoins"
                  outlined
                  flat
                  dense
                  suffix="pcs"
                />
              </div>
            </div>
            <div class="row justify-between text-weight-light text-h6 q-mt-md">
              <div>5 coins:</div>
              <div>
                <q-input
                  style="width: 100px"
                  v-model="denominationData.fiveCoins"
                  outlined
                  flat
                  dense
                  suffix="pcs"
                />
              </div>
            </div>
            <div class="row justify-between text-weight-light text-h6 q-mt-md">
              <div>1 coins:</div>
              <div>
                <q-input
                  style="width: 100px"
                  v-model="denominationData.oneCoins"
                  outlined
                  flat
                  dense
                  suffix="pcs"
                />
              </div>
            </div>
            <div class="row justify-between text-weight-light text-h6 q-mt-md">
              <div>25 cents:</div>
              <div>
                <q-input
                  style="width: 100px"
                  v-model="denominationData.twentyFiveCents"
                  outlined
                  flat
                  dense
                  suffix="pcs"
                />
              </div>
            </div>
            <div class="text-h6 q-mt-md" align="center">
              <div>Total Denomination</div>
              <div>
                <q-input v-model="totalDenominationFormat" outlined readonly />
              </div>
            </div>
          </div>
        </div>
        <q-card-section>
          <div align="right">
            <q-btn
              color="red-6"
              label="Submit"
              class="q-pa-sm"
              size="md"
              @click="handleSubmit"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useSalesReportsStore } from "src/stores/sales-report";
import { reactive, ref, computed } from "vue";

const salesReportsStore = useSalesReportsStore();

const dialog = ref(false);
const openDialog = () => {
  dialog.value = true;
};
const closeBtn = () => {
  dialog.value = false;
};

const denominationData = reactive({
  oneThousandBills: 0,
  fiveHundredBills: 0,
  twoHundredBills: 0,
  oneHundredBills: 0,
  fiftyBills: 0,
  twentyBills: 0,
  twentyCoins: 0,
  tenCoins: 0,
  fiveCoins: 0,
  oneCoins: 0,
  twentyFiveCents: 0,
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const totalDenomination = computed(() => {
  return (
    denominationData.oneThousandBills * 1000 +
    denominationData.fiveHundredBills * 500 +
    denominationData.twoHundredBills * 200 +
    denominationData.oneHundredBills * 100 +
    denominationData.fiftyBills * 50 +
    denominationData.twentyBills * 20 +
    denominationData.twentyCoins * 20 +
    denominationData.tenCoins * 10 +
    denominationData.fiveCoins * 5 +
    denominationData.oneCoins * 1 +
    denominationData.twentyFiveCents * 0.25
  );
});
const totalDenominationFormat = computed(() => {
  return formatCurrency(totalDenomination.value);
});

const handleSubmit = () => {
  const rawTotalDenomination = totalDenomination.value;
  salesReportsStore.getDenominationData(denominationData);
  salesReportsStore.updateDenominationTotal(rawTotalDenomination);
  salesReportsStore.calculateCharges(rawTotalDenomination); // Calculate charges

  console.log("Denomination Data:", denominationData);
  console.log("Raw Total Denomination:", rawTotalDenomination);
  console.log("Formatted Total Denomination:", totalDenominationFormat.value);

  closeBtn();
};
</script>

<style lang="scss" scoped>
.user-card {
  height: 100%;
  border-radius: 15px;
  background: #fff;
  color: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-button {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-button:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}

.bg-gradient {
  background: linear-gradient(135deg, #1d2423, #0981dd);
  // #0981dd
}
</style>
