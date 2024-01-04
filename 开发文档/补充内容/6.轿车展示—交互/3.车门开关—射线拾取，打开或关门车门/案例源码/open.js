// 引入Three.js
import * as THREE from '../../../../three.js-r125/build/three.module.js';
import {
    camera
} from './RendererCamera.js';

function open(carModel) {
    var tagNameArr = ['右前光标', '右后光标', '左前光标', '左后光标', '后备箱光标'];
    var doorNameArr = ['右前门', '右后门', '左前门', '左后门', '后备箱'];
    var chooseArr = [];
    tagNameArr.forEach(function (name, i) {
        // 获取热点模型Sprite
        var tagObj = carModel.getObjectByName(name).children[0];
        chooseArr.push(tagObj);
        // 自定义光标door属性，绑定光标对应的车门
        tagObj.door = carModel.getObjectByName(doorNameArr[i]);
        tagObj.door.state = 'close'; //车门状态
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
            //选中车门的名字
            var name = chooseDoor.name;
            if (name == "右前门" || name == "右后门") {
                if (chooseDoor.state == 'close') {
                    chooseDoor.state = 'open';
                    chooseDoor.rotateY(Math.PI / 3);
                } else {
                    chooseDoor.state = 'close';
                    chooseDoor.rotateY(-Math.PI / 3);
                }
            } else if (name == "左前门" || name == "左后门") {
                if (chooseDoor.state == 'close') {
                    chooseDoor.state = 'open';
                    chooseDoor.rotateY(-Math.PI / 3);
                } else {
                    chooseDoor.state = 'close';
                    chooseDoor.rotateY(Math.PI / 3);
                }
            } else if (name == "后备箱") {
                if (chooseDoor.state == 'close') {
                    chooseDoor.state = 'open';
                    chooseDoor.rotateZ(Math.PI / 3);
                } else {
                    chooseDoor.state = 'close';
                    chooseDoor.rotateZ(-Math.PI / 3);
                }

            }

        }
    }
    addEventListener('click', choose); // 监听窗口鼠标单击事件
}



export {
    open
}