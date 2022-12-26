import * as THREE from 'three'
import * as dat from 'lil-gui'

const gui = new dat.GUI({width: 400})

const params = {
    count: 100000,
    size: 0.01,
    radius: 5,
    branches: 3,
    spin: 1,
    randomness: 0.02,
    randomnessPower: 3,
    insideColor: '#ff6030',
    outsideColor: '#1b3984'
}

export function Galaxy(options = {}) {
        const parameters = {
            ...options,
            ...params
        }

        const geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(parameters.count * 3) // each vertex will have x y and z, hence * 3
        const colors = new Float32Array(parameters.count * 3)

        const colorInside = new THREE.Color(parameters.insideColor)
        const colorOutside = new THREE.Color(parameters.outsideColor)

        for(let i = 0; i < parameters.count; i ++) {

            //position
            const i3 = i * 3
            const x = i3
            const y = i3 + 1
            const z = i3 + 2

            const radius = Math.random() * parameters.radius
            const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2
            const spinAngle = radius * parameters.spin

            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
            const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

            positions[x] = Math.cos(branchAngle + spinAngle) * radius + randomX
            positions[y] = randomY
            positions[z] = Math.sin(branchAngle + spinAngle) * radius + randomZ

            // Color
            const mixedColor = colorInside.clone()
            mixedColor.lerp(colorOutside, radius / parameters.radius)

            colors[x] = mixedColor.r
            colors[y] = mixedColor.g
            colors[z] = mixedColor.b
        }

        geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3)
        )

        geometry.setAttribute(
            'color',
            new THREE.BufferAttribute(colors, 3)
        )

        // material
        const material = new THREE.PointsMaterial({
            size: parameters.size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true
        })

        //Points
        const points = new THREE.Points(
            geometry, material
        )

        return points
}

export function destroy(galaxy) {
    galaxy.material.dispose()
    galaxy.geometry.dispose()
}

export function debug(create) {
    gui.add(params, 'count').min(100).max(1000000).step(100).onFinishChange(create)
    gui.add(params, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(create)
    gui.add(params, 'radius').min(0.01).max(20).step(0.01).onFinishChange(create)
    gui.add(params, 'branches').min(2).max(20).step(1).onFinishChange(create)
    gui.add(params, 'spin').min(-5).max(5).step(0.001).onFinishChange(create)
    gui.add(params, 'randomness').min(0).max(2).step(0.001).onFinishChange(create)
    gui.add(params, 'randomnessPower').min(1.2).max(10).step(0.001).onFinishChange(create)
    gui.addColor(params, 'insideColor').onFinishChange(create)
    gui.addColor(params, 'outsideColor').onFinishChange(create)
}