# Moon bot v2

This is a re-write of my (currently) private MoonBot, a bot for Minecraft, specifically 6b6t, that can serve as an automatic delivery bot, a kitbot, and base management bot.

# How to contribute
### Step 1.: Clone the repo
Theres multiple ways to do this, the simplest way if you have git installed is using the clone command:
`` git clone https://github.com/Hekt000r/MoonBotV2 ``
### Step 2.: Install dependencies
Install the dependencies required to run this project using the following command:
`` npm install ``
### Step 3.: Run the bot
There are two ways to do this, one is preferred for development and one for production.
### Method 1 (production)
Since this project uses TypeScript, in order to run it, you have to first compile it using TSC:
`` npx tsc ``
Then, the compiled files will be located in the ``dist`` folder, once you're there simply use ``node index.js`` to start it.
### Method 2 (development)
Using ``ts-node`` and npm scripts, we can easily setup a quick development enviorment so that we dont have to run the compile script and run script seperately, so that one single command will run your application.
The script is already setup, so just use ``npm run dev`` and it will automatically do everything in the background.
