import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong & Latency!');

export async function execute(interaction: CommandInteraction) {
  const replyString = `:ping_pong: Pong! Latency: ${
    Date.now() - interaction.createdTimestamp
  }ms`;
  return interaction.reply(replyString);
}
