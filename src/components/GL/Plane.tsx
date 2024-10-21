import type { PlaneProps } from "@react-three/cannon";
import { usePlane } from "@react-three/cannon";
import React from "react";
import { useRef } from "react";
import type { Mesh } from "three";

const Plane = (props: PlaneProps & { color: string }) => {
  const [ref] = usePlane(
    () => ({
      material: {
        friction: 0.2,
        restitution: 0.2, // 反発係数
      },
      rotation: [-Math.PI / 2, 0, 0],
      ...props,
    }),
    useRef<Mesh>(null)
  );
  return (
    <group>
      <mesh ref={ref} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial color={props.color} />
      </mesh>
    </group>
  );
};

export default Plane;
