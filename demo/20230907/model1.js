import {Mesh, Group, BoxGeometry,MeshBasicMaterial,KeyframeTrack,AnimationClip,AnimationMixer,Clock,LoopOnce} from 'three';

const box = new BoxGeometry(15,15,15);

const material = new MeshBasicMaterial({
    color: 0xff0000
});

const mesh = new Mesh( box, material );

mesh.name = "Box";

const times = [0, 3, 6]; //时间轴上，设置三个时刻0、3、6秒
// times中三个不同时间点，物体分别对应values中的三个xyz坐标
const values = [0, 0, 0, 100, 0, 0, 0, 0, 100];

const posKF = new KeyframeTrack('Box.position', times, values);

// 从2秒到5秒，物体从红色逐渐变化为蓝色
const colorKF = new KeyframeTrack('Box.material.color', [2, 5], [1, 0, 0, 0, 0, 1]);

const clip = new AnimationClip("test",6,[posKF, colorKF]);

const mixer = new AnimationMixer(mesh);

const clipAction = mixer.clipAction(clip);

// clipAction.play();
// clipAction.loop = LoopOnce;
// clipAction.clampWhenFinished = true;


const clock = new Clock();
function loop() {
    requestAnimationFrame(loop);

    const frameT = clock.getDelta();
    mixer.update(frameT);
}
loop();

const stop = document.querySelector('#stop');
const paly = document.querySelector('#play');
const bu = document.querySelector('#bu');
stop.addEventListener('click', () => {
    clipAction.stop();
})

paly.addEventListener('click', () => {
    clipAction.play();
})

bu.addEventListener('click', () => {

    if(clipAction.paused) { // 当前暂停状态
        clipAction.paused = false;//切换为播放状态
        bu.textContent = "暂停"
    } else {
        clipAction.paused = true;//切换为状态状态
        bu.textContent = "播放"
    }
    
})





export default mesh;