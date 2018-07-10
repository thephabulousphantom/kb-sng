var log = {
};

class Log {

    /**
     * Constructs a log writer.
     * 
     * @param owner {String} Component owning log entries (all messages will be prefixed with this). 
     */
    constructor(owner) {

        this.owner = owner;
    }

    /**
     * Logs the message of specified severity, but only if
     * provided severity is equal or higher than current Log.severity.
     * 
     * @param severity {Log.severity} Severity of the message to log. 
     * @param message {String} Message to log.
     */
    write(severity, message) {

        if (severity < log.level) {

            return;
        }

        message = new Date().toISOString().replace(/[-]/g, "").replace(/T/g, " ").replace(/[:]/g, "").replace(/Z/g, "") + " " + ("          " + this.owner).slice(-10) + "\t" + message;

        switch (severity) {

            case Log.severity.debug:
                console.debug(message);
                break;

            case Log.severity.info:
                console.info(message);
                break;

            case Log.severity.warning:
                console.warn(message);
                break;

            case Log.severity.error:
                console.error(message);
                break;
        }
    }

    /**
     * Logs a message of debug severity, but only if
     * Log.severity is set to Log.severity.debug or higer.
     * 
     * @param message {String} Message to log.
     */
    debug(message) {

        this.write(Log.severity.debug, message);
    }

    /**
     * Logs a message of info severity, but only if
     * Log.severity is set to Log.severity.info or higer.
     * 
     * @param message {String} Message to log.
     */
    info(message) {

        this.write(Log.severity.info, message);
    }

    /**
     * Logs a message of warning severity, but only if
     * Log.severity is set to Log.severity.warn or higer.
     * 
     * @param message {String} Message to log.
     */
    warn(message) {

        this.write(Log.severity.warning, message);
    }

    /**
     * Logs a message of error severity, but only if
     * Log.severity is set to Log.severity.error or higer.
     * 
     * @param message {String} Message to log.
     */
    error(message) {

        this.write(Log.severity.error, message);
    }
}

Log.severity = {
    debug: 0,
    info: 1,
    warning: 2,
    error: 3
};

Log.level = Log.severity.info;

export default Log;