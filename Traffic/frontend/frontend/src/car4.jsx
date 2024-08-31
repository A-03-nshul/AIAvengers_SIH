import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

function Car4({ startPosition, speed, checkpointY }) {
  const carRef = useRef();
  const texture = useLoader(THREE.TextureLoader, "/models/car3.gif");

  // Traffic light states
  const [trafficLightState, setTrafficLightState] = useState("red");
  const [trafficLightStartTime, setTrafficLightStartTime] = useState(
    performance.now()
  );

  // Traffic light timings (in milliseconds)
  const trafficLightDurations = {
    green: 5000, // 5 seconds
    yellow: 2000, // 2 seconds
    red: 5000, // 5 seconds
  };

  // Update traffic light state based on time
  useEffect(() => {
    const updateTrafficLightState = () => {
      const currentTime = performance.now();
      const elapsedTime = currentTime - trafficLightStartTime;

      if (
        elapsedTime >= trafficLightDurations.green &&
        trafficLightState === "green"
      ) {
        setTrafficLightState("yellow");
        setTrafficLightStartTime(currentTime);
      } else if (
        elapsedTime >= trafficLightDurations.yellow &&
        trafficLightState === "yellow"
      ) {
        setTrafficLightState("red");
        setTrafficLightStartTime(currentTime);
      } else if (
        elapsedTime >= trafficLightDurations.red &&
        trafficLightState === "red"
      ) {
        setTrafficLightState("green");
        setTrafficLightStartTime(currentTime);
      }
    };

    const intervalId = setInterval(updateTrafficLightState, 100);
    return () => clearInterval(intervalId);
  }, [trafficLightState, trafficLightStartTime]);

  useFrame(() => {
    if (carRef.current) {
      const currentY = carRef.current.position.y;
      const hasPassedCheckpoint = currentY >= checkpointY;

      if (hasPassedCheckpoint) {
        carRef.current.position.y += speed * 0.01;
      } else {
        if (trafficLightState === "green") {
          carRef.current.position.y += speed * 0.01;
        }
      }
    }
  });

  return (
    <mesh
      ref={carRef}
      position={[startPosition.x, startPosition.y, startPosition.z]}
    >
      <planeGeometry args={[4, 4]} />
      <meshStandardMaterial map={texture} transparent={true} />
    </mesh>
  );
}

export default Car4;
