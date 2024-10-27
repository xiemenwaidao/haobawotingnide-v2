import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";
import { Physics } from "@react-three/cannon";
import { Color } from "three";
import useMode from "@hooks/useMode";
import Plane from "./Plane";

import Cube from "./Model";
import { darkParams, lightParams } from "@utils/const";
import Lights from "./Lights";

export default function MyGL() {
  const mode = useMode();

  return (
    <Suspense fallback={null}>
      <Canvas
        shadows
        gl={{ alpha: false }}
        camera={{ position: [-5, 10, 5], fov: 50 }}
        onCreated={({ scene }) =>
          (scene.background = new Color(
            mode === "dark" ? darkParams.bgColor : lightParams.bgColor
          ))
        }
      >
        <color
          attach="background"
          args={[mode === "dark" ? darkParams.bgColor : lightParams.bgColor]}
        />
        <Environment preset="sunset" />
        <Lights />

        <Physics broadphase="SAP">
          {/* <Debug color="red" scale={1.1}> */}
          <Plane
            color={mode === "dark" ? darkParams.bgColor : lightParams.bgColor}
          />
          <Cube position={[0, 3, 0]} mode={mode} />
          {/* </Debug> */}
        </Physics>
        {/* <OrbitControls makeDefault />
                <Stats /> */}
      </Canvas>
    </Suspense>
  );
}
