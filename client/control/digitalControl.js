import Control from "./control.js";

export default class DigitalControl extends Control {

    /**
     * 
     * @param name {String} Name of the control.
     * @param type {String} Type of the control.
     * @param isLocal {Bool} Specifies whether this is local or global control; local controls are never propagated to other application instances.
     * @param value {Boolean} Initial value of the control.
     */
    constructor(name, type, isLocal = true, value = false) {

        super(name, type, isLocal)
        
        this.value = !!value;
    }
}