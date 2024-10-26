import "./style.css";
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);

const textureLoader = new THREE.TextureLoader();
const modelLoader = new GLTFLoader();

document.querySelector('body').appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75,width/height,0.1,1000);
const scene = new THREE.Scene();
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

camera.position.set(0, 1, 60);

const objects = [];

const solarSys = new THREE.Object3D();
scene.add(solarSys);
objects.push(solarSys);

const radius = 2;
const widthSegments = 8;
const heightSegments = 8;
const sphereGeometry = new THREE.SphereGeometry(
  radius,
  widthSegments,
  heightSegments
);

const sunMaterial = new THREE.MeshStandardMaterial({ emissive: 0xffff00});
const sun = new THREE.Mesh(sphereGeometry,sunMaterial);

sun.scale.set(5,5,5);

let sunCat;
modelLoader.load('Models/cat/scene.gltf',
  (gltf)=>{
    const model = gltf.scene;
    sunCat = model;
    sunCat.scale.set(0.08,0.08,0.08);
    scene.add(sunCat);
    camera.lookAt(sun.position);
  },
  (xhr)=>{
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error)=>{
    console.log(error + "error de carga");
  }
);
solarSys.add(sunCat);
objects.push(sunCat);

const earthOrbit = new THREE.Object3D();
earthOrbit.position.x = 10;
solarSys.add(earthOrbit);
objects.push(earthOrbit);

const earthMaterial = new THREE.MeshStandardMaterial({ emissive: 0x112244})
const earth = new THREE.Mesh(sphereGeometry,earthMaterial);

let earthBul
modelLoader.load('Models/bulbasour/scene.gltf',
  (gltf)=>{
    const model = gltf.scene;
    earthBul = model;
    earthBul.scale.set(0.05,0.05,0.05);
    scene.add(earthBul);
  },
  (xhr)=>{
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error)=>{
    console.log(error + "error de carga");
  }
);

earthOrbit.add(earthBul);



const llumGlobal = new THREE.DirectionalLight( 0x999999, 5);
//llumGlobal.rotateX(45);
//llumGlobal.rotateY(60);
llumGlobal.position.set(1, 1, 1);
scene.add(llumGlobal);

const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

let time = Date.now();
function animate(){
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  if (isModelLoaded) {
  //sun.rotateX(0.001 * deltaTime);
  sun.rotateY(0.001 * deltaTime);
  //sun.rotateZ(0.01);
  }

  renderer.render(scene,camera);
}
renderer.setAnimationLoop(animate);