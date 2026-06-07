package com.shopnobuni.shopnobuni.config;

import com.shopnobuni.shopnobuni.models.Product;
import com.shopnobuni.shopnobuni.models.ProductType;
import com.shopnobuni.shopnobuni.models.User;
import com.shopnobuni.shopnobuni.repositories.ProductRepository;
import com.shopnobuni.shopnobuni.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, ProductRepository productRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                User admin = new User();
                admin.setName("Admin User");
                admin.setEmail("admin@shopnobuni.com");
                admin.setPassword("admin123");
                admin.setRole("ROLE_ADMIN");
                admin.setAddress("Shopno Buni Headquarters, Dhaka");
                userRepository.save(admin);

                User testUser = new User();
                testUser.setName("Test User");
                testUser.setEmail("user@shopnobuni.com");
                testUser.setPassword("user123");
                testUser.setRole("ROLE_USER");
                testUser.setAddress("123 Green Road, Dhanmondi, Dhaka");
                userRepository.save(testUser);

                User testUser2 = new User();
                testUser2.setName("Sabbir Ahmed");
                testUser2.setEmail("sabbir@example.com");
                testUser2.setPassword("password");
                testUser2.setRole("ROLE_USER");
                testUser2.setAddress("Banani, Dhaka");
                userRepository.save(testUser2);

                User testUser3 = new User();
                testUser3.setName("Nusrat Jahan");
                testUser3.setEmail("nusrat@example.com");
                testUser3.setPassword("password");
                testUser3.setRole("ROLE_USER");
                testUser3.setAddress("Chittagong");
                userRepository.save(testUser3);
            }

            if (productRepository.count() == 0) {
                Product p1 = new Product();
                p1.setName("Luxury Pearl Necklace");
                p1.setDescription("Elegant handmade pearl necklace for special occasions.");
                p1.setPrice(4500.00);
                p1.setImageUrl("https://via.placeholder.com/300x200.png?text=Necklace");
                p1.setStock(10);
                p1.setCategory("Jewelry");
                p1.setDiscountPercentage(10);
                p1.setType(ProductType.NECKLACE);
                productRepository.save(p1);

                Product p2 = new Product();
                p2.setName("22K Gold Chain");
                p2.setDescription("Classic 22K gold chain with intricate design.");
                p2.setPrice(15000.00);
                p2.setImageUrl("https://via.placeholder.com/300x200.png?text=Gold+Chain");
                p2.setStock(5);
                p2.setCategory("Jewelry");
                p2.setDiscountPercentage(5);
                p2.setType(ProductType.GOLD_CHAIN);
                productRepository.save(p2);
                
                Product p3 = new Product();
                p3.setName("Diamond Finger Ring");
                p3.setDescription("Stunning diamond ring for engagement or gifts.");
                p3.setPrice(25000.00);
                p3.setImageUrl("https://via.placeholder.com/300x200.png?text=Ring");
                p3.setStock(8);
                p3.setCategory("Jewelry");
                p3.setDiscountPercentage(0);
                p3.setType(ProductType.FINGER_RING);
                productRepository.save(p3);

                Product p4 = new Product();
                p4.setName("Traditional Gold Earring");
                p4.setDescription("Beautifully crafted traditional gold earrings.");
                p4.setPrice(8000.00);
                p4.setImageUrl("https://via.placeholder.com/300x200.png?text=Earring");
                p4.setStock(15);
                p4.setCategory("Jewelry");
                p4.setDiscountPercentage(10);
                p4.setType(ProductType.EARRING);
                productRepository.save(p4);

                Product p5 = new Product();
                p5.setName("Silver Anklet Set");
                p5.setDescription("Elegant silver anklets with small bells.");
                p5.setPrice(1500.00);
                p5.setImageUrl("https://via.placeholder.com/300x200.png?text=Anklet");
                p5.setStock(20);
                p5.setCategory("Jewelry");
                p5.setDiscountPercentage(15);
                p5.setType(ProductType.ANKLET);
                productRepository.save(p5);

                Product p6 = new Product();
                p6.setName("Designer Bangle Set");
                p6.setDescription("Set of 4 designer bangles for weddings.");
                p6.setPrice(3500.00);
                p6.setImageUrl("https://via.placeholder.com/300x200.png?text=Bangle");
                p6.setStock(12);
                p6.setCategory("Jewelry");
                p6.setDiscountPercentage(0);
                p6.setType(ProductType.BANGLE);
                productRepository.save(p6);
            }
        };
    }
}
