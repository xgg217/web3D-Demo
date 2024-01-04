// 引入Three.js
import * as THREE from '../../../../three.js-r125/build/three.module.js';
// 加载环境贴图
var textureCube = new THREE.CubeTextureLoader()
  .setPath('./scene/model/envMap/')
  .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
textureCube.encoding = THREE.sRGBEncoding;//设置纹理贴图编码方式和WebGL渲染器一致

function SetCarMaterial(carModel) {
    // 递归遍历批量更改所有Mesh的材质
    carModel.traverse(function (object) {
        if (object.type === 'Mesh') { //判断是否是网格模型，mesh的父对象组group是没有材质的
            // 设置车架外面金属框、轮毂的材质
            if (object.name.slice(0, 4) == "高光金属") {
                object.material = new THREE.MeshStandardMaterial({
                    color: object.material.color, //读取材质原来的颜色
                    metalness: 1.0,
                    roughness: 0.2,
                    //   envMapIntensity控制环境贴图的影响
                    envMapIntensity: 1.0,
                })
            } else if (object.name.slice(0, 3) == "后视镜") {
                object.material = new THREE.MeshStandardMaterial({
                    color: 0xffffff, //白色
                    metalness: 1.0,
                    roughness: 0.0,
                    //   envMapIntensity控制环境贴图的影响
                    envMapIntensity: 1.0,
                })
            }
            //批量设置环境贴图
            object.material.envMap = textureCube;
        }
    })
}
export { SetCarMaterial }