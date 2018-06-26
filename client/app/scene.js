import log from "./log.js";

import App from "./app.js";

import ApplicationError from "../error/applicationError.js";

import State from "../state/state.js";
import Entity from "../state/entity.js";
import Command from "../command/command.js";
import AddEntity from "../command/addEntity.js";
import RemoveEntity from "../command/removeEntity.js";

export default class Scene {

    /**
     * Constructs a screen.
     * @param name {String} Name of this scene.
     * @param app {App} Parent app that this scene belongs to.
     */
    constructor(name, app) {

        log.info(`Constructing scene ${name}...`);

        this.name = name;
        this.app = app;
        this.entities = {};
    }

    /**
     * Initializes this scene - called just before the scene starts.
     * 
     * @param state {State} Current app state.
     */
    init(state) {

        log.info(`Initializing scene ${this.name}...`);
        
        state.string("scene", this.name);
    }

    /**
     * Cleans-up this scene - called just before the scene ends.
     * @param state {State} Current app state.
     */
    cleanup(state) {

        log.info(`Cleaning up scene ${this.name}...`);
        
        state.string("scene", null);
    }

    /**
     * Provides an opportunity for a screen to process a command.
     * 
     * @param state {State} Current app state to apply the command to.
     * @param command {Command} Command to apply to the state.
     */
    processCommand(state, command) {
        
    }

    /**
     * Provides an opportunity for a screen to process a frame.
     * 
     * @param state {State} Current app state to apply the frame logic to.
     */
    processFrame(state) {

    }

    /**
     * Adds an entity to the scene.
     * 
     * @param entity {Entity} Entity to add to the scene. 
     */
    addEntity(entity) {

        if (this.entities[entity.uid]) {

            throw new ApplicationError(`Can't add entity ${entity.uid}, it's already on the scene ${this.name}`);
        }

        entity.scene = this;
        this.entities[entity.uid] = entity;

        this.app.issueCommand(new AddEntity(entity));

        return entity;
    }

    /**
     * Removes an entity from the scene.
     * 
     * @param entity {Entity} Entity to remove from the scene. 
     */
    removeEntity(entity) {

        if (!this.entities[entity.uid]) {

            throw new ApplicationError(`Can't remove entity ${entity.uid}, it's not on the scene ${this.name}`);
        }

        this.app.issueCommand(new RemoveEntity(entity));

        let removedEntity = this.entities[entity.uid]; 
        removedEntity.scene = null;

        delete this.entities[entity.uid];

        return removedEntity;
    }

    /**
     * Gets an entity that was previous added, based on its name.
     * @param name {String} Name of the entity to get.
     * @returns {Entity} Entity.
     */
    getEntity(name) {

        if (this.entities[name]) {

            return this.entities[name];
        }

        return null;
    }
}