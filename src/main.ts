import * as THREE from 'three';

/* scene */
const scene = new THREE.Scene();

/* sphere */
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  metalness: 0.7,
  roughness: 0.2,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
