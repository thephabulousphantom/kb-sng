export default class Control {

    /**
     * Constructs a new control object.
     * 
     * @param name {String} Control name.
     * @param type {String} Control type, e.g. keyboard, mouse, joystick...
     */
    constructor(name, type) {

        this.name = name;
        this.type = type;
    }

    /**
     * Returns key under which this control's state is maintained.
     */
    getId() {

        return `$-${this.type}-${this.name}`;
    }

    clone() {

        let clone = new Control();
        
        clone.name = this.name;
        clone.type = this.type;
        
        return clone;
    }

    toString() {

        return JSON.stringify(this);
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