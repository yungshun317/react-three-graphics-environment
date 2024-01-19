import {Lightformer, OrbitControls, Sky, Sparkles, Stars, useHelper} from "@react-three/drei";
import {useControls} from "leva";
import {useRef} from "react";
import * as THREE from "three";

const Scene = () => {
    const directionaLight = useRef();
    useHelper(directionaLight, THREE.DirectionalLightHelper, 1);
    console.log(directionaLight);

    const { sunPosition } = useControls("sky", {
        sunPosition: { value: [0, 1, 0] },
    });

    const { meshIntensity } = useControls("meshIntensity", {
        meshIntensity: { value: 1, min: 0, max: 5 },
    });

    return (
        <>
            <ambientLight />
            <directionalLight
                ref={directionaLight} shadow-camera-left={-20}
                castShadow
            />

            <OrbitControls/>

            <Sparkles
                count={300}
                speed={0.2}
                opacity={3}
                color="#68C2ED"
                size={1}
                scale={[10, 10, 10]}
            />

            <Stars
                radius={2}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
            />

            <Sky sunPosition={sunPosition} />

            <mesh position-z={-1} scale={5}>
                <planeGeometry/>
                <meshBasicMaterial color="orange" />
            </mesh>

            <Lightformer position-z={-1} scale={5} color="orange" intensity={5} />

            <mesh castShadow position-y={1}>
                <boxGeometry/>
                <meshStandardMaterial color="#C7CAC7" envMapIntensity={meshIntensity} />
            </mesh>

            <mesh receiveShadow position-y={0} rotation-x={-Math.PI * 0.5}>
                <planeGeometry args={[8, 8]} />
                <meshStandardMaterial color="#CC3941" />
            </mesh>
        </>
    );
}

export default Scene;