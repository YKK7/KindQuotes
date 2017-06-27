import { QuoteService } from './../../providers/quote-service';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-edit-quote',
  templateUrl: 'edit-quote.html',
  providers: [QuoteService ]
})
export class EditQuotePage {

  // message: string;
  quote = {
    id: 0,
    message: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public quoteService: QuoteService) {
    this.quote.id = navParams.get('quoteId');
    quoteService.getQuote(this.quote.id)
        .subscribe(data => {
        this.quote.message = data.message;
    })
  }

  ionViewDidLoad() {
  }

  editQuote(){
    this.quoteService.update(this.quote)
    .map(res => res.toString())
      .subscribe(data => {
        console.log(data);
        this.navCtrl.pop();
      });
  }

}
