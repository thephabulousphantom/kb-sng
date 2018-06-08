import Control from "../../app/control.js";

export default class KeyControl extends Control {

    constructor(name, code) {

        if (name.length == 1) {

            name = name.toLocaleUpperCase();
        }

        super(name, "Key");

        this.code = code;
    }
}