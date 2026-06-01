package com.uta.gestor_productos.controller;

import com.uta.gestor_productos.entity.Category;
import com.uta.gestor_productos.service.CategoryService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryService service;
    public CategoryController(CategoryService service) { this.service = service; }

    @GetMapping public List<Category> getAll() { return service.getAll(); }
    @GetMapping("/{id}") public Category get(@PathVariable Long id) { return service.getById(id); }
    @PostMapping public Category create(@RequestBody Category c) { return service.save(c); }
    @PutMapping("/{id}") public Category update(@PathVariable Long id, @RequestBody Category c) {
        c.setId(id);
        return service.save(c);
    }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { service.delete(id); }
}
