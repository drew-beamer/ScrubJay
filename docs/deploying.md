# Deploying ScrubJay

ScrubJay was originally designed to be deployed for the California region. Upon receiving requests from other regions for a similar service, I have dockerized the application to make it significantly easier to get up and running in a new region.

Please comply with all relevant Terms of Service and API usage policies. eBird has a relatively strict API usage policy, so please be sure to read and comply with their [Terms of Use](https://www.birds.cornell.edu/home/ebird-api-terms-of-use/). A couple notes (up to date as of 2025-01-29):

- eBird API keys cannot be used for commercial purposes (e.g. paid subscription) without prior permission of the Cornell Lab of Ornithology

- Do NOT share your eBird API key with anyone else. This is a violation of the eBird API terms of use, and is just bad practice.

- I've limited the frequency of which the eBird API is called to once every 15 minutes. This is to prevent abuse of the API. I feel that this is a reasonable limit, however this is subject to change. Please note that if you add multiple states/provinces to your subscription, the frequency of which the eBird API is called will be multiplied by the number of states/provinces (e.g., if you have New York, New Jersey, and Pennsylvania, the eBird API will be called 3 times every 15 minutes, tripling the number of requests you are making).

- ScrubJay falls under the "websites/web-based platforms" category of the eBird API terms of use.

Please reach out/open an issue if you are having trouble getting it up and running.

## Prerequisites

- A server with [Docker](https://www.docker.com)
- A Discord server with your bot added as a bot user
- A [Discord bot client id and token](https://discord.com/developers/applications)
- An [eBird API key](https://documenter.getpostman.com/view/664302/S1ENwy59)
- Some knowledge of SQL, although I'll try to make it as easy as possible to set up

## Deploying to a new region

Pull the Docker image from GitHub Container Registry:

```bash
docker pull ghcr.io/drew-beamer/scrubjay-discord:latest
```

Create a volume for the database:

```bash
docker volume create scrubjay
```

Run the container:

```bash
docker run -d \
  --name scrubjay-bot \
  --mount type=volume,src=scrubjay,target=/etc/dbs/scrubjay \
  -e DISCORD_TOKEN="<your-discord-token>" \
  -e DISCORD_CLIENT_ID="<your-discord-client-id>" \
  -e EBIRD_TOKEN="<your-ebird-token>" \
  -e EBIRD_BASE_URL="https://api.ebird.org/v2/" \
  -e DATABASE_URL="/etc/dbs/scrubjay/scrubjay.db" \
  --restart unless-stopped \
  ghcr.io/drew-beamer/scrubjay-discord:latest
```

Congratulations! You've deployed ScrubJay. Now there are a few things you need to do to get it working properly.

### Setting up the database

ScrubJay stores its data in a SQLite database. The database is stored in the `scrubjay` volume. You can access the database using the `sqlite3` command line tool.

```bash
docker exec -it scrubjay-bot sh # enter the container
sqlite3 /etc/dbs/scrubjay/scrubjay.db # access the database
```

#### Setting up channel subscriptions

ScrubJay has a `channel_subscription` table that stores the channels that should receive notifications for particular counties. This model is designed to be as flexible as possible, so you can subscribe to any state/province/county The table has the following columns:

- `channel_id`: The ID of the Discord channel
- `county_code`: The eBird county code
- `state_code`: The eBird state code
- `active`: Whether the subscription is active
- `last_updated`: The last time the subscription was updated

To subscribe to a county, you can use the following SQL command:

```sql
INSERT INTO channel_subscription (channel_id, county_code, state_code, active) VALUES ('<channel-id>', '<county-code>', '<state-code>', 1);
```

To subscribe to a state, you can use the following SQL command:

```sql
INSERT INTO channel_subscription (channel_id, state_code, county_code, active) VALUES ('<channel-id>', '<state-code>', '*', 1); -- '*' is the wildcard character for all counties
```

To temporarily disable a subscription, you can use the following SQL command:

```sql
UPDATE channel_subscription SET active = 0 WHERE channel_id = '<channel-id>';
```

To re-enable a subscription, you can use the following SQL command:

```sql
UPDATE channel_subscription SET active = 1 WHERE channel_id = '<channel-id>';
```

#### Setting up filtering

I would highly recommend setting up filtering if you have state-wide subscriptions. This will prevent spamming your channel with notifications for species that you are not interested in. Sometimes species trip county-level alerts, even if they are not technically rare for the state. I've also designed the filtering system to be as flexible as possible, so you can filter on a per-server/channel basis.

Filters can be voted on by the community. If a species receives 3+ votes, it will be added to the filter for the server/channel. I plan to add a way to configure the minimum number of votes in the future.

Even with voting, I would recommend doing some preliminary, manual filtering. When I set the filter up for the California region, I created a script to compare the California bird list with the state review list. This script is long gone on a laptop I have since reset, but is probably my recommended approach.

To add a filter, you can use the following SQL command:

```sql
INSERT INTO filtered_species (common_name, channel_id) VALUES ('<common-name>', '<channel-id>');
```

To remove a filter, you can use the following SQL command:

```sql
DELETE FROM filtered_species WHERE common_name = '<common-name>' AND channel_id = '<channel-id>';
```

#### Setting up county timezones

This is a relatively simple process. You can add a county timezone by using the following SQL command:

```sql
INSERT INTO county_timezones (county_code, timezone) VALUES ('<county-code>', '<timezone>');
```

The timezones available to use are listed [here](../apps/discord/src/utils/timezone.ts). Please format these exactly as they are listed.
