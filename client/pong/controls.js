import Control from "../control/control.js";
import DigitalControl from "../control/digitalControl.js";
import AnalogControl from "../control/analogControl.js";

export class PlayerLeftUpControl extends DigitalControl {

    constructor(value) {

        super("PlayerLeftUp", "App", value);
    }
}

export class PlayerLeftDownControl extends DigitalControl {

    constructor(value) {

        super("PlayerLeftDown", "App", value);
    }
}

export class PlayerRightUpControl extends DigitalControl {

    constructor(value) {

        super("PlayerRightUp", "App", value);
    }
}

export class PlayerRightDownControl extends DigitalControl {

    constructor(value) {

        super("PlayerRightDown", "App", value);
    }
}