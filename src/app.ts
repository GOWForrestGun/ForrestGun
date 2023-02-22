import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, SceneLoader } from "@babylonjs/core";
import "@babylonjs/loaders"
import { Map } from "./map";


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

        this.CreateCamera(scene);
        const map = new Map(scene);
        new HemisphericLight("hemi", new Vector3(0, 1, 0), scene);

        scene.onPointerDown = (evt) => {
        if (evt.button === 0) engine.enterPointerlock();
        if (evt.button === 1) engine.exitPointerlock();
        };

        const framesPerSecond = 60;
        const gravity = -9.81;
        scene.gravity = new Vector3(0, gravity / framesPerSecond, 0);
        scene.collisionsEnabled = true;
        //add sphere to scene in 0 0 0

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
        });
    }

    CreateCamera(scene: Scene): void {
        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        var camera = new ArcRotateCamera("camera1", 0, 0, 10, new Vector3(0, 0, 0), scene);
        // target the camera to scene origin
        camera.setTarget(Vector3.Zero());
        // attach the camera to the canvas
        camera.attachControl(scene.getEngine().getRenderingCanvas(), true);
    }
}
new App();