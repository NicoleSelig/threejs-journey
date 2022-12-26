import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Galaxy, debug} from './galaxy'

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

let galaxy = Galaxy()
scene.add(galaxy)

function create() {
    if (galaxy) {
        destroy(galaxy)
        scene.remove(galaxy)
    }
    galaxy = Galaxy()
    scene.add(galaxy)
}

gui.add(params, 'count').min(100).max(1000000).step(100).onFinishChange(create)
gui.add(params, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(create)
gui.add(params, 'radius').min(0.01).max(20).step(0.01).onFinishChange(create)
gui.add(params, 'branches').min(2).max(20).step(1).onFinishChange(create)
gui.add(params, 'spin').min(-5).max(5).step(0.001).onFinishChange(create)
gui.add(params, 'randomness').min(0).max(2).step(0.001).onFinishChange(create)
gui.add(params, 'randomnessPower').min(1.2).max(10).step(0.001).onFinishChange(create)
gui.addColor(params, 'insideColor').onFinishChange(create)
gui.addColor(params, 'outsideColor').onFinishChange(create)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


const clock = new THREE.Clock()
function animate() {
    const elapsedTime = clock.getElapsedTime()
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}
animate()
