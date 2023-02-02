<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div class="card-comp">
    <img :style="'background-image: url(' + item.photo + ');'" />
    <p>{{ item.name }}</p>
    <p>{{ item.position }}</p>
    <p>{{ item.email }}</p>
    <p>{{ item.phone }}</p>
  </div>
</template>
