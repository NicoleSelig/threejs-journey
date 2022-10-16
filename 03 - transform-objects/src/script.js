import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)

const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff0000})
)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0x00ff00})
)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0x0000ff})
)
cube2.position.x = -2
cube3.position.x = 2
group.rotation.y = 1
group.add(cube1, cube2, cube3)

// Position
// cube.position.x = 0.7
// cube.position.y = -0.6
// cube.position.z = 1
// cube.position.set(0.7, -0.6, 1)

// Scale
// cube.scale.x = 1
// cube.scale.y = 1
// cube.scale.z = 1
// cube.scale.set(2, 0.5, 0.5)

// Rotation
// cube.rotation.y = 3.14159 // pi!
// cube.rotation.reorder('YXZ') // the order in which you rotate on axis matters
// cube.rotation.y = Math.PI / 4
// cube.rotation.x = Math.PI * 0.25


// Axes Helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// camera.lookAt(cube.position) // look at the cube

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)