"use strict";

import engine from "../../engine/index.js";

class Minion extends engine.GameObject {
    constructor(spriteTexture, atX, atY, cooldown) {
        super(null);
        this.kDelta = 0.3;

        this.mRenderComponent = new engine.SpriteAnimateRenderable(spriteTexture);
        this.mRenderComponent.setColor([1, 1, 1, 0]);
        this.mRenderComponent.getXform().setPosition(atX, atY);
        this.mRenderComponent.getXform().setSize(-8, 6);
        this.mRenderComponent.setSpriteSequence(512, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
            204, 164,   // width x height in pixels
            5,          // number of elements in this sequence
            0);   

        this.cooldown = cooldown;
        this.start = performance.now();
        this.animateLegs = true;
    }

    update() {
        let xForm = this.mRenderComponent.getXform();
        xForm.incXPosBy(0.05);
        this.animate();
        // xForm.incXPosBy(.005);
        if(this.mRenderComponent.getXform().getPosition()[0] > 80) {
            xForm.setPosition(-20,xForm.getPosition()[1]);
        }
        
    }

    animate() {
        let cd = performance.now();

        if(this.animateLegs) {
            if(cd-this.start > this.cooldown*1000) {
                this.mRenderComponent.updateAnimation();
                this.start = performance.now();
            }
        }
        
        
    }
}

export default Minion;