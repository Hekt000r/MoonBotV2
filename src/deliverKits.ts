/***********
 * kitOrderHandler.ts
 * Handles sending kits to another player through TPA.
 ***********/
/* Type Imports */
import { Bot } from "mineflayer";

export async function deliverKits(username: string, bot: Bot) {
  bot.chat(`/msg ${username} Hello ${username} i have recieved an order to deliver kits to you. Please accept the TPA request when you recieve it by saying /tpy ${bot.username}.`);
  await bot.waitForTicks(40);
  bot.chat(`/tpa ${username}`);
}
