package com.shopnobuni.shopnobuni.repositories;

import com.shopnobuni.shopnobuni.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
