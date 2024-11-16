export type RegionChannelMapping<Regions extends string> = Record<Regions, string[]>;
export type CountyRegionMapping<Regions extends string> = Record<string, Regions>;

export interface RareBirdAlertConfig<Regions extends string> {
  regionCode: string;
  statewideChannels: string[]
  filteredSpecies: Set<string>;
  regionChannels: RegionChannelMapping<Regions>;
  countyRegions: CountyRegionMapping<Regions>;
}