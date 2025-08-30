import {
    ActivityType,
    Client,
    Collection,
    Events,
    GatewayIntentBits,
    Partials,
} from 'discord.js';
import { eq } from 'drizzle-orm';

import { commands } from './commands';
import { config } from './config';
import { RareBirdAlert } from './cron/rare-bird-alert';
import db from './utils/database';
import { channelSubscriptions, filteredSpecies } from './utils/database/schema';

const REACTION_THRESHOLD = config.REACTION_THRESHOLD;

interface ClientWithCommands extends Client {
    // biome-ignore lint/suspicious/noExplicitAny: keeping this as any while migrating to effect
    commands: Collection<string, any>;
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
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

client.on(Events.MessageReactionAdd, async (reaction, user) => {
    if (user.bot) return;

    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (err) {
            console.error('Error fetching reaction', err);
            return;
        }
    }

    if (reaction.emoji.name !== '👎' || !reaction.count) return;
    if (reaction.count < REACTION_THRESHOLD) {
        console.log('Reaction count is less than threshold');
        return;
    }

    try {
        const channel = await db
            .select()
            .from(channelSubscriptions)
            .where(
                eq(channelSubscriptions.channelId, reaction.message.channelId)
            )
            .limit(1);
        if (!channel) return;

        if (reaction.message.embeds.length > 0) {
            const embed = reaction.message.embeds[0];
            if (!embed) return;
            const embedTitle = embed.title;
            if (!embedTitle) return;

            const species = embedTitle.split(' - ')[0];
            if (!species) return;

            await db.insert(filteredSpecies).values({
                channelId: reaction.message.channelId,
                commonName: species,
            });

            console.log(
                `${species} has been removed from ${reaction.message.channelId}`
            );
        }
    } catch (err) {
        console.error('Error handling reaction', err);
    }
});

client.on('ready', async () => {
    console.log('Discord bot is ready!');
    client?.user?.setActivity(`for birds`, {
        type: ActivityType.Watching,
    });
    new RareBirdAlert(client);
});

client.login(config.DISCORD_TOKEN);
