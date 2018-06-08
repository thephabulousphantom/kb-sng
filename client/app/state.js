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
     * Gets value of a key in this state object.
     * 
     * @param key {String} key to retrieve value for.
     */
    get(key) {

        return this._map.get(key);
    }

    /**
     * Sets value of a key in this state object.
     * 
     * @param key {String} key to set the value for. 
     * @param value {*} value to set. 
     */
    set(key, value) {

        return this._map.set(key, value);
    }

    bool(key, value) {

        if (typeof(value) === undefined) {

            return !!this.get(key);
        }

        return this.set(key, !!value);
    }

    int(key, value) {

        if (typeof(value) === undefined) {

            return this.get(key) | 0;
        }

        return this.set(key, value | 0);
    }

    float(key, value) {

        if (typeof(value) === undefined) {

            return 1.0 * this.get(key);
        }

        return this.set(key, 1.0 * value);
    }

    string(key, value) {

        if (typeof(value) === undefined) {

            return "" + this.get(key);
        }

        return this.set(key, "" + value);
    }

    object(key, value) {

        if (typeof(value) === undefined) {

            return this.get(key);
        }

        return this.set(key, value);
    }
}