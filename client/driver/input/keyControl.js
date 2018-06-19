import DigitalControl from "../../control/digitalControl.js";

export default class KeyControl extends DigitalControl {

    constructor(name, code, value = false) {

        if (name.length == 1) {

            if (name === " ") {

                name = "Space";
            }
            else {

                name = name.toLocaleUpperCase();
            }
        }

        super(name, "Key", true, value);

        this.code = code;
    }
}