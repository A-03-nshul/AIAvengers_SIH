// src/TrafficLightDebug.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import TrafficLight from "./trafficLight";
function TrafficLightDebug() {
  return (
    <Canvas style={{ width: "80vw", height: "80vh" }}>
      {/* Basic Camera Setup */}
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      {/* Basic Lighting Setup */}
      <ambientLight intensity={1} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} />

      {/* Traffic Light Only */}
      <TrafficLight />

      {/* Optional: Add a floor or reference object */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[10, 0.1, 10]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </Canvas>
  );
}

export default TrafficLightDebug;
