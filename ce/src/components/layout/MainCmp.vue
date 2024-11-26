<template>
  <main class="main">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped>
.main {
  width: calc(100vw - 300px);
  height: 98vh;
}
</style>
