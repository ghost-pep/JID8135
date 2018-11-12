import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from './../backend.service';
import { EditPolicyComponent } from '../edit-policy/edit-policy.component';
import { ViewPolicyComponent } from '../view-policy/view-policy.component';
import { ViewChild } from '@angular/core';
import { Policy } from '../policy';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {saveAs} from 'file-saver';

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
  fileContents: string;
  fileValid: boolean;
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
    this.searchClicked();
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
  /*fileUpload(file) {
    console.log(file);
    this.readFile(file[0]);
  }*/

  downloadClick() {
    console.log(this.selectedPolicy);
    if (!((this.selectedPolicy.title) || (this.selectedPolicy.content) || (this.selectedPolicy._id))) { //if selected policy is blank
      return;
    }
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'><head><meta charset='utf-8'><title>test</title></head><body>";
    var postHtml = "</body></html>";
    let parser = new DOMParser();
    let html = preHtml + this.selectedPolicy.content + postHtml;
    console.log(html);
    let blob = new Blob(['\ufeff', html], {
      type: 'application/vnd.ms-word;charset=utf-8;'
    });
    saveAs(blob, this.selectedPolicy.title + '.doc');
  }

  confirmSend() {
    if (this.selectedPolicy.title === '') {
      alert("Cannot upload without title");
    } else if (this.editPolicy.getEditorContent() === '') {
      if (confirm("Are you sure you want to upload a policy with no body?")) {
        this.createPolicyClicked();
      }
    } else {
      if (confirm("Do you want to upload this policy?")) {
        this.createPolicyClicked();
      }
    }
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

  onFileUpload(event) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile.type === "text/plain") {
      console.log("File valid!");
      let yes = confirm(`Do you want to upload ${this.selectedFile.name}?`);
      if (yes) {
          const reader = new FileReader();
          reader.readAsText(this.selectedFile);
          reader.onload = () => {
            console.log(reader.result);
            let newTitle = prompt("Title of policy: ");
            this.backend.getPolicyTitle(newTitle).subscribe(
                (res) => {
                    // Check if a policy already exists with that title
                    if (res.length > 0) {
                        alert("Policy already exists.");
                        return;
                    } else {
                        let data = {
                            title: newTitle,
                            content: reader.result
                        }
                        this.backend.uploadRawPolicy(data).subscribe(
                            (res) => {
                                console.log(res);
                            }
                        );
                    }
                },
            );
            // document.getElementById('fileModal').modal("toggle");
            // $('#modal').modal('hide');
          };
      }
    }
  }

  OnUploadFile() {
    //Upload file here send a binary data
    this.backend.uploadPdfPolicy().subscribe(
      (res) => {
        console.log(res);
      }
    );
  }
}
