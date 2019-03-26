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
    if (this.isEdit) {
      this.loadProfile();
    }
    console.log(this.isEdit);
    this.isLoading = true;

    this.quoteService
      .GetPrifiles()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: any[]) => {
        this.rowData = quote;
      });

    this.quoteService
      .GetUsers()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: any[]) => {
        console.log(quote);
        this.associates = quote;
      });
  }

  loadProfile() {
    this.quoteService
      .GetPrifileById(this.route.snapshot.queryParams['id'])
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: any) => {
        this.leadData = quote;
        console.log(quote.profileNotesViewModel[0]);
        this.rowNotesData = quote.profileNotesViewModel;
      });
  }

  save() {
    console.log(this.leadData);
    this.quoteService
      .UpdatePrifile(this.leadData)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        res => {
          console.log(res);
          location.href = '/home';
        },
        err => {
          console.log('Error occured');
        }
      );
  }
  back() {
    location.href = '/home';
  }
  filterForeCasts(filterVal: any) {
    this.selectedUser = filterVal;
    console.log(this.selectedUser);
    //console.log(this.associates.filter((item) => item.summary == filterVal));
  }
  RowClick(param: any) {
    var currentRowIndex = param.rowIndex;
  }
  assign() {
    console.log(this.leadData);
  }
  onRowSelected(event: any) {
    console.log(event);
    if (event.node.isSelected()) {
      console.log('selected');
    } else {
      event.node.setSelected(true);
      console.log('unselected');
    }
  }
}
