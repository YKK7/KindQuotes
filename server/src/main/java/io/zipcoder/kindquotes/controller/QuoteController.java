package io.zipcoder.kindquotes.controller;

import io.zipcoder.kindquotes.model.Quote;
import io.zipcoder.kindquotes.repository.QuoteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/quotes")
@RestController
@CrossOrigin("http://localhost:8100")
public class QuoteController {

    private final Logger LOG = LoggerFactory.getLogger(QuoteController.class);

    @Autowired
    private QuoteRepository quoteRepository;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Quote>> getAllQuotes(){
        LOG.info("Getting all quotes");
        List<Quote> quotes = new ArrayList<>();
        quoteRepository.findAll().forEach(quotes::add);
        if(quotes.isEmpty()){
            LOG.info("No quotes found");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(quotes, HttpStatus.OK);
    }

    @RequestMapping(value="/{id}", method=RequestMethod.GET)
    @CrossOrigin("http://localhost:8100")
    public ResponseEntity<?> getQuote(@PathVariable("id") long id) {
        LOG.info("Getting quote with id: {}", id);
        Quote quote = quoteRepository.findOne(id);
        if(quote == null){
            LOG.info("Quote with id {} not found", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(quote, HttpStatus.OK);
    }

    @RequestMapping(value="/{id}", method=RequestMethod.DELETE)
    @CrossOrigin("http://localhost:8100")
    public ResponseEntity<Void> deleteQuote(@PathVariable("id") long id){
        LOG.info("Deleting quote with id: {}", id);
        if(!quoteRepository.exists(id)){
            LOG.info("Unable to delete. Quote with id {} not found", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        quoteRepository.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> update(@RequestBody Quote quote){
        LOG.info("Updating quote: {}", quote);
        try {
            if (!quoteRepository.exists(quote.getId())) {
                LOG.info("Quote with id {} not found", quote.getId());
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch(NullPointerException npe){
            npe.getMessage();
        }
        quoteRepository.save(quote);
        return new ResponseEntity<>(quote, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> create(@RequestBody Quote quote
//            , UriComponentsBuilder ucBuilder
    ) {
        LOG.info("Creating new quote: {}", quote);
        quoteRepository.save(quote);
//        HttpHeaders headers = new HttpHeaders();
//        headers.setLocation(ucBuilder.path("/quotes/{id}").buildAndExpand(quote.getId()).toUri());
        return new ResponseEntity<>(quote, HttpStatus.CREATED);
    }


}
