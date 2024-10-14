<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router'
import DirectoryCardCmp from "@/components/DirectoryCardCmp.vue"

const avcStr = ref('animation / skinning / additive / blending')
</script>

<template>
  <main>
    <nav>
      <ul>
        <li>
          <DirectoryCardCmp title="animation / skinning / additive / blending"
            imgSrc="/src/views/animationSkinningAdditiveBlending/webgl_animation_skinning_additive_blending.jpg"
            :isAvc="avcStr === 'animation / skinning / additive / blending'" notes="运动模拟" />
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
    width: 280px;
  }
}
</style>
