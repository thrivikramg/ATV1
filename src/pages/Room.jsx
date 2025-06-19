import React from 'react';
import { useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Experience } from '../components/Experience';

export default function Room() {
  const { roomId } = useParams();

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Room Code Display */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 10,
          padding: '10px 16px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '1rem',
          userSelect: 'text',
        }}
      >
        Room Code: {roomId || 'N/A'}
      </div>

      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
        <color attach="background" args={['#ececec']} />
        <Experience roomId={roomId} />
      </Canvas>
    </div>
  );
}
