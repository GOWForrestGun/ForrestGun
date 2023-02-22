import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, FreeCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, SceneLoader } from "@babylonjs/core";
import "@babylonjs/loaders"


export class FPSCharacter extends Mesh{

    constructor(scene: Scene){
        super("", scene);
        this.createCamera(scene);

        window.addEventListener("keydown", (ev) => {
            console.log("keydown");
            if (ev.key === 'z') {
                console.log("z");
                this.moveWithCollisions(new Vector3(0, 0, -1));
            }
            if (ev.key === 's') {
                this.moveWithCollisions(new Vector3(0, 0, 1));
            }
            if (ev.key === 'q') {
                this.moveWithCollisions(new Vector3(-1, 0, 0));
            }
            if (ev.key === 'd') {
                this.moveWithCollisions(new Vector3(1, 0, 0));
            }
        });
    }

    createCamera(scene: Scene): void {
        var camera = new FreeCamera("camera1", new Vector3(0, 10, -10), scene);
        camera.setTarget(Vector3.Zero());
        camera.minZ = 0.1;
        camera.speed = 0.5;
        // attach the camera to the canvas
        camera.attachControl(scene.getEngine().getRenderingCanvas());
        camera.applyGravity = true;
        camera.checkCollisions = true;
        camera.ellipsoid = new Vector3(1, 1, 1);

        camera.keysUp.push(90); 
        camera.keysDown.push(83);
        camera.keysLeft.push(81);
        camera.keysRight.push(68);
        
    }

}