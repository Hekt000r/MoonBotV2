/*  
    Logger.ts
    This module allows for advanced logging capabilites, specifically
    logging to discord.
*/

export class Logger {
    constructor() {}

    log(input: string) {
        console.log(input) /* Default log function. When the discord bot is finished, this will also log to Discord. */
    }
    warn(input: string) {
        console.warn(input) /* This will put a warning in moonbot discord bot logs. */
    }
    error(input: string) {
        console.error(input) /* This will put an error in moonbot discord bot logs, also pinging developers. */
    }
    logDebug(input?: unknown) { /* This is for debugging, printing values, states, etc. Should be disabled during prod. */
        console.log(input)
    }
}