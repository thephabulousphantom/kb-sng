import Driver from "../driver.js";
import * as Event from "../../app/event.js";

export default class Video extends Driver {

    /**
     * Constructs a video driver.
     * 
     * @param name {String} Video driver name, if ommited defaults to "Video". 
     */
    constructor(name = "Video") {

        super(name);
    }
}