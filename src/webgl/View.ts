/*
 * View.ts
 * ===========
 * Topmost Three.js class. 
 * Controls scene, cam, renderer, and objects in scene.
 */

import * as THREE from "three";

import Shape from "./Shape";
import ObjectLoader from "./ObjectLoader";

class RangeInput {
  private range: HTMLInputElement;
  private id: string;

  constructor({ min = "10.1", max = '29.9', step = "0.1", value = ((+min + +max) / 2).toString() }: { min?: string, max?: string, step?: string, value?: string }) {
    this.id = Math.floor(Date.now() * Math.random()).toString();
    this.range = document.createElement('input') as HTMLInputElement;
    this.range.type = 'range';
    this.range.id = this.id;
    this.range.min = min;
    this.range.max = max;
    this.range.step = step;
    this.range.value = value;
    const header = document.getElementsByTagName('header')[0];
    header.appendChild(this.range);
  }

  getValue() {
    return (this.range) ? +this.range.value : 1;
  }
}

export default class View {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private bust: ObjectLoader;
  private range: RangeInput;
  private range2: RangeInput;
  private fog: THREE.Fog;

  constructor(canvasElem: HTMLCanvasElement) {
    const color = 0x24233d//0xF02050;
    const density = 0.09;

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvasElem,
      antialias: true,
    });
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    this.camera.position.z = 19;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(color);



    this.bust = new ObjectLoader(this.scene);
    //this.range = new RangeInput("0.01", "1.5", "0.01");
    //this.range = new RangeInput({ value: '16.9' });
    //this.range2 = new RangeInput({ value: '21' });
    var ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.6);
    var lightFront = new THREE.SpotLight(0xFFFFFF, 5, 10, 10);
    var lightBack = new THREE.PointLight(0xFFFFFF, 0.5);
    this.scene.add(ambientLight);
    this.bust.add(lightFront);
    this.scene.add(lightBack);
    //this.scene.fog = new THREE.FogExp2(color, density);
    this.fog = new THREE.Fog(color, 16.9, 21);
    this.scene.fog = this.fog;
    // Set initial sizes
    this.onWindowResize(window.innerWidth, window.innerHeight);
  }

  public onWindowResize(vpW: number, vpH: number): void {
    this.renderer.setSize(vpW, vpH);
    this.camera.aspect = vpW / vpH;
    this.camera.updateProjectionMatrix();
  }

  public update(secs: number): void {
    //const z1 = this.range.getValue();
    //const z2 = this.range2.getValue();
    //this.fog.density = z1;
    //this.fog.near = z1;
    //this.fog.far = z2;
    //this.camera.position.z = z2;
    this.bust.update(secs);
    this.renderer.render(this.scene, this.camera);
  }
}