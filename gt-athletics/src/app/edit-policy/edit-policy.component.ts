import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-policy',
  templateUrl: './edit-policy.component.html',
  styleUrls: ['./edit-policy.component.css']
})
export class EditPolicyComponent implements OnInit {
  editorOutput = "<p>Hello How are you!</p><p><br></p><p>Why don't you think about that for a hot second?</p>";
  constructor() { }
  ngOnInit() {
  }
}