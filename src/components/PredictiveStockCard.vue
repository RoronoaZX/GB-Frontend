<template>
  <q-card class="predictive-stock-card q-mb-lg shadow-2 rounded-borders">
    <q-card-section class="row items-center justify-between bg-white q-py-sm">
      <div class="row items-center">
        <q-icon name="psychology" color="primary" size="sm" class="q-mr-sm" />
        <div class="text-h6 text-weight-bold text-dark">Smart Inventory Predictions</div>
        <q-badge color="primary" class="q-ml-sm" label="Predictive Analytics" />
      </div>
      <div class="text-caption text-grey-6">Based on last 30 days of usage</div>
    </q-card-section>

    <q-separator />

    <q-card-section v-if="predictions.length === 0" class="flex flex-center q-pa-lg">
      <div class="text-center">
        <q-icon name="check_circle" color="positive" size="lg" />
        <div class="text-subtitle1 text-grey-7 q-mt-sm">All stocks are healthy for the next 14 days.</div>
      </div>
    </q-card-section>

    <q-card-section v-else class="q-pa-md">
      <div class="row q-col-gutter-md">
        <div v-for="item in predictions" :key="item.id" class="col-12 col-md-6">
          <q-item class="prediction-item border-radius-8" :class="item.status === 'critical' ? 'bg-red-1' : 'bg-orange-1'">
            <q-item-section avatar>
              <q-icon 
                :name="item.status === 'critical' ? 'warning' : 'info'" 
                :color="item.status === 'critical' ? 'negative' : 'warning'" 
              />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-weight-bold">{{ item.name }}</q-item-label>
              <q-item-label caption>
                Current: <span class="text-weight-medium">{{ item.current_stock }} {{ item.unit }}</span>
              </q-item-label>
              <q-linear-progress 
                :value="item.days_remaining / 14" 
                :color="item.status === 'critical' ? 'negative' : 'warning'" 
                class="q-mt-xs"
              />
            </q-item-section>

            <q-item-section side>
              <div class="text-center">
                <div class="text-h5 text-weight-bolder" :class="item.status === 'critical' ? 'text-negative' : 'text-warning'">
                  {{ item.days_remaining }}
                </div>
                <div class="text-caption">days left</div>
              </div>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  predictions: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
.predictive-stock-card {
  border-radius: 12px;
  overflow: hidden;
}

.prediction-item {
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 8px;
  transition: transform 0.2s;
}

.prediction-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
}
</style>
