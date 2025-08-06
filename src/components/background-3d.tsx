"use client"

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Box } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

// Performance detection
function usePerformanceMode() {
  const [isLowPerformance, setIsLowPerformance] = useState(false)
  
  useEffect(() => {
    // Check for mobile devices or low-end GPUs
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
    
    setIsLowPerformance(isMobile || isLowEnd)
  }, [])
  
  return isLowPerformance
}

function AnimatedSphere({ isLowPerformance }: { isLowPerformance: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Reduce animation intensity for better performance
      const speed = isLowPerformance ? 0.005 : 0.01
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      meshRef.current.rotation.y += speed
    }
  })

  // Reduce polygon count for better performance
  const segments = isLowPerformance ? [1, 32, 32] : [1, 64, 64]

  return (
    <Sphere ref={meshRef} args={segments} scale={2}>
      <meshStandardMaterial
        color="#4338ca"
        wireframe
        transparent
        opacity={0.08}
      />
    </Sphere>
  )
}

function FloatingBoxes({ isLowPerformance }: { isLowPerformance: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Reduce animation intensity
      const speed = isLowPerformance ? 0.3 : 0.5
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed) * 0.2
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.15
    }
  })

  // Reduce number of boxes for better performance
  const boxCount = isLowPerformance ? 3 : 6

  return (
    <group ref={groupRef}>
      {[...Array(boxCount)].map((_, i) => (
        <Box
          key={i}
          args={[0.4, 0.4, 0.4]}
          position={[
            Math.sin(i * Math.PI / (boxCount / 2)) * 2.5,
            Math.cos(i * Math.PI / (boxCount / 2)) * 2.5,
            Math.sin(i * Math.PI / 2) * 1.5,
          ]}
        >
          <meshStandardMaterial
            color={`hsl(${i * (360 / boxCount)}, 70%, 60%)`}
            transparent
            opacity={0.25}
            wireframe
          />
        </Box>
      ))}
    </group>
  )
}

export function Background3D() {
  const isLowPerformance = usePerformanceMode()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Delay loading to improve initial page load
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ 
          antialias: !isLowPerformance,
          powerPreference: "high-performance",
          alpha: true 
        }}
        dpr={isLowPerformance ? 1 : window.devicePixelRatio}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <AnimatedSphere isLowPerformance={isLowPerformance} />
        <FloatingBoxes isLowPerformance={isLowPerformance} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={isLowPerformance ? 0.3 : 0.5}
        />
      </Canvas>
    </div>
  )
} 