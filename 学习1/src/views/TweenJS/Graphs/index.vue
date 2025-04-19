<template>
  <ul class="box1">
    <li v-for="(item, index) of list" :key="index">
      <el-card style="width: 30%" v-for="key of item" :key="key.name">
        <template #header>
          <div class="card-header">
            <span>{{ key.name }}</span>
          </div>
        </template>
        <p v-for="o in 4" :key="o" class="text item">{{ "List item " + o }}</p>
      </el-card>
    </li>
  </ul>
</template>

<script setup lang="ts">
const list = ref([
  [
    {
      name: "Linear.None",
    },
  ],

  [
    {
      name: "Quadratic.In",
    },
    {
      name: "Quadratic.Out",
    },
    {
      name: "Quadratic.InOut",
    },
  ],

  [
    {
      name: "Cubic.In",
    },
    {
      name: "Cubic.Out",
    },
    {
      name: "Cubic.InOut",
    },
  ],

  [
    {
      name: "Quartic.In",
    },
    {
      name: "Quartic.Out",
    },
    {
      name: "Quartic.InOut",
    },
  ],

  [
    {
      name: "Quintic.In",
    },
    {
      name: "Quintic.Out",
    },
    {
      name: "Quintic.InOut",
    },
  ],

  [
    {
      name: "Sinusoidal.In",
    },
    {
      name: "Sinusoidal.Out",
    },
    {
      name: "Sinusoidal.InOut",
    },
  ],

  [
    {
      name: "Exponential.In",
    },
    {
      name: "Exponential.Out",
    },
    {
      name: "Exponential.InOut",
    },
  ],

  [
    {
      name: "Circular.In",
    },
    {
      name: "Circular.Out",
    },
    {
      name: "Circular.InOut",
    },
  ],

  [
    {
      name: "Elastic.In",
    },
    {
      name: "Elastic.Out",
    },
    {
      name: "Elastic.InOut",
    },
  ],

  [
    {
      name: "Back.In",
    },
    {
      name: "Back.Out",
    },
    {
      name: "Back.InOut",
    },
  ],

  [
    {
      name: "Bounce.In",
    },
    {
      name: "Bounce.Out",
    },
    {
      name: "Bounce.InOut",
    },
  ],

  [
    {
      name: "Cubic.In",
    },
    {
      name: "Cubic.Out",
    },
    {
      name: "Cubic.InOut",
    },
  ],

  [
    {
      name: "Cubic.In",
    },
    {
      name: "Cubic.Out",
    },
    {
      name: "Cubic.InOut",
    },
  ],
]);
</script>

<style scoped>
.box1 {
  padding: 20px;
  /* border: 1px solid #000; */
  height: 100%;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px;
  border-bottom: 1px dashed red;
}

li:last-child {
  border-bottom: none;
}
</style>
