import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { LeadsRoutingModule } from './leads-routing.module';
import { LeadsComponent } from './leads.component';
import { LeadsZoneService } from './leads.service';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
//import { CellEditRenderingComponent } from '../datazone/celleditrenderingcomponent';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    LeadsRoutingModule,
    AgGridModule.withComponents([]),
    //,ClickableModule
    FormsModule
  ],
  declarations: [LeadsComponent],
  providers: [LeadsZoneService]
})
export class LeadsModule {}
