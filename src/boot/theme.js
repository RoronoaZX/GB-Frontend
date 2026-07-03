import { Dark } from "quasar";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default () => {
  // Sync the theme on boot
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  Dark.set(savedDarkMode);
  
  // Set Chart.defaults globally
  if (Chart && Chart.defaults) {
    Chart.defaults.color = savedDarkMode ? "#cbd5e1" : "#64748b";
    if (Chart.defaults.scale && Chart.defaults.scale.grid) {
      Chart.defaults.scale.grid.color = savedDarkMode ? "rgba(255, 255, 255, 0.08)" : "#e2e8f0";
    }
  }
};
