import * as THREE from '../../../../three.js-r125/build/three.module.js';
function createAudio() {
    // 创建一个监听者
    var listener = new THREE.AudioListener();
    // 创建一个非位置音频对象  用来控制播放
    var sound = new THREE.Audio(listener); //开门音频对象
    // 创建一个音频加载器对象
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load('./scene/model/背景.wav', function (buffer) {
        sound.setBuffer(buffer);
        sound.setVolume(0.1); //播放音量
        sound.setLoop(true); //设置循环播放
        // sound.play(); //开始播放
    });
    return sound;
}

var backgroundAudio = createAudio();
export {
    backgroundAudio
}