<template>
  <div>
    <q-card class="account-card q-pa-md">
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">Pay Slip</div>
          <div>
            <div class="text-caption text-weight-light">
              Period Start Date: Aug. 11, 2024
            </div>
            <div class="text-caption text-weight-light">
              Period Ending Date: Aug. 25, 2024
            </div>
            <div class="text-caption text-weight-light">
              Payroll Date: Sept. 05, 2024
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-list separator>
          <div class="row q-gutter-md justify-between">
            <!-- Earnings Summary -->
            <div class="col-5">
              <q-item>
                <q-item-section align="center">
                  <div class="text-h7">Earnings Summary</div>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <div>Regular Pay:</div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-right">
                    {{ formattedRegular }}
                  </div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <div>Overtime Pay:</div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-right">₱120.00</div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <div>Holiday Pay:</div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-right">₱160.00</div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <div>COLA:</div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-right">₱160.00</div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <div>Night Differential:</div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-right">₱160.00</div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <div>Daily Allowance:</div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-right">₱160.00</div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <div>Quota Over/ Over Time:</div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-right">₱160.00</div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <div>Other INC./ Adjustment:</div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-right">₱160.00</div>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-5">
              <!-- Deductions Summary -->
              <q-item>
                <q-item-section align="center">
                  <div class="text-h7">Deductions Summary</div>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <div>New Credits:</div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-right">₱200.00</div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <div>Prev Credits:</div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-right">₱200.00</div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <div>Uniform:</div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-right">₱200.00</div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <div>Penalty:</div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-right">₱200.00</div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <div>Cash Advance:</div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-right">₱200.00</div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <div>Other / Motor:</div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-right">₱200.00</div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <div>Late/s:</div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-right">₱200.00</div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <div>Short/s:</div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-right">₱200.00</div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <div>SSS:</div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-right">₱200.00</div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <div>HDMF:</div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-right">₱200.00</div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <div>PHIC:</div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-right">₱200.00</div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <div>SSS Loan:</div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-right">₱200.00</div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <div>HDMF Loan:</div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-right">₱200.00</div>
                </q-item-section>
              </q-item>
            </div>
          </div>

          <!-- Net Pay -->
          <q-item>
            <q-item-section>
              <div class="text-h7">Net Pay</div>
            </q-item-section>
            <q-item-section side>
              <div class="text-right">₱890.00</div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";

const regularPay = 480.0;

const formattedRegular = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 2,
}).format(regularPay);

console.log(formattedRegular);
</script>

<style lang="scss" scoped>
.elegant-container {
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  color: #333;
}
.user-profile-page {
  max-width: 1200px;
  margin: auto;
}

.profile-card,
.account-card,
.bills-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.profile-card q-card-section:first-child {
  margin-top: 1rem;
}

.q-list q-item {
  align-items: center;
  /* padding: 1rem 0.5rem; */
}

.q-list q-item:not(:last-child) {
  border-bottom: 1px solid #e0e0e0;
}

.q-list q-item-section {
  color: #667;
  font-size: 0.9rem;
}

.q-list q-item-section:first-child {
  flex: 1 1 auto;
}

.q-list q-item-section[side] {
  flex: 0 0 auto;
}
</style>
