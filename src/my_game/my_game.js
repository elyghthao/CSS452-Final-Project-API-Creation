"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";
import Minion from "./objects/minion.js";
import FreezingMinion from "./RTP_game_objects/freezingMinion/freezingMinion.js";
class MyGame extends engine.Scene {
    constructor() {
        super();

        // The camera to view the scene
        this.mCamera = null;
        this.mMsg = null;
        this.kMinionSprite = "assets/minion_sprite.png";
        this.mMinion = null;
        this.mNewMinion = null;



        this.mLineSet = [];
        this.mCurrentLine = null;
        this.mP1 = null;

        this.mShowLine = true;

        this.mCurrentLine = null;
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
        this.mCamera.setBackgroundColor([.8, .8, .8, 1]);
                // sets the background to gray
    
        this.mMsg = new engine.FontRenderable("Status Message");
        this.mMsg.setColor([0, 0, 0, 1]);
        this.mMsg.getXform().setPosition(-18, -5);
        this.mMsg.setTextHeight(2.5);

        this.mTopMsg = new engine.FontRenderable("Status Message");
        this.mTopMsg.setColor([0, 0, 0, 1]);
        this.mTopMsg.getXform().setPosition(-18, -2);
        this.mTopMsg.setTextHeight(2.5);


        this.mNewMinion = new FreezingMinion(this.kMinionSprite,-15,60,.2);
        this.mNewMinion.processKeyClicked();
        this.mMinion = new Minion(this.kMinionSprite,-15,0,.2);


        
        



        this.mCurrentLine = new engine.LineRenderable();

    }
    makeLines() {
        this.mCurrentLine.setFirstVertex(30, 30);
        this.mCurrentLine.setPointSize(5.0);
        this.mCurrentLine.setShowLine(true);
        
    }
    
    
    _drawCamera(camera) {
        camera.setViewAndCameraMatrix();
        this.mMinion.draw(camera);
        this.mNewMinion.draw(camera);
    }
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
        this.mCamera.setViewAndCameraMatrix();
        
        
        this._drawCamera(this.mCamera);
        this.mMsg.draw(this.mCamera);   // only draw status in the main camera
        this.mTopMsg.draw(this.mCamera);

        let i, l;
        for (i = 0; i < this.mLineSet.length; i++) {
            l = this.mLineSet[i];
            l.draw(this.mCamera);
        }
        
    }
    
    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update () {
        let msg = "";
        let topmsg = "";

        this.mMinion.update();
        this.mNewMinion.update();

       if(engine.input.isKeyClicked(engine.input.keys.P)){
           this.mNewMinion.freezeState = !this.mNewMinion.freezeState;
       } 
       
        msg = "Minion Input: " + this.mNewMinion.getKeysClickedInfo(); 
        // console.log(this.mNewMinion.getKeysClickedInfo());
        this.mMsg.setText(msg);

        topmsg = "Minion is Paused: " + this.mNewMinion.freezeState;
        this.mTopMsg.setText(topmsg);
    }
}

window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new MyGame();
    myGame.start();
}