import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { LeadsComponent } from './leads.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'leads', component: LeadsComponent, data: { title: extract('Leads') } }])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LeadsRoutingModule {}
