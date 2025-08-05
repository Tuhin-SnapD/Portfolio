"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Box } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5}>
      <meshStandardMaterial
        color="#4338ca"
        wireframe
        transparent
        opacity={0.1}
      />
    </Sphere>
  )
}

function FloatingBoxes() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {[...Array(6)].map((_, i) => (
        <Box
          key={i}
          args={[0.5, 0.5, 0.5]}
          position={[
            Math.sin(i * Math.PI / 3) * 3,
            Math.cos(i * Math.PI / 3) * 3,
            Math.sin(i * Math.PI / 2) * 2,
          ]}
        >
          <meshStandardMaterial
            color={`hsl(${i * 60}, 70%, 60%)`}
            transparent
            opacity={0.3}
            wireframe
          />
        </Box>
      ))}
    </group>
  )
}

export function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedSphere />
        <FloatingBoxes />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
} 