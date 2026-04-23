<template>
  <div v-if="metrics" class="recipe-cost-widget animate-fade">
    <div class="row q-col-gutter-md">
      <!-- Summary Card -->
      <div class="col-12 col-md-4">
        <q-card flat bordered class="metric-card full-height">
          <q-card-section>
            <div class="text-subtitle2 text-grey-7 text-uppercase tracking-wider">Average Production Cost</div>
            <div class="row items-center q-mt-sm">
              <div class="text-h4 text-weight-bolder text-primary">
                {{ formatPrice(metrics.averageCost || 0) }}
              </div>
              <q-icon name="trending_up" color="positive" size="24px" class="q-ml-sm" />
            </div>
            <div class="text-caption text-grey-6 q-mt-xs">
              Weighted average across all recipe runs
            </div>
          </q-card-section>
          
          <q-separator inset />

          <q-card-section>
            <div class="text-subtitle2 text-grey-8 q-mb-md">Highest Cost Recipes</div>
            <q-list dense>
              <q-item v-for="(recipe, index) in metrics.topRecipes" :key="index" class="q-px-none">
                <q-item-section avatar min-width="24px">
                  <q-badge :color="index === 0 ? 'negative' : 'orange'" rounded label />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-medium">{{ recipe.recipe_name }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-primary text-weight-bold">
                    {{ formatPrice(recipe.avg_cost) }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <!-- Recent Changes Log -->
      <div class="col-12 col-md-8">
        <q-card flat bordered class="log-card">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6 text-weight-bold">Recent Cost Adjustments</div>
            <q-space />
            <q-btn flat round dense icon="more_vert" color="grey-7" />
          </q-card-section>

          <q-card-section>
            <q-table
              flat
              dense
              :rows="metrics.recentChanges"
              :columns="columns"
              row-key="id"
              hide-pagination
              :rows-per-page-options="[0]"
              class="audit-table"
            >
              <template v-slot:body-cell-change="p">
                <q-td :props="p">
                  <div class="row items-center no-wrap">
                    <span class="text-caption text-grey-7 q-mr-xs">{{ formatField(p.row.changed_field) }}:</span>
                    <span class="text-strike text-grey-6 q-mr-xs">{{ p.row.old_value }}</span>
                    <q-icon name="arrow_forward" size="12px" color="primary" class="q-mr-xs" />
                    <span class="text-weight-bold text-positive">{{ p.row.new_value }}</span>
                  </div>
                </q-td>
              </template>

              <template v-slot:body-cell-date="p">
                <q-td :props="p" class="text-grey-7 text-caption">
                  {{ formatTimestamp(p.row.date) }}
                </q-td>
              </template>
            </q-table>
            
            <div v-if="metrics.recentChanges.length === 0" class="text-center q-pa-xl text-grey-5">
              <q-icon name="history_toggle_off" size="3em" />
              <div class="q-mt-sm">No recent cost changes recorded</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { typographyFormat } from "src/composables/typography/typography-format";

const props = defineProps({
  metrics: {
    type: Object,
    required: true,
  },
});

const { formatPrice, formatTimestamp } = typographyFormat();

const columns = [
  { name: "recipe", label: "Recipe", align: "left", field: "recipe_name", classes: "text-weight-medium" },
  { name: "change", label: "Adjustment", align: "left" },
  { name: "user", label: "Modified By", align: "left", field: "changed_by" },
  { name: "date", label: "Date", align: "right" },
];

const formatField = (field) => field === 'price_per_gram' ? 'Price/G' : 'Qty';
</script>

<style scoped>
.metric-card {
  border-radius: 12px;
  background: white;
  transition: transform 0.3s ease;
}
.log-card {
  border-radius: 12px;
  background: white;
}
.audit-table :deep(thead tr th) {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 11px;
  color: #64748b;
  background-color: #f8fafc;
}
.tracking-wider {
  letter-spacing: 0.05em;
}
</style>
