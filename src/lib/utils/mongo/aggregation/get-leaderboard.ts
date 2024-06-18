import { MongoClient } from 'mongodb';
import Location from '../../../models/location';

export interface LeaderboardData {
    count: number;
    locInfo: Location;
}

const aggregationPipeline = [
    {
        $group: {
            _id: {
                locId: '$locId',
                speciesCode: {
                    $trim: {
                        input: '$speciesCode',
                        chars: '6',
                    },
                },
            },
        },
    },
    {
        $group: {
            _id: { locId: '$_id.locId' },
            count: { $count: {} },
        },
    },
    { $sort: { count: -1 } },
    { $limit: 10 },
    {
        $lookup: {
            from: 'Locations',
            localField: '_id.locId',
            foreignField: '_id',
            as: 'locInfo',
        },
    },
    { $unwind: { path: '$locInfo' } },
    { $unset: '_id' },
];

export default async function getLeaderboard(dbClient: MongoClient) {
    return dbClient
        .db('ScrubJay')
        .collection('Observations')
        .aggregate<LeaderboardData>(aggregationPipeline)
        .toArray();
}
