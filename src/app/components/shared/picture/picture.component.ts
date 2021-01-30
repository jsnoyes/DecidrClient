import { Component, Input, OnInit } from '@angular/core';
import { PanelViewModel, PicturePanel } from 'src/app/models/panel-view-model';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {

  @Input()
  public pictureViewModel!: PicturePanel;

  private loaded = false;

  constructor() { }

  ngOnInit(): void {
    this.loaded = true;
  }

}
