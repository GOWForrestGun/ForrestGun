import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera,Color3,StandardMaterial,Texture, DirectionalLight, Vector3, HemisphericLight, Mesh, MeshBuilder, SceneLoader } from "@babylonjs/core";
import "@babylonjs/loaders";
import { Map } from "./map";
import { FPSCharacter } from "./fpsCharacter";
import { Ennemy } from "./ennemy";


class App{


    constructor() {
        // create the canvas html element and attach it to the webpage
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        // initialize babylon scene and engine
        const engine = new Engine(canvas, true);
        const scene = new Scene(engine);

        const framesPerSecond = 60;
        const gravity = -9.81;
        scene.gravity = new Vector3(0, gravity / framesPerSecond, 0);
        scene.collisionsEnabled = true;

        const character = new FPSCharacter(scene);
        console.log(character);
        const map = new Map(scene);
        const ennemy = new Ennemy(scene);
        //new HemisphericLight("hemi", new Vector3(0, 1, 0), scene);
        const light = new DirectionalLight("sunLight", new Vector3(10, -10, 10), scene);
        light.intensity = 1.0; // Intensité de la lumière
        light.diffuse = new Color3(1.0, 1.0, 1.0); // Couleur de la lumière
        light.specular = new Color3(1, 1, 1); // Couleur des reflets


        const skySphere = MeshBuilder.CreateSphere("skySphere", { diameter: 500 }, scene);
        const skySphereMaterial = new StandardMaterial("skySphereMaterial", scene);
        skySphereMaterial.emissiveTexture = new Texture("public/models/sky.jpg", scene);
        //skySphereMaterial.emissiveTexture.coordinatesMode = Texture.SPHERE_MODE;


        scene.onPointerDown = (evt) => {
        if (evt.button === 0) engine.enterPointerlock();
        if (evt.button === 1) engine.exitPointerlock();
        };

        
        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === 'i') {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
            ennemy.move(scene);
        });
    }
}
new App();