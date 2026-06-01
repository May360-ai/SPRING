package com.uta.gestor_productos.controller;

import com.uta.gestor_productos.entity.Product;
import com.uta.gestor_productos.service.ProductService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService service;
    public ProductController(ProductService service) { this.service = service; }

    @GetMapping public List<Product> getAll() { return service.getAll(); }
    @GetMapping("/{name}") public Product get(@PathVariable String name) { return service.getByName(name); }
    @PostMapping public Product create(@RequestBody Product p) { return service.save(p); }
    @PutMapping("/{oldName}") public Product update(@PathVariable String oldName, @RequestBody Product p) {
        return service.update(oldName, p);
    }
    @DeleteMapping("/{name}") public void delete(@PathVariable String name) { service.delete(name); }
}
