<template>
  <q-dialog ref="dialogRef">
    <q-card class="overall-summary-list-card compact-card">
      <q-card-section class="header-section compact-header">
        <div class="text-h6 text-weight-bolder text-shadow">Run Payslip</div>
        <q-space />
        <q-btn
          icon="close"
          flat
          dense
          round
          v-close-popup
          color="white"
          class="close-btn"
        />
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Body</div>
        <div class="text-h6">Body</div>
        <div class="text-h6">Body</div>
        <div class="text-h6">Body</div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";

const { dialogRef, onDialogHide } = useDialogPluginComponent();
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;600&display=swap");

$primary-blue: #0ca289;
$secondary-blue: #105f73;
$light-blue: #e6f3ff;
$gray-light: #f8f9fa;
$gray-medium: #e9ecef;
$text-dark: #343a40;
$text-medium: #6c757d;
$white: #ffffff;
$shadow-color: rgba(0, 0, 0, 0.15);

// Custom accent colors for totals
$accent-light: #e0f2f7;
$accent-dark: #004d40;
$total-kilo-bg: #e0f7fa; // A soft, light teal for the total kilo
$total-kilo-color: #00796b; // A slightly darker teal for the text

.overall-summary-list-card.compact-card {
  width: 420px;
  max-width: 95vw;
  border-radius: 12px;
  box-shadow: 0 10px 20px $shadow-color;
  font-family: "Montserrat", sans-serif;
  overflow: hidden;
  background: $white;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
}

.header-section.compact-header {
  background: linear-gradient(135deg, #2bda9a 0%, #056711 100%);
  color: $white;
  padding: 15px 20px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;

  .text-h6 {
    letter-spacing: 0.3px;
    font-weight: 700; // Making the title bolder
  }

  .text-shadow {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }

  .close-btn {
    transition: transform 0.3s ease-in-out;
    &:hover {
      transform: rotate(90deg) scale(1.1);
    }
  }
}

.text-h6 {
  letter-spacing: 0.3px;
  font-weight: 700; // Making the title bolder
}

.text-shadow {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}
</style>
