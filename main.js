import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene1 = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})
//First renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene1, camera);
 

//Light
const light = new THREE.SpotLight(0xffffff, 100);
light.position.set(5,5,5);
scene1.add(light);


//3D objects - torus
const geometry = new THREE.TorusKnotGeometry( 10/1.85, 1.25, 300, 20); 
const material = new THREE.MeshNormalMaterial();
const torus = new THREE.Mesh(geometry, material);
//scene1.add(torus);
torus.position.z = 10;
torus.position.setX(-5);
torus.position.setY(-6);
//Astronat model
let AstroModel;
const loader_astro = new GLTFLoader();
loader_astro.load(
  'assets/space_suit/scene.gltf',
  function(gltf){
    AstroModel = gltf.scene;
    AstroModel.traverse((child) => {
      if (child.isMesh) child.material = material;
    });

    AstroModel.position.z = 3;
    AstroModel.position.x = 3;
    AstroModel.scale.set(4,4,4);
    scene1.add(AstroModel);
    renderer.render(scene1, camera);
  } 
);

//Moon model
let MoonModel;
const loader_moon = new GLTFLoader();
loader_moon.load(
  'assets/moon/scene.gltf',
  function(gltf){
    MoonModel = gltf.scene;
    MoonModel.traverse((child) => {
      if (child.isMesh) child.material = material;
    });
    MoonModel.position.x = 0;
    MoonModel.position.y = 1;
    MoonModel.position.z = -5;
    scene1.add(MoonModel);
    renderer.render(scene1, camera);
});



const controls = new OrbitControls(camera, renderer.domElement);

//Adding stars
function Stars(){
  const geometry = new THREE.SphereGeometry(0.1);
  const material = new THREE.MeshNormalMaterial();
  const star = new THREE.Mesh(geometry, material);


  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene1.add(star);
}
Array(300).fill().forEach(Stars);

//Update Camera Movement
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  
  //Camera Movement
  camera.position.z = t * -0.005;
  camera.position.x = 5;
  camera.position.y = 10 - window.scrollY/500;
}
document.body.onscroll = moveCamera;
moveCamera();

//Animation and movement
function animate(){
  requestAnimationFrame(animate);
  
  if(AstroModel){
  AstroModel.rotation.y += 0.01;
  AstroModel.translateX(0.01);
  }
  if(MoonModel){
  MoonModel.rotation.y += 0.01;
  MoonModel.rotation.x += 0.001;
  MoonModel.translateX(0.1);
  }

  controls.update();
  renderer.render(scene1, camera);
}

animate();
