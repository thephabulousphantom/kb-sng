import Control from "./control.js";

export default class BinaryControl extends Control {

    constructor(name, type, value = false) {

        super(name, type)
        
        this.value = !!value;
    }
}