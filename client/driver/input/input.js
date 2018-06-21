import Driver from "../driver.js";
import * as Event from "../../app/event.js";
import Control from "../../control/control.js";

export default class Input extends Driver {

    constructor(name = "Input") {
        
        super(name);
    }

    /**
     * Changes a control.
     * 
     * @param control {Control} Control to change.
     */
    change(control) {

        Input.all.set(control.getId(), control);

        Event.Global.raise("InputChanged", control);
    }

    /**
     * Gets a control.
     * 
     * @param id {String} Id of the control to return.
     */
    get(id) {

        return Input.get(id);
    }

    /**
     * Gets value of a control.
     * 
     * @param id {String} Id of the control whose value to return.
     * @param def {*} Dafault value to return if the control is unknown.
     */
    value(id, def) {

        let control = get(id);
        return control === undefined
            ? def
            : control.value;
    }
};

Input.all = new Map();

Event.Global.register("InputChanged");

/**
 * Gets a control.
 * 
 * @param name {String} Name of the control to return.
 */
Input.get = function(id) {

    if (!Input.all.has(id)) {

        return undefined;
    }
    
    return Input.all.get(id);
}