package com.example.secretkeygenerator.controller;

import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.Base64;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class KeyGeneratorController {

    private static final SecureRandom secureRandom = new SecureRandom();

    @PostMapping("/generate-key")
    public String generateKey(@RequestParam int bits) {
        if (bits < 64 || bits > 4096 || bits % 8 != 0) {
            return "Invalid key length. Choose 64, 128, 256, 512, etc.";
        }

        byte[] key = new byte[bits / 8];
        secureRandom.nextBytes(key);
        return Base64.getEncoder().encodeToString(key);
    }
}
