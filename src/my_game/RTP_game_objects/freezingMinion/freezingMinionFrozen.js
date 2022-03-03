"use strict";

import RTPGameObjectState from "../../../../RealTimePauseAPI/RTPGameObjectState.js";
class MinionFrozen extends RTPGameObjectState {
    constructor(mRenderComponent) {
        super(mRenderComponent);
        this.animateObject = false; //STOP ANIMATION
    }

    init() {
        //do nothing for now




    }
    update() {
        //does nothing
        console.log("in freezing minion frozen");
        


    }

}

export default MinionFrozen;