import {Mesh, Group, CubeTextureLoader,MeshBasicMaterial,KeyframeTrack,AnimationClip,AnimationMixer,Clock,LoopOnce} from 'three';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {GUI} from 'three/addons/libs/lil-gui.module.min.js'
const loader = new GLTFLoader();
const gui = new GUI(); //创建GUI对象

const group = new Group();

const textureCube = new CubeTextureLoader().setPath('./环境贴图/').load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

const play = document.querySelector('#play');
const stop = document.querySelector('#stop');
const bu = document.querySelector('#bu');

loader.load('./机械装配动画.glb', (gltf) => {
    gltf.scene.traverse((obj) => {
        if(obj.isMesh) {
            obj.material.metalness = 1.0;
            obj.material.roughness = 0.35;
            obj.material.envMap = textureCube;
            obj.material.envMapIntensity = 0.5;
        }
    })

    group.add(gltf.scene);

    const miexer = new AnimationMixer(gltf.scene);
    const clip = gltf.animations[0];

    const duration = clip.duration; // 获取默认执行时间
    console.log(duration);
    const clipAction = miexer.clipAction(clip);
    clipAction.play();
    clipAction.paused = true; // 暂停状态

    gui.add(clipAction, 'time', 0, duration).step(0.1).name('播放时间').onChange(() => {
        // 当前是否处于播放状态
        if(!clipAction.paused) {
            // 如果处于播放状态就暂停播放
            clipAction.paused = true;
            play.textContent = '播放'
        }
    });
    gui.add(clipAction, 'timeScale', 0, 2).step(0.1).name('播放倍数');

    // 不循环播放
    clipAction.loop = LoopOnce;

    const clock = new Clock();

    const loop = () => {
        requestAnimationFrame(loop);
        const frameT = clock.getDelta();
        miexer.update(frameT);
    }
    loop();

    // 播放
    play.addEventListener('click', () => {
        console.log(clipAction.paused);

        if(clipAction.paused) {
            // 当前是播放状态
            clipAction.paused = false;
            play.textContent = '暂停'
        } else {
            clipAction.paused = true;
            play.textContent = '播放'
        }
    })
})

export default group;