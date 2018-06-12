export default class State {

    constructor(baseState) {

        this._map = new Map(baseState ? baseState._map : undefined);
    }

    /**
     * Returns true if state contains value for specified key otherwise false.
     * 
     * @param key {String} Key to check.
     */
    has(key) {

        return this._map.has(key);
    }

    /**
     * Gets raw stored value of a key in this state object.
     * 
     * @param key {String} key to retrieve value for.
     * @param def {*} default value to return if there's no value stored for under the key.
     */
    _get(key, def) {

        return this._map.get(key);
    }

    /**
     * Sets raw value of a key in this state object.
     * 
     * @param key {String} key to store raw value for.
     * @param value {*} raw value to set for the key.
     */
    _set(key, value) {

        this._map.set(key, value);
    }

    /**
     * Removes a key and value from state.
     * 
     * @param key {String} key to remove.
     */
    _remove(key) {

        this._map.delete(key);
    }

    /**
     * Gets boolean value of a key in this state object.
     * Explicitly casts the value to a boolean true or false. 
     * 
     * @param key {String} key to set the value for.
     * @param value {Number} If provided, value to set, otherwise value is only retrieved.
     */
    bool(key, value) {

        if (value === undefined) {

            return !!this._get(key, false);
        }

        return this._set(key, !!value);
    }

    /**
     * Gets integer value of a key in this state object.
     * Explicitly casts the value to an integer. 
     * 
     * @param key {String} key to set the value for.
     * @param value {Number} If provided, value to set, otherwise value is only retrieved.
     */
    int(key, value) {

        if (value === undefined) {

            return this._get(key, 0) | 0;
        }

        return this._set(key, (isNaN(value) ? 0 : value) | 0);
    }

    /**
     * Gets floating point value of a key in this state object.
     * Explicitly casts the value to a floating point. 
     * 
     * @param key {String} key to set the value for.
     * @param value {Number} If provided, value to set, otherwise value is only retrieved.
     */
    float(key, value) {

        if (value === undefined) {

            return 1.0 * this._get(key, 0.0);
        }

        return this._set(key, 1.0 * (isNaN(value) ? 0.0 : value));
    }

    /**
     * Gets string value of a key in this state object.
     * Explicitly casts the value to a string. 
     * 
     * @param key {String} key to set the value for.
     * @param value {Number} If provided, value to set, otherwise value is only retrieved.
     */
    string(key, value) {

        if (value === undefined) {

            return "" + this._get(key, "");
        }

        return this._set(key, "" + value);
    }

    /**
     * Gets object value of a key in this state object.
     * Explicitly casts the value to an object, persisted by JSON serialization / deserialization. 
     * 
     * @param key {String} key to set the value for.
     * @param value {Number} If provided, value to set, otherwise value is only retrieved.
     */
    json(key, value) {

        if (value === undefined) {

            return JSON.parse(this._get(key, "{}"));
        }

        return this._set(key, JSON.stringify(value));
    }
}