"use strict";

import engine from "../../../engine/index.js";
import RTPGameObject from "../../../../RealTimePauseAPI/RTPGameObject.js";

import HeroUpdate from "./freezingHeroUpdate.js";
import HeroFrozen from "./freezingHeroFrozen.js";
import MoveToPoint from "../basicStates/moveToPoint.js";
import MoveUp from "../basicStates/moveUp.js";
import MoveDown from "../basicStates/moveDown.js";
import MoveRight from "../basicStates/moveRight.js";
import MoveLeft from "../basicStates/moveLeft.js";
import MoveToMouseCursorCommand from "../basicStates/moveToMouseCursorCommand.js";
class FreezingHero extends RTPGameObject {
    constructor(spriteTexture,atX, atY, ){
        super(null);
            this.mRenderComponent = new engine.SpriteAnimateRenderable(spriteTexture);
            this.mRenderComponent.setColor([1, 1, 1, 0]);
            this.mRenderComponent.getXform().setPosition(atX, atY);
            this.mRenderComponent.getXform().setSize(6, 6);
            this.mRenderComponent.setSpriteSequence(180, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
            150, 164,   // width x height in pixels
            0,          // number of elements in this sequence
            0); 
            this.name = "freezing hero";
            this.states.push(new HeroUpdate(this.mRenderComponent));
            this.states.push(new HeroFrozen(this.mRenderComponent));
            this.states.push(new MoveToPoint(this.mRenderComponent, .1, [30,30], "1"));
            this.states.push(new MoveToPoint(this.mRenderComponent, .1, [40,20], "2"));
            this.states.push(new MoveToPoint(this.mRenderComponent, .1, [40,60], "3"));
            this.states.push(new MoveToPoint(this.mRenderComponent, .1, [23,0], "4"));
            this.states.push(new MoveToMouseCursorCommand(this.mRenderComponent, .1, this.stateInfo,"MoveToMouse"));

            
            // this.states.push(new MoveUp(this.mRenderComponent,0.5,10,"w"));
            // this.states.push(new MoveDown(this.mRenderComponent,0.5,10,"s"));
            // this.states.push(new MoveRight(this.mRenderComponent,0.5,10,"d"));
            // this.states.push(new MoveLeft(this.mRenderComponent,0.5,10,"a")); 
    }
}

export default FreezingHero;