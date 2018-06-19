export default class Control {

    /**
     * Constructs a new control object.
     * 
     * @param name {String} Control name.
     * @param type {String} Control type, e.g. keyboard, mouse, joystick...
     * @param isLocal {Bool} Specifies whether this is local or global control; local controls are never propagated to other application instances.
     */
    constructor(name, type, isLocal = true) {

        this.name = name;
        this.type = type;
        this.isLocal = isLocal;
    }

    /**
     * Returns key under which this control's state is maintained.
     */
    getId() {

        return `$-${this.type}-${this.name}`;
    }
}

/**
 * Gets control ID based on its name and type.
 * 
 * @param name {String} Name of the control whose ID to return.
 * @param type {String} Type of the control whose ID to return.
 */
Control.getId = function(name, type)  {

    return `$-${type}-${name}`;
}