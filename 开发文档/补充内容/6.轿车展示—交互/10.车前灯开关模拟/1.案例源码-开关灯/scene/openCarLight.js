import * as THREE from '../../../../three.js-r125/build/three.module.js';

// 引入threejs镜头光晕扩展库
import {
    Lensflare,
    LensflareElement
} from '../../../../three.js-r125/examples/jsm/objects/Lensflare.js';

var texLoader = new THREE.TextureLoader();
// // 用于镜头光晕的纹理对象
var texture = texLoader.load("./scene/model/lensflare.jpg");

// 创建两个镜头光晕Lensflare对象，分别用来模拟车前面左右两个车灯的发光效果，具体位置查看model.js文件
var lensflareElement = new LensflareElement(texture, 600, 0, new THREE.Color(0xffffff)); //600:设置光晕像素大小
var lensflare1 = new Lensflare();

lensflare1.addElement(lensflareElement); // Lensflare可以根据需要包含多个LensflareElement
var lensflare2 = new Lensflare();
lensflare2.addElement(lensflareElement);

// 镜头光晕对象隐藏  
lensflare1.visible = false;
lensflare2.visible = false;

// 前面车灯打开
function openCarLight() {
    // 镜头光晕对象可见
    lensflare1.visible = true;
    lensflare2.visible = true;
}
// 前面车灯关闭
function closeCarLight() {
    // 镜头光晕对象隐藏
    lensflare1.visible = false;
    lensflare2.visible = false;
}

export {
    lensflare1,//导出,在modejs中加载并设置到车灯附近
    lensflare2,
    openCarLight,//在html文件中调用，UI按钮发生鼠标事件触发，进行开关灯
    closeCarLight
}