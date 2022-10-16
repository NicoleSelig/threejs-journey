console.log(THREE)

// Canvas -- taken from html class
const canvas = document.querySelector('.webgl')
console.log(canvas)

// Scene
const scene = new THREE.Scene()

/**MESH
 * Combination of geometry (the shape) and the material (how it looks)
 */

// Red Cube
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: 'red'})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// Sizes
const sizes = {
    width: 800,
    height: 600,
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
/** At this point nothing is visible because the camera is inside the cube! We need to move the camera back y up, x right, z forward/backward*/
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)





