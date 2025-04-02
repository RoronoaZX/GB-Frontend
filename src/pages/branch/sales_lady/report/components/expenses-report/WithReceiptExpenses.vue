<template>
  <div class="q-gutter-md">
    <div class="row q-gutter-x-xl">
      <q-radio
        keep-color
        v-model="radioBtnVATIndicator"
        val="Non-VAT"
        label="Non-VAT"
        color="red"
      />
      <q-radio
        keep-color
        v-model="radioBtnVATIndicator"
        val="VAT"
        label="VAT"
        color="teal"
      />
    </div>
    <div class="row q-gutter-x-sm">
      <div>
        <q-input
          label="Receipt No."
          v-model="vatData.receiptNo"
          outlined
          dense
          style="width: 230px"
        />
      </div>
      <div>
        <q-input
          v-model="vatData.tinNo"
          label="TIN No."
          outlined
          dense
          style="width: 250px"
        />
      </div>
    </div>
    <div class="row q-gutter-x-sm">
      <q-input
        v-model="vatData.description"
        label="Desc. / Company Name"
        outlined
        dense
        style="width: 350px"
      />
      <div>
        <q-input
          v-model="vatData.amount"
          label="Gross / Amount"
          outlined
          dense
          style="width: 130px"
        />
      </div>
    </div>
    <div class="q-gutter-x-sm">
      <q-input v-model="vatData.address" label="Address" outlined dense />
    </div>
    <div align="right">
      <q-btn
        outline
        dense
        icon="add"
        label="Add To List"
        class="q-pa-sm"
        size="sm"
        :style="{
          color: radioBtnVATIndicator
            ? radioBtnVATIndicator === 'Non-VAT'
              ? 'red'
              : 'teal'
            : 'dark',
        }"
        @click="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch, computed } from "vue";
import { useSalesReportsStore } from "src/stores/sales-report";
import { useUsersStore } from "src/stores/user";

const userDataStore = useUsersStore();
const userDataSearch = computed(() => userDataStore.users);
const salesReportsStore = useSalesReportsStore();
const userData = salesReportsStore.user;
console.log("userdatasss", userData);

const radioBtnVATIndicator = ref(""); // Default selection
const vatData = reactive({
  receiptNo: "",
  tinNo: "",
  description: "",
  amount: "",
  address: "",
});

const handleSubmit = () => {
  // Handle the form submission logic here
  console.log("Form submitted with values:", {
    ...vatData,
    radioBtnVATIndicator: radioBtnVATIndicator.value,
  });

  const data = {
    ...vatData,
    user_id: userData?.data.id,
    branch_id: userData?.device?.reference_id,
    radioBtnVATIndicator: radioBtnVATIndicator.value,
  };
  salesReportsStore.updateWithReceiptExpensesReport(data);
};

// // Watch for changes in radio button selection and alert the value
// watch(radioBtnVATIndicator, (newValue) => {
//   if (newValue) {
//     alert(`You are clicking ${newValue} expenses receipt`);
//   }
// });
</script>

<style lang="scss" scoped></style>
