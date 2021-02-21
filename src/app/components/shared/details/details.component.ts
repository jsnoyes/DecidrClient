import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DetailPanel } from 'src/app/models/panel-view-model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsComponent implements OnInit {

  @Input()
  public detailViewModel!: DetailPanel;

  public loaded = false;

  constructor() { }

  ngOnInit(): void {
    this.loaded = true;
  }

}
