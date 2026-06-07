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
            }

            if (productRepository.count() == 0) {
                // --- NECKLACES ---
    Product p1 = new Product();
    p1.setName("Luxury Pearl Necklace");
    p1.setDescription("Elegant handmade pearl necklace for special occasions.");
    p1.setPrice(4500.00);
    p1.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Necklace");
    p1.setStock(10);
    p1.setCategory("Jewelry");
    p1.setDiscountPercentage(10);
    p1.setType(ProductType.NECKLACE);
    productRepository.save(p1);

    Product p2 = new Product();
    p2.setName("Vintage Choker Necklace");
    p2.setDescription("A retro-inspired velvet choker with a central sapphire pendant.");
    p2.setPrice(2200.00);
    p2.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Necklace");
    p2.setStock(14);
    p2.setCategory("Jewelry");
    p2.setDiscountPercentage(12);
    p2.setType(ProductType.NECKLACE);
    productRepository.save(p2);

    Product p3 = new Product();
    p3.setName("Minimalist Silver Pendant");
    p3.setDescription("A delicate sterling silver chain featuring a geometric bar pendant.");
    p3.setPrice(1800.00);
    p3.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Necklace");
    p3.setStock(25);
    p3.setCategory("Jewelry");
    p3.setDiscountPercentage(0);
    p3.setType(ProductType.NECKLACE);
    productRepository.save(p3);

    Product p4 = new Product();
    p4.setName("Emerald Statement Collar");
    p4.setDescription("A bold, glamorous collar necklace heavily encrusted with faux emeralds.");
    p4.setPrice(6800.00);
    p4.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Necklace");
    p4.setStock(4);
    p4.setCategory("Jewelry");
    p4.setDiscountPercentage(20);
    p4.setType(ProductType.NECKLACE);
    productRepository.save(p4);


    // --- GOLD CHAINS ---
    Product p5 = new Product();
    p5.setName("22K Gold Chain");
    p5.setDescription("Classic 22K gold chain with intricate design.");
    p5.setPrice(15000.00);
    p5.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Gold+Chain");
    p5.setStock(5);
    p5.setCategory("Jewelry");
    p5.setDiscountPercentage(5);
    p5.setType(ProductType.GOLD_CHAIN);
    productRepository.save(p5);

    Product p6 = new Product();
    p6.setName("18K Rose Gold Rope Chain");
    p6.setDescription("Heavy diamond-cut rope chain crafted in pure 18k rose gold.");
    p6.setPrice(12500.00);
    p6.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Gold+Chain");
    p6.setStock(7);
    p6.setCategory("Jewelry");
    p6.setDiscountPercentage(0);
    p6.setType(ProductType.GOLD_CHAIN);
    productRepository.save(p6);

    Product p7 = new Product();
    p7.setName("Sleek Gold Cuban Link");
    p7.setDescription("Modern minimalist flat Cuban link chain perfect for everyday wear.");
    p7.setPrice(19500.00);
    p7.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Gold+Chain");
    p7.setStock(3);
    p7.setCategory("Jewelry");
    p7.setDiscountPercentage(8);
    p7.setType(ProductType.GOLD_CHAIN);
    productRepository.save(p7);


    // --- FINGER RINGS ---
    Product p8 = new Product();
    p8.setName("Diamond Finger Ring");
    p8.setDescription("Stunning diamond ring for engagement or gifts.");
    p8.setPrice(25000.00);
    p8.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Ring");
    p8.setStock(8);
    p8.setCategory("Jewelry");
    p8.setDiscountPercentage(0);
    p8.setType(ProductType.FINGER_RING);
    productRepository.save(p8);

    Product p9 = new Product();
    p9.setName("Ruby Solitaire Ring");
    p9.setDescription("An eye-catching deep red oval ruby set on a white gold band.");
    p9.setPrice(13500.00);
    p9.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Ring");
    p9.setStock(6);
    p9.setCategory("Jewelry");
    p9.setDiscountPercentage(10);
    p9.setType(ProductType.FINGER_RING);
    productRepository.save(p9);

    Product p10 = new Product();
    p10.setName("Classic Platinum Wedding Band");
    p10.setDescription("Simple and timeless high-polish platinum ring for couples.");
    p10.setPrice(9000.00);
    p10.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Ring");
    p10.setStock(12);
    p10.setCategory("Jewelry");
    p10.setDiscountPercentage(5);
    p10.setType(ProductType.FINGER_RING);
    productRepository.save(p10);

    Product p11 = new Product();
    p11.setName("Bohemian Opal Ring");
    p11.setDescription("Natural fiery opal set in an antique-styled silver filigree frame.");
    p11.setPrice(3200.00);
    p11.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Ring");
    p11.setStock(18);
    p11.setCategory("Jewelry");
    p11.setDiscountPercentage(15);
    p11.setType(ProductType.FINGER_RING);
    productRepository.save(p11);


    // --- EARRINGS ---
    Product p12 = new Product();
    p12.setName("Traditional Gold Earring");
    p12.setDescription("Beautifully crafted traditional gold earrings.");
    p12.setPrice(8000.00);
    p12.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Earring");
    p12.setStock(15);
    p12.setCategory("Jewelry");
    p12.setDiscountPercentage(10);
    p12.setType(ProductType.EARRING);
    productRepository.save(p12);

    Product p13 = new Product();
    p13.setName("Diamond Stud Earring Set");
    p13.setDescription("Brilliant round-cut diamond studs with secure screw-on backs.");
    p13.setPrice(18500.00);
    p13.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Earring");
    p13.setStock(9);
    p13.setCategory("Jewelry");
    p13.setDiscountPercentage(0);
    p13.setType(ProductType.EARRING);
    productRepository.save(p13);

    Product p14 = new Product();
    p14.setName("Silver Hoop Earrings");
    p14.setDescription("Large, lightweight sterling silver hoops for everyday style.");
    p14.setPrice(1200.00);
    p14.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Earring");
    p14.setStock(30);
    p14.setCategory("Jewelry");
    p14.setDiscountPercentage(25);
    p14.setType(ProductType.EARRING);
    productRepository.save(p14);

    Product p15 = new Product();
    p15.setName("Pearl Drop Chandelier Earrings");
    p15.setDescription("Intricate bridal chandelier earrings ending in teardrop pearls.");
    p15.setPrice(5500.00);
    p15.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Earring");
    p15.setStock(6);
    p15.setCategory("Jewelry");
    p15.setDiscountPercentage(5);
    p15.setType(ProductType.EARRING);
    productRepository.save(p15);


    // --- ANKLETS ---
    Product p16 = new Product();
    p16.setName("Silver Anklet Set");
    p16.setDescription("Elegant silver anklets with small bells.");
    p16.setPrice(1500.00);
    p16.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Anklet");
    p16.setStock(20);
    p16.setCategory("Jewelry");
    p16.setDiscountPercentage(15);
    p16.setType(ProductType.ANKLET);
    productRepository.save(p16);

    Product p17 = new Product();
    p17.setName("Beaded Turquoise Anklet");
    p17.setDescription("Vibrant beach-ready anklet woven with natural turquoise stones.");
    p17.setPrice(950.00);
    p17.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Anklet");
    p17.setStock(40);
    p17.setCategory("Jewelry");
    p17.setDiscountPercentage(0);
    p17.setType(ProductType.ANKLET);
    productRepository.save(p17);

    Product p18 = new Product();
    p18.setName("Gold Plated Charm Anklet");
    p18.setDescription("Dainty gold-plated chain adorned with small celestial star charms.");
    p18.setPrice(2100.00);
    p18.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Anklet");
    p18.setStock(15);
    p18.setCategory("Jewelry");
    p18.setDiscountPercentage(10);
    p18.setType(ProductType.ANKLET);
    productRepository.save(p18);


    // --- BANGLES & BRACELETS ---
    Product p19 = new Product();
    p19.setName("Designer Bangle Set");
    p19.setDescription("Set of 4 designer bangles for weddings.");
    p19.setPrice(3500.00);
    p19.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Bangle");
    p19.setStock(12);
    p19.setCategory("Jewelry");
    p19.setDiscountPercentage(0);
    p19.setType(ProductType.BANGLE);
    productRepository.save(p19);

    Product p20 = new Product();
    p20.setName("22K Matte Gold Kangan");
    p20.setDescription("Traditional heavy gold kangan single piece with antique polish finish.");
    p20.setPrice(28000.00);
    p20.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Bangle");
    p20.setStock(2);
    p20.setCategory("Jewelry");
    p20.setDiscountPercentage(5);
    p20.setType(ProductType.BANGLE);
    productRepository.save(p20);

    Product p21 = new Product();
    p21.setName("Diamond Tennis Bracelet");
    p21.setDescription("A breathtaking seamless row of round brilliant diamonds set in white gold.");
    p21.setPrice(42000.00);
    p21.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Bangle");
    p21.setStock(3);
    p21.setCategory("Jewelry");
    p21.setDiscountPercentage(8);
    p21.setType(ProductType.BANGLE);
    productRepository.save(p21);

    Product p22 = new Product();
    p22.setName("Rose Quartz Cuff Bangle");
    p22.setDescription("An adjustable open-ended brass cuff featuring raw rose quartz end stones.");
    p22.setPrice(1650.00);
    p22.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Bangle");
    p22.setStock(22);
    p22.setCategory("Jewelry");
    p22.setDiscountPercentage(12);
    p22.setType(ProductType.BANGLE);
    productRepository.save(p22);


    // --- ADDITIONAL DIVERSE PIECES ---
    Product p23 = new Product();
    p23.setName("Amulet Pendant Necklace");
    p23.setDescription("Protected hand of Fatima talisman coin necklace in silver.");
    p23.setPrice(2400.00);
    p23.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Necklace");
    p23.setStock(11);
    p23.setCategory("Jewelry");
    p23.setDiscountPercentage(0);
    p23.setType(ProductType.NECKLACE);
    productRepository.save(p23);

    Product p24 = new Product();
    p24.setName("Solitaire Diamond Nose Stud");
    p24.setDescription("Teeny tiny, high clarity conflict-free diamond piercing stud.");
    p24.setPrice(4100.00);
    p24.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Ring");
    p24.setStock(16);
    p24.setCategory("Jewelry");
    p24.setDiscountPercentage(10);
    p24.setType(ProductType.FINGER_RING); // Reused matching category
    productRepository.save(p24);

    Product p25 = new Product();
    p25.setName("Filigree Gold Ear Cuffs");
    p25.setDescription("No-piercing-needed elegant ear cuffs made from layered 18K gold leaf details.");
    p25.setPrice(3100.00);
    p25.setImageUrl("https://t3.ftcdn.net/jpg/12/90/94/08/240_F_1290940808_sJxP9KFh5EC5cFVZ89WnrHPKNKvsybcS.jpg?text=Earring");
    p25.setStock(19);
    p25.setCategory("Jewelry");
    p25.setDiscountPercentage(0);
    p25.setType(ProductType.EARRING);
    productRepository.save(p25);
            }
        };
    }
}
