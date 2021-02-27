import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MapPanel, PanelViewModel } from 'src/app/models/panel-view-model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {

  @Input()
  public mapViewModel!: MapPanel;

  public loaded = false;

  constructor() { }

  ngOnInit(): void {
    if (this.mapViewModel !== undefined){
      this.loaded = true;
    }
  }
}
