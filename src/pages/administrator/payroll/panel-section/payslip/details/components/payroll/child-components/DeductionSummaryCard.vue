<template>
  <div>
    <q-card flat bordered class="summary-card q-pa-lg">
      <q-list dense>
        <div class="q-mb-lg text-center">
          <q-item-label class="text-h6 text-weight-bold text-gre-9 text-grey-9">
            Checking Deductions Summary
          </q-item-label>
        </div>

        <div class="row q-gutter-x-sm q-mb-md">
          <q-btn dense outline label="Credits List" />
          <q-btn dense outline label="Penalties / Charges List" />
        </div>

        <div class="row q-col-gutter-y-sm">
          <q-item class="col-12 q-pa-none">
            <q-item-section avatar class="q-mr-sm">
              <q-avatar rounded>
                <img
                  src="../../../../../../../../../assets/ssslogov2.png"
                  style="width: 25px; height: auto"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body2 text-weight-medium text-grey-8">
                SSS (Social Security System): 300
                <!-- <span class="text-primary-7 text-weight-semibold">{{
                  dtrRows.length
                }}</span> -->
              </q-item-label>
            </q-item-section>
          </q-item>

          <!-- <q-item class="col-12 col-md-6 q-pa-none">
            <q-item-section avatar class="q-mr-sm">
              <q-icon name="wallet" color="primary-7" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body2 text-weight-medium text-grey-8">
                Expected Salary in {{ dtrRows.length }} days:
                <span class="text-primary-7 text-weight-semibold">{{
                  regularPay
                }}</span>
              </q-item-label>
            </q-item-section>
          </q-item> -->
        </div>

        <div class="row q-col-gutter-y-sm">
          <q-item class="col-12 q-pa-none">
            <q-item-section avatar class="q-mr-sm">
              <q-avatar>
                <img
                  src="../../../../../../../../../assets/pagibig_logo.png"
                  alt=""
                  style="width: 50px; height: auto"
                />
              </q-avatar>
              <!-- <q-img
                src="src/assets/pagibig-logo.png"
                style="width: 32px; height: auto"
                alt="Pag-IBIG Logo"
                spinner-color="primary"
              /> -->
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body2 text-weight-medium text-grey-8">
                HDMF / Pag-IBIG (Housing): 300
                <!-- <span class="text-primary-7 text-weight-semibold">{{
                  dtrRows.length
                }}</span> -->
              </q-item-label>
            </q-item-section>
          </q-item>

          <!-- <q-item class="col-12 col-md-6 q-pa-none">
            <q-item-section avatar class="q-mr-sm">
              <q-icon name="wallet" color="primary-7" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body2 text-weight-medium text-grey-8">
                Expected Salary in {{ dtrRows.length }} days:
                <span class="text-primary-7 text-weight-semibold">{{
                  regularPay
                }}</span>
              </q-item-label>
            </q-item-section>
          </q-item> -->
        </div>

        <div class="row q-col-gutter-y-sm">
          <q-item class="col-12 q-pa-none">
            <q-item-section avatar class="q-mr-sm">
              <q-avatar rounded>
                <img
                  src="../../../../../../../../../assets/philhealth-removebg-preview.png"
                  style="width: 60px; height: auto"
                />
              </q-avatar>
              <!-- <q-img
                src="src/assets/pagibig-logo.png"
                style="width: 32px; height: auto"
                alt="Pag-IBIG Logo"
                spinner-color="primary"
              /> -->
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body2 text-weight-medium text-grey-8">
                PHIC / PhilHealth (Health Insurance): 300
                <!-- <span class="text-primary-7 text-weight-semibold">{{
                  dtrRows.length
                }}</span> -->
              </q-item-label>
            </q-item-section>
          </q-item>

          <!-- <q-item class="col-12 col-md-6 q-pa-none">
            <q-item-section avatar class="q-mr-sm">
              <q-icon name="wallet" color="primary-7" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body2 text-weight-medium text-grey-8">
                Expected Salary in {{ dtrRows.length }} days:
                <span class="text-primary-7 text-weight-semibold">{{
                  regularPay
                }}</span>
              </q-item-label>
            </q-item-section>
          </q-item> -->
        </div>
      </q-list>
    </q-card>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.summary-card {
  border-radius: 16px; /* Slightly more rounded corners */
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.08); /* More pronounced, softer shadow */
  background: linear-gradient(
    145deg,
    #ffffff,
    #f7f7f7
  ); /* Subtle gradient for depth */
  overflow: hidden; /* Ensures shadow and border-radius are contained */
}

/* Responsive adjustments */
@media (max-width: 767px) {
  .summary-card {
    padding: 24px; /* More padding on smaller screens */
  }
  .q-separator {
    margin: 20px 0; /* Adjust separator spacing */
  }
}

/* Custom font size adjustments */
.text-h6 {
  /* For "Checking Earning Summary" title */
  font-size: 1.15rem; /* Slightly smaller than default h5 */
}

/* Adjusting text colors for elegance and readability */
.text-grey-9 {
  color: #333; /* Slightly softer black for primary titles */
  letter-spacing: -0.02em; /* Tighter letter spacing for a modern look */
}
</style>
