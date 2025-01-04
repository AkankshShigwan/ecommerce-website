package com.java_api.justask_backend.Controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    
}

