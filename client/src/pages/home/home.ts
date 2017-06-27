import { EditQuotePage } from './../edit-quote/edit-quote';
import { QuoteService } from './../../providers/quote-service';
import { Component } from '@angular/core';
import { ModalController, NavController, NavParams} from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [QuoteService ]
})
export class HomePage {

  quotes: any;
  quote = {
    message: ""
  }
  editQuotePage = EditQuotePage;

  constructor(public navCtrl: NavController, public quoteService : QuoteService) {
    this.getQuotes();
  }

  getQuotes() {
    this.quoteService.getAllQuotes().subscribe(data => {
      this.quotes = data;
    })
  }

  postQuote() {
    this.quoteService.postQuote(this.quote)
      .map(res => res.toString())
      .subscribe(data => {
        console.log(data);
        this.getQuotes();
      });

  }

  delete(quote: any) {
    this.quoteService.delete(quote)
      .map(res => res.toString())
      .subscribe(data => {
        console.log(data);
        this.getQuotes();
      })
  }

  update(id: Number){
    this.navCtrl.push(EditQuotePage, {quoteId: id});
    console.log(id + ' pushed');
  }

}

