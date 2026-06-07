package com.shopnobuni.shopnobuni.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;
    private String imageUrl;
    private int stock;
    private String category;
    private int discountPercentage;

    @Enumerated(EnumType.STRING)
    private ProductType type;
}
