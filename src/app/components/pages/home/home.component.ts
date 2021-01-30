import { Component, OnInit } from '@angular/core';
import { LocationModel } from 'src/app/models/location-model';
import { RoomCriteriaModel } from 'src/app/models/room-criteria-model';
import { LocationService } from 'src/app/services/location.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private selectedLocation: LocationModel | undefined;
  public potentialLocations: LocationModel[] = [];
  public searchString!: string;

  constructor(private locationService: LocationService, private roomService: RoomService) { }

  ngOnInit(): void {
  }

  public searchFromLocation(): void {
    const locObs = this.locationService.GetFromLocations(this.searchString).subscribe(locs => {
      this.potentialLocations = locs;
      locObs.unsubscribe();
    });
  }

  public createRoom(): void {
    if (this.selectedLocation !== undefined){
      const newRoom = this.roomService.CreateRoom(new RoomCriteriaModel(this.selectedLocation, 'RESTAURANT', 700));
    }
    // TODO: redirect to room.
  }
}
