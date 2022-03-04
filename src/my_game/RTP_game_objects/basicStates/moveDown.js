"use strict";

import RTPGameObjectState from "../../../../RealTimePauseAPI/RTPGameObjectState.js";


//move up according to how many distance
class MoveDown extends RTPGameObjectState {
    constructor(mRenderComponent, speed, distance, id) {
        super(mRenderComponent);
        this.speed = speed;
        this.distance = distance;
        this.id = id;
        this.finalY;
        this.animateObject = true;
    }

    init() {
        this.isDone = false;
        let xForm = this.mRenderComponent.getXform();
        this.finalY = xForm.getPosition()[1] - this.distance;
    }
    update() {

        
        //moves up for a certain duration
        // console.log("in MoveDown");
        let xForm = this.mRenderComponent.getXform();
        // console.log(xForm.getPosition());
        xForm.incYPosBy(-this.speed);
        if(xForm.getPosition()[1] <= this.finalY) {
            this.pop();
        }
    }

}

export default MoveDown;