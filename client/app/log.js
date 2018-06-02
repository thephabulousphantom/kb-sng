var log = {

    severity: {
        debug: 0,
        info: 1,
        warning: 2,
        error: 3
    },

    level: 1,
    
    write: function write(severity, message) {

        if (severity < log.level) {

            return;
        }

        switch (severity) {

            case log.severity.debug:
                console.debug(message);
                break;

            case log.severity.info:
                console.info(message);
                break;

            case log.severity.warning:
                console.warn(message);
                break;

            case log.severity.error:
                console.error(message);
                break;
        }
    },

    debug: function debug(message) {

        this.write(log.severity.debug, message);
    },

    info: function info(message) {

        this.write(log.severity.info, message);
    },

    warn: function warn(message) {

        this.write(log.severity.warning, message);
    },

    error: function error(message) {

        this.write(log.severity.error, message);
    }
};

export default log;