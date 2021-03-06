import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinationModel } from 'src/app/models/destination-model';
import { DetailPanel, MapPanel, PanelViewModel } from 'src/app/models/panel-view-model';
import { PanelType } from 'src/app/models/panel-view-model';
import { RoomModel } from 'src/app/models/room-model';
import { RoomService } from 'src/app/services/room.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RoomComponent implements OnInit {

  private roomId!: string;
  public room: RoomModel | null | undefined;
  public isLoading = true;
  public isVoteLoading = false;
  public mapPanel: MapPanel | any;
  public detailsPanel: DetailPanel | any;
  public panelTypes = PanelType;
  public displayDialog = false;
  public isVoted = false;
  public isVetoed = false;
  private userId = '';


  constructor(private route: ActivatedRoute, private roomService: RoomService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.User.subscribe(u => {
      if (u === undefined){
        this.displayDialog = true;
      } else{
        this.displayDialog = false;
        this.userId = u.id;
      }
    });
    this.roomId = this.route.snapshot.paramMap.get('roomId') || '0';
    this.roomService.Room.subscribe(r => {
      this.room = r;

      if (r?.activeDestination == null) {
        return;
      }

      this.mapPanel = new MapPanel(r.activeDestination);
      this.detailsPanel = new DetailPanel(r.activeDestination);

      const vote = r.activeDestination.votes.find(v => v.userId === this.userId);
      if (vote !== null){
        if (vote?.vote === 1){ /* in favor */
          this.isVoted = true;
          this.isVetoed = false;
        } else {
          this.isVoted = false;
          this.isVetoed = true;
        }
      }
    });
    this.roomService.IsLoading.subscribe(i => this.isLoading = i);
    this.roomService.IsVoteLoading.subscribe(i => this.isVoteLoading = i);
    this.roomService.GetRoom(this.roomId);
  }

  public upvote(): void{
    if (this.room?.activeDestination?.id === undefined) {
      return;
    }

    this.roomService.Vote(this.roomId, this.room.activeDestination.id, this.room.activeDestination.name, true);
  }

  public downvote(): void{
    if (this.room?.activeDestination?.id === undefined) {
      return;
    }

    this.roomService.Vote(this.roomId, this.room.activeDestination.id, this.room.activeDestination.name, false);
  }

}
