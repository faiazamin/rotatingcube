import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Sets up the Three.js scene, camera, and renderer.
 */
const scene = new THREE.Scene();

// Camera: Defines what the user sees.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(30);

// Renderer: Displays the scene created by the camera.
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg') as HTMLCanvasElement,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

/**
 * Creates a 3D cube and adds it to the scene.
 */
const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Green cube
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

/**
 * Adds lighting to the scene.
 * PointLight: Shines from a single point in one direction.
 * AmbientLight: Lights all objects in the scene equally.
 */
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

/**
 * OrbitControls: Allows the user to rotate the camera around the scene using the mouse.
 */
const controls = new OrbitControls(camera, renderer.domElement);

/**
 * Event Listener for window clicks:
 * Changes the cube's color to a random color when the user clicks anywhere on the window.
 */
window.addEventListener('click', () => {
  cube.material.color.set(Math.random() * 0xffffff);
});

/**
 * Event Listener for window resize:
 * Updates the camera's aspect ratio and the renderer's size to make the scene responsive.
 */
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/**
 * Animation Loop:
 * Continuously updates the scene, rotating the cube and rendering the camera's view.
 */
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.005;
  cube.rotation.z += 0.01;

  controls.update(); // Required for OrbitControls to work correctly

  renderer.render(scene, camera);
}

animate();
