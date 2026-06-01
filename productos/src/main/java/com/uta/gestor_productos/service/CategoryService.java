package com.uta.gestor_productos.service;

import com.uta.gestor_productos.entity.Category;
import java.util.List;

public interface CategoryService {
    List<Category> getAll();
    Category getById(Long id);
    Category save(Category category);
    void delete(Long id);
}
