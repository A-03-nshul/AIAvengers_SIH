import React, { useState, useEffect } from "react";
import { Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const TrafficSignal = ({ position }) => {
  const [lightColor, setLightColor] = useState("red");
  const [startTime, setStartTime] = useState(performance.now());

  // Traffic light timings (in milliseconds)
  const lightDurations = {
    green: 5000, // 5 seconds
    yellow: 2000, // 2 seconds
    red: 3000, // 3 seconds
  };

  useEffect(() => {
    const updateLightColor = () => {
      const elapsedTime = performance.now() - startTime;

      if (elapsedTime >= lightDurations.green && lightColor === "green") {
        console.log("Switching to yellow");
        setLightColor("yellow");
        setStartTime(performance.now());
      } else if (
        elapsedTime >= lightDurations.yellow &&
        lightColor === "yellow"
      ) {
        console.log("Switching to red");
        setLightColor("red");
        setStartTime(performance.now());
      } else if (elapsedTime >= lightDurations.red && lightColor === "red") {
        console.log("Switching to green");
        setLightColor("green");
        setStartTime(performance.now());
      }
    };

    const intervalId = setInterval(updateLightColor, 100);
    return () => clearInterval(intervalId);
  }, [lightColor, startTime]);

  return (
    <group position={position}>
      {/* Traffic Signal Base */}
      <Box args={[1, 4, 1]} position={[0, 2, 0]}>
        <meshStandardMaterial color="black" />
      </Box>

      {/* Red Light */}
      <Box args={[0.8, 0.5, 0.5]} position={[0, 3.5, 0]}>
        <meshStandardMaterial
          color={lightColor === "red" ? "red" : "darkgray"}
        />
      </Box>

      {/* Yellow Light */}
      <Box args={[0.8, 0.5, 0.5]} position={[0, 2.5, 0]}>
        <meshStandardMaterial
          color={lightColor === "yellow" ? "yellow" : "darkgray"}
        />
      </Box>

      {/* Green Light */}
      <Box args={[0.8, 0.5, 0.5]} position={[0, 1.5, 0]}>
        <meshStandardMaterial
          color={lightColor === "green" ? "green" : "darkgray"}
        />
      </Box>
    </group>
  );
};

export default TrafficSignal;
