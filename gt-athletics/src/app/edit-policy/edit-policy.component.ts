import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-policy',
  templateUrl: './edit-policy.component.html',
  styleUrls: ['./edit-policy.component.css']
})
export class EditPolicyComponent implements OnInit {
  editorOutput = '<p>Placeholder text</p>';
  constructor() { }
  ngOnInit() {
  }
  getEditorContent() {
    return this.editorOutput;
  }
}