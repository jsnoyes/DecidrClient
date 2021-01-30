import { LocationModel } from './location-model';

export class RoomCriteriaModel {
    public FromLatitude: number;
    public FromLongitude: number;
    public FromAddress: string;
    public Category: string;
    public RadiusMeters: number;

    constructor(fromLocation: LocationModel, category: string, radiusMeters: number) {
        this.FromLatitude = fromLocation.Latitude;
        this.FromLongitude = fromLocation.Longitude;
        this.FromAddress = fromLocation.Address;
        this.Category = category;
        this.RadiusMeters = radiusMeters;
    }
}
