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
import {RatingModule} from 'primeng/rating';
import {MenubarModule} from 'primeng/menubar';
import {GalleriaModule} from 'primeng/galleria';
import {DividerModule} from 'primeng/divider';
import { LoginComponent } from './components/shared/login/login.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomComponent,
    MapComponent,
    DetailsComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,
    FieldsetModule,
    BrowserAnimationsModule,
    MenubarModule,
    RatingModule,
    GalleriaModule,
    DividerModule,
    InputTextModule,
    ButtonModule,
    DialogModule
  ],
  providers: [LocationService, RoomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
