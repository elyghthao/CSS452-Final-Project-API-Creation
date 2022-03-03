"use strict";

import engine from "../../../engine/index.js";
import RTPGameObject from "../../../../RealTimePauseAPI/RTPGameObject.js";
import MinionUpdate from "./freezingMinionUpdate.js";
import MinionFrozen from "./freezingMinionFrozen.js";
import MoveUp from "../basicStates/moveUp.js";
import MoveDown from "../basicStates/moveDown.js";
import MoveRight from "../basicStates/moveRight.js";
import MoveLeft from "../basicStates/moveLeft.js";
class FreezingMinion extends RTPGameObject {
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
        this.name = "Freezing Minion";

        //load in the states here
        this.states.push(new MinionUpdate(this.mRenderComponent));
        this.states.push(new MinionFrozen(this.mRenderComponent));
        this.states.push(new MoveUp(this.mRenderComponent,0.5,5,"w"));
        this.states.push(new MoveDown(this.mRenderComponent,0.5,5,"s"));
        this.states.push(new MoveRight(this.mRenderComponent,0.5,5,"d"));
        this.states.push(new MoveLeft(this.mRenderComponent,0.5,5,"a"));
        // console.log(this.mRenderComponent.getXform().getPosition());
        
    }

    
    animate() {
        let cd = performance.now();
        console.log(this.animateObject);
        if(this.animateObject) {
            if(cd-this.start > this.cooldown*1000) {
                this.mRenderComponent.updateAnimation();
                this.start = performance.now();
            }
        }
        
        
    }
}

export default FreezingMinion;