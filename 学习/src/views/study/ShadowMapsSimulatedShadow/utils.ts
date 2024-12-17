import * as THREE from "three";
import { getWAndH } from "@/utils/index";

export class SimulatedShadow {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  mesh: THREE.Mesh; // 物体
  renderer: THREE.WebGLRenderer;
  light: THREE.SpotLight; //  点光源
  cameraHelper: THREE.CameraHelper;

  constructor() {}
}
