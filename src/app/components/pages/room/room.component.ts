import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinationModel } from 'src/app/models/destination-model';
import { DetailPanel, MapPanel, PanelViewModel } from 'src/app/models/panel-view-model';
import { PanelType } from 'src/app/models/panel-view-model';
import { RoomModel } from 'src/app/models/room-model';
import { RoomService } from 'src/app/services/room.service';
import { MenuItem } from 'primeng/api/menuitem';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RoomComponent implements OnInit {

  private roomId!: string;
  private room: RoomModel | null | undefined;
  public activeDestination: DestinationModel | undefined;
  public isLoading = true;
  // public panels: PanelViewModel[] | any;
  // public picturePanels: PicturePanel[] | any;
  public mapPanel: MapPanel | any;
  public detailsPanel: DetailPanel | any;
  public panelTypes = PanelType;
  public menuItems!: MenuItem[];
  // public responsiveOptions: any[];


  constructor(private route: ActivatedRoute, private roomService: RoomService) {
    // this.responsiveOptions = [
    //   {
    //       breakpoint: '1100px',
    //       numVisible: 2,
    //       numScroll: 2
    //   },
    //   {
    //       breakpoint: '800px',
    //       numVisible: 1,
    //       numScroll: 1
    //   }
    // ];
  }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('roomId') || '0';
    this.roomService.Room.subscribe(r => this.room = r);
    this.roomService.ActiveDestination.subscribe(d => {
      if (d == null) {
        return;
      }
      this.activeDestination = d;
      this.mapPanel = new MapPanel(d);
      this.detailsPanel = new DetailPanel(d);
      // const picturePanels = d.photos.map(p => new PicturePanel(p));
      // this.panels = [new MapPanel(d), new DetailPanel(d)];
      // this.picturePanels = picturePanels;
    });
    this.roomService.IsLoading.subscribe(i => this.isLoading = i);
    this.roomService.GetRoom(this.roomId);

    this.menuItems = [
      {
          label: 'Downvote',
          icon: 'pi pi-fw pi-plus',
          command: this.downvote
      },
      {
          label: 'Upvote',
          icon: 'pi pi-fw pi-pencil',
          command: this.upvote
      }
    ];
  }

  private upvote(): void{

  }

  private downvote(): void{

  }

}
