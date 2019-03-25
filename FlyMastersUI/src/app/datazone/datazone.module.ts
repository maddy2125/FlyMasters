import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { DataZoneRoutingModule } from './datazone-routing.module';
import { DatazoneComponent } from './datazone.component';
import { DataZoneService } from './datazone.service';
import { AgGridModule } from 'ag-grid-angular';
//import {AgGridModule} from "ag-grid-angular/main";
import { CellEditRenderingComponent } from './celleditrenderingcomponent';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    DataZoneRoutingModule,
    AgGridModule.withComponents([]),
    //,ClickableModule
    FormsModule
  ],
  declarations: [DatazoneComponent, CellEditRenderingComponent],
  providers: [DataZoneService, CellEditRenderingComponent]
})
export class DataZoneModule {}
