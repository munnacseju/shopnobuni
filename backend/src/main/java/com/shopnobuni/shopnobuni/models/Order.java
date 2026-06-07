package com.shopnobuni.shopnobuni.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
import java.util.Date;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
    private List<OrderItem> items;

    private double totalAmount;
    private String status; // PENDING, PROCESSING, COMPLETED, CANCELLED
    private Date orderDate;
}
