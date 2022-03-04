"use strict";

import RTPGameObjectState from "../../../../RealTimePauseAPI/RTPGameObjectState.js";
class HeroFrozen extends RTPGameObjectState {
    constructor(mRenderComponent) {
        super(mRenderComponent);
        this.animateObject = false; //STOP ANIMATION
    }

    init() {
        //do nothing for now




    }
    update() {
        //does nothing
        console.log("in freezing hero: frozen");
        this.animateObject = false;


    }

}

export default HeroFrozen;