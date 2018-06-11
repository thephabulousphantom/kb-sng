import Input from "./input.js";
import KeyControl from "./keyControl.js";

export default class Keyboard extends Input {

    constructor(name = "Keyboard") {

        super(name);
    }

    onLoad() {

        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));

        return super.onLoad();
    }

    onUnload() {
        
        document.removeEventListener("keydown", this.onKeyDown.bind(this));
        document.removeEventListener("keyup", this.onKeyUp.bind(this));

        return super.onUnload();
    }

    onKeyDown(evt) {

        super.change(new KeyControl(evt.key, evt.keyCode, true))
    }

    onKeyUp(evt) {

        super.change(new KeyControl(evt.key, evt.keyCode, false))
    }
}