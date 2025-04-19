/*  
    Logger.ts
    This module allows for advanced logging capabilites, specifically
    logging to discord.
*/

export class Logger {
    constructor() {}

    log(input?: unknown) {
        console.log(input) /* Default log function. When the discord bot is finished, this will also log to Discord. */
    }
    warn(input?: unknown) {
        console.error(input) /* This will put an error in moonbot discord bot logs, also pinging developers. */
    }
    error(input?: unknown) {
        console.error(input) /* This will put an error in moonbot discord bot logs, also pinging developers. */
    }
}