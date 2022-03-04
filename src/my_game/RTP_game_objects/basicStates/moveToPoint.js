"use strict";

import RTPGameObjectState from "../../../../RealTimePauseAPI/RTPGameObjectState.js";
import engine from "../../../../src/engine/index.js";

//move up according to how many distance
class MoveToPoint extends RTPGameObjectState {
    constructor(mRenderComponent, speed, point, id) {
        super(mRenderComponent);
        this.speed = speed;
        this.point = point;
        this.id = id;
        this.finalY;
        this.animateObject = true;


        this.interpolateX = null;
        this.interpolateY = null;
    }

    init() {
        this.isDone = false;
        let xForm = this.mRenderComponent.getXform();
        this.interpolateX = new engine.Lerp(this.mRenderComponent.getXform().getXPos(), 120, this.speed);
        this.interpolateY = new engine.Lerp(this.mRenderComponent.getXform().getYPos(), 120, this.speed);
        
    }
    update() {
        //moves to a point
        let xForm = this.mRenderComponent.getXform();

        let x,y;
        x = this.point[0];
        y = this.point[1];

        this.interpolateX.setFinal(x);
        this.interpolateX.update();
        xForm.setXPos(this.interpolateX.get());

        this.interpolateY.setFinal(y);
        this.interpolateY.update();
        xForm.setYPos(this.interpolateY.get());

        
        if(xForm.getPosition()[0] == this.point[0] && xForm.getPosition == this.point[1]) {
            this.pop();
        }
    }

}

export default MoveToPoint;