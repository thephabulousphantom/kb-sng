import Driver from "../driver.js";
import Control from "../../app/control.js";
import OnOff from "../../app/onOff.js";

export default class Input extends Driver {

    constructor(name = "Input") {
        
        super(name);
    }

    /**
     * Marks a control as active.
     * 
     * @param control {Control} Control to mark active.
     */
    activate(control) {

        if (!Input.activeControls.has(control.name)) {

            Input.activated.raise(control);
        }

        Input.activeControls.set(control.name, control);
    }

    /**
     * Marks a control as inactive.
     * 
     * @param control {Control} Control to mark inactive.
     */
    deactivate(control) {

        if (Input.activeControls.has(control.name)) {

            Input.deactivated.raise(control);
            Input.activeControls.delete(control.name);
        }
    }

    /**
     * Briefly marks a control as active, then as inactive again.
     * 
     * @param control {Control} Control to tick.
     */
    tick(control) {

        activate(control);
        deactivate(control);
    }
};

Input.activeControls = new Map();
Input.activated = new OnOff("Input activated");
Input.deactivated = new OnOff("Input deactivated");

Input.isActive = function(name) {

    return (Input.activeControls.has(name) && Input.activeControls.get(name));
}