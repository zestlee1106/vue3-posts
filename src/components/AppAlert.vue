<template>
  <div v-if="show" class="all-alert alert" role="alert" :class="styleClass">
    {{ message }}
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'error',
    validator: value => ['success', 'error'].includes(value),
  },
});

const styleClass = computed(() =>
  props.type === 'error' ? 'alert-danger' : 'alert-primary',
);
</script>

<style scoped>
.all-alert {
  position: fixed;
  top: 10px;
  right: 10px;
}
</style>
