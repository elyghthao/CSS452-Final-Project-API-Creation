"use strict";

import engine from "../../../engine/index.js";
import RTPGameObject from "../../../../RealTimePauseAPI/RTPGameObject.js";

import HeroUpdate from "./freezingHeroUpdate.js";
import HeroFrozen from "./freezingHeroFrozen.js";
import MoveToPoint from "../basicStates/moveToPoint.js";
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


            
    }


}

export default FreezingHero;