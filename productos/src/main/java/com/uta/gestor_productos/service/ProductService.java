package com.uta.gestor_productos.service;

import com.uta.gestor_productos.entity.Product;
import java.util.List;

public interface ProductService {
    List<Product> getAll();
    Product getByName(String nombre);
    Product save(Product product);
    Product update(String oldName, Product product);
    void delete(String nombre);
}
