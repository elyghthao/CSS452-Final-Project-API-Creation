"use strict";


const kAbstractClassError = new Error("Abstract Class")
const kAbstractMethodError = new Error("Abstract Method")


class RTPGameObjectState {
    constructor(mRenderComponent) {
        this.isFreeze = false;       //this is true if this state is a freeze state
        this.timeDuration = -1;         //duration of state, is negative one if doesnt apply
        this.isDone = false;
        this.id = "";
        this.mRenderComponent = mRenderComponent;
    }
    init(){//set id in init
        this.isDone = false;
    }

    update() {
    }

    pop() {
        this.isDone = true;
    }
    getID() {
        return this.id;
    }
}
export default RTPGameObjectState;