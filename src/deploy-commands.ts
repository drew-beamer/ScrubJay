import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import { config } from './config';

const { DISCORD_CLIENT_ID, DISCORD_TOKEN } = config;

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  rest.put(Routes.applicationCommands(DISCORD_CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}
