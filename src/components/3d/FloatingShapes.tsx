import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import type { Mesh } from 'three';

function FloatingBox() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.5}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0}
        />
      </mesh>
    </Float>
  );
}

function FloatingSphere() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1.5} floatIntensity={3}>
      <mesh ref={meshRef} position={[2, 0, 0]} scale={1.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color="#ec4899"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={2} floatIntensity={2.5}>
      <mesh ref={meshRef} position={[-2, 0, 0]} scale={1}>
        <torusGeometry args={[1, 0.4, 16, 32]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.2}
          speed={2}
          roughness={0}
        />
      </mesh>
    </Float>
  );
}

export function FloatingShapes() {
  return (
    <div className="fixed inset-0 -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingBox />
        <FloatingSphere />
        <FloatingTorus />
      </Canvas>
    </div>
  );
}
