import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { QuoteService } from './quote.service';
import { Profile } from '../Models/profile';
import { CellEditRenderingComponent } from '../home/celleditrenderingcomponent';
import { CustomCellComponent } from '../custom-cell/custom-cell.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: any[];
  isLoading: boolean;
  isEdit: boolean;
  leadData: Profile;
  selectedUser: number;

  constructor(private route: ActivatedRoute, private location: Location, private quoteService: QuoteService) {}

  columnDefs = [
    { headerName: 'Select', field: 'ProfileID', width: 75, checkboxSelection: true },
    { headerName: 'Profile ID', field: 'ProfileID', sortable: true, filter: true, width: 99 },
    { headerName: 'First Name', field: 'FirstName', sortable: true, filter: true, width: 110 },
    { headerName: 'Last Name', field: 'LastName', sortable: true, filter: true, width: 110 },
    { headerName: 'Phone', field: 'Phone', sortable: true, filter: true, width: 105 },
    { headerName: 'Email', field: 'Email', sortable: true, filter: true, width: 150 },
    { headerName: 'Source', field: 'Source', sortable: true, filter: true, width: 125 },
    { headerName: 'Assigned To', field: 'AssignedTo', sortable: true, filter: true, width: 115 },
    { headerName: 'Status', field: 'Status', sortable: true, filter: true, width: 130 },
    {
      headerName: '',
      field: 'ProfileID',
      cellRendererFramework: CustomCellComponent,
      width: 185,
      cellRendererParams: {
        inRouterLink: '/createLead/'
      }
    }
  ];

  rowData: any[];
  rowNotesData: any[];
  associates: any[];

  columnNotesDefs = [
    { headerName: 'Added On', field: 'AddedOn', sortable: true, filter: true },
    { headerName: 'Added By', field: 'AddedBy', sortable: true, filter: true },
    { headerName: 'Notes', field: 'Comments', sortable: true, filter: true }
  ];

  ngOnInit() {
    console.log(this.route.snapshot.queryParams['id']);
    this.isEdit = this.route.snapshot.queryParams['id'] != undefined ? true : false;

    this.isLoading = true;
  }
}
