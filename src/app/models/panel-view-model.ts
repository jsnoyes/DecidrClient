import { DestinationModel } from './destination-model';
import { OpenHoursRange } from './open-hours-range';

export class PanelViewModel {
    type!: PanelType;
}

export class MapPanel extends PanelViewModel {
    type = PanelType.map;
    map: string;

    constructor(destination: DestinationModel) {
        super();
        this.map = destination.map;
    }
}

export class DetailPanel extends PanelViewModel {
    type = PanelType.details;
    categories: string;
    openHours: string[];
    name: string;
    address: string;
    phone: string;
    website: string;

    constructor(destination: DestinationModel) {
        super();
        this.categories = destination.categories.join(', ');
        this.phone = destination.phoneNumber;
        this.website = destination.url;
        this.openHours = destination.openHours;
        this.name = destination.name;
        this.address = destination.addressName;
    }
}

export class PicturePanel extends PanelViewModel {
    type = PanelType.picture;
}


export enum PanelType {
    map,
    details,
    picture
}
