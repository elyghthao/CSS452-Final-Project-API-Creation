"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../src/engine/index.js";

class RTPGameObject extends engine.GameObject {
    constructor() {
        super(null);
        
        this.states = [];//the first state passed in will be the default state, second will be freeze state
        this.currentState = 0;//initial update state
        this.lastState = 0;
        this.freezeState = false;


        this.stateInfo = [];


        this.keyClicked = false;
        this.keyPressed = false;
        this.keyCommand = false;
        this.animateObject = true;
        this.cooldown = null;
        this.start = performance.now();
    }

    isFrozen() {
        return this.currentState == 1;
    }

    update() {
        //check if in frozen state
        // console.log("current state is: " + this.currentState);
        if(this.freezeState) {
            this.currentState = 1;
        }

        //check if have left frozen state
        if(!this.freezeState && this.lastState == 1) {
            this.leftFreeze(); //call leftFreeze()
        }
        if(this.currentState == 1) {//is currently in frozen state, save input
            if(this.keyClicked) {
                this.saveKeyClicked();
            } 
            if(this.keyPressed) {
                this.saveKeyPressed();
            }
            // if(this.keyCommand) {
            //     this.saveCommand();
            // }
            // this.saveCommand();
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
        // if(this.keyClicked) {
        //     //read what was inputed
        //     this.readInfo();
        // }else if(this.keyPressed){
        // }else if(this.keyCommand){
        // }
        this.readInfo();
    }


    processKeyClicked() { //this object will now process only keyClicked  CALL THIS IN MYGAME
        this.keyClicked = true;
    }
    
    processKeyPressed() {
        this.keyPressed = true;
    }
    
    processCommands() {
        this.keyCommand = true;
    }

    insertCommand(c){
        this.stateInfo.push(c);
    }


    saveKeyClicked() {//this will run from update and save all keys clicked into the keyClickedInfo
        // console.log(this.keyClickedInfo);
        if(engine.input.isKeyClicked(engine.input.keys.W)) {
            this.stateInfo.push('w');
        }else if(engine.input.isKeyClicked(engine.input.keys.A)) {
            this.stateInfo.push('a');
        }else if(engine.input.isKeyClicked(engine.input.keys.S)) {
            this.stateInfo.push('s');
        }else if(engine.input.isKeyClicked(engine.input.keys.D)) {
            this.stateInfo.push('d');
        }else if(engine.input.isKeyClicked(engine.input.keys.Zero)){
            this.stateInfo.push('0');
        }else if(engine.input.isKeyClicked(engine.input.keys.One)) {
            this.stateInfo.push('1');
        }else if(engine.input.isKeyClicked(engine.input.keys.Two)){
            this.stateInfo.push('2');
        }else if(engine.input.isKeyClicked(engine.input.keys.Three)){
            this.stateInfo.push('3');
        }else if(engine.input.isKeyClicked(engine.input.keys.Four)){
            this.stateInfo.push('4');
        }else if(engine.input.isKeyClicked(engine.input.keys.Five)){
            this.stateInfo.push('5');
        }else if(engine.input.isKeyClicked(engine.input.keys.Six)){
            this.stateInfo.push('6');
        }else if(engine.input.isKeyClicked(engine.input.keys.Seven)){
            this.stateInfo.push('7');
        }else if(engine.input.isKeyClicked(engine.input.keys.Eight)){
            this.stateInfo.push('8');
        }else if(engine.input.isKeyClicked(engine.input.keys.Nine)){
            this.stateInfo.push('9');
        }

    }

    saveKeyPressed() {//process keypressed goes here
        //key pressed is identifed by !
        if(engine.input.isKeyPressed(engine.input.keys.W)) {
            this.stateInfo.push('!w');
        } else if(engine.input.isKeyPressed(engine.input.keys.A)) {
            this.stateInfo.push('!a');
        } else if(engine.input.isKeyPressed(engine.input.keys.S)) {
            this.stateInfo.push('!s');
        } else if(engine.input.isKeyPressed(engine.input.keys.D)) {
            this.stateInfo.push('!d');
        } else if(engine.input.isKeyPressed(engine.input.keys.Zero)){
            this.stateInfo.push('!0');
        } else if(engine.input.isKeyPressed(engine.input.keys.One)) {
            this.stateInfo.push('!1');
        } else if(engine.input.isKeyPressed(engine.input.keys.Two)){
            this.stateInfo.push('!2');
        } else if(engine.input.isKeyPressed(engine.input.keys.Three)){
            this.stateInfo.push('!3');
        } else if(engine.input.isKeyPressed(engine.input.keys.Four)){
            this.stateInfo.push('!4');
        } else if(engine.input.isKeyPressed(engine.input.keys.Five)){
            this.stateInfo.push('!5');
        } else if(engine.input.isKeyPressed(engine.input.keys.Six)){
            this.stateInfo.push('!6');
        } else if(engine.input.isKeyPressed(engine.input.keys.Seven)){
            this.stateInfo.push('!7');
        } else if(engine.input.isKeyPressed(engine.input.keys.Eight)){
            this.stateInfo.push('!8');
        } else if(engine.input.isKeyPressed(engine.input.keys.Nine)){
            this.stateInfo.push('!9');
        }
        
    }

    readInfo() {//read the first key click and change the state to it //readInfo
        // console.log("READ Key Clicked Info");
        //check if keyClickedInfo is empty, if so, go back to update
        if(this.stateInfo.length == 0) {
            this.currentState = 0;//this is normal update
            return;
        }
        //get first char from this.keyClickedInfo
        let infoID = this.stateInfo[0];
        
        for(let i = 0; i < this.states.length;i ++) {//compare first char with each states' id
            // console.log(infoID);
            // console.log(this.states[i].getID())
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
        // if(this.keyClicked) {
            
        //     //get rid of first character
        //     this.stateInfo.shift();
        //     //run readInfo()
        //     this.readInfo();
        // }else if(this.keyPressed){
        // }else if(this.keyCommand){
        // }
        this.stateInfo.shift();
        this.readInfo();
    }

    getKeysClickedInfo() {
        return this.stateInfo;
    }

}

export default RTPGameObject;