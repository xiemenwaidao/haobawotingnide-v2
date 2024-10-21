import { useThrottle } from "@hooks/useThrottle";
import type { BoxProps, Quad, Triplet } from "@react-three/cannon";
import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { lightParams, darkParams } from "@utils/const";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCubeStore } from "stores/useGLStore";
import { Box3, Color, Vector3 } from "three";
import type { Group, Mesh, MeshStandardMaterial } from "three";
import type { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    kuang: Mesh;
    neihong: Mesh;
  };
  materials: {
    gold: MeshStandardMaterial;
    neise: MeshStandardMaterial;
  };
};

useGLTF.preload("/assets/model/logocube.glb");

const Model = (props: BoxProps & { mode: "dark" | "light" }) => {
  const { nodes, materials } = useGLTF(
    "/assets/model/logocube.glb"
  ) as GLTFResult;

  const [boxPosition, setBoxPosition] = useState<Triplet>([0, 0, 0]);

  // 物理演算を適用
  const [boxRef, boxApi] = useBox(
    () => ({
      mass: 1,
      material: {
        friction: 0.1, // 摩擦係数,大きいほど摩擦が強い
        restitution: 0.3, // 反発係数
      },
      // angularDamping: 0.1, // 角速度に対するダンピング（減衰）係数
      // linearDamping: 0.9, // 速度に対する線形ダンピング（減衰）係数
      rotation: [
        Math.PI * Math.random(),
        Math.PI * Math.random(),
        Math.PI * Math.random(),
      ],
      args: boxSize,
      ...props,
    }),
    useRef<Group>(null!)
  );

  /** boxの判定を正確にする */
  const boxSize = useMemo(() => {
    const box = new Box3().setFromObject(nodes.kuang);
    const size = new Vector3();
    box.getSize(size);

    // return [size.x, size.y, size.z];
    return size.toArray();
  }, [nodes.kuang]);

  /** dark mode */
  useEffect(() => {
    if (props.mode === "dark") {
      materials.neise.color = new Color(darkParams.cubeColor);
    } else {
      materials.neise.color = new Color(lightParams.cubeColor);
    }
  }, [props.mode]);

  /** 状態管理 */
  const { setPosition, setQuaternion } = useCubeStore();
  // スロットル
  const handlePositionChange = useThrottle((position: Triplet) => {
    setPosition(position);
    setBoxPosition(position);
  }, 100);
  const handleQuaternionChange = useThrottle((quaternion: Quad) => {
    setQuaternion(quaternion);
  }, 100);
  useEffect(() => {
    const positionUnsubscribe = boxApi.position.subscribe(handlePositionChange);

    const quaternionUnsubscribe = boxApi.quaternion.subscribe(
      handleQuaternionChange
    );

    return () => {
      positionUnsubscribe();
      quaternionUnsubscribe();
    };
  }, [boxApi, setPosition, setQuaternion]);

  /** 吹っ飛ばし機能 */
  const onClickHandler = () => {
    // スケーリングファクターを追加して、トルクの大きさを調整
    const torqueScalingFactor = 180;
    //
    const torqueWeight = 0.9;
    // キューブの上方向ベクトル
    const cubeUpDirection = new Vector3(0, 1, 0);

    // キューブの位置から [0, 0, 0] への方向ベクトルを計算
    const directionToOrigin = new Vector3(...boxPosition).negate().normalize();

    // トルクを計算（外積）
    const torque = cubeUpDirection
      .clone()
      .add(
        new Vector3(
          (Math.random() - 0.5) * torqueWeight,
          (Math.random() - 0.5) * torqueWeight,
          (Math.random() - 0.5) * torqueWeight
        )
      )
      .cross(directionToOrigin)
      .normalize() // トルクベクトルを正規化
      .multiplyScalar(torqueScalingFactor)
      .toArray() as Triplet;

    boxApi.applyTorque(torque);
  };

  return (
    <group ref={boxRef} onClick={onClickHandler}>
      <group position={[0, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.kuang.geometry}
          material={materials.gold}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.neihong.geometry}
          material={materials.neise}
        />
      </group>
    </group>
  );
};

export default Model;
