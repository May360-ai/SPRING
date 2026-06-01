package com.uta.gestor_productos.service.impl;

import com.uta.gestor_productos.entity.Category;
import com.uta.gestor_productos.repository.CategoryRepository;
import com.uta.gestor_productos.service.CategoryService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository repo;
    public CategoryServiceImpl(CategoryRepository repo) { this.repo = repo; }

    @Override public List<Category> getAll() { return repo.findAll(); }
    @Override public Category getById(Long id) { return repo.findById(id).orElse(null); }
    @Override public Category save(Category c) { return repo.save(c); }
    @Override public void delete(Long id) { repo.deleteById(id); }
}
