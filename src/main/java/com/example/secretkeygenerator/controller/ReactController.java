package com.example.secretkeygenerator.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReactController {
    @RequestMapping("/{path:[^.]*]}")
    public String forward() {
        return "forward:/";
    }
}
