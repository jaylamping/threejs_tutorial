import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css';

const canvas = document.querySelector('.webgl') as HTMLCanvasElement;

let mouseDown = false;
let rgb = [0, 0, 0];

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

/* timeline / initial animation */
const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });
tl.fromTo(mesh.scale, { x: 0, y: 0, z: 0 }, { duration: 1, x: 1, y: 1, z: 1 });
tl.fromTo('nav', { y: '-100%' }, { duration: 1.3, y: '0%' }, '-=1');
tl.fromTo('.title', { opacity: 0 }, { duration: 0.9, opacity: 1 }, '-=0.3');

/* listeners */
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
});

window.addEventListener('mousedown', () => {
  mouseDown = true;
});

window.addEventListener('mouseup', () => {
  mouseDown = false;
});

window.addEventListener('mousemove', (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150,
    ];
    gsap.to(mesh.material.color, {
      duration: 0.1,
      r: rgb[0] / 255,
      g: rgb[1] / 255,
      b: rgb[2] / 255,
    });
  }
});

/* main loop */
const loop = () => {
  controls.update();
  window.requestAnimationFrame(loop);
  renderer.render(scene, camera);
};

loop();
