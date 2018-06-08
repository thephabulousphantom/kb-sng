import Control from "./control.js";

export default class AnalogControl extends Control {

    constructor(name, type, value = 0.0) {

        super(name, type);
        
        this.value = value;
    }
}