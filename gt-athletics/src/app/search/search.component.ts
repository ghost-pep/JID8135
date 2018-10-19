import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { PolicyComponent } from './../policy/policy.component';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output('policyClicked') policyClicked = new EventEmitter();
  editorOutput;
  constructor() { }
  ngOnInit() {
  }
  itemClicked() {
    console.log('click');
    this.policyClicked.emit('view');
  }
}
