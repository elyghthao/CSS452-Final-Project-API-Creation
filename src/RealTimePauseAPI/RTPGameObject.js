"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

class RTPGameObject extends engine.GameObject {
    constructor(states) {
        super(null);
        
        this.states = [];//the first state passed in will be the default state, second will be freeze state

        this.currentState = 0;
        this.lastState = 0;
        this.freezeState = false;

        
        this.keyClickedInfo = "";


        this.keyClicked = false;
        this.keyPressed = false;
        this.keyCommand = false;


    }

    update() {
        //check if in frozen state
        if(this.freezeState) {
            this.currentState = 1;
        }

        //check if have left frozen state
        if(!this.freezeState && this.lastState == 1) {
            this.leftFreeze();
        }




        if(this.currentState == 1) {//is currently in frozen state, save input
            this.saveKeyClicked();
            //this.saveKeyPressed();    this is what it would look like with more implementations
            //this.saveCommand();
        }



        if(this.states[this.currentState].isDone) {//when the current state is finished 
            this.pop();
        }

        this.states[this.currentState].update(); //run the update of the current state
        this.lastState = this.currentState;
    }


    leftFreeze() {//has just left frozen state
        if(this.keyClicked) {

        }else if(this.keyPressed){
        }else if(this.keyCommand){
        }
    }


    processKeyClick() { //this object will now process only keyClicked
        this.keyClicked = true;
        this.keyPressed = false;
        this.keyCommand = false;
    }
    saveKeyClicked() {//this will run from update and save all keys clicked into the keyClickedInfo

    }
    readKeyClicked() {//read the first key click and change the state to it
        //get first char from this.keyClickedInfo
        //check if char matches the id of every state through a for loop
    }

    // processKeyPressed() {//this process will now process only keyPressed
        
    // }
    // saveKeyPressed() {

    // }

    

    pop() {
        if(this.keyClicked) {

        }else if(this.keyPressed){
        }else if(this.keyCommand){
        }
    }












}