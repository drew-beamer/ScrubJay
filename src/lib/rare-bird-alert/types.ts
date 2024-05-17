import { RareBirdAlertFilter } from '../filters/types';

export type RegionChannelMapping<Regions extends string> = Record<Regions, string[]>;
export type CountyRegionMapping<Regions extends string> = Record<string, Regions>;

export interface RareBirdAlertConfig<Regions extends string> {
  regionCode: string;
  statewideChannels: string[]
  filteredSpecies: RareBirdAlertFilter;
  regionChannels: RegionChannelMapping<Regions>;
  countyRegions: CountyRegionMapping<Regions>;
}