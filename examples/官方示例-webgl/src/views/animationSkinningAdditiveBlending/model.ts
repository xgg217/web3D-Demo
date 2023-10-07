import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Group,Mesh, PlaneGeometry, MeshLambertMaterial,AnimationMixer, Clock } from "three"
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import type {AnimationAction} from "three"

const littlestTokyoUrl = new URL('./Xbot.glb', import.meta.url).href;


const group = new Group();



// 投影 平面
const mesh = (() => {
  const mesh = new Mesh( new PlaneGeometry( 5, 5 ), new MeshLambertMaterial( { color: 0xcbcbcb, depthWrite: false } ) );
  mesh.rotation.x = -Math.PI / 2;
  // mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh
})();


group.add(mesh);



// folder1.



(() => {
  const gui = new GUI();//创建GUI对象
  const folder1 = gui.addFolder( '动作' );
  const folder2 = gui.addFolder( '姿态' );
  const folder3 = gui.addFolder( '分组3' );

  type IIitemActions = {
    [key:string]: {
      weight: 1 | 0,
      name: string,
      action: AnimationAction,
    }
  }

  // 动作
  const baseActionsStr = {
    none: '默认',
    idle: '休闲',
    walk: '走路',
    run: '跑步'
  };
  const currentBaseAction = 'idle';
  const baseActions:IIitemActions = {
    idle: { weight: 1, name: '休闲', action: null },
    walk: { weight: 0, name: '走路' },
    run: { weight: 0, name: '跑步' }
  };

  let mixer = null;

  folder1.add(baseActionsStr, 'idle', baseActionsStr).name('动作').onChange((val) => {
    console.log(val);
    let item = null;
    console.log(Object.values(baseActions));

    for (const value of Object.values(baseActions))  {
      console.log(value);

      if(value.name === val) {
        item = value;
        break;
      }
    }

    // console.log(item);

    const action = mixer.clipAction( item.action );
    action.play();




  });


  const loader = new GLTFLoader();

  loader.load(littlestTokyoUrl, function ( gltf ) {
    console.log('控制台查看加载gltf文件返回的对象结构',gltf);
    console.log('gltf对象场景属性',gltf.scene);
    // 返回的场景对象gltf.scene插入到threejs场景中
    group.add( gltf.scene );

    gltf.scene.traverse( function ( object ) {
      if ( object.isMesh ) {object.castShadow = true;}
    });

    // 动画
    (() => {
       mixer = new AnimationMixer(gltf.scene);

      // const allActions:AnimationAction[] = []; // 所有动作

      const animations = gltf.animations;

      // const numAnimations = animations.length; // 所有动作
      animations.forEach(item => {

        const name = item.name;
        // console.log(item);


        // @ts-ignore
        if(baseActionsStr[name]) {
          console.log(item);

          // const action = mixer.clipAction( item );
          // console.log(action);

          // action.play();

        //   // allActions.push(action);
          baseActions[name].action = item;
        }
      })
      // console.log(baseActions['idle'].action);


      const action = mixer.clipAction( baseActions['idle'].action );
      // console.log(action);

      action.play();




      // const clipAction = mixer.clipAction(gltf.animations[0]);
      // clipAction.play();

      const clock = new Clock();
      function loop() {
        requestAnimationFrame(loop);
        const frameT = clock.getDelta();
        // 更新播放器相关的时间
        mixer.update(frameT);
      }
      loop();
    })();




  });

})();


export default group;

