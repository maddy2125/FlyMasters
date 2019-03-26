import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuoteService } from '../home/quote.service';
import { finalize } from 'rxjs/operators';
import { Profile } from '@app/Models/profile';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { environment } from '@env/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  version: string = environment.version;

  constructor(private route: ActivatedRoute, private location: Location, private quoteService: QuoteService) {}

  order: any;
  isLoading: boolean;
  leadData: Profile;
  ngOnInit() {
    console.log(this.route.snapshot.queryParams['id']);
    this.loadProfile();
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
        //this.quote = quote;
        this.leadData = quote;
        console.log(this.leadData);
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
}
