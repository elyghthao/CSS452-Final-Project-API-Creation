"use strict";

import engine from "../../../engine/index.js";
import RTPGameObject from "../../../../RealTimePauseAPI/RTPGameObject.js";
import MinionFrozen from "../freezingMinion/freezingMinionFrozen.js";
import FreezingBulletUpdate from "./freezingBulletUpdate.js";
class FreezingBullet extends RTPGameObject {
    constructor(position, bulletSet) {
        super(null);

        this.bulletSet = bulletSet;
        this.kMinionSprite = "assets/minion_sprite.png"
        this.mRenderComponent = new engine.SpriteRenderable(this.kMinionSprite);
        
        this.position = position;

        this.setupSpriteTransform(position);
        this.states.push(new FreezingBulletUpdate(this.mRenderComponent, this.bulletSet, this));
        this.states.push(new MinionFrozen(this.mRenderComponent));

        // console.log(this.bulletSet.length);
        
    }

    
    setupSpriteTransform(aStartingPosition) {
        this.mRenderComponent.getXform().setSize(2, 3.25);
        this.mRenderComponent.getXform().setRotationInDegree(90);
        this.mRenderComponent.getXform().setPosition(aStartingPosition[0], aStartingPosition[1]);
        this.position = [aStartingPosition[0], aStartingPosition[1]]
        this.mRenderComponent.setElementPixelPositions(500, 597, 22, 162);
    }
    
    
}
export default FreezingBullet;