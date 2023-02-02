<script setup>
defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  modelValue: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="input__wrapper">
    <input
      type="text"
      :value="modelValue"
      v-bind="$attrs"
      class="input"
      autocomplete="off"
      placeholder=" "
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span class="input__helperText"></span>
    <label v-if="label" for="email" class="input__label"> {{ label }} </label>
  </div>
</template>
