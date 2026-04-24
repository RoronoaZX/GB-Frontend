# Implementation Plan: GB Bakeshop IMS Enhancements

This document outlines the step-by-step process for implementing performance optimizations, advanced analytics, and predictive engine upgrades for the GB Bakeshop IMS.

## Phase 1 & 2: Performance & Predictive Engine
1.  **Lead Time Migration**: Create and run a migration to add `supplier_lead_time` to the `raw_materials` table.
2.  **Model Update**: Update `RawMaterial.php` to include `supplier_lead_time` in `$fillable`.
3.  **Archive Command**: Create `ArchiveOldLogs.php` artisan command to prune `recipe_cost_change_logs`.
4.  **Implement EMA Logic**: Update `getPredictiveStocking` in `DashboardInventoryController.php`.
5.  **Threshold Update**: Factor in `supplier_lead_time` for stock status.
6.  **Caching**: Implement 1-hour TTL caching for `getRecipeCostMetrics`.
    *   **🔍 UI Verification**: Check **Admin Dashboard -> Smart Inventory Predictions**. You should see more accurate "Days Left" and updated status colors (Red/Orange/Green) based on the new lead time logic.

## Phase 3 & 4: Advanced Analytics & Profitability
7.  **Profit Margin API**: Create `ProfitMarginController.php` for cost vs revenue data.
8.  **API Routes**: Register new endpoints in `api.php`.
9.  **Profit Margin Widget**: Build `AdminProfitMarginWidget.vue` and integrate it.
    *   **🔍 UI Verification**: A new **"Profit Margin Analysis"** widget will appear on the Admin Dashboard, displaying a comparison of production costs and sales revenue per product.

## Phase 4: UI/UX & Data Portability
10. **Export Buttons**: Add PDF/CSV export logic to `AdminRecipeCostWidget.vue`.
    *   **🔍 UI Verification**: Look at **Admin Dashboard -> Recent Cost Adjustments**. New "Export PDF" and "Export CSV" buttons should be visible and functional.
11. **Bulk Edit Dialog**: Build `BulkRecipeCostEdit.vue` for batch updates.
    *   **🔍 UI Verification**: An "Edit Multiple" button will be added to the Recipe Cost section, opening a dialog to update costs for several items at once.

## Phase 5: Interactive Refinements
12. **Mini-Charts**: Integrate `ApexCharts` into `AdminInventoryWidget.vue` tooltips.
    *   **🔍 UI Verification**: Hover over any consumption value in the **Inventory Metrics Widget**. A small line chart should pop up showing the 7-day usage trend.
13. **Final Testing**: Verify branch-specific filtering.
