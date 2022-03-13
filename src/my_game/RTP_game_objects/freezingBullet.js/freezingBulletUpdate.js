"use strict";

import RTPGameObjectState from "../../../../RealTimePauseAPI/RTPGameObjectState.js";
class FreezingBulletUpdate extends RTPGameObjectState {
    constructor(mRenderComponent, bulletSet, bullet) {
        super(mRenderComponent);
        this.xValue =  (Math.random() * 2) - 1;
        this.yValue = (Math.random() * 2) - 1;

        this.bulletSet = bulletSet;

        this.bullet = bullet;

    }

    init() {
        //do nothing for now




    }
    update() {
        this.animateObject = true;
        // console.log("in freezing minion update");
        //go right
        let xForm = this.mRenderComponent.getXform();
        // xForm.incXPosBy(.05);
        // console.log("In Freezing bullent update");
        xForm.incXPosBy(this.xValue);
        xForm.incYPosBy(this.yValue);

        // console.log(this.bulletSet.length);

        if(xForm.getPosition()[0] > 80 || xForm.getPosition()[0] < -20 
         || xForm.getPosition()[1] > 70 || xForm.getPosition()[1] < -20) {
             const index = this.bulletSet.indexOf(this.bullet);
             this.bulletSet.splice(index,1);
         }
    }

}

export default FreezingBulletUpdate;