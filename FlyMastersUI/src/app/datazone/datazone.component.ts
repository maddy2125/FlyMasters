import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { DataZoneService } from './datazone.service';
import { Profile } from '../Models/profile';
import { CellEditRenderingComponent } from '../home/celleditrenderingcomponent';
import { CustomCellComponent } from '../custom-cell/custom-cell.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-datazone',
  templateUrl: './datazone.component.html',
  styleUrls: ['./datazone.component.scss']
})
export class DatazoneComponent implements OnInit {
  quote: any[];
  isLoading: boolean;
  isEdit: boolean;
  leadData: Profile;
  selectedUser: number;
  selectedFiles: FileList;
  currentFileUpload: File;
  isAdmin: boolean;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private quoteService: DataZoneService,
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
    this.isAdmin = this.authenticationService.credentials.IsAdmin;
    //console.log(this.isAdmin);
    if (this.isEdit) {
      this.loadProfile();
    }
    console.log(this.isEdit);
    this.isLoading = true;

    this.quoteService
      .GetPrifiles(this.authenticationService.credentials)
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
        this.rowNotesData = quote.profileNotesViewModel;
        //console.log('Is Authenticated: '+this.authenticationService.isAuthenticated());
        //console.log('Login: '+this.authenticationService.credentials.UserId);
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
          location.href = '/datazone';
        },
        err => {
          console.log('Error occured');
        }
      );
  }
  back() {
    location.href = '/datazone';
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
    console.log(this.quote);
  }
  onRowSelected(event: any) {
    this.quote = event.api.getSelectedRows();
    //console.log(this.quote);
    // if(event.node.isSelected()){
    //   console.log("selected");
    // } else {
    //   console.log("unselected");
    // }
  }
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }
  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    //console.log(this.currentFileUpload);

    const reader = new FileReader();
    reader.onload = () => {
      let text = reader.result;
      this.csvJSON(text);
      console.log(text);
    };
    reader.readAsText(this.currentFileUpload);
    this.selectedFiles = null;
    // this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
    //  if (event instanceof HttpResponse) {
    //     console.log('File is completely uploaded!');
    //   }
    //});
    this.selectedFiles = undefined;
  }
  csvJSON(csvText: any) {
    var lines = csvText.split('\n');

    var result = [];

    var headers = lines[0].split(',');
    console.log(headers);
    for (var i = 1; i < lines.length - 1; i++) {
      var obj = {};
      var currentline = lines[i].split(',');

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    console.log(result);
  }
}
