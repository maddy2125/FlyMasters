import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { QuoteService } from '../home/quote.service';
import { DataZoneService } from '../datazone/datazone.service';
import { finalize } from 'rxjs/operators';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Profile } from '@app/Models/profile';
import { AuthenticationService } from '@app/core';
@Component({
  selector: 'app-customcell',
  templateUrl: './custom-cell.component.html',
  styleUrls: ['./custom-cell.component.scss']
})
export class CustomCellComponent implements OnInit {
  data: any;
  params: any;
  isLoading: boolean;
  leadData: Profile;
  associates: any[];
  selectedAdminUser: number;
  selectedUser: number;
  saveButtonText: string = 'Save';
  rowNotesData: any[];

  columnNotesDefs = [
    { headerName: 'Added On', field: 'AddedOn', sortable: true, filter: true },
    { headerName: 'Added By', field: 'AddedBy', sortable: true, filter: true },
    { headerName: 'Notes', field: 'Comments', sortable: true, filter: true, tooltipField: 'Comments' }
  ];

  constructor(
    private location: Location,
    private quoteService: QuoteService,
    private datazoneService: DataZoneService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal
  ) {}
  agInit(params: any): void {
    this.params = params;
    this.data = params.value;
  }
  ngOnInit() {
    this.selectedAdminUser = 0;
  }
  open(content: string) {
    this.loadProfile();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(result => {}, reason => {});
  }
  lead(content: string) {
    this.selectedAdminUser = 0;
    this.loadProfile();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(result => {}, reason => {});
  }

  OpenNotes(opennotes: string) {
    this.loadProfile();
    this.modalService.open(opennotes, { ariaLabelledBy: 'modal-basic-title' }).result.then(result => {}, reason => {});
  }

  view() {
    location.href = '/leads?id=' + this.data;
  }

  loadProfile() {
    this.quoteService
      .GetPrifileById(this.data)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: any) => {
        this.leadData = quote;
        this.rowNotesData = quote.profileNotesViewModel;
        this.leadData.Notes = '';
        console.log(this.leadData);
        this.datazoneService
          .GetUsers(0)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            })
          )
          .subscribe((quote: any[]) => {
            this.associates = quote;
          });
        this.saveButtonText = quote.StatusID < 3 ? 'Validate Profile' : 'Create Lead';
        //console.log(this.leadData);
      });
  }

  filterForeCasts(filterVal: any) {
    this.selectedUser = filterVal;
    console.log(this.selectedUser);
  }

  save() {
    this.leadData.ModifyBy = this.authenticationService.credentials.UserId;
    this.leadData.AssignedTo = this.selectedAdminUser;
    console.log(this.leadData);
    this.datazoneService
      .UpdateProfile(this.leadData)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        res => {
          console.log(res);
          this.modalService.dismissAll();
          location.href = '/datazone';
        },
        err => {
          console.log('Error occured');
        }
      );
  }

  InComplete() {
    this.leadData.ModifyBy = this.authenticationService.credentials.UserId;
    console.log(this.leadData);
    this.datazoneService
      .InCompProfile(this.leadData)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        res => {
          console.log(res);
          this.modalService.dismissAll();
          location.href = '/datazone';
        },
        err => {
          console.log('Error occured');
        }
      );
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
}
