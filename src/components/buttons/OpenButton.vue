<template>
  <!-- From Uiverse.io by MUJTABA201566 -->
  <button class="Btn" @click="handleClick">
    <div class="sign">
      <svg viewBox="0 0 512 512">
        <path
          d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
        ></path>
      </svg>
    </div>

    <div class="text">Open</div>
  </button>
</template>

<script setup>
const emit = defineEmits(["open-dialog"]);

const handleClick = () => {
  emit("open-dialog");
};
</script>

<style lang="scss" scoped>
/* From Uiverse.io by MUJTABA201566 */
.Btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 30px;
  height: 30px;
  // border: none;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: 0.3s;
  // box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: white;
}

/* plus sign */
.sign {
  width: 100%;
  transition-duration: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign svg {
  width: 20px;
}

.sign svg path {
  fill: black;
}
/* text */
.text {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  transition-duration: 0.3s;
}
/* hover effect on button width */
.Btn:hover {
  background-color: black;
  width: 125px;
  border-radius: 40px;
  transition-duration: 0.3s;
}

.Btn:hover .sign {
  width: 30%;
  transition-duration: 0.3s;
  padding-left: 20px;
}

.Btn:hover .sign svg path {
  fill: white;
}

/* hover effect button's text */
.Btn:hover .text {
  opacity: 1;
  width: 70%;
  transition-duration: 0.3s;
  padding-right: 10px;
}
/* button click effect*/
.Btn:active {
  transform: translate(2px, 2px);
}
</style>
