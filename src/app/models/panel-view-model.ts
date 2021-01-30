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
    openHours: OpenHoursRange[] | undefined;
    name: string;
    address: string;
    phone: string;
    website: string;

    constructor(destination: DestinationModel) {
        super();
        this.categories = destination.categories.join(', ');
        this.phone = destination.phoneNumber;
        this.website = destination.url;
        // this.openHours = destination.openHours;
        if (destination.openHours) {
            destination.openHours.forEach(o => {
                o.day = new Date(o.fromTime).toLocaleDateString([], { weekday: 'long' });
                o.open = new Date(o.fromTime).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true});
                o.close = new Date(o.toTime).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true});
            });
            const curDay = new Date().getDay();
            const newArr: OpenHoursRange[] = [];
            ([curDay, curDay + 1, curDay + 2, curDay + 3, curDay + 4, curDay + 5, curDay + 6]).forEach(d => {
                const dDay = d % 7;
                const existing = destination.openHours.find(h => new Date(h.fromTime).getDay() === dDay);
                if (existing) {
                    newArr.push(existing);
                } else {
                    const date = new Date();
                    date.setDate(date.getDate() + d);
                    newArr.push({day: date.toLocaleDateString([], { weekday: 'long' }), open: 'Closed', close: 'Closed',
                        fromTime: date, toTime: date});
                }
            });
            this.openHours = newArr;
        }
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
