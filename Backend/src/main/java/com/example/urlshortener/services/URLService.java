package com.example.urlshortener.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.urlshortener.model.URL;
import com.example.urlshortener.repository.URLRepository;

@Service 
public class URLService {
	
	private final URLRepository repo;
	
	public URLService(URLRepository repo)
	{
		this.repo = repo;
	}
	
	public List<URL> findAll() 
	{
		return repo.findAll(); 
	}
	
	public Optional<URL> findById(Long id) {
        return repo.findById(id);
    }
	
	public URL save(URL url) {
		url.setShortCode(generateShortCode());
        return repo.save(url);
    }
	
	public String generateShortCode()
	{
		return UUID.randomUUID().toString().substring(0,6);
	}

	public Optional<URL> findByShortCode(String shortCode) {
		return repo.findByShortCode(shortCode);
	}
}
