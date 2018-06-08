import Control from "../app/control.js";
import BinaryControl from "../app/binaryControl.js";
import AnalogControl from "../app/analogControl.js";

export class PlayerLeftUpControl extends BinaryControl {

    constructor(value) {

        super("PlayerLeftUp", "App", value);
    }
}

export class PlayerLeftDownControl extends BinaryControl {

    constructor(value) {

        super("PlayerLeftDown", "App", value);
    }
}

export class PlayerRightUpControl extends BinaryControl {

    constructor(value) {

        super("PlayerRightUp", "App", value);
    }
}

export class PlayerRightDownControl extends BinaryControl {

    constructor(value) {

        super("PlayerRightDown", "App", value);
    }
}