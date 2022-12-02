<template>
  <div class="all-alert">
    <transition-group name="slide">
      <div
        v-for="({ message, type }, idx) in items"
        class="alert"
        role="alert"
        :class="typeStyle(type)"
        :key="idx"
      >
        {{ message }}
      </div>
    </transition-group>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
  },
});
const typeStyle = type => (type === 'error' ? 'alert-danger' : 'alert-primary');
</script>

<style scoped>
.all-alert {
  position: fixed;
  top: 10px;
  right: 10px;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
