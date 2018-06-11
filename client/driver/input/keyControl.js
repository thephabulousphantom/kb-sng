import DigitalControl from "../../control/digitalControl.js";

export default class KeyControl extends DigitalControl {

    constructor(name, code, value = false) {

        if (name.length == 1) {

            name = name.toLocaleUpperCase();
        }

        super(name, "Key", value);

        this.code = code;
    }
}