import { shaderMaterial, Sparkles, Center, useTexture, useGLTF, OrbitControls } from '@react-three/drei'
import {extend, useFrame} from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import portalVertexShader from './shaders/portal/vertex.js'
import portalFragmentShader from './shaders/portal/fragment.js'

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#23C4FF'),
        uColorEnd: new THREE.Color('#FF1ABE')
    },
    portalVertexShader,
    portalFragmentShader
)

extend({ PortalMaterial })

export default function Experience()
{
    const portalMaterial = useRef()
    useFrame((state, delta) => {
        portalMaterial.current.uTime += delta
    })

    const {nodes} = useGLTF('./model/portal.glb')
    const bakedTexture = useTexture('./model/baked_portal_dark.jpg')

    return <>
        <color args={['#201919']} attach="background"/>

        <OrbitControls makeDefault />
        <Center>
            <mesh
                geometry={nodes.bakedportalscene.geometry}
                position={nodes.bakedportalscene.position}
                rotation={nodes.bakedportalscene.rotation}>
                <meshBasicMaterial map={ bakedTexture } map-flipY={false} />
            </mesh>
            <mesh
                geometry={nodes.lightglass1.geometry}
                position={nodes.lightglass1.position}
                scale={nodes.lightglass1.scale}>
                <meshBasicMaterial color="#ff6b1a"/>
            </mesh>
            <mesh
                geometry={nodes.lightglass1001.geometry}
                position={nodes.lightglass1001.position}
                scale={nodes.lightglass1001.scale}>
                <meshBasicMaterial color="#ff6b1a"/>
            </mesh>
            <mesh
                geometry={nodes.Circle.geometry}
                position={nodes.Circle.position}
                rotation={nodes.Circle.rotation}
                >
                {<portalMaterial ref={portalMaterial} />}
            </mesh>
            <Sparkles
                size={4}
                scale={[4 , 2 , 4]}
                position-y={1}
                speed={0.3}
                count={30}
                color={"#A3FF6C"}
            />
        </Center>
    </>
}