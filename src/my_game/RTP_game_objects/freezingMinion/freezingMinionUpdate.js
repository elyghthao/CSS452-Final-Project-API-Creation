"use strict";

import RTPGameObjectState from "../../../../RealTimePauseAPI/RTPGameObjectState.js";
class MinionUpdate extends RTPGameObjectState {
    constructor(mRenderComponent) {
        super(mRenderComponent);
        
    }

    init() {
        //do nothing for now




    }
    update() {
        this.animateObject = true;
        console.log("in freezing minion update");
        //go right
        let xForm = this.mRenderComponent.getXform();
        // xForm.incXPosBy(.05);
        // console.log(this.mRenderComponent.)



    }

}

export default MinionUpdate;