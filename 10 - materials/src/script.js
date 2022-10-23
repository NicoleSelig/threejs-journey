import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { MeshDepthMaterial, TextureLoader } from 'three'
import * as dat from 'dat.gui'

/**
 * Debug
 */
const gui = new dat.GUI()


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
/**
 * Door Textures
*/
const textureLoader = new TextureLoader()
const alphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const ambientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const colorTexture = textureLoader.load('./textures/door/color.jpg')
const heightTexture = textureLoader.load('./textures/door/height.jpg')
const metalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const normalTexture = textureLoader.load('./textures/door/normal.jpg')
const roughnessTexture = textureLoader.load('./textures/door/roughness.jpg')

const matcapTexture = textureLoader.load('./textures/matcaps/8.png')
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')

/**
 * Objects
 */
// const material = new THREE.MeshBasicMaterial()
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// material.color.set('yellow')
// material.wireframe = true
// material.opacity = 0.5
// material.transparent = true
// material.alphaMap = alphaTexture
// material.side = THREE.DoubleSide

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial()
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// // material.specular = new THREE.Color(0xff0000)

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.45
material.roughness = 0.65
material.map = colorTexture
material.aoMAp = ambientOcclusionTexture
material.aoMapIntensity = 1


gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001)

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material)
sphere.position.x = -1.5

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material)

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 16, 32), material)
torus.position.x = 1.5
scene.add(sphere, plane, torus)

plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))



/**
 * Lights
*/

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


/**
 * Sizes
 */
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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.01 + elapsedTime
    plane.rotation.y = 0.01 + elapsedTime
    torus.rotation.y = 0.01 + elapsedTime

    sphere.rotation.x = 0.015 + elapsedTime
    plane.rotation.x = 0.015 + elapsedTime
    torus.rotation.x = 0.015 + elapsedTime


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()