package io.zipcoder.kindquotes.repository;

import io.zipcoder.kindquotes.model.Quote;
import org.springframework.data.repository.CrudRepository;

public interface QuoteRepository extends CrudRepository<Quote, Long> {
}
