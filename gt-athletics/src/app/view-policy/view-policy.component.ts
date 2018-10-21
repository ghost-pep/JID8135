import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-view-policy',
  templateUrl: './view-policy.component.html',
  styleUrls: ['./view-policy.component.css']
})
export class ViewPolicyComponent implements OnInit {
  @Input() content: String;
  constructor() { }
  ngOnInit() {
    console.log(this.content);
  }

}
