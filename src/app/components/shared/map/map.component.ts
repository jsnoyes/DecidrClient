import { Component, Input, OnInit } from '@angular/core';
import { MapPanel, PanelViewModel } from 'src/app/models/panel-view-model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input()
  public mapViewModel!: MapPanel;
  public map: string | undefined;

  private loaded = false;

  constructor() { }

  ngOnInit(): void {
    this.map = 'data:image/png;base64,' + this.mapViewModel.map;
    this.loaded = true;
  }
}
