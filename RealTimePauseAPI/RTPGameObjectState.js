"use strict";


const kAbstractClassError = new Error("Abstract Class")
const kAbstractMethodError = new Error("Abstract Method")


class RTPGameObjectState {
    constructor(isFreeze = false) {
        this.isFreeze = isFreeze;       //this is true if this state is a freeze state
        this.timeDuration = -1;         //duration of state, is negative one if doesnt apply
        this.isDone = false;
        this.id = "";
    }
    init(){
    }

    update() {
    }

    pop() {

    }




}