import PropertyTypes from "./propertyTypes.js";
import State from "./state.js";

export default class Property {

    /**
     * 
     * @param type {int} One of the PropertyTypes constrants
     * @param id {String} id property identifier
     * @param parent {Property} Optional parent property.
     */
    constructor(type, id, parent, value) {

        this._uid = null;
        this._parent = parent;
        this._children = new Map();
        this._dirtyValue = undefined;

        this.type = type;

        this.id = id;

        if (this._parent) {

            this._parent._addChild(this);
        }

        if (value === undefined) {

            switch (this.type) {

                case PropertyTypes.bool: this.value(false); break;
                case PropertyTypes.int: this.value(0); break;
                case PropertyTypes.float: this.value(0.0); break;
                case PropertyTypes.string: this.value(""); break;
                case PropertyTypes.JSON: this.value({}); break;
            }
        }
        else {

            this.value(value);
        }
    }

    _addChild(property) {

        this._children.set(property.id, property);
    }

    _removeChild(property) {

        this._children.delete(property.id);
    }

    get uid() {

        if (this._uid) {

            return this._uid;
        }

        let uid = "";
        let context = this;
        while (context) {

            uid = "-" + context.id + uid;
            context = context._parent;
        }

        return this._uid = "@" + uid;
    }

    parent(parent) {

        if (parent !== undefined) {

            if (this._parent) {

                this._parent._removeChild(this);
            }

            this._uid = null;
            this._parent = parent;

            if (this._parent) {

                this._parent._addChild(this);
            }
        }
        
        return this._parent;
    }

    value(value) {

        // TODO: deal with dirty values nicer (values set while there was no context).
        
        if (!Property.context) {

            if (value !== undefined) {

                this._dirtyValue = value;
            }

            return this._dirtyValue;
        }

        if (this._dirtyValue !== undefined) {

            let dv = this._dirtyValue;
            this._dirtyValue = undefined;
            this.value(dv);
        }

        switch (this.type) {

            case PropertyTypes.bool: return Property.context.bool(this.uid, value);
            case PropertyTypes.int: return Property.context.int(this.uid, value);
            case PropertyTypes.float: return Property.context.float(this.uid, value);
            case PropertyTypes.string: return Property.context.string(this.uid, value);
            case PropertyTypes.JSON: return Property.context.JSON(this.uid, value);
        }

        return undefined;
    }
}

Property.context = null;