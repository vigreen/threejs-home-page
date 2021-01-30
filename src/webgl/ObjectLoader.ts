/*
 * Shape.ts
 * ===========
 * Placeholder shape to demonstrate setup works. 
 * Has capacity to import custom .glsl shader files
 */

import * as THREE from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export default class ObjectLoader {
  gltf: GLTF;
  isLoaded: boolean;
  eventLoop: [Function, any][];

  constructor(parentScene: THREE.Scene) {
    const loader = new GLTFLoader().setPath('./assets/bust/');
    this.eventLoop = [];

    loader.load('gw_bust-150k-4096.gltf', (gltf) => {
      const zoom = 0.02;
      gltf.scene.scale.set(-zoom, zoom, -zoom)
      gltf.scene.rotateY(1.5);
      gltf.scene.rotateX(-0.15)
      gltf.scene.rotateZ(-0.1)
      gltf.scene.translateY(-1.5);
      this.gltf = gltf;

      if (this.eventLoop.length) {
        let copiedLoop = [...this.eventLoop];
        this.eventLoop = [];
        copiedLoop.forEach(([func, obj]) => func(obj));
        copiedLoop = undefined;
      }

      parentScene.add(gltf.scene);
    });
  }

  public add(obj: THREE.Object3D) {
    if (this.gltf) {
      this.gltf.scene.add(obj);
    } else {
      this.eventLoop.push([this.add.bind(this), obj]);
    }
  }

  public update(secs: number): void {
    if (this.gltf) {
      this.gltf.scene.rotation.set(
        0,
        ((secs) * Math.PI) / 10,
        0
      );
    }
  }
}