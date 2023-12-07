import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css';

const canvas = document.querySelector('.webgl') as HTMLCanvasElement;

/* scene */
const scene = new THREE.Scene();

/* sphere */
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: '#00ff83',
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/* sizes */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/* light */
const light = new THREE.PointLight(0xffffff, 200, 100);
light.position.set(0, 10, 10);
scene.add(light);

/* camera */
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z = 20;
scene.add(camera);

/* controls */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;

/* renderer */
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/* listeners */
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
});

/* main loop */
const loop = () => {
  controls.update();
  window.requestAnimationFrame(loop);
  renderer.render(scene, camera);
};

loop();
