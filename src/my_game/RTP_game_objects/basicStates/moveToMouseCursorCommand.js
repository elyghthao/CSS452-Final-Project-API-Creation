"use strict";

import RTPGameObjectState from "../../../../RealTimePauseAPI/RTPGameObjectState.js";
import engine from "../../../../src/engine/index.js";

//move up according to how many distance
class MoveToMouseCursorCommand extends RTPGameObjectState {
    constructor(mRenderComponent, speed, stateInfo, id) {
        super(mRenderComponent);
        this.speed = speed;
        this.id = id;
        this.finalY;
        this.animateObject = true;
        this.stateInfo = stateInfo;


        this.interpolateX = null;
        this.interpolateY = null;

        this.newPosition = null;
    }

    init() {
        this.isDone = false;
        let xForm = this.mRenderComponent.getXform();
        this.interpolateX = new engine.Lerp(this.mRenderComponent.getXform().getXPos(), 3, this.speed);
        this.interpolateY = new engine.Lerp(this.mRenderComponent.getXform().getYPos(), 3, this.speed);

        this.newPosition = this.stateInfo[1];
        // this.stateInfo.splice(1,1);
        
    }
    update() {


        
        
        this.mRenderComponent.setColor([1,0,0,1]);
        //moves to where the mouse was
        let xForm = this.mRenderComponent.getXform();
        // console.log("new position is: " + this.newPosition);
        // console.log("current Position is: " + xForm.getPosition());

        let x,y;
        x = this.newPosition[0];
        y = this.newPosition[1];
        

        this.interpolateX.setFinal(x);
        this.interpolateX.update();
        xForm.setXPos(this.interpolateX.get());

        this.interpolateY.setFinal(y);
        this.interpolateY.update();
        xForm.setYPos(this.interpolateY.get());

        // console.log(xForm.getPosition()[0]);
        if(Math.abs(xForm.getPosition()[0]- this.newPosition[0]) < .3 &&
            Math.abs(xForm.getPosition()[1] - this.newPosition[1]) < .3) {
            // console.log("POP");
            // this.stateInfo.splice(1,1);
            this.pop();
            
        }
    }

    pop(){
        super.pop();
        
    }

}

export default MoveToMouseCursorCommand;