<template>
  <div>{{ props.row.title }}</div>
</template>

<script setup lang="ts">
import type { ILeftItem } from './../types'

const props = defineProps<{
  row: ILeftItem
}>()
</script>

<style scoped></style>
