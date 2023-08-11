import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls';

let width = window.innerWidth;
let height = window.innerHeight;
let gui = new dat.GUI()
//scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('lightblue')

//CAMERA
const camera = new THREE.PerspectiveCamera(50, width / height, 1, 100)
camera.position.set(2, 0 ,10)

//renderer
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(width, height)

//geometry
const geometry = new THREE.SphereGeometry(2,70,30)
const material = new THREE.MeshBasicMaterial({
  color: 'black',
  wireframe: true
})
const shape = new THREE.Mesh(geometry, material)
scene.add(shape)
gui.add(material, 'wireframe')
const shpre_control = gui.addFolder('sphreFolder')
shpre_control.add(shape.position, 'x').min(-3).max(2.4).step(0.1)
shpre_control.add(shape.position, 'y').min(-3).max(2.4).step(0.1)
shpre_control.add(shape.scale, 'x').name('width').step(1).min(-10).max(10)

const ambientLight = new THREE.AmbientLight(0xffffff, 5)
scene.add(ambientLight)
const light = new THREE.PointLight(0xffffff, 5)
light.position.set(0, 10, 10)
//responsive
window.addEventListener('resize', () => {
width =  window.innerWidth
height= window.innerHeight
renderer.setSize(width , height)
camera.aspect = width / height
camera.updateProjectionMatrix()
renderer.render(scene, camera)
})

//animation
 function animate (){
  requestAnimationFrame(animate)
  // shape.rotation.x += 0.002
  shape.rotation.y += 0.002
  renderer.render(scene, camera)
 }
//rendering
const container = document.querySelector('#root')
container.append(renderer.domElement)
renderer.render(scene ,camera)
animate()