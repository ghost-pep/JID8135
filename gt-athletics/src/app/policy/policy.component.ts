import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from './../backend.service';
import { EditPolicyComponent } from '../edit-policy/edit-policy.component';
import { ViewPolicyComponent } from '../view-policy/view-policy.component';
import { ViewChild } from '@angular/core';
import { Policy } from '../policy';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  @ViewChild(EditPolicyComponent) editPolicy;
  // content = 'Placeholder text';
  selectedPolicy: Policy;
  selectedFile: File;
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

  onFileUpload(event){
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
    };
    reader.readAsDataURL(this.selectedFile);
  }

  OnUploadFile() {
    //Upload file here send a binary data
    this.backend.uploadPolicy().subscribe(
      (res) => {
        console.log(res);
      }
    );
  }

}
