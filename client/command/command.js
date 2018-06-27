export default class Command {

    /**
     * Constructs a command.
     * 
     * @param name {String} Command name 
     * @param byAuthority {Boolean} Specifies whether the command was issued by authority.
     */
    constructor(name, byAuthority = false) {

        this.name = name;
        this.byAuthority = byAuthority;
    }
}