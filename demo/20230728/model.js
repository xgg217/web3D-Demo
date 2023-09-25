import { SpriteMaterial, Sprite, TextureLoader,BoxGeometry, Mesh, MeshLambertMaterial,Group} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {getRandomIntInclusive} from "./utils.js"

const group = new Group();

// 加载工程模型
(() => {
  // 创建GLTF加载器对象
  const loader = new GLTFLoader();
  
  loader.load( './工厂.glb', function ( gltf ) {
    // 返回的场景对象gltf.scene插入到threejs场景中
    group.add( gltf.scene );
  })
})();

// 雨滴
const group1 = (() => {
  const group1 = new Group();
  const texture = new TextureLoader().load("./雨滴.png");
  const spriteMaterial = new SpriteMaterial({
    map: texture,
  });
  
  for (let i = 0; i < 1000; i++) {
    // 精灵模型共享材质
    const sprite = new Sprite(spriteMaterial);
    group1.add(sprite);
    const val = getRandomIntInclusive(1,2);
    // const val = 1;
    sprite.scale.set(val, val, 1);
    // 设置精灵模型位置，在长方体空间上上随机分布
    // const x = 100 * (Math.random() - 0.5);
    const x = getRandomIntInclusive(-50,50);
    // const y = 100 * Math.random();
    const y = getRandomIntInclusive(0,100);
    // const z = 180 * (Math.random() - 0.5);
    const z =getRandomIntInclusive(-90,90);
    sprite.position.set(x, y, z)
  }
  
  // const clock = new Clock();
  // 周期性改变雨滴Sprite位置
  function loop() {
    // loop()每次执行都会更新雨滴的位置，进而产生动画效果
    group1.children.forEach(sprite => {
      // 雨滴的y坐标每次减1
      sprite.position.y -= 1;
      if (sprite.position.y < 0) {
        // 如果雨滴落到地面，重置y，从新下落
        sprite.position.y = 100;
      }
    });
    requestAnimationFrame(loop);
  }
  loop();
  
  
  return group1
})();

group.add(group1)



export default group;