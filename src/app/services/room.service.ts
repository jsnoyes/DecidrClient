import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { DestinationModel } from '../models/destination-model';
import { RoomCriteriaModel } from '../models/room-criteria-model';
import { RoomModel } from '../models/room-model';
import { UserModel } from '../models/user-model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiUrl: string;

  private user: UserModel | undefined;

  private room = new BehaviorSubject<RoomModel | null>(null);
  public Room = this.room.asObservable();

  private activeDestinationId = new BehaviorSubject<string | null>(null);
  public ActiveDestinationId = this.activeDestinationId.asObservable();

  private activeDestination = new BehaviorSubject<DestinationModel | null>(null);
  public ActiveDestination = this.activeDestination.asObservable();

  private isLoading = new BehaviorSubject<boolean>(true);
  public IsLoading = this.isLoading.asObservable();

  constructor(private httpClient: HttpClient, private userService: UserService) {
    this.apiUrl = environment.urls.api + 'room';
    userService.User.subscribe(u => {
      this.user = u;
    });
    this.ActiveDestinationId.subscribe(did => {
        if (did == null) {
          this.activeDestination.next(null);
        } else {
        const activeDestination = this.room.value?.potentialDestinations.find(d => d.id === did) || null;
        this.activeDestination.next(activeDestination);
      }
    });
    this.Room.subscribe(r => {
      if (r == null) {
        this.activeDestinationId.next(null);
      } else {
        let activeDest = r.potentialDestinations.find(d => d.votes.findIndex(v => v.userId === this.user?.Id) === -1);
        if (!activeDest) {
          activeDest = r.potentialDestinations[r.potentialDestinations.length - 1];
        }
        const activeDestinationId = activeDest.id;
        this.activeDestinationId.next(activeDestinationId);
      }
    });
  }

  /**
   * NextDestination
   */
  public NextDestination(): void {
    this.isLoading.next(true);
    const currentActiveDestinationId = this.activeDestinationId.value;
    const dests = this.room.value?.potentialDestinations;
    if (dests !== undefined){
      let curActiveIndex = dests.findIndex(d => d.id === currentActiveDestinationId);
      if (curActiveIndex < dests.length - 1) {
        curActiveIndex++;
      }
      const newActiveDest = dests[curActiveIndex];
      this.activeDestinationId.next(newActiveDest.id);
    }
    this.isLoading.next(false);
  }

  /**
   * NextDestination
   */
  public PreviousDestination(): void {
    this.isLoading.next(true);
    const currentActiveDestinationId = this.activeDestinationId.value;
    const dests = this.room.value?.potentialDestinations;
    if (dests !== undefined){
      let curActiveIndex = dests.findIndex(d => d.id === currentActiveDestinationId);
      if (curActiveIndex > 0) {
        curActiveIndex--;
      }
      const newActiveDest = dests[curActiveIndex];
      this.activeDestinationId.next(newActiveDest.id);
    }
    this.isLoading.next(false);
  }

  /**
   * CreateRoom
   */
  public CreateRoom(roomCrieria: RoomCriteriaModel): void {
    this.isLoading.next(true);
    const sub = this.httpClient.post<RoomModel>(this.apiUrl, roomCrieria)
      .subscribe(s => {
        this.room.next(s);
        this.isLoading.next(false);
        sub.unsubscribe();
      });
  }

  /**
   * GetRoom
   */
  public GetRoom(roomId: string): void {
    this.isLoading.next(true);
    const sub = this.httpClient.get<RoomModel>(this.apiUrl + '/' + roomId)
      .subscribe(s => {
        this.room.next(s);
        this.isLoading.next(false);
        sub.unsubscribe();
      });
  }

  /**
   * Vote
   */
  public Vote(roomId: string, destId: string, isVoteFor: boolean): void {
    this.isLoading.next(true);
    const sub = this.httpClient.post<RoomModel>(this.apiUrl + '/' + roomId + '/' + destId + '/vote/' + (isVoteFor === true ? '1' : '-1'),
      null,
      {withCredentials: true} )
      .subscribe(r => {
        this.room.next(r);
        this.isLoading.next(false);
        sub.unsubscribe();
      });
  }
}
