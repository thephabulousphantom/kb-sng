import log from "../app/log.js";
import * as Event from "../app/event.js";
import DriverError from "../error/driverError.js";

export default class Driver {

    constructor(name = "Driver") {
        
        this.name = name;
    }

    onLoad() {

        return true;
    }

    load() {

        if (!this.onLoad()) {

            return false;
        }

        if (Driver.all.has(this.name)) {

            log.warn(`Can't load driver ${this.name} - already loaded.`);

            return false;
        }

        Driver.all.set(this.name, this);

        Event.Global.raise("DriverLoaded", {
            driver: this
        });

        return true;
    }

    onUnload() {

        return true;
    }

    unload() {

        if (!this.onUnload()) {

            return false;
        }

        if (!Driver.all.has(this.name)) {

            throw new DriverError(`Can't unload driver ${this.name} - not loaded.`);
        }

        Driver.all.delete(this.name);

        Event.Global.raise("DriverUnloaded", {
            driver: this
        });

        return true;
    }
};

Driver.all = new Map();

Event.Global.register("DriverLoaded");
Event.Global.register("DriverUnloaded");