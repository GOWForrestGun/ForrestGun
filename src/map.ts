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

    async CreateMap(scene: Scene): Promise<void> {
        const {meshes} = await SceneLoader.ImportMeshAsync("", "./models/", "mapForrestGun.glb", scene);
        meshes.map((mesh) => {
            mesh.checkCollisions = true;
        })
        
    }

}