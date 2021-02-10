import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { HomeComponent } from 'src/app/components/pages/home/home.component';
import { LocationService } from 'src/app/services/location.service';
import { RoomComponent } from 'src/app/components/pages/room/room.component';
import { RoomService } from 'src/app/services/room.service';
import { MapComponent } from 'src/app/components/shared/map/map.component';
import { DetailsComponent } from 'src/app/components/shared/details/details.component';
import { FooterComponent } from 'src/app/components/shared/footer/footer.component';
import { CarouselModule } from 'primeng/carousel';
import { FieldsetModule } from 'primeng/fieldset';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PictureComponent } from './components/shared/picture/picture.component';

import {MenubarModule} from 'primeng/menubar';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomComponent,
    MapComponent,
    DetailsComponent,
    FooterComponent,
    PictureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,
    FieldsetModule,
    BrowserAnimationsModule,
    MenubarModule
  ],
  providers: [LocationService, RoomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
