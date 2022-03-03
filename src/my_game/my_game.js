"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";
import Minion from "./objects/minion.js";
class MyGame extends engine.Scene {
    constructor() {
        super();

        // The camera to view the scene
        this.mCamera = null;

        this.mMsg = null;
    
        this.kMinionSprite = "assets/minion_sprite.png";
        this.mMinion = null;
    }
    load() {
        engine.texture.load(this.kMinionSprite);
    }
    unload() {
        engine.texture.unload(this.kMinionSprite);
    }

    init() {
        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(30, 30), // position of the camera
            100,                       // width of camera
            [0, 0, 640, 480]           // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
                // sets the background to gray
    
        this.mMsg = new engine.FontRenderable("Status Message");
        this.mMsg.setColor([0, 0, 0, 1]);
        this.mMsg.getXform().setPosition(-19, -8);
        this.mMsg.setTextHeight(3);

        this.mMinion = new Minion(this.kMinionSprite,-10,20,.2);
    }
    
    
    _drawCamera(camera) {
        camera.setViewAndCameraMatrix();
        this.mMinion.draw(camera);
    }
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
        this.mCamera.setViewAndCameraMatrix();
        
        this.mMsg.draw(this.mCamera);   // only draw status in the main camera
        this._drawCamera(this.mCamera);
        
    }
    
    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update () {
       this.mMinion.update();
        this.mMsg.setText("HI");
    }
}

window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new MyGame();
    myGame.start();
}