import Control from "./control.js";

export default class AnalogControl extends Control {

    /**
     * 
     * @param name {String} Name of the control.
     * @param type {String} Type of the control.
     * @param value {Number} Initial value of the control. 
     */
    constructor(name, type, value = 0.0) {

        super(name, type);
        
        this.value = 1.0 * value;
    }

    clone() {

        let clone = new AnalogControl();

        clone.name = this.name;
        clone.type = this.type;
        clone.value = this.value;

        return clone;
    }
}