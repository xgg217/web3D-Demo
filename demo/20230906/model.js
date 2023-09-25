import * as THREE from 'three';
// 引入gltf模型加载库GLTFLoader.js
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
// 引入CSS3模型或精灵对象
import {CSS3DObject,CSS3DSprite} from 'three/addons/renderers/CSS3DRenderer.js';

const loader = new GLTFLoader(); //创建一个GLTF加载器
const model = new THREE.Group();

//需要批量标注的标签数据arr
const arr = ['设备A','设备B','停车场'];

loader.load("./工厂.glb", function (gltf) {
    model.add(gltf.scene);
    // const tag = document.getElementById('tag');
    // console.log(JSON.parse(JSON.stringify(tag)))
    arr.forEach(item => {
        
        // 注意是多个标签，需要克隆复制一份
        const div = document.getElementById('tag').cloneNode();
        div.innerHTML = item;//标签数据填写
        
        // HTML元素转化为threejs的CSS3对象
        // const tag = new CSS3DObject(div);
        const tag = new CSS3DSprite(div);
        div.style.pointerEvents = 'none'; //避免标签遮挡canvas鼠标事件
        // obj是建模软件中创建的一个空对象
        const obj = gltf.scene.getObjectByName(item+'标注');
        console.log(JSON.parse(JSON.stringify(obj)))
        //tag会标注在空对象obj对应的位置
        obj.add(tag);
        tag.scale.set(0.1,0.1,1);//适当缩放模型标签
        tag.position.y = 40/2*0.1;//标签底部箭头和空对象标注点重合：偏移高度像素值一半*缩放比例
    })
});

export default model;