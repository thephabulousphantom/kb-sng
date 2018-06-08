import Control from "./control.js";

export default class AppControl extends Control {

    constructor(name) {

        super(name, "App");
    }

    getStateKey() {

        return "$." + this.name;
    }
}