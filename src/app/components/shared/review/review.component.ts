import { Component, Input, OnInit } from '@angular/core';
// import { ReviewPanel } from 'src/app/models/panel-view-model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  // @Input()
  // public reviewViewModel!: ReviewPanel;

  public loaded = false;

  constructor() { }

  ngOnInit(): void {
    this.loaded = true;
  }

}
