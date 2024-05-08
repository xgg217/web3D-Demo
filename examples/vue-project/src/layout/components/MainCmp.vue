<template>
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<style scoped>
main {
  flex: 1;
  border: 1px solid red;
}
</style>
