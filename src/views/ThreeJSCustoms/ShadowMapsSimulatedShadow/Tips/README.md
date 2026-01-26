# 备注

## 技术点

- 将 `depthWrite` 属性设置为 `false` ，这样使阴影之间不会彼此混淆

  ```js
  MeshBasicMaterial({
    map: shadowTexture,
    transparent: true, // 开启透明
    depthWrite: false, // 是否写入深度缓冲区
  });
  ```

## 涉及灯光

- HemisphereLight 半球光

  - skyColor 天空的颜色
  - groundColor 地面的颜色

  ```js
  const skyColor = 0xb1e1ff; // 天空的颜色
  const groundColor = 0xb97a20; // 地面的颜色
  const intensity = 2;
  const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
  ```

- DirectionalLight 环境光

## 上下移动

- 它们在 XZ 平面上移动。带来一个类似弹性的动画

  ```js
  Math.abs(Math.sin(time));
  ```
