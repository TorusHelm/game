import * as THREE from 'three';
import Camera from './models/camera';
import CharacterPolygon from "./models/characterPolygon";

const width = window.innerWidth
const height = window.innerHeight
const appSelector = document.querySelector('#app');
const renderer = new THREE.WebGLRenderer();

renderer.setSize( width, height );
appSelector.appendChild( renderer.domElement );

const camera = new Camera();
const character = new CharacterPolygon(camera);
const scene = new THREE.Scene();
character.init();

const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(0, 4, 2);

const marker = new THREE.Mesh(
    new THREE.SphereGeometry(0.062, 4, 2),
    new THREE.MeshBasicMaterial({ color: "red" }
));

scene.add( character );
scene.add( light );
scene.add( marker );

var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersectPoint = new THREE.Vector3();

function onmousemove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, intersectPoint);
    // marker.position.copy(intersectPoint);
}

document.addEventListener('mousemove', onmousemove, false);

// ground
const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry( 2000, 2000 ),
    new THREE.MeshPhongMaterial( { color: 0xcbcbcb, depthWrite: false } )
);
mesh.rotation.x = - Math.PI / 2;
scene.add( mesh );

// ground greed
const grid = new THREE.GridHelper( 200, 40, 0x000000, 0x000000 );
grid.material.opacity = 0.2;
grid.material.transparent = true;
scene.add( grid );

function tick() {
    character.update();
    renderer.render( scene, camera );
    requestAnimationFrame( tick );
}

tick();