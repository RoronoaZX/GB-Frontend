<template>
  <div>
    <q-btn
      color="accent"
      icon="visibility"
      size="md"
      flat
      round
      dense
      @click="openDialog"
    />
  </div>
  <q-dialog v-model="dialog">
    <q-card class="report-card">
      <q-card-section class="report-header">
        <div class="text-h6 text-weight-regular">
          {{ capitalizeBranchFirstLetter(report.name) }}
        </div>
        <div>
          <q-btn
            color="grey-8"
            flat
            round
            dense
            icon="close"
            @click="dialog = false"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row justify-between">
          <div>
            <div class="row q-gutter-x-sm">
              <div class="text-subtitle2">Date:</div>
              <div class="text-body1 text-weight-light">
                {{ formatDate(report.created_at) }}
              </div>
            </div>
            <div class="row q-gutter-x-sm">
              <div class="text-subtitle2">Branch:</div>
              <div class="text-body1 text-weight-light">
                {{ capitalizeBranchFirstLetter(report.branch.name) }}
              </div>
            </div>
            <div class="row q-gutter-x-sm">
              <div class="text-subtitle2">Cake Maker:</div>
              <div class="text-body1 text-weight-light">
                {{ formatFullname(report.user.employee) }}
              </div>
            </div>
          </div>
          <div>
            <q-chip
              square
              :color="getBadgeStatusColor(report.confirmation_status)"
              text-color="white"
            >
              {{ capitalizeFirstLetterStatus(report.confirmation_status) }}
            </q-chip>
          </div>
        </div>
        <div class="row q-mt-sm item-start q-gutter-x-xl">
          <div class="row q-gutter-x-sm text-overline">
            <div>Price:</div>
            <div class="text-weight-light">{{ formatPrice(report.price) }}</div>
          </div>
          <div class="row q-gutter-x-sm text-overline">
            <div>Layer /s:</div>
            <div class="text-weight-light">{{ report.layers }}</div>
          </div>
          <!-- <div class="row q-gutter-x-sm text-overline">
            <div>Pcs:</div>
            <div class="text-weight-light">{{ report.pieces }}</div>
          </div> -->
        </div>
        <div>
          <h6 class="text-center">Ingredients</h6>
        </div>
        <div>
          <div class="row justify-between">
            <div>
              <div align="center">Raw Materials Name / Code</div>
            </div>
            <div>
              <div align="center">Quantity</div>
            </div>
          </div>
          <div
            v-for="ingredient in report.cake_ingredient_reports"
            :key="ingredient"
          >
            <div class="row justify-between">
              <div>
                <div>
                  {{
                    ingredient.branch_raw_materials_reports?.ingredients
                      ?.code || "No data"
                  }}
                </div>
              </div>
              <div>
                <div>{{ ingredient.quantity }} {{ ingredient.unit }}</div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <!-- {{ report }} -->
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { date } from "quasar";

const dialog = ref(false);
const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});

console.log("Cake maker reportss", props.report);

const openDialog = () => {
  dialog.value = true;
};

const formatDate = (dateString) => {
  return date.formatDate(dateString, "MMMM D, YYYY");
};

const capitalizeBranchFirstLetter = (location) => {
  if (!location) return "";
  return location
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const formatFullname = (row) => {
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const firstname = row.firstname ? capitalize(row.firstname) : "No Firstname";
  const middlename = row.middlename
    ? capitalize(row.middlename).charAt(0) + "."
    : "";
  const lastname = row.lastname ? capitalize(row.lastname) : "No lastname";

  return `${firstname} ${middlename} ${lastname}`;
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

const getBadgeStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "orange";
    case "declined":
      return "negative";
    case "confirmed":
      return "green";
    default:
      return "grey";
  }
};

const capitalizeFirstLetterStatus = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
</script>

<style lang="scss" scoped>
.report-dialog {
  max-width: 600px;
}
.report-card {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 1rem;
}
</style>
