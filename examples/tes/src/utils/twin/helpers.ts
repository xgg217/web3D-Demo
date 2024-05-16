// 封装辅助工具
import * as THREE from "three";
import type { Scene, DirectionalLight } from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import type { IParams } from "./types";

export default class Helper {
  stats: Stats;
  gui: GUI;

  constructor(scene: Scene, directionalLight: DirectionalLight, params: IParams) {
    const { domName } = params;
    const mainDom = document.querySelector(`.main ${domName}`)!;

    scene.add(new THREE.AxesHelper(200));

    // 查看帧率
    this.stats = new Stats();
    this.stats.dom.style.left = "310px";
    mainDom.appendChild(this.stats.dom);

    // 辅助调试
    this.gui = new GUI();
    mainDom.appendChild(this.gui.domElement);
    this.gui.domElement.style.right = "0px";
    this.gui.domElement.style.width = "500px";
    this.gui.domElement.style.fontSize = "16px";

    // 平行光调试
    const dirFolder = this.gui.addFolder("平行光"); //创建一个子菜单
    dirFolder.add(directionalLight, "intensity", 0, 5);
    const R = 100;
    dirFolder
      .add({ angle: 45 }, "angle", 0, 360)
      .onChange(v => {
        const rad = THREE.MathUtils.degToRad(v);
        directionalLight.position.x = R * Math.cos(rad);
        directionalLight.position.z = R * Math.sin(rad);
      })
      .name("旋转角度");

    dirFolder
      .add({ angle: 45 }, "angle", 0, 89)
      .onChange(v => {
        const rad = THREE.MathUtils.degToRad(v);
        directionalLight.position.y = R * Math.tan(rad);
      })
      .name("照射角度");

    dirFolder.close();
  }
}
