"use strict";

import RTPGameObjectState from "../../../../RealTimePauseAPI/RTPGameObjectState.js";
import engine from "../../../../src/engine/index.js";
import FreezingBullet from "../freezingBullet.js/freezingBullet.js";

//move up according to how many distance
class HeroAttack extends RTPGameObjectState {
    constructor(mRenderComponent, speed, stateInfo,bulletSet, id) {
        super(mRenderComponent);
        this.speed = speed;
        this.id = id;
        this.finalY;
        this.animateObject = true;
        this.stateInfo = stateInfo;


        this.interpolateX = null;
        this.interpolateY = null;

        this.newPosition = null;
        this.bulletSet = bulletSet;
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


        let xForm = this.mRenderComponent.getXform();
        // console.log("new position is: " + this.newPosition);
        // console.log("current Position is: " + xForm.getPosition());

        let x,y;
        x = this.newPosition[0];
        y = this.newPosition[1];
        
        

        
        if(Math.abs(xForm.getPosition()[0].toFixed(1)- this.newPosition[0]) < .3 &&
            Math.abs(xForm.getPosition()[1].toFixed(1) - this.newPosition[1]) < .3) {

            let currentDegree = this.mRenderComponent.getXform().getRotationInDegree().toFixed(0);
            // console.log(currentDegree);
            this.mRenderComponent.getXform().incRotationByDegree(10);
            // console.log(xForm.getPosition()[0], xForm.getPosition()[1]);


            if(currentDegree % 40 == 0) {
                let newBullet = new FreezingBullet([xForm.getPosition()[0].toFixed(1),
                 xForm.getPosition()[1].toFixed(1)], this.bulletSet);
                this.bulletSet.push(newBullet);
                // console.log(this.bulletSet.length);
            }
            
            
            
            if(currentDegree > 355) {
                this.pop();
            }
            
        }else {
            // this.mRenderComponent.setColor([1,0,0,1]);
        //moves to where the mouse was
        
        

        this.interpolateX.setFinal(x);
        this.interpolateX.update();
        xForm.setXPos(this.interpolateX.get());

        this.interpolateY.setFinal(y);
        this.interpolateY.update();
        xForm.setYPos(this.interpolateY.get());
        }
    }

    pop(){
        super.pop();
        
    }

}

export default HeroAttack;