<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card style="border-radius: 16px; min-width: 450px; max-width: 500px" class="bg-grey-1 shadow-8">
      
      <!-- Close Button Header -->
      <q-card-section class="q-pt-sm q-pb-none q-px-md row justify-end">
        <q-btn icon="close" flat round dense @click="onDialogCancel" color="grey-8" />
      </q-card-section>

      <!-- Title Section -->
      <q-card-section class="text-center q-pt-none q-pb-md">
        <div class="text-h6 text-weight-bolder q-mb-xs text-blue-grey-10">
          Email Payroll Statement
        </div>
        <div class="text-subtitle2 text-grey-7">
          Send a detailed payslip breakdown for {{ formatFullname(props.employee) }}
        </div>
      </q-card-section>

      <q-form @submit.prevent="handleSendEmail">
        <q-card-section class="q-px-lg q-py-none">
          <!-- Step 1: Select Payroll Period -->
          <div class="q-mb-md">
            <div class="text-caption text-weight-bold text-grey-8 q-mb-xs">Select Payroll Period</div>
            <q-select
              outlined
              dense
              v-model="selectedPayslip"
              :options="payslipOptions"
              label="Choose a generated payslip..."
              :loading="loadingPayslips"
              :rules="[val => !!val || 'Payroll period is required']"
              emit-value
              map-options
              behavior="menu"
              class="bg-white"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey-7 text-center">
                    No generated payslips found for this employee.
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>

          <!-- Step 2: Input Personal Email -->
          <div class="q-mb-md">
            <div class="text-caption text-weight-bold text-grey-8 q-mb-xs">Recipient Personal Email</div>
            <q-input
              outlined
              dense
              v-model="email"
              type="email"
              placeholder="Enter employee's real/personal email..."
              :rules="[
                val => !!val || 'Email is required',
                val => isValidEmail(val) || 'Please enter a valid email address'
              ]"
              class="bg-white"
            >
              <template v-slot:prepend>
                <q-icon name="mail" color="teal" />
              </template>
            </q-input>
          </div>

          <!-- Step 3: Checkbox to update profile -->
          <div class="q-mb-lg">
            <q-checkbox
              v-model="saveEmail"
              label="Save this email address to employee profile"
              color="teal"
              keep-color
              dense
              class="text-body2 text-grey-8"
            />
          </div>
        </q-card-section>

        <!-- Action Buttons -->
        <q-card-section class="q-px-lg q-pb-lg row justify-end q-gutter-x-sm">
          <q-btn
            flat
            label="Cancel"
            color="grey-7"
            no-caps
            class="q-px-md"
            style="border-radius: 8px;"
            @click="onDialogCancel"
            :disable="sending"
          />
          <q-btn
            unelevated
            type="submit"
            label="Send Email"
            color="teal"
            icon="send"
            no-caps
            class="q-px-md"
            style="border-radius: 8px;"
            :loading="sending"
          />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDialogPluginComponent, useQuasar } from "quasar";
import { api } from "src/boot/axios";

const props = defineProps({
  employee: Object,
  initialPayslipId: [Number, String],
});

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
const $q = useQuasar();

const email = ref(
  props.employee?.personal_email ||
  props.employee?.email ||
  props.employee?.user_designation?.email ||
  ""
);
const saveEmail = ref(true);
const selectedPayslip = ref(props.initialPayslipId ? Number(props.initialPayslipId) : null);
const payslipOptions = ref([]);

const loadingPayslips = ref(true);
const sending = ref(false);

onMounted(async () => {
  await fetchEmployeePayslips();
});

const formatFullname = (row) => {
  if (!row) return "";
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  const firstname = row.firstname ? capitalize(row.firstname) : "";
  const middlename = row.middlename ? capitalize(row.middlename).charAt(0) + "." : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "";
  return `${firstname} ${middlename} ${lastname}`.trim();
};

const fetchEmployeePayslips = async () => {
  try {
    loadingPayslips.value = true;
    const response = await api.get("/api/payslip", {
      params: { employee_id: props.employee.id }
    });
    
    // Map response to dropdown options
    payslipOptions.value = response.data.map(payslip => ({
      label: `Period: ${payslip.from} to ${payslip.to} (Released: ${payslip.payroll_release_date})`,
      value: payslip.id
    }));

    if (props.initialPayslipId && payslipOptions.value.some(opt => opt.value == props.initialPayslipId)) {
      selectedPayslip.value = Number(props.initialPayslipId);
    } else if (payslipOptions.value.length > 0) {
      selectedPayslip.value = payslipOptions.value[0].value; // Default to latest payslip
    }
  } catch (error) {
    console.error("Error loading employee payslips:", error);
    $q.notify({
      type: "negative",
      message: "Failed to load employee payslips."
    });
  } finally {
    loadingPayslips.value = false;
  }
};

const isValidEmail = (val) => {
  const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(val);
};

const handleSendEmail = async () => {
  if (!selectedPayslip.value) {
    $q.notify({
      type: "warning",
      message: "Please select a payroll period to email."
    });
    return;
  }

  try {
    sending.value = true;
    
    const response = await api.post(`/api/payslip/${selectedPayslip.value}/send-email`, {
      email: email.value,
      save_email: saveEmail.value
    });

    $q.notify({
      type: "positive",
      message: response.data.message || "Payslip email sent successfully!",
      timeout: 3000
    });

    // Pass the email and save status back on successful dialog submission
    onDialogOK({
      email: email.value,
      saved: saveEmail.value
    });

  } catch (error) {
    console.error("Error sending email:", error);
    $q.notify({
      type: "negative",
      message: error.response?.data?.message || "Failed to send payslip email."
    });
  } finally {
    sending.value = false;
  }
};
</script>
