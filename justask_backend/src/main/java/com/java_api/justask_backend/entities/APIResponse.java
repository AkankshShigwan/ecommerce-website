package com.java_api.justask_backend.entities;

import java.util.ArrayList;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;

public class APIResponse {
    public HttpStatus status;
    public String message;
    public ArrayList data = null;
    public int tot_recs;
    public int pnd_recs;

    public APIResponse(HttpStatus status) {
        this.status = status;
        tot_recs = 0;
        pnd_recs = 0;
    }

    public APIResponse(HttpStatus status, String message, ArrayList data) {
        this.status = status;
        this.message = message;
        this.data = data;
        tot_recs = 0;
        pnd_recs = 0;
    }
}
