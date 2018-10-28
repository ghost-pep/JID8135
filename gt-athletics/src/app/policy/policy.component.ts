import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from './../backend.service';
import { EditPolicyComponent } from '../edit-policy/edit-policy.component';
import { ViewPolicyComponent } from '../view-policy/view-policy.component';
import { ViewChild } from '@angular/core';
import { Policy } from '../policy';
// import { readFileSync } from '../../../node_modules/file-loader';
// import {readFileSync} from '../../../node_modules/file-loader';
@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  @ViewChild(EditPolicyComponent) editPolicy;
  // content = 'Placeholder text';
  selectedPolicy: Policy;
  viewEditor = 'edit';
  search = '';
  policies = [
    { title: 'Complimentary Football Tickets', _id: '' },
    { title: 'Complimentary MBB WBB Tickets', _id: '' },
    { title: 'GT Athletics Compliance Manual (Final)', _id: '' },
    { title: 'GT Communications Standards v1 (120815)', _id: '' },
    { title: 'Mobile Device Policy', _id: '' },
    { title: 'Moving and Relocation Policy', _id: '' },
    { title: 'Student Athlete Academic Support Services Handbook 2015', _id: '' }
  ];
  constructor(private backend: BackendService) {
    this.selectedPolicy = {
      title: '',
      content: '',
      _id: ''
    };
   }
  ngOnInit() {
  }

  addClicked() {
    this.viewEditor = 'edit';
  }

  itemClicked(editorToDisplay, _id) {
    this.viewEditor = 'view';
    this.search = '';
    this.backend.getPolicy(_id).subscribe(
      (res) => {
        this.selectedPolicy = {
          _id: res._id,
          title: res.title,
          content: res.content
        };
      }
    );
  }
  fileUpload(file) {
    console.log(file);
    this.readFile(file[0]);
  }

  //Must be a .txt or rtf
  private readFile(file: File) {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
      //alert(reader.result);
      console.log(reader.result);
    };
    // console.log(reader.result);
    // let data = readFileSync(file.name);
    // console.log(data);
    // return data;
  }
  createPolicyClicked() {
    let data = {title: this.selectedPolicy.title, content: this.editPolicy.getEditorContent()};
    this.backend.createRawPolicy(data).subscribe(
      (res) => {
        console.log(res);
      }
    );
  }

  searchClicked() {
    this.backend.getAll().subscribe(
      (res) => {
        console.log(res);
        this.policies = res;
      }
    );
  }
}
