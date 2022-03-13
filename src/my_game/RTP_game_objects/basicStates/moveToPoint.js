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
        this.interpolateX = new engine.Lerp(this.mRenderComponent.getXform().getXPos(), 3, this.speed);
        this.interpolateY = new engine.Lerp(this.mRenderComponent.getXform().getYPos(), 3, this.speed);
        
    }
    update() {


        // this.mRenderComponent.setColor([1,0,0,1]);
        //moves to a point
        let xForm = this.mRenderComponent.getXform();
        // console.log("MOVING TO: " + this.point);

        let x,y;
        x = this.point[0];
        y = this.point[1];

        this.interpolateX.setFinal(x);
        this.interpolateX.update();
        xForm.setXPos(this.interpolateX.get());

        this.interpolateY.setFinal(y);
        this.interpolateY.update();
        xForm.setYPos(this.interpolateY.get());

        // console.log(xForm.getPosition()[0]);
        if(Math.abs(xForm.getPosition()[0]- this.point[0]) < .3 &&
            Math.abs(xForm.getPosition()[1] - this.point[1]) < .3) {
            // console.log("POP");
            this.pop();
            
        }
    }

    pop(){
        super.pop();
        
    }

}

export default MoveToPoint;