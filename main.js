import "./style.css";

//gets stuff setup
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});






//how to view
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 100;
camera.position.y = 10;
renderer.render(scene, camera);






//adds object
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x0bfc03 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);





//adds a light source
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);





//helpers
const controls = new OrbitControls(camera, renderer.domElement);
const gridHelper = new THREE.GridHelper( 500, 50 , 0xff03d5, 0xff03d5);
const dir = new THREE.Vector3( 1, 2, 0 );
const cameraHelper = new THREE.CameraHelper( camera );

//normalize the direction vector (convert to vector of length 1)
dir.normalize();

const origin = new THREE.Vector3( 0, 0, 0 );
const length = 1;
const hex = 0xffff00;

const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
const sphere = new THREE.SphereGeometry();
const object = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( 0xff0000 ) );
const boxy = new THREE.BoxHelper( object, 0xffff00 );
const box = new THREE.Box3();
box.setFromCenterAndSize( new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( 2, 1, 3 ) );

const helper = new THREE.Box3Helper( box, 0xffff00 );
scene.add( gridHelper, arrowHelper , helper);

function addThing() {
  const starTexture = new THREE.TextureLoader().load("./gorl.png");
  const geo = new THREE.OctahedronGeometry(3, 1);
  const mat = new THREE.MeshStandardMaterial({ map: starTexture});
  const star = new THREE.Mesh(geo, mat);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(50).fill().forEach(addThing)



//adds a bunch of stars
function addstar() {
  const starTexture = new THREE.TextureLoader().load("./Thicc_bod_and_smol_head.jpg");
  const geo = new THREE.BoxGeometry( 3,3,3 );
  const mat = new THREE.MeshStandardMaterial({ map: starTexture});
  const star = new THREE.Mesh(geo, mat);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(50).fill().forEach(addstar)




//makes space background
// const spaceTexture = new THREE.TextureLoader().load('./space.jpg');
// scene.background = spaceTexture;





//makes a avatar box
const kilxbyTexture = new THREE.TextureLoader().load("./me.jpg");
const kilxby = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({ map: kilxbyTexture})
);
scene.add(kilxby);



//makes the moon
const moonTexture = new THREE.TextureLoader().load("./moon.jpg");
const normalTexture = new THREE.TextureLoader().load("./normal.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({map: moonTexture, normalMap: normalTexture})
)
scene.add(moon);
moon.position.z = 30;
moon.position.setX(-10);




// const loader = new THREE.FontLoader();

// loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

// 	const geomet = new THREE.TextGeometry( 'Hello three.js!', {
// 		font: font,
// 		size: 80,
// 		height: 5,
// 		curveSegments: 12,
// 		bevelEnabled: true,
// 		bevelThickness: 10,
// 		bevelSize: 8,
// 		bevelOffset: 0,
// 		bevelSegments: 5
// 	} );
// } );


const lineMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const points = [];
points.push( new THREE.Vector3(  0, 30, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 0, 20, 10 ) );
points.push(new THREE.Vector3(10, 5, 2))

const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( lineGeometry, lineMaterial );
scene.add(line);
line.position.y = 20;



const loader = new FontLoader();
let textMesh;
loader.load('./node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function(font){
  const geometry = new TextGeometry('A E S T H E T I C', {
    font: font, 
    size: 20,
    height: 0.2
  })

  textMesh = new THREE.Mesh(geometry, 
    new THREE.MeshStandardMaterial({ color: 0x00ffe5}));

    scene.add(textMesh);
    

    textMesh.position.z = -250;
    textMesh.position.y = 15;
    textMesh.position.x = -100;
})






function moveCamera(){
  //tells how far the user is from the top of the webpage
  const t = document.body.getBoundingClientRect().top;
  

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;


 


  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
//calls the function when user scrolls making the scroll event
document.body.onscroll = moveCamera;





//constantly updates/loops
function animate() {
  requestAnimationFrame(animate);

  //makes thingy go wobble
  torus.rotation.x += 0.001;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.001;

  //controls.update();


// textMesh.rotation.x += 0.1;
// textMesh.rotation.x += 0.1;

 kilxby.rotation.y += 0.01;
 kilxby.rotation.z += 0.01;

  renderer.render(scene, camera);
  camera.position.z -= 0.10;

  console.log(camera.position);
}
animate();
