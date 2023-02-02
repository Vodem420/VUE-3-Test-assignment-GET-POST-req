<script setup>
import ButtonComp from "./button-comp.vue";
</script>
<template>
  <header>
    <div class="header">
      <div class="header__content">
        <img src="/images/Logo.png" alt="logo" />
        <div class="header__buttonWrapper">
          <button-comp class="btn__primary">Users</button-comp>
          <button-comp class="btn__primary">Sign up</button-comp>
        </div>
      </div>
    </div>
    <div class="header__fix"></div>
  </header>
</template>
