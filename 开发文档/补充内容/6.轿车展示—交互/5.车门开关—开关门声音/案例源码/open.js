// 引入Three.js
import * as THREE from '../../../../three.js-r125/build/three.module.js';
import {
    camera
} from './RendererCamera.js';

// 创建一个监听者
var listener = new THREE.AudioListener();
// 创建一个非位置音频对象  用来控制播放
var openSound = new THREE.Audio(listener);//开门音频对象
var closeSound = new THREE.Audio(listener);//关门音频对象
// 创建一个音频加载器对象
var audioLoader = new THREE.AudioLoader();
audioLoader.load('./scene/model/open.wav', function (buffer) {
    openSound.setBuffer(buffer);
    openSound.setVolume(0.4);//播放音量
});
audioLoader.load('./scene/model/close.wav', function (buffer) {
    closeSound.setBuffer(buffer);
    closeSound.setVolume(1.0);
});


function open(carModel) {
    var tagNameArr = ['右前光标', '右后光标', '左前光标', '左后光标', '后备箱光标'];
    var doorNameArr = ['右前门', '右后门', '左前门', '左后门', '后备箱'];
    var chooseArr = [];
    tagNameArr.forEach(function (name, i) {
        var tagObj = carModel.getObjectByName(name).children[0];
        chooseArr.push(tagObj);
        // 自定义光标door属性，绑定光标对应的车门
        tagObj.door = carModel.getObjectByName(doorNameArr[i]);
        tagObj.door.state = 'close'; //车门状态

        //选中车门的名字
        var door = tagObj.door;
        var name = tagObj.door.name;
        if (name == "右前门" || name == "右后门") {
            door.openTween = openClose('y', 0, Math.PI / 3, door,'open');
            door.closeTween = openClose('y', Math.PI / 3, 0, door,'close');
        } else if (name == "左前门" || name == "左后门") {
            door.openTween = openClose('y', 0, -Math.PI / 3, door,'open');
            door.closeTween = openClose('y', -Math.PI / 3, 0, door,'close');
        } else if (name == "后备箱") {
            door.openTween = openClose('z', 0, Math.PI / 3, door,'open');
            door.closeTween = openClose('z', Math.PI / 3, 0, door,'close');
        }


    })
    /**
     * 射线投射器`Raycaster`的射线拾取选中网格模型对象函数choose()
     * 选中的网格模型变为半透明效果
     */
    function choose(event) {
        var Sx = event.clientX; //鼠标单击位置横坐标
        var Sy = event.clientY; //鼠标单击位置纵坐标
        //屏幕坐标转WebGL标准设备坐标
        var x = (Sx / window.innerWidth) * 2 - 1; //WebGL标准设备横坐标
        var y = -(Sy / window.innerHeight) * 2 + 1; //WebGL标准设备纵坐标
        //创建一个射线投射器`Raycaster`
        var raycaster = new THREE.Raycaster();
        //通过鼠标单击位置标准设备坐标和相机参数计算射线投射器`Raycaster`的射线属性.ray
        raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
        //返回.intersectObjects()参数中射线选中的网格模型对象
        // 未选中对象返回空数组[],选中一个数组1个元素，选中两个数组两个元素
        var intersects = raycaster.intersectObjects(chooseArr);
        console.log("射线器返回的对象", intersects);
        // intersects.length大于0说明，说明选中了模型
        if (intersects.length > 0) {
            //选中的车门
            var chooseDoor = intersects[0].object.door;
            if (chooseDoor.state == 'close') {
                chooseDoor.state = 'open';
                chooseDoor.openTween.start(); //播放开门动画
            } else {
                chooseDoor.state = 'close';
                chooseDoor.closeTween.start(); //播放关门动画
            }
        }
    }
    addEventListener('click', choose); // 监听窗口鼠标单击事件
}

// 创建模型对象旋转动画
function openClose(axis, angle1, angle2, door,openClose) {
    var state = {
        angle: angle1, // 车门动画开始角度
    };
    var tween = new TWEEN.Tween(state); //创建一段tween动画      
    tween.to({
        angle: angle2, // 车门动画结束角度
    }, 1000); //1000：表示动画执行时间1000毫秒(ms)
    tween.onUpdate(function () {
        // tween动画执行期间.onUpdate()重复执行，更新车门角度
        if (axis == 'y') {
            door.rotation.y = state.angle;
        } else {
            door.rotation.z = state.angle;
        }
    });
    if(openClose=='open'){
        tween.onStart(function(){
            openSound.play();//开门声音在开门动画开始的时候发生
        })
    }else{
        tween.onComplete(function(){
            closeSound.play();//关门声音在关门动画结束的时候发生
        })
    }
    return tween;
}





export {
    open
}