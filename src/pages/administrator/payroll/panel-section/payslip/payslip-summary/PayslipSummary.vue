<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">Payslip</div>
          <div class="row q-gutter-md">
            <q-input
              outlined
              dense
              rounded
              debounce="300"
              placeholder="Search Employee"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>

            <q-btn
              class="gradient-btn"
              padding="sm md"
              size="sm"
              icon="print"
              dense
              flat
              label="PRINT"
            ></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row justify-between">
          <div>From: Oct. 11, 2024</div>
          <div>To: Oct. 25, 2024</div>
        </div>
      </q-card-section>
      <div class="row justify-between q-mx-md">
        <div>
          <div class="text-subtitle1">Employee Name: John D. Doe</div>
          <div class="text-subtitle1">Employee Type: Regular</div>
        </div>
        <div>
          <div class="text-subtitle1">Payroll Date: Nov. 05, 2024</div>
          <div class="text-subtitle1">Rate/Day: 480.00</div>
          <div class="text-subtitle1">COLA: 0.00</div>
        </div>
      </div>
      <div class="row">
        <div class="col-6 q-px-md">
          <IncomeCard />
        </div>
        <div class="col-6 q-px-md">
          <DeductionCard />
        </div>
      </div>

      <q-card-section>
        <div class="row">
          <div class="col-6"></div>
          <div class="col-6 text-subtitle2" align="right">
            <div>Uniform Balance: 00.00</div>
            <div>Credits Balance: 00.00</div>
            <div>Charges Balance: 00.00</div>
            <div>Cash Advance Balance: 00.00</div>
            <div>Motor / Cellphone / Others: 00.00</div>
            <div class="text-h5">NET INCOME: 00.00</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import IncomeCard from "./IncomeCard.vue";
import DeductionCard from "./DeductionCard.vue";
</script>

<style lang="scss" scoped>
// .gradient-btn {
//   background: linear-gradient(45deg, #fc0165, #2575fc);
//   border: none;
// }

.gradient-btn {
  border: 5px solid; /* Define border size */
  border-image-slice: 1;
  border-width: 2px; /* Adjust the width as needed */
  border-image-source: linear-gradient(
    45deg,
    #fc0165,
    #2575fc
  ); /* Use your gradient */
  background-color: transparent; /* Set background to transparent if needed */
}

.gradient-btn q-btn {
  background-color: white; /* Keep the button's background white */
  padding: sm md;
  font-size: 1rem;
  color: #000; /* Adjust text color */
}
</style>
