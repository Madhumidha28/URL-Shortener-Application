# URL Shortener Application

This is a full stack URL shortener application built using React and Spring Boot. It allows users to create short URLs, track clicks, and view statistics.

## Tech Stack
Frontend: React  
Backend: Spring Boot  
Database: MySQL  

## Features
- Create short URLs
- Redirect to original URL
- Track number of clicks
- View statistics using charts
- Pagination for URL list

## Project Structure
- Frontend: React application
- Backend: Spring Boot 
- Screenshots: UI images

## Prerequisites
Node.js installed
Java (JDK 17 or above)
MySQL installed
npm or yarn

## How to Run

### Backend
Run the Spring Boot application.
Default server: http://localhost:8081/api/urls

### Frontend
Run the following commands: 
npm install
npm run dev  

## Instructions to Run Frontend
cd Frontend
npm install
npm run dev

Open browser:
http://localhost:3000


## Assumptions or Tradeoffs

Short code generation uses a simple random approach
No authentication is implemented
Analytics are basic (click count only)
No caching is used for performance optimization

## Acceptance Criteria Covered

URL creation works
Redirect functionality works
Click count increments correctly
Recent URLs table is displayed
Analytics chart is implemented
UI is responsive

## Time Spent
Approximately 10–12 hours were spent on development, testing, and UI adjustments.
