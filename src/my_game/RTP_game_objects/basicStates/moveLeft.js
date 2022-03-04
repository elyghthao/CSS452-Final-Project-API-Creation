"use strict";

import RTPGameObjectState from "../../../../RealTimePauseAPI/RTPGameObjectState.js";


//move up according to how many distance
class MoveLeft extends RTPGameObjectState {
    constructor(mRenderComponent, speed, distance, id) {
        super(mRenderComponent);
        this.speed = speed;
        this.distance = distance;
        this.id = id;
        this.finalX;
        this.animateObject = true;
    }

    init() {
        this.isDone = false;
        let xForm = this.mRenderComponent.getXform();
        this.finalX = xForm.getPosition()[0] - this.distance;
    }
    update() {
        //moves up for a certain duration
        // console.log("in MoveLeft");
        let xForm = this.mRenderComponent.getXform();
        // console.log(xForm.getPosition());
        xForm.incXPosBy(-this.speed);
        if(xForm.getPosition()[0] < this.finalX) {
            this.pop();
        }
    }

}

export default MoveLeft;