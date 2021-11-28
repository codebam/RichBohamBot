import * as path from "path";
import { TextGenerator } from "node-markov-generator";
import { Client, Intents } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const genPath = path.join("sentences.txt");
const generator = new TextGenerator(genPath);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  const { member } = message;

  if (!message.content.startsWith(";")) {
    return false;
  }

  // don't interact with messages from self
  if (member.user.id === "914345569017806858") {
    return false;
  }

  if (message.content.includes("who are you")) {
    await message.reply("I am the esteemed Richie Boham.");
    return true;
  }

  await message.reply(generator.generateSentence());
});

client.login(process.env.TOKEN);
