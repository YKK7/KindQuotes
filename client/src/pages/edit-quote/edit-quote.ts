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

  message: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, quoteService: QuoteService) {
    quoteService.getQuote(navParams.get('quoteId'))
        .subscribe(data => {
        this.message = data.message;
    })
  }

  ionViewDidLoad() {
  }

}
