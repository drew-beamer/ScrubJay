/**
 * @fileoverview This file contains the functions that generate the embeds for the
 * rare bird alert functionality.
 */

import { Client, EmbedBuilder, TextChannel } from 'discord.js';
import { RecentNotableObservation } from '../utils/mongo/aggregation/get-sightings';
import { convertTimezone } from './timezone';

/**
 * Generates a description for a RecentNotableObservation
 * @param observation
 * @returns
 */
function generateDescription(observation: RecentNotableObservation) {
    const { comName, locId } = observation._id;
    const { name } = observation.location;
    const { numNewObs, previousConfirmed } = observation;
    const aOrAn = comName[0].match('^[aieouAIEOU].*') ? 'An' : 'A';
    let description = `${aOrAn} ${comName} was`;
    if (Math.max(...observation.howMany) > 1) {
        description = `${Math.max(...observation.howMany)} ${comName} were`;
    }
    if (observation.location.isPrivate) {
        description += ` reported at a personal location`;
    } else {
        description += ` reported at [${name}](https://ebird.org/hotspot/${locId})`;
    }
    description += `\n:alarm_clock: latest report at ${convertTimezone(observation.mostRecentTime, 'America/Los_Angeles')}`;
    description += `\n:eyes: - ${numNewObs} new report(s)`;
    if (previousConfirmed) {
        description += `\n:white_check_mark: - Confirmed at location in last week`;
    } else {
        description += `\n:question: - Not confirmed at location in last week`;
    }
    const photos = observation.evidence.filter((e) => e === 'P').length;
    const audio = observation.evidence.filter((e) => e === 'A').length;

    if (photos > 0 && audio > 0) {
        description += `\n:camera: - ${photos} photo(s), ${audio} recording(s)`;
    } else if (photos > 0) {
        description += `\n:camera: - ${photos} photo(s)`;
    } else if (audio > 0) {
        description += `\n:microphone2: - ${audio} recording(s)`;
    }
    return description;
}

/**
 * Generates an embed for a RecentNotableObservation.
 * @param observation - A RecentNotableObservation object, as defined in typedefs.js.
 * @returns
 */
function generateEmbed(observation: RecentNotableObservation) {
    const { comName } = observation._id;
    const { county } = observation.location;
    const description = generateDescription(observation);
    const builder = new EmbedBuilder()
        .setColor(observation.previousConfirmed ? 0x32cd32 : 0xffff00)
        .setTitle(`${comName} - ${county}`)
        .setAuthor({ name: 'ScrubJay RBA' })
        .setURL(`https://ebird.org/checklist/${observation.newChecklists[0]}`)
        .setDescription(description);
    return builder;
}

/**
 * Generates an array of embeds for a list of new observations.
 * @param groupedObservations
 */
export function generateEmbeds(observations: RecentNotableObservation[]) {
    const observationsToSend: EmbedBuilder[] = [];
    observations.forEach((observation) => {
        console.log(observation);
        const embed = generateEmbed(observation);
        console.log(
            'Successfully generated embed for',
            observation._id.comName
        );
        observationsToSend.push(embed);
    });
    return observationsToSend;
}

/**
 *
 * @param client
 * @param {Array.<EmbedBuilder>} observations
 * @param {Array.<string>} channels
 */
export async function sendEmbeds(
    client: Client,
    embeds: EmbedBuilder[],
    channels: string[]
) {
    channels.forEach((channelId) => {
        try {
            const channel = client.channels.cache.get(channelId) as TextChannel;
            embeds.forEach((embed) => {
                setTimeout(() => {
                    try {
                        channel.send({ embeds: [embed] });
                    } catch (err) {
                        console.log('Missing perms!');
                    }
                }, 500);
            });
        } catch (err) {
            console.log(err);
        }
    });
}
