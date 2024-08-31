import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

function Car({ startPosition, speed, checkpointX }) {
  const carRef = useRef();
  const texture = useLoader(THREE.TextureLoader, "/models/car-transparent.png");

  // Traffic light states
  const [trafficLightState, setTrafficLightState] = useState("green");
  const [trafficLightStartTime, setTrafficLightStartTime] = useState(
    performance.now()
  );

  // Traffic light timings (in milliseconds)
  const trafficLightDurations = {
    green: 5000, // 5 seconds
    yellow: 2000, // 2 seconds
    red: 3000, // 5 seconds
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
      const currentX = carRef.current.position.x;
      const hasPassedCheckpoint = currentX >= checkpointX;

      if (hasPassedCheckpoint) {
        carRef.current.position.x += speed * 0.01;
      } else {
        if (trafficLightState === "green") {
          carRef.current.position.x += speed * 0.01;
        }
      }
    }
  });

  return (
    <mesh
      ref={carRef}
      position={[startPosition.x, startPosition.y, startPosition.z]}
    >
      <planeGeometry args={[4, 2]} />
      <meshStandardMaterial map={texture} transparent={true} />
    </mesh>
  );
}

export default Car;
