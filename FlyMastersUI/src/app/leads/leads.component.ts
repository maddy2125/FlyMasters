import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LeadsZoneService } from './leads.service';
import { Profile } from '../Models/profile';
import { CellEditRenderingComponent } from '../home/celleditrenderingcomponent';
import { CustomCellComponent } from '../custom-cell/custom-cell.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  isLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private quoteService: LeadsZoneService,
    private authenticationService: AuthenticationService
  ) {}

  columnDefs = [
    { headerName: 'ProfileID', field: 'ProfileID', width: 120, headerCheckboxSelection: true, checkboxSelection: true },
    { headerName: 'First Name', field: 'FirstName', sortable: true, filter: true, width: 170 },
    { headerName: 'Last Name', field: 'LastName', sortable: true, filter: true, width: 150 },
    { headerName: 'Phone', field: 'Phone', sortable: true, filter: true, width: 125 },
    { headerName: 'Email', field: 'Email', sortable: true, filter: true, width: 230 },
    { headerName: 'Source', field: 'Source', sortable: true, filter: true, width: 125 },
    { headerName: 'Assigned To', field: 'AssignedTo', sortable: true, filter: true, width: 125 },
    { headerName: 'Status', field: 'Status', sortable: true, filter: true, width: 170 },
    {
      headerName: '',
      field: 'ProfileID',
      cellRendererFramework: CustomCellComponent,
      width: 100,
      cellRendererParams: {
        inRouterLink: '/createLead/'
      }
    }
  ];

  rowData: any[];

  ngOnInit() {
    this.quoteService
      .loadLeadProfiles()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: any[]) => {
        this.rowData = quote;
      });
  }
}
