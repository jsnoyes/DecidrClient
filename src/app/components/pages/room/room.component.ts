import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinationModel } from 'src/app/models/destination-model';
import { DetailPanel, MapPanel, PanelViewModel, PicturePanel, ReviewPanel } from 'src/app/models/panel-view-model';
import { PanelType } from 'src/app/models/panel-view-model';
import { RoomModel } from 'src/app/models/room-model';
import { RoomService } from 'src/app/services/room.service';
import { MenuItem } from 'primeng/api/menuitem';
import { PictureComponent } from '../../shared/picture/picture.component';


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
  public panels: PanelViewModel[] | any;
  public picturePanels: PicturePanel[] | any;
  public panelTypes = PanelType;
  public menuItems!: MenuItem[];
  public responsiveOptions: any[];


  constructor(private route: ActivatedRoute, private roomService: RoomService) {
    this.responsiveOptions = [
      {
          breakpoint: '1100px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '800px',
          numVisible: 1,
          numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('roomId') || '0';
    this.roomService.Room.subscribe(r => this.room = r);
    this.roomService.ActiveDestination.subscribe(d => {
      if (d == null) {
        return;
      }
      this.activeDestination = d;
      const picturePanels = d.photos.map(p => new PicturePanel(p));
      this.panels = [new MapPanel(d), new DetailPanel(d), new ReviewPanel(d.reviews)];
      this.picturePanels = picturePanels;
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
