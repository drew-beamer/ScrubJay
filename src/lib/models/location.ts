export default interface Location {
    _id: string;
    county: string;
    state: string;
    lat: number;
    lng: number;
    name: string;
    isPrivate: boolean;
}
