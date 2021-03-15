import { LocationModel } from './location-model';

export class RoomCriteriaModel {
    public FromLatitude: number;
    public FromLongitude: number;
    public FromAddress: string;
    public Category: string;
    public RadiusMeters: number;

    constructor(fromLocation: LocationModel, category: string, radiusMeters: number) {
        this.FromLatitude = fromLocation.latitude;
        this.FromLongitude = fromLocation.longitude;
        this.FromAddress = fromLocation.address;
        this.Category = category;
        this.RadiusMeters = radiusMeters;
    }
}
