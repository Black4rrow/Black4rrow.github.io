import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;
document.querySelector('.model-container').appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

const pmremGenerator = new THREE.PMREMGenerator(renderer);
const environmentMap = pmremGenerator.fromScene(new RoomEnvironment()).texture;
scene.environment = environmentMap;

const loader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();
let model;

loader.load(
    '../gold_barrel.glb',
    (gltf) => {
        model = gltf.scene;

        model.traverse((child) => {
            if (child.isMesh) {
                
                if(child.name == "metal_circles"){
                    const metalRingTexture = textureLoader.load('metal_ring.png');
                    metalRingTexture.flipY = false;
                    child.material = new THREE.MeshStandardMaterial({ map: metalRingTexture, metalness: 1, roughness: 0.6 });
                }

            }

            if (child.isMesh && child.material && child.material.envMap) {
                child.material.envMapIntensity = 0.01;
                child.material.needsUpdate = true;
            }
            
        });

        scene.add(model);

        model.position.set(0, 1, 0);
        model.scale.set(1.5, 1.5, 1.5);

        animate();
    },
    undefined,
    (error) => {
        console.error('Erreur lors du chargement du modèle :', error);
    }
);

camera.position.set(2, 5, 5); 

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 
controls.dampingFactor = 0.05;
controls.zoomSpeed = 0.5; 

function animate() {
    requestAnimationFrame(animate);

    if (model) {
        model.rotation.y += 0.01;
    }

    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});