import { OpenHoursRange } from './open-hours-range';
import { Review } from './review';
import { VoteModel } from './vote-model';

export interface DestinationModel {
    id: string;
    latitude: number;
    longitude: number;
    addressName: string;
    name: string;
    url: string;
    googleUrl: string;
    phoneNumber: string;
    map: string;
    openHours: string[];
    votes: VoteModel[];
    categories: string[];
    priceLevel: number;
    rating: number;
    reviews: Review[];
}
