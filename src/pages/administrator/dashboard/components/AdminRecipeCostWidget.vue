<template>
  <div v-if="metrics" class="recipe-cost-widget animate-fade q-mb-md">
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
            <div class="q-gutter-sm">
              <q-btn
                flat
                dense
                round
                icon="description"
                color="primary"
                @click="exportCSV"
              >
                <q-tooltip>Export to CSV</q-tooltip>
              </q-btn>
              <q-btn
                flat
                dense
                round
                icon="picture_as_pdf"
                color="negative"
                @click="exportPDF"
              >
                <q-tooltip>Export to PDF</q-tooltip>
              </q-btn>
              <q-btn
                flat
                dense
                round
                icon="edit_note"
                color="orange-8"
                @click="showBulkEdit = true"
              >
                <q-tooltip>Bulk Edit Costs</q-tooltip>
              </q-btn>
              <q-btn flat round dense icon="more_vert" color="grey-7" />
            </div>
          </q-card-section>

          <q-card-section>
            <!-- Bulk Edit Dialog -->
            <BulkRecipeCostEdit
              v-model="showBulkEdit"
              :recipeCosts="flattenedCosts"
              @updated="$emit('refresh')"
            />
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
              <template v-slot:body-cell-recipe="props">
                <q-td :props="props">
                  <div class="text-weight-bold text-dark text-capitalize">
                    {{ props.row.recipe_name }}
                  </div>
                </q-td>
              </template>

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
import BulkRecipeCostEdit from "./BulkRecipeCostEdit.vue";
import { ref, computed } from "vue";

const props = defineProps({
  metrics: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["refresh"]);

const showBulkEdit = ref(false);

const flattenedCosts = computed(() => {
  return props.metrics.recentChanges.map(r => ({
    id: r.id, // This is the ID from recentChanges, which maps to recipe_cost_id
    recipe_name: r.recipe_name,
    raw_material_name: r.changed_field === 'price_per_gram' ? 'Main Ingredient' : 'Quantity Update',
    price_per_gram: r.new_value // Simplified
  }));
});

const { formatPrice, formatTimestamp } = typographyFormat();

const exportCSV = () => {
  const rows = props.metrics.recentChanges;
  if (!rows || rows.length === 0) return;

  const headers = ["Recipe", "Field", "Old Value", "New Value", "Modified By", "Date"];
  const csvContent = [
    headers.join(","),
    ...rows.map(r => [
      `"${r.recipe_name}"`,
      `"${formatField(r.changed_field)}"`,
      `"${r.old_value}"`,
      `"${r.new_value}"`,
      `"${r.changed_by}"`,
      `"${formatTimestamp(r.date)}"`
    ].join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", `recipe_cost_history_${new Date().getTime()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const exportPDF = () => {
  const rows = props.metrics.recentChanges;
  if (!rows || rows.length === 0) return;

  const docDefinition = {
    content: [
      { text: "Recipe Cost Adjustment History", style: "header" },
      { text: `Generated on: ${new Date().toLocaleString()}`, margin: [0, 0, 0, 20] },
      {
        table: {
          headerRows: 1,
          widths: ["*", "auto", "auto", "auto", "auto", "auto"],
          body: [
            ["Recipe", "Field", "Old", "New", "By", "Date"],
            ...rows.map(r => [
              r.recipe_name,
              formatField(r.changed_field),
              r.old_value,
              r.new_value,
              r.changed_by,
              formatTimestamp(r.date)
            ])
          ]
        }
      }
    ],
    styles: {
      header: { fontSize: 18, bold: true, marginBottom: 10 }
    }
  };
  
  import("pdfmake/build/pdfmake").then((pdfMake) => {
    import("pdfmake/build/vfs_fonts").then((pdfFonts) => {
      pdfMake.default.vfs = pdfFonts.default.vfs;
      pdfMake.default.createPdf(docDefinition).download(`recipe_cost_history_${new Date().getTime()}.pdf`);
    });
  });
};

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
