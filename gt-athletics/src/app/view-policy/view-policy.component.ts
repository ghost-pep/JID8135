import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
@Component({
  selector: 'app-view-policy',
  templateUrl: './view-policy.component.html',
  styleUrls: ['./view-policy.component.css']
})
export class ViewPolicyComponent implements OnInit {
  documentText = "FOOTBALL SEASON TICKETS\nIn the past, complimentary season tickets provided to employees were only taxed for individual games that were deemed a “sell out”.  Per IRS regulations, season tickets provided to employees are considered taxable fringe benefits and are subject to taxation regardless of individual “sell outs”.  Therefore, GTAA will be reporting on the full value of complimentary season tickets provided to employees during the 2015-2016 year.   \nThe IRS requires that complimentary season tickets be treated as income and reported as a “benefit” with 80% of the face value subject to taxation.  Please see the example below.     EXAMPLE  Two (2) Season Tickets @ Face Value = $280/ticket $560.00 80% of Face Value ($560 x 80%) $448.00 Cost to Employee/Estimated Taxes Withheld ($448 x 33%)* $147.84 *Note that the actual amount of tax withheld on complimentary season tickets is dependent on each employee’s individual tax situation (tax bracket, number of dependents, etc.) and cannot be determined by GTAA.   \nEmployees will have the option to accept, reduce, or decline their complimentary season ticket allocation by submitting the 2015 Football Season Ticket Request Form (link below).  Please complete and submit the form to the Ticket Office by no later than Tuesday, August 25th, 2015.  If season tickets are accepted, one will have the option of being taxed for the full value in one pay period or divided over a four (4) month period in equal installments.  If you elect to not accept the complimentary season ticket allocation, single game tickets will be available upon request as detailed below.   \nUpon notification that the tickets are ready for pick up, each employee will be required to sign for their season tickets in the Ticket Office.  No tickets will be released to anyone who has not completed the form.   \nDue to the high demand for this upcoming Football season, our premium inventory has already “sold out” and we anticipate limited single game inventory for Virginia Tech and Georgia.  Florida State single game tickets are already “sold out” and the only way to gain access to this game is with a season ticket.  Therefore, we strongly encourage GTAA staff to accept season tickets at this time and not wait to request tickets since inventory may not be available.";
  constructor(private http: Http) { }
  ngOnInit() {
    // this.http.get('src/app/data/mock.txt', "{ responseType: 'text' }").subscribe(data => {
    //   console.log(data.text());
    //   this.documentText = data.text();
    // });
  }
}