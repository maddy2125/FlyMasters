import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { QuoteService } from './quote.service';
import { AgGridModule } from 'ag-grid-angular';
//import {AgGridModule} from "ag-grid-angular/main";
import { CellEditRenderingComponent } from "./celleditrenderingcomponent";
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    HomeRoutingModule,
    AgGridModule.withComponents([])
    //,ClickableModule
    ,FormsModule
  ],
  declarations: [HomeComponent,CellEditRenderingComponent],
  providers: [QuoteService,CellEditRenderingComponent]
})
export class HomeModule {}
