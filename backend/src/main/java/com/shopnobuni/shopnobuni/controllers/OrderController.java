package com.shopnobuni.shopnobuni.controllers;

import com.shopnobuni.shopnobuni.models.Order;
import com.shopnobuni.shopnobuni.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Long userId) {
        return orderService.getOrdersByUserId(userId);
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        order.setOrderDate(new Date());
        order.setStatus("PENDING");
        return orderService.createOrder(order);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestBody String status) {
        return orderService.getOrderById(id)
                .map(order -> {
                    order.setStatus(status);
                    return ResponseEntity.ok(orderService.updateOrder(order));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
