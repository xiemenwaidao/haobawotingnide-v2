import { useHelper } from "@react-three/drei/native";
import React from "react";
import { useCallback, useEffect, useRef } from "react";
import { useCubeStore } from "stores/useGLStore";
import { Quaternion, SpotLight, SpotLightHelper, Vector3 } from "three";

const Lights = () => {
    const ref = useRef<SpotLight>(null!);
    // useHelper(ref, SpotLightHelper);

    // サイコロの情報を取得
    const cubePosition = useCubeStore(state => state.position);
    const cubeQuaternion = useCubeStore(state => state.quaternion);

    // useEffect依存ハック
    const prevCubePosition = useRef(cubePosition);
    const prevCubeQuaternion = useRef(cubeQuaternion);

    const updateLight = useCallback(() => {
        // console.log("update light");
        if (!ref.current) return;

        // サイコロの上面を算出
        const upFaceNormal = new Vector3(0, 1, 0).applyQuaternion(
            new Quaternion(...cubeQuaternion)
        );

        // 位置算出
        const lightOffset = new Vector3(2, 4, 2);
        const lightPosition = new Vector3()
            .addVectors(new Vector3(...cubePosition), upFaceNormal)
            .add(lightOffset);

        ref.current.target.position.set(...cubePosition);
        ref.current.position.set(...lightPosition.toArray());
        ref.current.target.updateMatrixWorld();
    }, [cubePosition, cubeQuaternion]);

    // 最初の一発だけ
    useEffect(() => {
        updateLight();
    }, []);

    useEffect(() => {
        updateLight();

        prevCubePosition.current = cubePosition;
        prevCubeQuaternion.current = cubeQuaternion;
    }, [cubePosition, cubeQuaternion, updateLight]);

    return (
        <>
            <ambientLight intensity={1.0} />
            <spotLight
                position={[0, 0, 0]}
                angle={0.3}
                penumbra={1}
                intensity={2}
                castShadow
                shadow-mapSize-width={256}
                shadow-mapSize-height={256}
                ref={ref}
                color={"#ff0000"}
                distance={10}
            />
        </>
    );
};

export default Lights;
