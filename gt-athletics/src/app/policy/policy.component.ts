import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  viewEditor = 'edit';
  constructor() { }
  ngOnInit() {
  }
  itemClicked(editorToDisplay) {
    // console.log(this.viewEditor);
    // console.log(editorToDisplay);
    // this.viewEditor = String(editorToDisplay.toString());
    // console.log(this.viewEditor);
    console.log('itemclick');
    this.viewEditor = 'view';
  }
}
