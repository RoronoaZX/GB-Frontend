<template>
  <q-btn
    color="accent"
    icon="visibility"
    size="md"
    flat
    round
    dense
    @click="openDialog"
  />

  <q-dialog v-model="dialog">
    <div>
      <q-card>
        <q-card-section>
          <div class="row justify-between">
            <div class="text-h6">
              {{ capitalizeFirstLetter(report.name) }}
            </div>
            <div>
              <q-btn
                class="close-btn"
                color="grey-8"
                flat
                round
                dense
                icon="close"
                @click="dialog = false"
              />
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row q-gutter-x-sm">
            <div class="text-subtitle2">Date:</div>
            <div class="text-body1 text-weight-light">
              {{ formatDate(report.created_at) }}
            </div>
          </div>
          <div class="row q-gutter-x-sm">
            <div class="text-subtitle2">Branch:</div>
            <div class="text-body1 text-weight-light">
              {{ capitalizeFirstLetter(report?.branch?.name) || "No data" }}
            </div>
          </div>
          <div class="row q-gutter-x-sm">
            <div class="text-subtitle2">Cake Maker:</div>
            <div class="text-body1 text-weight-light">
              {{ formatFullname(report.user.employee) }}
            </div>
          </div>

          <div class="row q-mt-sm item-start q-gutter-x-xl">
            <div class="row q-gutter-x-sm text-overline">
              <div>Price:</div>
              <div class="text-weight-light">
                {{ formatPrice(report.price) }}
              </div>
            </div>
            <div class="row q-gutter-x-sm text-overline">
              <div>Layer /s:</div>
              <div class="text-weight-light">
                {{ report.layers }}
              </div>
            </div>
            <!-- <div class="row q-gutter-x-sm text-overline">
              <div>Pieces:</div>
              <div class="text-weight-light">
                {{ report.pieces }}
              </div>
            </div> -->
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Decline" color="negative" @click="confirmReport" />
          <q-btn label="Confirm" color="positive" @click="confirmReport" />
        </q-card-actions>
      </q-card>
    </div>
    <div>
      <!-- <h6>{{ report.id }}</h6> -->
    </div>
  </q-dialog>
</template>

<script setup>
import { date, Notify } from "quasar";
import { ref } from "vue";
import { useCakeMakerReportStore } from "src/stores/cake-maker-report";

const useCakeMakerReport = useCakeMakerReportStore();
const dialog = ref(false);
const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

const openDialog = () => {
  dialog.value = true;
};

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No Lastname";

  return `${firstname} ${middlename} ${lastname}`;
};
const formatDate = (dateTimeString) => {
  return date.formatDate(dateTimeString, "MMMM D, YYYY || hh:mm A");
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

const capitalizeFirstLetter = (string) => {
  return string
    .split(" ")
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(" ");
};
const confirmReport = async () => {
  console.log("report id", props.report.id);
  try {
    const confirmedReport = await useCakeMakerReport.confirmReports(
      props.report.id
    );
    console.log("Report Confirmed", confirmedReport);
    Notify.create({
      type: "positive",
      message: "Report confirmed",
    });
  } catch (error) {
    console.log(error);
    Notify.create({
      type: "negative",
      message: "Failed to confirm",
    });
  }
};
</script>

<style lang="scss" scoped>
.close-btn {
  padding: 0;
  min-width: auto;
}
</style>
