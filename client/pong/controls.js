import Control from "../control/control.js";
import DigitalControl from "../control/digitalControl.js";
import AnalogControl from "../control/analogControl.js";

export class EnterControl extends DigitalControl {

    constructor(value) {

        super("Enter", "App", false, value);
    }
}

export class PlayerLeftUpControl extends DigitalControl {

    constructor(value) {

        super("PlayerLeftUp", "App", false, value);
    }
}

export class PlayerLeftDownControl extends DigitalControl {

    constructor(value) {

        super("PlayerLeftDown", "App", false, value);
    }
}

export class PlayerRightUpControl extends DigitalControl {

    constructor(value) {

        super("PlayerRightUp", "App", false, value);
    }
}

export class PlayerRightDownControl extends DigitalControl {

    constructor(value) {

        super("PlayerRightDown", "App", false, value);
    }
}