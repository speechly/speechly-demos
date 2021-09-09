import { Entity } from "@speechly/react-client";
interface EntityMap {
    [name: string]: string;
}
/**
 * Format entities to a key value object
 * @param {array} entities
 * @return {object} key value object.
 */
export declare const formatEntities: (entities: Entity[]) => EntityMap;
export {};
