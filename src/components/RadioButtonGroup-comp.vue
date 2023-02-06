<script setup>
const emit = defineEmits(["update:modelValue"]);
defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number, Boolean, Object],
    default: null,
  },
  options: {
    type: [Array],
    required: true,
  },
  inputClass: {
    type: [String, Object],
    default: "",
  },
});
function radioButtonClick(value) {
  emit("update:modelValue", value);
  console.log(value, "value");
}
</script>

<template>
  <fieldset :id="id" class="radioButton__group">
    <legend v-if="label" class="radioButton__label">{{ label }}</legend>
    <div
      v-for="(option, index) in options"
      :key="option.text"
      class="radioButton"
    >
      <input
        :id="id + index"
        :name="id"
        type="radio"
        :value="option.value"
        :class="inputClass"
        :checked="option.value === value"
        @change="radioButtonClick(option.value)"
      />
      <label :for="id + index">{{ option.text }}</label>
      <slot v-if="option.value === value" :name="option.value" />
    </div>
  </fieldset>
</template>
