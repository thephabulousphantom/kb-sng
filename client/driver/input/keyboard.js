import Input from "./input.js";
 
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

    keyEventToKeyArgs(evt) {

        let keyName = evt.key;
        if (keyName.length == 1) {

            keyName = keyName.toLocaleUpperCase();
        }

        let keyCode = evt.keyCode;

        return {
            name: keyName,
            type: "Keyboard",
            code: keyCode
        };
    }

    onKeyDown(evt) {

        let args = this.keyEventToKeyArgs(evt);
        args.active = true;

        super.activate(args.name, args);
    }

    onKeyUp(evt) {

        let args = this.keyEventToKeyArgs(evt);
        args.active = false;

        super.deactivate(args.name, args);
    }
}