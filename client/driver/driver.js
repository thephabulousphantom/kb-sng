import Event from "../app/event.js";
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

            throw new DriverError(`Can't load driver ${this.name} - already loaded.`);
        }

        Driver.all.set(this.name, this);

        Driver.loaded.raise({
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

        Driver.unloaded.raise({
            driver: this
        });

        return true;
    }
};

Driver.all = new Map();
Driver.loaded = new Event("Driver loaded");
Driver.unloaded = new Event("Driver unloaded");
