import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { QuoteService } from '../home/quote.service';
import { finalize } from 'rxjs/operators';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
//import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Profile } from '@app/Models/profile';



/*
@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Profile Validate</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <form>
    <div class="form-row">
    <div class="form-group">
    <label for="inputFirstName">First Name</label>
      <input type="text" class="form-control" id="inputFirstName" [childMessage]="parentMessage"  name="fname" placeholder="First Name">
      
    </div>
    </div>
    <div class="form-row">
    <div class="form-group">
      <label for="inputLastName">Last Name</label>
      <input type="text" class="form-control" id="inputLastName" placeholder="Last Name">
    </div></div>
    <div class="form-row">
    <div class="form-group">
      <label for="inputPhone">Phone</label>
      <input type="text" class="form-control" id="inputPhone" placeholder="111 111-1111">
    </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inputEmail">Email</label>
        <input type="text" class="form-control" id="inputEmail">
      </div>
    </div>
    
  </form>
    </div>
    <div class="modal-footer">
    <button type="submit" (click)="save()" class="btn btn-primary">Save</button>
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModal1Content {
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal,private location:Location) {}
  
  @Input() childMessage: any;

  ngOnInit() {
    
    }
  open() {
    
    this.modalService.open(NgbdModal1Content, {
      size: 'lg'
    });
  }
  save()
    {
      this.activeModal.close('Close click')
      location.href='/lead';
    }
}
*/
@Component({
  selector: 'app-customcell',
  templateUrl: './custom-cell.component.html',
  styleUrls: ['./custom-cell.component.scss']
})
export class CustomCellComponent implements OnInit {
data:any;
params:any;
isLoading: boolean;
leadData: Profile;
firstName1: string;
parentMessage: string;
@Input() childMessage: any;


  constructor(private location: Location,private quoteService: QuoteService) { }
  agInit(params:any):void {
    this.params=params;
    //console.log(params.data.StatusID);
    this.data = params.value;
}
ngOnInit() {
  this.firstName1 = "madhu";
  }
  open() {
//this.loadProfile();
   // this.modalService.open(NgbdModal1Content);
   
   location.href='/home?id='+this.data;
  
}
lead() {
  //this.loadProfile();
     // this.modalService.open(NgbdModal1Content);
     
     location.href='/home?id='+this.data;
    
  }
  loadProfile(){
    this.quoteService
      .GetPrifileById(this.data)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: any) => {
        //this.quote = quote;
        this.leadData = quote;
        this.childMessage=this.leadData.FirstName;
        console.log(this.leadData);
      });
  }

}
