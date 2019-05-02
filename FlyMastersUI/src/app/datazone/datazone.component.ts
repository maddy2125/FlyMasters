import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { DataZoneService } from './datazone.service';
import { Profile } from '../Models/profile';
import { CellEditRenderingComponent } from '../home/celleditrenderingcomponent';
import { CustomCellComponent } from '../custom-cell/custom-cell.component';
//import { AddviewNotesComponent } from '../custom-cell/addviewnotes-cell.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { stringLiteral } from 'babel-types';
import { MappedProfiles } from '../Models/mappedprofile';
import { ProfileImport } from '../Models/profileimport';
import { async } from '@angular/core/testing';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-datazone',
  templateUrl: './datazone.component.html',
  styleUrls: ['./datazone.component.scss']
})
export class DatazoneComponent implements OnInit {
  closeResult: string;
  quote: any[];
  isLoading: boolean;
  isEdit: boolean;
  leadData: Profile;
  mappedProfiles: MappedProfiles;
  importProfile: ProfileImport;
  importProfileList: ProfileImport[] = [];
  selectedUser: number;
  selectedFiles: FileList;
  currentFileUpload: File;
  isAdmin: boolean;
  selectedLevel: number;
  selectedSource: number;
  selectedAdminUser: number;
  saveButtonText: string = 'Save';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private quoteService: DataZoneService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal
  ) {
    this.mappedProfiles = new MappedProfiles();
    this.importProfile = new ProfileImport();
  }
  open(content: string) {
    this.loadProfile();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  columnDefs = [
    { headerName: 'ProfileID', field: 'ProfileID', width: 120, headerCheckboxSelection: true, checkboxSelection: true },
    { headerName: 'First Name', field: 'FirstName', sortable: true, filter: true, width: 170 },
    { headerName: 'Last Name', field: 'LastName', sortable: true, filter: true, width: 150 },
    { headerName: 'Phone', field: 'Phone', sortable: true, filter: true, width: 100 },
    { headerName: 'Email', field: 'Email', sortable: true, filter: true, width: 200 },
    { headerName: 'Source', field: 'Source', sortable: true, filter: true, width: 100 },
    { headerName: 'Assigned To', field: 'AssignedTo', sortable: true, filter: true, width: 100 },
    { headerName: 'Status', field: 'Status', sortable: true, filter: true, width: 150 },
    {
      headerName: '',
      field: 'ProfileID',
      cellRendererFramework: CustomCellComponent,
      width: 250,
      cellRendererParams: {
        inRouterLink: '/createLead/'
      }
    }
  ];

  rowData: any[];
  rowNotesData: any[];
  associates: any[];
  sources: any[];

  columnNotesDefs = [
    { headerName: 'Added On', field: 'AddedOn', sortable: true, filter: true },
    { headerName: 'Added By', field: 'AddedBy', sortable: true, filter: true },
    { headerName: 'Notes', field: 'Comments', sortable: true, filter: true, tooltipField: 'Comments' }
  ];

  ngOnInit() {
    console.log(this.route.snapshot.queryParams['id']);
    this.isEdit = this.route.snapshot.queryParams['id'] != undefined ? true : false;
    this.isAdmin = this.authenticationService.credentials.IsAdmin;
    this.selectedLevel = 0;
    this.selectedSource = 0;
    this.selectedAdminUser = 0;
    //console.log(this.isAdmin);
    // if (this.isEdit) {
    //   this.loadProfile();
    //   this.quoteService
    //     .GetUsers(0)
    //     .pipe(
    //       finalize(() => {
    //         this.isLoading = false;
    //       })
    //     )
    //     .subscribe((quote: any[]) => {
    //       //console.log(quote);
    //       this.associates = quote;
    //     });
    // }
    //console.log(this.isEdit);
    //this.isLoading = true;
    this.selectedAdminUser = 0;
    this.quoteService
      .GetProfiles()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: any[]) => {
        this.rowData = quote;
      });

    this.quoteService
      .GetUsers('-1')
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: any[]) => {
        console.log(quote);
        this.associates = quote;
      });

    this.quoteService
      .GetSource()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: any[]) => {
        console.log(quote);
        this.sources = quote;
      });
  }

  loadProfile() {
    this.quoteService
      .GetProfileById(this.route.snapshot.queryParams['id'] != undefined ? this.route.snapshot.queryParams['id'] : -1)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: any) => {
        this.leadData = quote;
        console.log(quote);
        this.rowNotesData = quote.profileNotesViewModel;
        this.saveButtonText = quote.StatusID < 3 ? 'Validate Profile' : 'Create Lead';
      });
  }

  save() {
    this.leadData.ModifyBy = this.authenticationService.credentials.UserId;
    this.leadData.AssignedTo = this.selectedAdminUser;
    console.log(this.leadData);
    this.quoteService
      .UpdateProfile(this.leadData)
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
    if (this.quote.length > 0) {
      var selectedProfiles = [];
      for (let i = 0; i < this.quote.length; i++) {
        selectedProfiles.push(this.quote[i].ProfileID);
      }
      console.log(selectedProfiles);
      console.log(this.selectedLevel);
      console.log(this.mappedProfiles);
      //MappedProfiles a =new MappedProfiles();

      this.mappedProfiles.mappedUserID = this.selectedLevel;
      this.mappedProfiles.selectedProfileIds = selectedProfiles;
      this.mappedProfiles.userID = this.authenticationService.credentials.UserId;

      this.quoteService
        .AssignProfile(this.mappedProfiles)
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
  }
  onRowSelected(event: any) {
    this.quote = event.api.getSelectedRows();
  }
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

  async csvJSON(csvText: any) {
    console.log('excel reading started.');
    var lines = csvText.split('\n');

    var result = [];

    var headers = lines[0].split(',');
    //console.log(headers);
    //console.log(lines);
    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(',');

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
        this.importProfile.FirstName = currentline[1] == undefined ? '' : currentline[1];
        this.importProfile.LastName = currentline[2] == undefined ? '' : currentline[2];
        this.importProfile.Phone = currentline[3] == undefined ? '' : currentline[3];
        this.importProfile.Email = currentline[4] == undefined ? '' : currentline[4];
      }
      this.importProfileList.push(this.importProfile);
      this.importProfile = new ProfileImport();
      result.push(obj);
    }
    this.quoteService
      .UploadProfiles(this.importProfileList, this.selectedSource)
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

    console.log(this.importProfileList.length);
  }

  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    //console.log(this.currentFileUpload);

    const reader = new FileReader();
    reader.onload = () => {
      let text = reader.result;
      this.csvJSON(text);
    };
    reader.readAsText(this.currentFileUpload);
    this.selectedFiles = null;
    this.selectedFiles = undefined;
  }

  SaveComments() {
    this.leadData.ModifyBy = this.authenticationService.credentials.UserId;
    console.log(this.leadData);
    this.quoteService
      .SaveNotes(this.leadData)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        res => {
          console.log(res);
          //location.href = '/datazone';
          this.loadProfile();
        },
        err => {
          console.log('Error occured');
        }
      );
  }

  InComplete() {
    this.leadData.ModifyBy = this.authenticationService.credentials.UserId;
    console.log(this.leadData);
    this.quoteService
      .InCompProfile(this.leadData)
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
}
