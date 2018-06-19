import Control from "./control.js";

export default class AnalogControl extends Control {

    /**
     * 
     * @param name {String} Name of the control.
     * @param type {String} Type of the control.
     * @param isLocal {Bool} Specifies whether this is local or global control; local controls are never propagated to other application instances.
     * @param value {Number} Initial value of the control. 
     */
    constructor(name, type, isLocal = true, value = 0.0) {

        super(name, type, isLocal);
        
        this.value = 1.0 * value;
    }
}