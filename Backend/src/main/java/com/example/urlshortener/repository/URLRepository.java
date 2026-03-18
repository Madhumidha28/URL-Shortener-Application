package com.example.urlshortener.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.urlshortener.model.URL;

@Repository
public interface URLRepository extends JpaRepository<URL, Long>{
	
	Optional<URL> findByShortCode(String shortCode);
}
