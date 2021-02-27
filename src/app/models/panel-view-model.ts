import { DestinationModel } from './destination-model';
import { OpenHoursRange } from './open-hours-range';
import { Review } from './review';

export class PanelViewModel {
    type!: PanelType;
}

export class MapPanel extends PanelViewModel {
    type = PanelType.map;
    map: string;
    pictures: string[];

    constructor(destination: DestinationModel) {
        super();
        this.map = 'data:image/jpeg;base64,' + destination.map;
        this.pictures = destination.photos.map(p => 'data:image/jpeg;base64,' + p);
    }
}

export class DetailPanel extends PanelViewModel {
    type = PanelType.details;
    categories: string | undefined;
    openHours: string[];
    name: string;
    address: string;
    phone: string;
    website: string;
    websiteDisplay: string;
    priceLevel: number;
    rating: number;
    reviews: Review[];

    constructor(destination: DestinationModel) {
        super();
        this.categories = destination.categories && destination.categories.length > 0
            ? destination.categories[0][0].toUpperCase() + destination.categories[0].slice(1)
            : undefined;
        this.phone = destination.phoneNumber;
        this.website = destination.url;
        this.websiteDisplay = this.website.replace('https', '').replace('http', '').replace('://', '').replace('www.', '');
        this.openHours = destination.openHours;
        this.name = destination.name;
        this.address = destination.addressName;
        this.priceLevel = destination.priceLevel;
        this.rating = destination.rating;
        this.reviews = destination.reviews;
    }
}

// export class PicturePanel extends PanelViewModel {
//     type = PanelType.picture;
//     pictures: string[];

//     constructor(pictures: string[]){
//         super();
//         this.pictures = pictures.map(p => 'data:image/jpeg;base64,' + p);
//     }
// }


export enum PanelType {
    map,
    details
}
