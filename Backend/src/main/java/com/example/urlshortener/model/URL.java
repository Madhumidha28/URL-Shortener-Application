package com.example.urlshortener.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;

@Entity
public class URL {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "original_url", nullable = false, length = 2048)
	private String originalUrl;
	
	@Column(name = "short_code", unique =true, nullable = false)
	private String shortCode;
	
	@Column(name = "created_on")
	private LocalDateTime createdOn;
	
	@Column(name = "click_count")
	private Integer clickCount = 0; 

	@PrePersist 
	public void prePersist() {
	    this.createdOn = LocalDateTime.now();
	    if (this.clickCount == null) {
	        this.clickCount = 0;
	    }
	}
	
	//constructors
	public URL() {}
	public URL(String originalUrl, String shortCode, LocalDateTime createdOn, Integer clickCount) {
		this.originalUrl = originalUrl;
		this.shortCode = shortCode;
		this.createdOn = createdOn;
		this.clickCount = clickCount;
	}

	//getters and setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getOriginalUrl() {
		return originalUrl;
	}

	public void setOriginalUrl(String originalUrl) {
		this.originalUrl = originalUrl;
	}

	public String getShortCode() {
		return shortCode;
	}

	public void setShortCode(String shortCode) {
		this.shortCode = shortCode;
	}

	public LocalDateTime getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(LocalDateTime createdOn) {
		this.createdOn = createdOn;
	}

	public Integer getClickCount() {
		return clickCount;
	}

	public void setClickCount(Integer clickCount) {
		this.clickCount = clickCount;
	}
}
