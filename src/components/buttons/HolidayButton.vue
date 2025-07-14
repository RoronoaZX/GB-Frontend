<template>
  <button class="CartBtn" @click="handleClick">
    <span class="IconContainer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 448 512"
        fill="rgb(17, 17, 17)"
        class="holiday-calendar-star-icon"
      >
        <path
          d="M128 0v48H64C28.7 48 0 76.7 0 112v352c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V112c0-35.3-28.7-64-64-64H320V0c0-13.3-10.7-24-24-24s-24 10.7-24 24V48H176V0c0-13.3-10.7-24-24-24s-24 10.7-24 24zM384 160H64v288c0 8.8 7.2 16 16 16h288c8.8 0 16-7.2 16-16V160zm-68.7 82.7L258.9 308c-3.5 3.5-9.4 3.5-12.9 0l-37.5-37.5c-3.5-3.5-3.5-9.4 0-12.9s9.4-3.5 12.9 0L245.4 282l67.9-67.9c3.5-3.5 9.4-3.5 12.9 0s3.5 9.4 0 12.9z"
        />
        <path
          fill="rgb(255, 208, 0)"
          d="M224 288l-25.1 48.9-54.2 7.9 39.2 38.3-9.3 54 48.4-25.4 48.4 25.4-9.3-54 39.2-38.3-54.2-7.9L224 288z"
        />
      </svg>
    </span>
    <span class="text">Set Holidays</span>
  </button>
</template>

<script setup>
const emit = defineEmits(["set-holidays"]);

const handleClick = () => {
  emit("set-holidays");
};
</script>

<style lang="scss" scoped>
/* From Uiverse.io by vinodjangid07 */
.CartBtn {
  width: 140px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background-color: rgb(255, 208, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition-duration: 0.5s;
  overflow: hidden;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.103);
  position: relative;
}

.IconContainer {
  position: absolute;
  left: -50px;
  width: 30px;
  height: 30px;
  background-color: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 2;
  transition-duration: 0.5s;
}

.icon {
  border-radius: 1px;
}

.text {
  height: 100%;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(77, 69, 69);
  z-index: 1;
  transition-duration: 0.5s;
  font-size: 1.04em;
  font-weight: 600;
  margin: none !important;
}

.CartBtn:hover .IconContainer {
  transform: translateX(58px);
  border-radius: 40px;
  transition-duration: 0.5s;
}

.CartBtn:hover .text {
  transform: translate(10px, 0px);
  transition-duration: 0.5s;
}

.CartBtn:active {
  transform: scale(0.95);
  transition-duration: 0.5s;
}
</style>
