import californiaFilter from './california/ca-rare-bird-filter.js';

const rbaStateData = {
  'US-CA': {
    channelIds: ['1151958598264574002', '1152421317300207637'],
    filteredSpecies: californiaFilter,
    countyRegionMapping: {
      Butte: 'Superior California',
      Colusa: 'Superior California',
      'El Dorado': 'Superior California',
      Glenn: 'Superior California',
      Lassen: 'Superior California',
      Modoc: 'Superior California',
      Nevada: 'Superior California',
      Placer: 'Superior California',
      Plumas: 'Superior California',
      Sacramento: 'Superior California',
      Shasta: 'Superior California',
      Sierra: 'Superior California',
      Siskiyou: 'Superior California',
      Sutter: 'Superior California',
      Tehama: 'Superior California',
      Yolo: 'Superior California',
      Yuba: 'Superior California',
      'Del Norte': 'North Coast',
      Humboldt: 'North Coast',
      Lake: 'North Coast',
      Mendocino: 'North Coast',
      Napa: 'North Coast',
      Sonoma: 'North Coast',
      Trinity: 'North Coast',
      Alameda: 'San Francisco Bay',
      'Contra Costa': 'San Francisco Bay',
      Marin: 'San Francisco Bay',
      'San Francisco': 'San Francisco Bay',
      'San Mateo': 'San Francisco Bay',
      'Santa Clara': 'San Francisco Bay',
      Solano: 'San Francisco Bay',
      Alpine: 'Northern San Joaquin Valley',
      Amador: 'Northern San Joaquin Valley',
      Calaveras: 'Northern San Joaquin Valley',
      Madera: 'Northern San Joaquin Valley',
      Mariposa: 'Northern San Joaquin Valley',
      Merced: 'Northern San Joaquin Valley',
      Mono: 'Northern San Joaquin Valley',
      'San Joaquin': 'Northern San Joaquin Valley',
      Stanislaus: 'Northern San Joaquin Valley',
      Tuolumne: 'Northern San Joaquin Valley',
      Monterey: 'Central Coast',
      'San Benito': 'Central Coast',
      'San Luis Obispo': 'Central Coast',
      'Santa Barbara': 'Central Coast',
      Ventura: 'Central Coast',
      'Santa Cruz': 'Central Coast',
      Fresno: 'Southern San Joaquin Valley',
      Inyo: 'Southern San Joaquin Valley',
      Kern: 'Southern San Joaquin Valley',
      Kings: 'Southern San Joaquin Valley',
      Tulare: 'Southern San Joaquin Valley',
      'Los Angeles': 'Los Angeles',
      'San Bernardino': 'Inland Empire',
      Riverside: 'Inland Empire',
      Orange: 'Orange',
      'San Diego': 'San Diego - Imperial',
      Imperial: 'San Diego - Imperial',
    },
    regionChannelMapping: {
      'San Diego - Imperial': ['1156452037337301003'],
      Orange: ['1156452064625426452'],
      'Los Angeles': ['1156452053145616394'],
      'Inland Empire': ['1156452787492757547'],
      'San Francisco Bay': ['1156452216631197817'],
      'Central Coast': ['1156452330590445649'],
      'Northern San Joaquin Valley': ['1156452103133343814'],
      'Southern San Joaquin Valley': ['1156452147156758589'],
      'Superior California': ['1156452191129841674'],
      'North Coast': ['1156452314236862484'],
    },
  },
};

export default rbaStateData;
