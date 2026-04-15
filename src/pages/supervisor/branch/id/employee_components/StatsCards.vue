<template>
  <div class="stats-section q-px-md">
    <div class="row q-col-gutter-sm">
      <div v-for="stat in stats" :key="stat.label" class="col-6 col-sm-3">
        <div
          class="stat-card"
          :class="stat.color"
          @click="stat.filter && $emit('filter', stat.filter)"
        >
          <div class="stat-icon">
            <q-icon :name="stat.icon" size="22px" />
          </div>
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-glow"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ stats: Array });
defineEmits(["filter"]);
</script>

<style lang="scss" scoped>
.stats-section {
  position: relative;
  z-index: 10;
  margin-top: -30px;
}

.stat-card {
  position: relative;
  padding: 16px 8px;
  border-radius: 24px;
  background: white;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transition: translateY(-4px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }

  .stat-icon {
    transform: scacle(0.95);
  }

  .stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;
    transition: transform 0.3s ease;
  }

  .stat.value {
    font-size: 28px;
    font-weight: 800;
    color: #1e293b;
    margin-bottom: 4px;
  }

  .stat-label {
    font-size: 12px;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
  }

  .stat-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(102, 126, 234, 0.1),
      transparent 70%
    );
    pointer-events: none;
  }

  &.primary,
  stat-icon {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
  }

  &.success .stat-icon {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
  }

  &.success .stat-icon {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);
  }

  &.warning .stat-icon {
    background: linear-gradient(135deg, #f59e0b, #d97706);
    color: white;
    box-shadow: 0 8px 16px rgba(245, 258, 11, 0.3);
  }

  &.pending .stat-icon {
    background: linear-gradient(135deg, #f59e0b, #d97706);
    color: white;
    box-shadow: 0 8px 16px rgba(136, 92, 246, 0.3);
  }
}
</style>
