<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  },

  imgSrc: {
    type: String,
    required: true
  },

  // 备注
  notes: {
    type: String,
    default: ''
  },

  // 是否激活
  isAvc: {
    type: Boolean,
    required: false
  }
})
</script>

<template>
  <div class="box" :class="{selected: props.isAvc}">
    <div class="imgs" >
      <img :src="props.imgSrc" alt="">
    </div>
    <p>{{props.title}}</p>

    <p class="notes">{{ props.notes }}</p>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  cursor: pointer;
  /* border: 1px solid red; */
  /* width: 250px; */
  border-radius: 3px;
  margin-bottom: 16px;
  background-color: #f7f7f7;
  overflow: hidden;
}

.selected {
  box-shadow: 0 0 0 3px #049EF4;
}

.imgs {
  width: 250px;
  height: 140px;
}

.imgs img {
  width: 100%;
  max-height: 100%;
}

p {
  margin: 0;
  padding: 8px 12px 4px;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: #444;
}

.notes {
  font-size: 12px;
  color: #999;
}
</style>