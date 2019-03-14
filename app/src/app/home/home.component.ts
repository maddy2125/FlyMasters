import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { Profile } from '../Models/profile';
import { CellEditRenderingComponent } from "../home/celleditrenderingcomponent";
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

  constructor(private route: ActivatedRoute,private location: Location,private quoteService: QuoteService) {}

  columnDefs = [
		{headerName: 'Profile ID', field: 'ProfileID', sortable: true, filter: true, width: 99 },
		{headerName: 'First Name', field: 'FirstName', sortable: true, filter: true, width: 120 },
    {headerName: 'Last Name', field: 'LastName', sortable: true, filter: true, width: 120 },
    {headerName: 'Phone', field: 'Phone', sortable: true, filter: true, width: 110 },
    {headerName: 'Email', field: 'Email', sortable: true, filter: true, width: 150 },
    {headerName: 'Source', field: 'Source', sortable: true, filter: true },
    {headerName: 'Status', field: 'Status', sortable: true, filter: true, width: 130 },
    {
			headerName: '', 
			field: 'ProfileID',
      cellRendererFramework:CustomCellComponent, width: 290
      ,cellRendererParams: {
        inRouterLink: '/createLead/'
      }
		}
  ];
  
  rowData :any[];
  
  
  ngOnInit() {
    console.log(this.route.snapshot.queryParams["id"]);
    this.isEdit  = this.route.snapshot.queryParams["id"] != undefined ? true : false;
    if(this.isEdit){ this.loadProfile(); }
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
        //this.quote = quote;
        this.rowData = quote;
      });
  }

  loadProfile(){
    this.quoteService
      .GetPrifileById(this.route.snapshot.queryParams["id"])
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: any) => {
        //this.quote = quote;
        this.leadData = quote;
        
        console.log(this.leadData);
      });      
}

save(){
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
          location.href='/home';
        },
        err => {
          console.log("Error occured");
        }
      );
  
}
back(){
  location.href='/home';
}
}
