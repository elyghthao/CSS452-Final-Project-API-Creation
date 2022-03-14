"use strict";

import RTPGameObjectState from "../../../../RealTimePauseAPI/RTPGameObjectState.js";
import engine from "../../../engine/index.js";
class HeroUpdate extends RTPGameObjectState {
    constructor(mRenderComponent) {
        super(mRenderComponent);
        this.lerpSize = new engine.Lerp(1,120,.1);
        this.shrink = false;
    }

    init() {
        //do nothing for now
    }
    update() {
        this.animateObject = true;
        // console.log("in freezing Hero: update");
        let xForm = this.mRenderComponent.getXform();
        // xForm.incXPosBy(.05);
        this.heroChangeSize();
        this.mRenderComponent.setColor([1,1,1,0]);
    }
    heroChangeSize() {
        // console.log(this.shrink);
        if(this.shrink) {
            this.lerpSize.setFinal(1);
        }else {
            this.lerpSize.setFinal(1.5);
        }
        // console.log(this.mRenderComponent.getXform().getSize()[0]);
        this.lerpSize.update();
        this.mRenderComponent.getXform().setSize(6 * this.lerpSize.get(),
            6* this.lerpSize.get());
        if(this.mRenderComponent.getXform().getSize()[0] >8.8) {
            this.shrink = true;
        }else if(this.mRenderComponent.getXform().getSize()[0] < 6.2) {
            this.shrink = false;
        }
    }
}
export default HeroUpdate;