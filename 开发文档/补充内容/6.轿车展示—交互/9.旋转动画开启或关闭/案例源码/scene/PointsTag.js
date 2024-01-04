// 引入Three.js
import * as THREE from '../../../../three.js-r125/build/three.module.js';
var S = 30; //精灵缩放倍数
function CreateCarTags(carModel) {
  var tagNameArr = ['右前光标', '右后光标', '左前光标', '左后光标', '后备箱光标'];

  var tagArr = [];
  tagNameArr.forEach(function (name) {
    // 精灵模型+背景透明png贴图实现光点效果
    var spriteMaterial = new THREE.SpriteMaterial({
      // color:0xffff00,
      map: new THREE.TextureLoader().load("./scene/model/光点.png"), //设置精灵纹理贴图
      transparent: true,
    });
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(S, S, 1); //大小设置

    var tagObj = carModel.getObjectByName(name);
    tagObj.add(sprite);

    //根据sprite大小平移，任意观察角度都避免精灵插入到车体内
    if (name == "右前光标" || name == "右后光标") {
      sprite.position.z -= sprite.scale.x / 2;
    } else if (name == "左前光标" || name == "左后光标") {
      sprite.position.z += sprite.scale.x / 2;
    } else if (name == "后备箱光标") {
      sprite.position.x += sprite.scale.x / 2;
    }
    tagArr.push(sprite);
  })


  // 设置标注精灵Sprite波动，提示用户点击
  var s = 0.0;
  var scale = S; //原来缩放倍数大小
  function waveAnimation() { //设置产品模型旋转动画        
    s += 0.01;
    tagArr.forEach(function (sprite) {
      if (s < 0.5) {
        sprite.scale.x = scale * (1 + s);
        sprite.scale.y = scale * (1 + s);
      } else if (s >= 0.5 && s < 1.0) {
        sprite.scale.x = scale * (2 - s);
        sprite.scale.y = scale * (2 - s);
      } else {
        s = 0.0;
      }
    })
    requestAnimationFrame(waveAnimation); //请求再次执行函数waveAnimation
  }
  waveAnimation();
}




export {
  CreateCarTags
}