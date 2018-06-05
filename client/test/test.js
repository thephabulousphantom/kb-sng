import log from "../app/log.js";
import AssertionFailedError from "../error/assertFailed.js";

export function Run(name, testFunction) {

    try
    {
        log.info(`Test: ${name}...`)
        testFunction();
        log.info(`OK.`)
    }
    catch (e) {

        if (e instanceof Error) {

            log.error(`FAILED: ${e.message}`);
            
        }
        else {

            log.error(`FAILED: ${e.toString()}`);
        }
    }
}

export function Assert(condition, description) {

    if (!condition) {

        throw new AssertionFailedError(description);
    }
}