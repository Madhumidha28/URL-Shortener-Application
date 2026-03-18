package com.example.urlshortener.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.urlshortener.model.URL;
import com.example.urlshortener.services.URLService;

@RestController
@RequestMapping("/api/urls")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class URLController {
	 
	private final URLService urlservice;
	
	public URLController(URLService service)
	{
		this.urlservice = service;
	}
	
	@GetMapping
	public List<URL> getAllUrls()
	{
		return urlservice.findAll(); 
	}
	
   @GetMapping("{id}")
   public ResponseEntity<URL> getById(@PathVariable Long id) {
       return urlservice.findById(id).map(ResponseEntity::ok)
               .orElseGet(() -> ResponseEntity.notFound().build());
   }
    
   @PostMapping
   public URL create(@RequestBody URL url) { 
       return urlservice.save(url); 
   }
   
   @PutMapping("{id}")
   public ResponseEntity<URL> update(@PathVariable Long id, @RequestBody URL url) {
       return urlservice.findById(id).map(existing -> {
       existing.setOriginalUrl(url.getOriginalUrl());
       existing.setShortCode(url.getShortCode());
       existing.setClickCount(url.getClickCount());
       urlservice.save(existing);
       return ResponseEntity.ok(existing);
       }).orElseGet(() -> ResponseEntity.notFound().build());
   }
   
   @GetMapping("/code/{shortCode}")
   public ResponseEntity<?> redirect(@PathVariable String shortCode) {

	   URL url = urlservice.findByShortCode(shortCode)
	            .orElseThrow(() -> new RuntimeException("Not found"));

	    //increment click count
	    url.setClickCount(url.getClickCount() + 1);
	    urlservice.save(url);

	    return ResponseEntity.status(302)
	            .header("Location", url.getOriginalUrl())
	            .build();
   }
}
