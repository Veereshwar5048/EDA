import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { LineChart, BarChart2, ScatterChart, Activity, BrainCircuit } from 'lucide-react';

/* ── CONSTANTS & CONFIG ─────────────────────────────────────────── */
const PARTICLE_COUNT = 400; // Manageable for lines
const DUST_COUNT = 3000;    // Background stars/data
const MAX_DISTANCE = 2.5;   // Line connection threshold

/* ── PLEXUS NETWORK (Particles & Lines) ────────────────────────── */
const PlexusNetwork = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // States: 0 = Chaos (Raw Data), 1 = Network, 2 = Brain Sphere
  const [phase, setPhase] = useState(0);
  const phaseTimer = useRef(0);

  // Generate initial positions and target sets
  const { positions, chaosTargets, brainTargets, velocities } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const chaos = new Float32Array(PARTICLE_COUNT * 3);
    const brain = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Current starting pos (Chaos)
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
      chaos[i * 3] = x; chaos[i * 3 + 1] = y; chaos[i * 3 + 2] = z;

      // Brain sphere targets (Spherical distribution)
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 4 + Math.random() * 1.5; // Radius
      brain[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      brain[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      brain[i * 3 + 2] = r * Math.cos(phi);

      // Random drift velocities
      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return { positions: pos, chaosTargets: chaos, brainTargets: brain, velocities: vel };
  }, []);

  // Line geometry buffer
  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);
  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({ 
    color: 0x6384ff, 
    transparent: true, 
    opacity: 0.15,
    blending: THREE.AdditiveBlending 
  }), []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !linesRef.current) return;

    // Phase management (Loop every ~24 seconds)
    phaseTimer.current += delta;
    if (phaseTimer.current > 24) phaseTimer.current = 0;
    
    let currentTarget = chaosTargets;
    let lerpSpeed = 0.01;
    
    if (phaseTimer.current > 4 && phaseTimer.current < 12) {
      // Transition to Network/Brain
      currentTarget = brainTargets;
      lerpSpeed = 0.02;
    } else if (phaseTimer.current > 16 && phaseTimer.current < 24) {
      // Dissolve back to Chaos
      currentTarget = chaosTargets;
      lerpSpeed = 0.01;
    }

    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;

    // Update positions
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      
      // Drift
      chaosTargets[idx] += velocities[idx];
      chaosTargets[idx+1] += velocities[idx+1];
      chaosTargets[idx+2] += velocities[idx+2];

      // Bounce chaos targets
      if (Math.abs(chaosTargets[idx]) > 15) velocities[idx] *= -1;
      if (Math.abs(chaosTargets[idx+1]) > 15) velocities[idx+1] *= -1;
      if (Math.abs(chaosTargets[idx+2]) > 15) velocities[idx+2] *= -1;

      // Lerp to target
      posArray[idx] += (currentTarget[idx] - posArray[idx]) * lerpSpeed;
      posArray[idx+1] += (currentTarget[idx+1] - posArray[idx+1]) * lerpSpeed;
      posArray[idx+2] += (currentTarget[idx+2] - posArray[idx+2]) * lerpSpeed;
    }
    posAttr.needsUpdate = true;

    // Generate lines
    const linePositions = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = posArray[i*3] - posArray[j*3];
        const dy = posArray[i*3+1] - posArray[j*3+1];
        const dz = posArray[i*3+2] - posArray[j*3+2];
        const distSq = dx*dx + dy*dy + dz*dz;

        // Dynamic distance based on phase
        const currentMaxDist = currentTarget === brainTargets ? 1.5 : MAX_DISTANCE;

        if (distSq < currentMaxDist * currentMaxDist) {
          linePositions.push(
            posArray[i*3], posArray[i*3+1], posArray[i*3+2],
            posArray[j*3], posArray[j*3+1], posArray[j*3+2]
          );
        }
      }
    }

    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    
    // Rotate the whole system slowly
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    linesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    pointsRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    linesRef.current.rotation.z = state.clock.elapsedTime * 0.02;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#a78bfa"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
    </group>
  );
};

/* ── BACKGROUND DUST ───────────────────────────────────────────── */
const Dust = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#22d3ee" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
    </points>
  );
};

/* ── HOLOGRAPHIC CHARTS ────────────────────────────────────────── */
const HolographicPanel = ({ position, icon: Icon, title, value, delay }: any) => {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} position={position}>
      <Html center transform style={{ pointerEvents: 'none' }}>
        <div 
          style={{
            background: 'rgba(10, 15, 30, 0.4)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(99, 132, 255, 0.3)',
            borderRadius: '12px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 0 20px rgba(99, 132, 255, 0.2)',
            color: 'white',
            width: '180px',
            animation: `pulse-opacity 6s ease-in-out infinite ${delay}s`,
            opacity: 0
          }}
        >
          <div style={{ padding: '8px', background: 'rgba(99, 132, 255, 0.2)', borderRadius: '8px' }}>
            <Icon size={18} color="#93a8ff" />
          </div>
          <div>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#93a8ff', letterSpacing: '1px' }}>{title}</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{value}</div>
          </div>
        </div>
      </Html>
    </Float>
  );
};

/* ── MAIN COMPONENT ────────────────────────────────────────────── */
const CinematicBackground = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: '#020408' }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }} dpr={[1, 2]}>
        {/* Lights */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3d5ffc" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7c3aed" />

        <group position={[0, 0, 0]}>
          <PlexusNetwork />
          <Dust />
          
          {/* Holographic Charts positioned around the center */}
          <HolographicPanel position={[-5, 2, 2]} icon={LineChart} title="Loss Curve" value="0.042 ↓" delay={0} />
          <HolographicPanel position={[5, -1, 1]} icon={Activity} title="Accuracy" value="98.4%" delay={2} />
          <HolographicPanel position={[-4, -3, -1]} icon={ScatterChart} title="Clusters" value="K=4" delay={4} />
          <HolographicPanel position={[4, 3, -2]} icon={BrainCircuit} title="Params" value="1.2B" delay={6} />
        </group>
      </Canvas>

      <style>{`
        @keyframes pulse-opacity {
          0%, 100% { opacity: 0.1; transform: scale(0.95); }
          50% { opacity: 0.85; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default CinematicBackground;
