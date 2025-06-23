package com.englishlearning.service;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class BaseService<T> {
    // Base service class for common functionality
    // This can be extended by other services to inherit common methods or properties

    public void validateEntity(T entity) throws Exception {
        // Implement validation logic here
        if (entity == null) {
            throw new Exception("Entity cannot be null");
        }
        // Add more validation as needed
    }

    public void saveEntity(T entity) {
        // Implement save logic here
        // This could be a call to a repository or database
    }

    public void deleteEntity(Long id) {
        // Implement delete logic here
        // This could be a call to a repository or database
    }

    public T findEntityById(Long id) {
        // Implement find logic here
        // This could be a call to a repository or database
        return null; // Placeholder return statement
    }

    public List<T> findAllEntities() {
        // Implement find all logic here
        // This could be a call to a repository or database
        return null; // Placeholder return statement
    }

    public void updateEntity(T entity) {
        // Implement update logic here
        // This could be a call to a repository or database
    }
    
    public void validateEntityId(Long id) throws Exception {
        // Implement ID validation logic here
        if (id == null || id <= 0) {
            throw new Exception("Invalid entity ID");
        }
    }
}
