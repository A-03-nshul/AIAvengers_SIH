import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

function Road() {
  // Load the texture
  //public\models\finalroadinter.webp
  const texture = useLoader(THREE.TextureLoader, "/models/finalroadinter.webp");

  // Reference to the plane mesh
  const planeRef = useRef();

  return (
    <mesh ref={planeRef} rotation={[0, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[70, 50]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default Road;
