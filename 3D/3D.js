import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const canvas = document.getElementById('model');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x303030);

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.set(0, 4, 5);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(canvas.clientWidth, canvas.clientWidth);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

/*const geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
const material = new THREE.MeshStandardMaterial({ 
    color: 0x808080, 
    roughness: 0.7,
    metalness: 0.2
});
const model = new THREE.Mesh(geometry, material);
scene.add(model);*/



// Pour charger un modèle personnalisé GLTF (en commentaire)
 const loader = new GLTFLoader();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
dracoLoader.setDecoderConfig({ type: 'js' });

loader.setDRACOLoader(dracoLoader);

 const scaleFactor = 2; 
 loader.load(
     '/3D/gold_barrel.glb',
     (gltf) => {
         const loadedModel = gltf.scene;
         
         loadedModel.traverse((child) => {
             if (child.isMesh) {
                 child.material = new THREE.MeshStandardMaterial({
                     color: 0x808080,
                     roughness: 0.7,
                     metalness: 0.2
                 });
             }
         });
         loadedModel.scale.set(scaleFactor, scaleFactor, scaleFactor);
         scene.add(loadedModel);
     },
     undefined,
     (error) => {
         console.error('Erreur de chargement du modèle:', error);
     }
 );

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 10;

controls.addEventListener( 'change', ()=>{renderer.render(scene, camera)} );
controls.update();

function animate() {
    requestAnimationFrame(animate);

    controls.update();
    
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    const width = window.innerWidth / 1.333;
    
    camera.aspect = width / width;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, width);
    renderer.render(scene, camera);
});

animate();
canvas.style.position = 'relative';
canvas.style.width = '75%';
canvas.style.aspectRatio = '1/1';
canvas.style.margin = '0 auto';
renderer.setSize(canvas.clientWidth, canvas.clientWidth);

// Tooltip pour les définitions

const tooltip = document.getElementById("tooltip");
let tooltipTimeout;

document.querySelectorAll(".defined").forEach(el => {
  const definition = el.getAttribute("data-definition");

  el.addEventListener("mousemove", (e) => {
    tooltip.textContent = definition;
    tooltip.style.left = `${e.clientX + 10}px`;
    tooltip.style.top = `${e.clientY + 10}px`;
    tooltip.style.opacity = "1";
  });

  el.addEventListener("mouseleave", () => {
    tooltip.style.opacity = "0";
  });

  el.addEventListener("click", (e) => {
    tooltip.textContent = definition;
    tooltip.style.left = `${e.clientX}px`;
    tooltip.style.top = `${e.clientY}px`;
    tooltip.style.opacity = "1";

    clearTimeout(tooltipTimeout);
    tooltipTimeout = setTimeout(() => {
      tooltip.style.opacity = "0";
    }, 5000);
  });
});

