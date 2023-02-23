import { Engine, Scene, ArcRotateCamera,Color3,StandardMaterial,Texture, DirectionalLight, Vector3, HemisphericLight, Mesh, MeshBuilder, SceneLoader } from "@babylonjs/core";

export class Ennemy extends Mesh{
    speed : number = 0.1;

    constructor(scene: Scene){
        super("", scene);
        this.createEnnemy(scene);
        this.move(scene);
    }

    createEnnemy(scene: Scene): void {
        const ennemy = MeshBuilder.CreateBox("ennemy", {height: 1, width: 1, depth: 1}, scene);
        ennemy.position = new Vector3(10, 10, 0);
        ennemy.checkCollisions = true;
        ennemy.ellipsoid = new Vector3(1, 1, 1);
        ennemy.ellipsoidOffset = new Vector3(0, 1, 0);
        ennemy.isPickable = true;
    }

    move(scene: Scene): void{
        const me = scene.getMeshByName("box");
        if(me){
            let e = scene.getMeshByName("ennemy");
            if(!e) return;
            let direction = me.position.subtract(e.position);
            let distance = direction.length();
            let dir = direction.normalize();
            
            let alpha = Math.atan2(-dir.x, -dir.z);
            this.rotation.y = alpha;
            if(distance > 3) {
                //a.restart();   
                e.moveWithCollisions(dir.multiplyByFloats(this.speed, this.speed, this.speed));
        
            }
        }
    }

    
}