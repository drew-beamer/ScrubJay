import { EmbedBuilder } from 'discord.js';

import { convertTimezone } from '@/utils/timezone';

import type { GroupedObservation } from './types';

export function createRareBirdAlertEmbed(
    observation: GroupedObservation
): EmbedBuilder {
    const locationText =
        'Reported at ' +
        (observation.location.isPrivate
            ? 'a private location'
            : `[${observation.location.name}](https://ebird.org/hotspot/${observation.location.id})`);

    const timestampString = convertTimezone(
        observation.reports.latestTimestamp,
        'America/Los_Angeles'
    ).toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    const embed = new EmbedBuilder()
        .setTitle(
            `${observation.species.commonName} - ${observation.location.county}`
        )
        .setURL(`https://ebird.org/checklist/${observation.reports.subId}`)
        .setDescription(`${locationText}\nLatest report: ${timestampString}`)
        .setColor(observation.reports.confirmedLastWeek ? 0x2ecc71 : 0xf1c40f);

    let reportText = `👥 ${observation.reports.count} new report(s); ${
        observation.reports.confirmedLastWeek
            ? 'confirmed at location in the last week'
            : 'unconfirmed at location in the last week'
    }`;

    const mediaTexts: string[] = [];
    if (observation.reports.media.photos > 0)
        mediaTexts.push(`📷 ${observation.reports.media.photos} photo(s)`);
    if (observation.reports.media.audio > 0)
        mediaTexts.push(`🔊 ${observation.reports.media.audio} audio`);
    if (observation.reports.media.video > 0)
        mediaTexts.push(`🎥 ${observation.reports.media.video} video(s)`);

    if (mediaTexts.length > 0) {
        reportText += `\n${mediaTexts.join(' • ')}`;
    }

    embed.addFields({ name: 'Details', value: reportText });

    return embed;
}
