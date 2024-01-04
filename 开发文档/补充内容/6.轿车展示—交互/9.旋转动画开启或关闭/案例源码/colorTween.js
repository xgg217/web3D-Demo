import {
    model
} from './scene/model.js';
import * as THREE from '../../../../three.js-r125/build/three.module.js';

var colorArr16 = [0x023911, 0x222222, 0x6a030a, 0x000000, 0xffffff];
var colorArr = []
// 转为十进制
for (let i = 0; i < colorArr16.length; i++) {
    var color = new THREE.Color(colorArr16[i])
    colorArr.push({
        r: color.r,
        g: color.g,
        b: color.b
    })
}

var color = {
    r: colorArr[0].r,
    g: colorArr[0].g,
    b: colorArr[0].b
}; //mesh颜色值
var tweenArr = []; //所有动画片段tween的集合
// 批量创建动画片段tween
for (var i = 0; i < colorArr.length; i++) {
    var tween1 = new TWEEN.Tween(color)
        .to({
            r: colorArr[i].r,
            g: colorArr[i].g,
            b: colorArr[i].b
        }, 1000)
        .onUpdate(function () {
            setColor(color.r, color.g, color.b);
        });
    var tween2 = new TWEEN.Tween(color)
    if (i < colorArr.length-1) {
        tween2.to({
                r: colorArr[i + 1].r,
                g: colorArr[i + 1].g,
                b: colorArr[i + 1].b
            }, 1000)
            .onUpdate(function () {
                setColor(color.r, color.g, color.b);
            });
    } else {
        tween2.to({
                r: colorArr[0].r,
                g: colorArr[0].g,
                b: colorArr[0].b
            }, 1000)
            .onUpdate(function () {
                setColor(color.r, color.g, color.b);
            });
    }
    tweenArr.push(tween1, tween2);
}
// 批量连接所有动画片段
for (var i = 0; i < tweenArr.length - 1; i++) {
    tweenArr[i].chain(tweenArr[i + 1]);
}
tweenArr[tweenArr.length - 1].chain(tweenArr[0]);//首尾相接循环执行
tweenArr[0].start(); //播放一串动画片段



function setColor(r, g, b) {
    model.traverse(function (object) {
        if (object.type === 'Mesh') {
            if (object.name.slice(0, 2) == "外壳") { //外壳颜色设置
                object.material.color.setRGB(r, g, b);
            }
        }
    })
}

var colorTween = tweenArr[0];

//   批量生成动画，然后拼接
export {
    colorTween
}