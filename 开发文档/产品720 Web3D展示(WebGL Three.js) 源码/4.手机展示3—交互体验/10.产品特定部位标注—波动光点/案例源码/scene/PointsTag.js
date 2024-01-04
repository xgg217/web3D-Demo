// 引入Three.js
import * as THREE from '../../../../three.js-r125/build/three.module.js';

function CreatePointsTag(obj) {
  // 精灵模型+背景透明png贴图实现光点效果
  var spriteMaterial = new THREE.SpriteMaterial({
    map: new THREE.TextureLoader().load("./scene/光点.png"), //设置精灵纹理贴图
    transparent: true,
  });
  var sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(6, 6, 1); //大小设置

  var pos = new THREE.Vector3();
  obj.getWorldPosition(pos);//获取参数obj的世界坐标
  sprite.position.copy(pos); //光点位置设置
  return sprite
}
export { CreatePointsTag }