import { Component, Input, OnInit } from '@angular/core';
import { BackendService } from './../backend.service';
import { EditPolicyComponent } from '../edit-policy/edit-policy.component';
import { ViewPolicyComponent } from '../view-policy/view-policy.component';
import { ViewChild } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  @ViewChild(EditPolicyComponent) editPolicy;
  content = 'Placeholder text';
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
  constructor(private backend: BackendService) { }
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
        this.content = res.content;
      }
    );
  }

  createPolicyClicked() {
    let data = {title: 'title', content: this.editPolicy.getEditorContent()};
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
