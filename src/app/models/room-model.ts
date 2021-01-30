import { DestinationModel } from './destination-model';
import { RoomCriteriaModel } from './room-criteria-model';

export interface RoomModel {
    id: string;
    criteria: RoomCriteriaModel;
    potentialDestinations: DestinationModel[];
}
