import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, FreeCamera, Quaternion, Axis, ActionManager, ExecuteCodeAction, Vector3,FreeCameraGamepadInput, HemisphericLight, Mesh, MeshBuilder, SceneLoader } from "@babylonjs/core";
import { Matrix } from "@babylonjs/core/Maths";
import "@babylonjs/loaders"


export class FPSCharacter extends Mesh{

    character : Mesh;
    camera : FreeCamera;

    constructor(scene: Scene){
        super("character", scene);
        this.character = this.createCharacter(scene);
        this.camera = this.createCamera(scene);
        this.move(scene);
        this.checkCollisions = true;
    }

    move(scene: Scene): void {
        const inputMap: { [key: string]: boolean } = {};
        scene.actionManager = new ActionManager(scene);
        scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));
        scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));

        // Définir la vitesse de déplacement de la sphère
        const speed = 0.1;
        // Mettre à jour la position de la sphère à chaque image
        scene.registerAfterRender(() => {
            // Mettre à jour la position de la sphère en fonction des touches pressées
            let direction = this.camera.getDirection(Axis.Z);

            // Supprimer la composante Y de la direction pour ne pas avoir de mouvement vertical
            direction.y = 0;

            // Normaliser la direction pour avoir un déplacement uniforme
            direction.normalize();
            if (inputMap["z"]) {
                this.character.moveWithCollisions(direction.scale(speed));
            }
            if (inputMap["s"]) {
                this.character.moveWithCollisions(direction.scale(-speed));
            }
            if (inputMap["q"]) {
                this.character.moveWithCollisions(direction.cross(Axis.Y).scale(speed));
            }
            if (inputMap["d"]) {
                this.character.moveWithCollisions(direction.cross(Axis.Y).scale(-speed));
            }
            this.character.moveWithCollisions(new Vector3(0, -0.3, 0));
        });
    }
    

    createCharacter(scene: Scene): Mesh {
        const characterHeight = 1.5;
        const characterWidth = 0.5;
        const characterDepth = 0.5;
        const characterEllipsoid = new Vector3(characterWidth / 2, characterHeight / 4, characterDepth / 2);

        const character = MeshBuilder.CreateBox("box", {height: characterHeight, width: characterWidth, depth: characterDepth}, scene);
        character.position = new Vector3(10, 1, 0);
        character.checkCollisions = true;
        character.ellipsoid = characterEllipsoid;
        character.ellipsoidOffset = new Vector3(0, characterHeight / 4, 0);
        character.isPickable = true;

        return character;
    }

    createCamera(scene: Scene): FreeCamera {
        var camera = new FreeCamera("camera1", new Vector3(0, 1.5, 0), scene);
        camera.inputs.add(new FreeCameraGamepadInput());

        camera.setTarget(Vector3.Zero());
        camera.minZ = 0.1;
        camera.speed = 0.5;
        // attach the camera to the canvas
        camera.attachControl(scene.getEngine().getRenderingCanvas());
        camera.applyGravity = true;
        camera.ellipsoid = new Vector3(1, 1, 1);

        camera.parent = this.character;

        
        camera.rotationQuaternion = Quaternion.Identity();
        this.character.rotationQuaternion = Quaternion.Identity();
        scene.registerBeforeRender(() => {
            this.character.rotation.y = camera.rotation.y;
        });


        return camera;
    }

}