import {
    ActivityType,
    Client,
    Collection,
    Events,
    GatewayIntentBits,
} from 'discord.js';
import { commands } from './commands';
import { config } from './config';
import { RareBirdAlert } from './lib/rare-bird-alert';

interface ClientWithCommands extends Client {
    commands: Collection<string, any>;
}

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
}) as ClientWithCommands;

client.commands = new Collection();

const keys = Object.keys(commands) as Array<keyof typeof commands>;

keys.forEach((commandName) => {
    const command = commands[commandName];
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(
            `[WARNING] The command ${command} is missing a required "data" or "execute" property.`
        );
    }
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = (interaction.client as ClientWithCommands).commands.get(
        interaction.commandName
    );
    if (!command) {
        console.error(
            `No command matching ${interaction.commandName} was found.`
        );
        return;
    }
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
        }
    }
});

client.on('ready', async () => {
    console.log('Discord bot is ready!');
    client?.user?.setActivity(`for birds`, {
        type: ActivityType.Watching,
    });
});

client.login(config.DISCORD_TOKEN);
