package fi.pitkanen.domain;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface PurchaseRepository extends CrudRepository<Purchase, Long> {
    List<Purchase> findByName(String name);
}
