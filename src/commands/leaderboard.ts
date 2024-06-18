import {
    APIEmbedField,
    CommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
} from 'discord.js';
import connectToCluster from '../lib/utils/mongo/connect';
import getLeaderboard from '../lib/utils/mongo/aggregation/get-leaderboard';

export const data = new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('View hotspots in CA with the most rare birds seen');

export async function execute(interaction: CommandInteraction) {
    const dbClient = await connectToCluster();
    const leaderboardFields = getLeaderboard(dbClient).then((data) => {
        return data.map(
            (location, index): string =>
                `**${
                    index === 0
                        ? ':first_place:'
                        : index === 1
                          ? ':second_place:'
                          : index === 2
                            ? ':third_place:'
                            : index + 1 + ')'
                }** (${location.count} species) *${location.locInfo.name} (${location.locInfo.county})*`
        );
    });

    const leaderboard = new EmbedBuilder()
        .setColor(0x2856b1)
        .setTitle('California Hotspot Leaderboard')
        .setDescription(
            `By distinct notable species in past week\n${(await leaderboardFields).join('\n')}`
        )
        .setAuthor({ name: 'ScrubJay RBA' });

    return interaction.reply({
        embeds: [leaderboard],
    });
}
