'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, MeshDistortMaterial } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

function BlackHole() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  return (
    <group>
      {/* Event Horizon - Black Sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* Accretion Disk */}
      <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.5, 32, 100]} />
        <MeshDistortMaterial
          color="#ff6b00"
          emissive="#ff4500"
          emissiveIntensity={0.5}
          distort={0.8}
          speed={3}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      
      {/* Gravitational Lens Effect */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial 
          color="#4a00e0" 
          transparent 
          opacity={0.1} 
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 2000
  
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const radius = 5 + Math.random() * 15
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI
    
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = radius * Math.cos(phi)
    positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
    
    colors[i3] = 0.6 + Math.random() * 0.4
    colors[i3 + 1] = 0.4 + Math.random() * 0.3
    colors[i3 + 2] = 0.8 + Math.random() * 0.2
  }
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function BlackHoleScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ 
          alpha: false,
          antialias: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ff4500" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4a00e0" />
          
          <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1} 
          />
          
          <ParticleField />
          <BlackHole />
          
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          
          <fog attach="fog" args={['#000000', 10, 25]} />
        </Suspense>
      </Canvas>
    </div>
  )
}
