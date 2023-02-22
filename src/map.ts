import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, SceneLoader } from "@babylonjs/core";
import "@babylonjs/loaders"


export class Map extends Mesh {

    constructor(scene: Scene) {
        super("", scene);
        this.CreateMap(scene);
    }

    CreateMap(scene: Scene): void {
        SceneLoader.ImportMesh("", "./models/", "mapForrestGun.glb", scene, (meshes) => {
            console.log("meshes",meshes);
            meshes.forEach((mesh) => {
                mesh.checkCollisions = true;
            });
            
        });
    }

}