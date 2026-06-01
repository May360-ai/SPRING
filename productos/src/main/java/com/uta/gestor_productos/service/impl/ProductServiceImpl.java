package com.uta.gestor_productos.service.impl;

import com.uta.gestor_productos.entity.Product;
import com.uta.gestor_productos.repository.ProductRepository;
import com.uta.gestor_productos.service.ProductService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository repo;
    public ProductServiceImpl(ProductRepository repo) { this.repo = repo; }

    @Override public List<Product> getAll() { return repo.findAll(); }
    @Override public Product getByName(String name) { return repo.findById(name).orElse(null); }
    @Override public Product save(Product p) { return repo.save(p); }

    @Override
    @Transactional
    public Product update(String oldName, Product p) {
        if (!oldName.equals(p.getNombre())) {
            repo.deleteById(oldName); // Si el nombre cambió, borramos el viejo y creamos el nuevo
        }
        return repo.save(p);
    }

    @Override public void delete(String name) { repo.deleteById(name); }
}
