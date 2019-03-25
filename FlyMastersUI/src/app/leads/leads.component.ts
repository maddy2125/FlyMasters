import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Profile } from '../Models/profile';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  isLoading: boolean;
  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {}
}
