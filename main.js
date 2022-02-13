import "./style.css";

//gets stuff setup
import * as THREE from "three";
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
camera.position.z = 30;
renderer.render(scene, camera);






//adds object
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);





//adds a light source
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);





//helpers
const controls = new OrbitControls(camera, renderer.domElement);
// const axesHelper = new THREE.AxesHelper(20);
// const gridHelper = new THREE.GridHelper(2000, 200);
// const lighthelper = new THREE.PointLightHelper(pointLight);
// scene.add(axesHelper, gridHelper, lighthelper);





//adds a bunch of stars
function addstar() {
  const geo = new THREE.SphereGeometry(0.25, 24, 24);
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geo, mat);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addstar)




//makes space background
const spaceTexture = new THREE.TextureLoader().load('./space.jpg');
scene.background = spaceTexture;





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







function moveCamera(){
  //tells how far the user is from the top of the webpage
  const t = document.body.getBoundingClientRect().top;
  

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;


  kilxby.rotation.y += 0.01;
  kilxby.rotation.z += 0.01;


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

  renderer.render(scene, camera);
  
}
animate();
