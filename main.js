import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

//3D objects - torus
const geometry = new THREE.TorusKnotGeometry( 10/1.85, 1.25, 300, 20); 
const material = new THREE.MeshNormalMaterial();
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);
torus.position.z = 10;
torus.position.setX(-5);
torus.position.setY(-5);
//Human




const controls = new OrbitControls(camera, renderer.domElement);

//Update Camera Movement
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  
  torus.rotation.x += 0.05;
  torus.rotation.y += 0.075;
  torus.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = 5;
  camera.position.y = 10 - window.scrollY/500;
}
document.body.onscroll = moveCamera;
moveCamera();

//Animation
function animate(){
  requestAnimationFrame(animate);
  
  //Moving
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

animate();
