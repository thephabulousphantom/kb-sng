import BinaryControl from "../../app/binaryControl.js";

export default class KeyControl extends BinaryControl {

    constructor(name, code, value = false) {

        if (name.length == 1) {

            name = name.toLocaleUpperCase();
        }

        super(name, "Key", value);

        this.code = code;
    }
}