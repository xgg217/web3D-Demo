<script setup lang="ts">
import {ref} from 'vue';
import {  RouterView } from 'vue-router'
import DirectoryCardCmp from "@/components/DirectoryCardCmp.vue"

const avcStr = ref('animation / keyframes')
</script>

<template>
  <main>
    <nav>
      <ul>
        <li>
          <DirectoryCardCmp
            title="animation / keyframes"
            imgSrc="/src/views/AnimationKeyframes/webgl_animation_keyframes.jpg"
            :isAvc="avcStr === 'animation / keyframes'"
            notes="东京街头"
          />
        </li>
      </ul>
    </nav>
    <div class="right">

      <RouterView />
    </div>
</main>
</template>

<style scoped>
main {
  display: flex;
}

nav {
  padding: 10px;
  /* width: 280px; */
  height: 95vh;
  border: 1px solid #000;
  overflow-y: scroll;
}

.right {
  flex: 1;
  /* border: 1px solid red; */
  /* height: 97.5vh; */
}

ul {
  margin: 0;
  padding: 0;

  li {
    list-style: none;
  }
}
</style>
