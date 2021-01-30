import { OpenHoursRange } from './open-hours-range';
import { VoteModel } from './vote-model';

export interface DestinationModel {
    id: string;
    latitude: number;
    longitude: number;
    addressName: string;
    name: string;
    url: string;
    phoneNumber: string;
    map: string;
    openHours: OpenHoursRange[];
    votes: VoteModel[];
    categories: string[];
}
