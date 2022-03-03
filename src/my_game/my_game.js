"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

import Minion from "./game_objects/minion.js";

class MyGame extends engine.Scene {
    constructor() {
        super();

        // The camera to view the scene
        this.mCamera = null;
        // this.kMinionSprite = "assets/SpriteSheet.png";
        this.kMinionSprite = "./assets/SpriteSheet.png";
        
        
        this.mMinion = null;
        this.init();
    }

    load() {
        
        engine.texture.load(this.kMinionSprite);
    }

    unload() {
        engine.texture.unload(this.kMinionSprite);
    }
        
    init() {
        
        this.mCamera = new engine.Camera(
            vec2.fromValues(30, 27.5), // position of the camera
            100,                       // width of camera
            [0, 0, 640, 480]           // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
        
        this.mMinion = new Minion(this.kMinionSprite);
    }
    
    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
        this.mCamera.setViewAndCameraMatrix();
        this.mMinion.draw(this.mCamera);
    }
    
    // The Update function, updates the application state. Make sure to _NOT_ draw
    update () {
        //Object is moving right
        
        
        //enter freeze state
        //enter input
        //exit freeze state
        //object does what freeze state described

        console.log("HI");

        
    }
}

window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new MyGame();
    myGame.start();
}