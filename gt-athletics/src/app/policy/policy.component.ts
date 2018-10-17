import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  viewEditor = 'edit';
  search = '';
  policies = [
    { title: 'Complimentary Football Tickets' },
    { title: 'Complimentary MBB WBB Tickets' },
    { title: 'GT Athletics Compliance Manual (Final)' },
    { title: 'GT Communications Standards v1 (120815)' },
    { title: 'Mobile Device Policy' },
    { title: 'Moving and Relocation Policy' },
    { title: 'Student Athlete Academic Support Services Handbook 2015' }
  ];
  constructor() { }
  ngOnInit() {
  }
  addClicked() {
    this.viewEditor = 'edit';
  }
  itemClicked(editorToDisplay) {
    console.log('item');
    this.viewEditor = 'view';
    this.search = '';
  }
}
