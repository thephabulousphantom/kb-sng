import Input from "./input.js";
import KeyControl from "./keyControl.js";

export default class Keyboard extends Input {

    constructor(name = "Keyboard") {

        super(name);

        this._currentlyDown = {};
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

        let control = new KeyControl(evt.key, evt.keyCode, true);
        if (this._currentlyDown[control.name]) {

            return;
        }

        this._currentlyDown[control.name] = true;

        super.change(control);
    }

    onKeyUp(evt) {

        let control = new KeyControl(evt.key, evt.keyCode, false);
        delete this._currentlyDown[control.name];
        
        super.change(control);
    }
}