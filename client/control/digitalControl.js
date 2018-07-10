import Control from "./control.js";

export default class DigitalControl extends Control {

    /**
     * 
     * @param name {String} Name of the control.
     * @param type {String} Type of the control.
     * @param value {Boolean} Initial value of the control.
     */
    constructor(name, type, value = false) {

        super(name, type)
        
        this.value = !!value;
    }

    clone() {

        let clone = new DigitalControl();

        clone.name = this.name;
        clone.type = this.type;
        clone.value = this.value;

        return clone;
    }
}