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

const rotationSpeed = 0.001;

document.querySelector('body').appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75,width/height,0.1,1000);
const scene = new THREE.Scene();
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

camera.position.set(0, 1, 70);

const objects = [];

const solarSys = new THREE.Object3D();
scene.add(solarSys);
objects.push(solarSys);

let sunCat;
modelLoader.load('Models/cat/scene.gltf',
  (gltf)=>{
    const model = gltf.scene;
    sunCat = model;
    sunCat.scale.set(0.03,0.03,0.03);
    camera.lookAt(sunCat.position);
    solarSys.add(sunCat);
  },
  (xhr)=>{
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error)=>{
    console.log(error + "error de carga");
  }
);

objects.push(sunCat);

const earthOrbit = new THREE.Object3D();
earthOrbit.position.x = 10;
solarSys.add(earthOrbit);
objects.push(earthOrbit);

let earthBul;
modelLoader.load('Models/bulbasour/scene.gltf',
  (gltf)=>{
    const model = gltf.scene;
    earthBul = model;
    earthBul.scale.set(6,6,6);
    earthOrbit.add(earthBul);
  },
  (xhr)=>{
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error)=>{
    console.log(error + "error de carga");
  }
);

const moonOrbit = new THREE.Object3D();
moonOrbit.position.x = 3;
earthOrbit.add(moonOrbit);
objects.push(moonOrbit);

let moonLink;
modelLoader.load('Models/moon/scene.gltf',
  (gltf)=>{
    const model = gltf.scene;
    moonLink = model;
    moonLink.scale.set(0.0005,0.0005,0.0005);
    moonOrbit.add(moonLink);
  },
  (xhr)=>{
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error)=>{
    console.log(error + "error de carga");
  }
);

const cuccoOrbit = new THREE.Object3D();
cuccoOrbit.position.z = 15;
cuccoOrbit.position.x = 15;
solarSys.add(cuccoOrbit);
objects.push(cuccoOrbit);

let planetCucco;
modelLoader.load('Models/cucco/scene.gltf',
  (gltf)=>{
    const model = gltf.scene;
    planetCucco = model;
    planetCucco.scale.set(0.4,0.4,0.4);
    cuccoOrbit.add(planetCucco);
  },
  (xhr)=>{
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error)=>{
    console.log(error + "error de carga");
  }
);

const candleOrbit = new THREE.Object3D();
candleOrbit.position.x = 2.8;
cuccoOrbit.add(candleOrbit);
objects.push(candleOrbit);

let moonCandle;
modelLoader.load('Models/candle/scene.gltf',
  (gltf)=>{
    const model = gltf.scene;
    moonCandle = model;
    moonCandle.scale.set(0.6,0.6,0.6);
    candleOrbit.add(moonCandle);
  },
  (xhr)=>{
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error)=>{
    console.log(error + "error de carga");
  }
);

const llumGlobal = new THREE.DirectionalLight( 0x999999, 5);
llumGlobal.position.set(1, 1, 1);
scene.add(llumGlobal);

const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

let time = Date.now();
function animate(){
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  objects.forEach((obj) => {
    if (obj != undefined) {
      obj.rotation.y += rotationSpeed * deltaTime;
    } 
  });

  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}

animate();