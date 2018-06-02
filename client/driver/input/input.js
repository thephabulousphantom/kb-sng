import Driver from "../driver.js";
import OnOff from "../../app/onOff.js";

export default class Input extends Driver {

    constructor(name = "Input") {
        
        super(name);
    }

    activate(name, args = undefined) {

        if (!Input.state.has(name)) {

            Input.activated.raise({name, args});
        }

        Input.state.set(name, args ? args : true);
    }

    deactivate(name) {

        if (Input.state.has(name)) {

            Input.deactivated.raise({name});
            Input.state.delete(name);
        }
    }

    tick(name, args) {

        activate(name, args);
        deactivate(name);
    }
};

Input.state = new Map();
Input.activated = new OnOff("Input activated");
Input.deactivated = new OnOff("Input deactivated");

Input.isActive = function(name) {

    return (Input.state.has(name) && Input.state.get(name));
}