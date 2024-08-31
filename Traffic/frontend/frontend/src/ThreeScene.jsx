// src/ThreeScene.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Box } from "@react-three/drei";
import Car from "./car";
import Car2 from "./car2";
import Car3 from "./car3";
import Car4 from "./car4";
import Road from "./road";

function ThreeScene() {
  return (
    <Canvas style={{ width: "80vw", height: "80vh" }}>
      <PerspectiveCamera makeDefault position={[0, 0, 50]} />
      <ambientLight intensity={1.5} />
      <spotLight position={[0, 10, 10]} angle={0.3} penumbra={1} />{" "}
      <Box>
        <meshStandardMaterial attach="material" color="orange" />
      </Box>
      <Car3 startPosition={{ x: 30, y: -4, z: 0 }} speed={3} checkpointX={10} />
      <Car2 startPosition={{ x: 4, y: 20, z: 0 }} speed={3} checkpointY={10} />
      <Car4
        startPosition={{ x: -4, y: -20, z: 0 }}
        speed={3}
        checkpointY={-10}
      />
      <Car
        startPosition={{ x: -20, y: 7, z: 0 }} // Different start position
        speed={3} // Different speed
        checkpointX={-10} // Same checkpoint
      />
      <Car startPosition={{ x: -30, y: 7, z: 0 }} speed={3} checkpointX={-10} />
      <Road />
      {/* Add more components here */}
    </Canvas>
  );
}

export default ThreeScene;
