import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit {
  public height: string | undefined;

  @ViewChild('heightSetter') public heightSetter!: ElementRef;

  constructor(private changeDetectionRef: ChangeDetectorRef) { }

  public ngAfterViewInit(): void {
    this.height = this.heightSetter.nativeElement.offsetHeight + 'px';
    this.changeDetectionRef.detectChanges();
  }

}
