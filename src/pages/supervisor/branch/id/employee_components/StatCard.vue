<template>
  <div class="col-6 col-sm-3">
    <div
      class="stat-card-modern"
      :style="{ background: stat.gradient, color: 'white' }"
    >
      <div class="stat-icon">
        <q-icon :name="stat.icon" size="22px" />
      </div>
      <div class="stat-value">{{ stat.value }}</div>
      <div class="stat-label">{{ stat.label }}</div>
      <div class="stat-glow"></div>
    </div>
  </div>
</template>

<script setup>
defineProps(["stat"]);
</script>

<style scoped>
.stat-card-modern {
  position: relative;
  padding: 16px 8px;
  border-radius: 24px;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  text-align: center;
  overflow: hidden;
  transition: transform 0.3s ease;
}
.stat-card-modern:active {
  transform: scale(0.95);
}
.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
  background: rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 2;
}
.stat-value {
  font-size: 20px;
  font-weight: 700;
  position: relative;
  z-index: 2;
}
.stat-label {
  font-size: 12px;
  opacity: 0.9;
  position: relative;
  z-index: 2;
}
.stat-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(255, 255, 255, 0.1),
    transparent 70%
  );
  z-index: 1;
}
</style>
