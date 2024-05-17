import { Client, EmbedBuilder, TextChannel } from 'discord.js';

const MONITOR_CHANNEL = '1152333983124828280';

function alertOnAPIFailure(client: Client, error: Error) {
  console.error(error);
  const embed = new EmbedBuilder()
    .setTitle(':fire: API Failure! :fire:')
    .setDescription(`There was an error with an external API: ${error}`);
  try {
    const channel = client.channels.cache.get(MONITOR_CHANNEL) as TextChannel;
    if (channel) {
        channel.send({embeds: [embed]}) 
    } else {
        throw new Error("Monitor channel could not be found!!!")
    }
  } catch (error) {
    console.error(error)
  }
}

export default alertOnAPIFailure;