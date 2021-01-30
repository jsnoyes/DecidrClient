import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinationModel } from 'src/app/models/destination-model';
import { DetailPanel, MapPanel, PanelViewModel, PicturePanel } from 'src/app/models/panel-view-model';
import { PanelType } from 'src/app/models/panel-view-model';
import { RoomModel } from 'src/app/models/room-model';
import { RoomService } from 'src/app/services/room.service';
import { CarouselModule } from 'primeng/carousel';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  private roomId!: string;
  private room: RoomModel | null | undefined;
  public activeDestination: DestinationModel | undefined;
  public isLoading = true;
  private activePanel = 0;
  public panels: PanelViewModel[] | any;
  public panelTypes = PanelType;


  constructor(private route: ActivatedRoute, private roomService: RoomService) { }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('roomId') || '0';
    this.roomService.Room.subscribe(r => this.room = r);
    this.roomService.ActiveDestination.subscribe(d => {
      if (d == null) {
        return;
      }
      this.activeDestination = d;
      this.panels = [new MapPanel(d), new DetailPanel(d), new PicturePanel(), new PicturePanel(), new PicturePanel()];
      this.activePanel = 0;
    });
    this.roomService.IsLoading.subscribe(i => this.isLoading = i);
    this.roomService.GetRoom(this.roomId);
  }

}
