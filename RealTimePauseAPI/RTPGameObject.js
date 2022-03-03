"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../src/engine/index.js";

class RTPGameObject extends engine.GameObject {
    constructor() {
        super(null);
        
        this.states = [];//the first state passed in will be the default state, second will be freeze state
        this.currentState = 0;//initial update state
        this.lastState = 0;
        this.freezeState = false;

        
        this.keyClickedInfo = [];


        this.keyClicked = false;
        this.keyPressed = false;
        this.keyCommand = false;

        this.animateObject = true;
        this.cooldown = null;
        this.start = performance.now();


    }

    update() {
        //check if in frozen state
        if(this.freezeState) {
            this.currentState = 1;
        }

        //check if have left frozen state
        if(!this.freezeState && this.lastState == 1) {
            this.leftFreeze(); //call leftFreeze()
        }
        if(this.currentState == 1) {//is currently in frozen state, save input
            this.saveKeyClicked();
            //this.saveKeyPressed();    this is what it would look like with more implementations
            //this.saveCommand();
        }
        if(this.states[this.currentState].isDone) {//when the current state is finished 
            this.pop();
        }
        
        this.animateObject = this.states[this.currentState].animateObject;
        this.states[this.currentState].update(); //run the update of the current state
        this.lastState = this.currentState;
        this.animate();
    }
    animate(){}


    leftFreeze() {//has just left frozen state
        if(this.keyClicked) {
            //read what was inputed
            this.readKeyClicked();
        }else if(this.keyPressed){
        }else if(this.keyCommand){
        }
    }


    processKeyClicked() { //this object will now process only keyClicked  CALL THIS IN MYGAME
        this.keyClicked = true;
    }
    saveKeyClicked() {//this will run from update and save all keys clicked into the keyClickedInfo
        console.log(this.keyClickedInfo);
        if(engine.input.isKeyClicked(engine.input.keys.W)) {
            this.keyClickedInfo.push('w');
        }else if(engine.input.isKeyClicked(engine.input.keys.A)) {
            this.keyClickedInfo.push('a');
        }else if(engine.input.isKeyClicked(engine.input.keys.S)) {
            this.keyClickedInfo.push('s');
        }else if(engine.input.isKeyClicked(engine.input.keys.D)) {
            this.keyClickedInfo.push('d');
        }

    }
    readKeyClicked() {//read the first key click and change the state to it
        console.log("READ Key Clicked Info");
        //check if keyClickedInfo is empty, if so, go back to update
        if(this.keyClickedInfo.length == 0) {
            this.currentState = 0;//this is normal update
            return;
        }
        //get first char from this.keyClickedInfo
        let infoID = this.keyClickedInfo[0];
        
        for(let i = 0; i < this.states.length;i ++) {//compare first char with each states' id
            // console.log(infoID);
            console.log(this.states[i].getID())
            if(infoID == this.states[i].getID()) {//if the id's match, make the current state that state
                this.currentState = i;
                this.states[i].init();
                return;
            }


        }
        //if it makes it here, key clicked is does not have an associated state
        this.pop();//just pop it

        

    }
    // freeze() {
    //     this.freezeState = true;
    // }


    // processKeyPressed() {//this process will now process only keyPressed
    // }
    // saveKeyPressed() {
    // }
    // readKeyPressed() {
    // }

    pop() {
        if(this.keyClicked) {
            
            //get rid of first character
            this.keyClickedInfo.shift();
            //run readKeyClicked()
            this.readKeyClicked();
        }else if(this.keyPressed){
        }else if(this.keyCommand){
        }
    }

}

export default RTPGameObject;