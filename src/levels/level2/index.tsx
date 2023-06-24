import React, {useEffect} from "react";
import './styles.sass';
import SceneComponent from "../../SceneComponent";
import {generateLevel2} from "./level_generator";
import {AbstractMesh, Scene, ShadowGenerator} from "@babylonjs/core";

interface Level2Props {
    onFinish: () => void
}

export default function Level2({}: Level2Props) {
    let scene: Scene;

    const onMouseClick = (event: MouseEvent) => {
        if (!scene)
            return;

        const pickResult = scene.pick(event.clientX, event.clientY);
        console.log('Pick: ', pickResult.pickedMesh?.name, pickResult.pickedPoint, pickResult.hit);
    }

    useEffect(() => {
        window.addEventListener('click', onMouseClick);
        return () => window.removeEventListener('click', onMouseClick);
    });

    const onRender = () => {

    }

    return (
        <>
            <div className="level2">
                <SceneComponent
                    onRender={onRender}
                    canvasStyle={{ width: '80%', height: '100%' }}
                    models={[
                        ['/models/', 'dishSink.glb'],
                        ['/models/', 'fridge.glb'],
                        ['/models/', 'fryingPan.glb'],
                        ['/models/', 'kettle.glb'],
                        ['/models/', 'kitchenRoom.glb'],
                    ]}
                    cameraOptions={{
                        xyz: [11, 0, 4],
                        abr: [-1.57, 0, 15],
                        betaLimit: [1.3, 1.3],
                        alphaLimit: [35.5, 35.5]
                    }}
                    levelGenerator={(_scene: Scene,
                                     boxArray: AbstractMesh[],
                                     shadowGenerator: ShadowGenerator) => {
                        scene = _scene;
                        generateLevel2(_scene, boxArray, shadowGenerator);
                    }}
                />
            </div>
        </>
    )
}
