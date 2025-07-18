package com.java_api.justask_backend.Controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.java_api.justask_backend.RequestData.CategoryRequest;
import com.java_api.justask_backend.RequestData.UserRequest;
import com.java_api.justask_backend.RequestData.productRequest;
import com.java_api.justask_backend.entities.APIResponse;
import com.java_api.justask_backend.entities.category_class;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/justAsk")

public class category {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @PostMapping("/get_cat")
    public ResponseEntity<APIResponse> getCategoryType(@Valid @RequestBody CategoryRequest p_requestdata) {
        APIResponse response;
        category_class rpt = new category_class();
        response = rpt.getCategoryType(jdbcTemplate, p_requestdata);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/save_user")
    public ResponseEntity<APIResponse> save_user(@Valid @RequestBody UserRequest p_requestdata) {
        APIResponse response;
        user rpt = new user();
        response = rpt.save_user(jdbcTemplate, p_requestdata);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/save_product")
    public ResponseEntity<APIResponse> save_product(@Valid @RequestBody productRequest p_requestdata) {
        APIResponse response;
        product rpt = new product();
        response = rpt.save_product(jdbcTemplate, p_requestdata);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/get_product")
    public ResponseEntity<APIResponse> get_product(@Valid @RequestBody productRequest p_requestdata) {
        APIResponse response;
        product rpt = new product();
        response = rpt.get_product(jdbcTemplate, p_requestdata);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/save_cart")
    public ResponseEntity<APIResponse> save_cart(@Valid @RequestBody productRequest p_requestdata) {
        APIResponse response;
        product rpt = new product();
        response = rpt.save_cart(jdbcTemplate, p_requestdata);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/get_cart")
    public ResponseEntity<APIResponse> get_cart(@Valid @RequestBody productRequest p_requestdata) {
        APIResponse response;
        product rpt = new product();
        response = rpt.get_cart(jdbcTemplate, p_requestdata);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/edit_profile")
    public ResponseEntity<APIResponse> edit_profile(@Valid @RequestBody UserRequest p_requestdata) {
        APIResponse response;
        user rpt = new user();
        response = rpt.edit_profile(jdbcTemplate, p_requestdata);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/get_profile")
    public ResponseEntity<APIResponse> get_profile(@Valid @RequestBody UserRequest p_requestdata) {
        APIResponse response;
        user rpt = new user();
        response = rpt.get_profile(jdbcTemplate, p_requestdata);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/save_order")
    public ResponseEntity<APIResponse> save_order(@Valid @RequestBody productRequest p_requestdata) {
        APIResponse response;
        product rpt = new product();
        response = rpt.save_order(jdbcTemplate, p_requestdata);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/get_orders")
    public ResponseEntity<APIResponse> get_orders(@Valid @RequestBody productRequest p_requestdata) {
        APIResponse response;
        product rpt = new product();
        response = rpt.get_orders(jdbcTemplate, p_requestdata);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/cancel_orders")
    public ResponseEntity<APIResponse> cancel_orders(@Valid @RequestBody productRequest p_requestdata) {
        APIResponse response;
        product rpt = new product();
        response = rpt.cancel_orders(jdbcTemplate, p_requestdata);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<APIResponse> user_login(@Valid @RequestBody UserRequest p_requestdata) {
        APIResponse response;
        user rpt = new user();
        response = rpt.user_login(jdbcTemplate, p_requestdata);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Configuration
    public class WebConfig implements WebMvcConfigurer {

        @Override
        public void addResourceHandlers(ResourceHandlerRegistry registry) {
            registry.addResourceHandler("/uploads/**")
                    .addResourceLocations("file:/C:/Akshu/Projects/ecommerce-website/justask_backend/uploads/");
        }
    }

    private static final String UPLOAD_DIR = "C:/Akshu/Projects/ecommerce-website/justask_backend/uploads/";

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("image") MultipartFile file) {
        try {
            // Create upload folder if it doesn't exist
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // Create a safe unique file name
            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            File destination = new File(uploadDir, filename);
            file.transferTo(destination);

            // Return URL assuming static resource mapping
            String imageUrl = "http://localhost:8080/uploads/" + filename;

            return ResponseEntity.ok(Map.of("url", imageUrl));
        } catch (IOException e) {
            e.printStackTrace(); // helpful during debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Image upload failed", "message", e.getMessage()));
        }
    }
}
