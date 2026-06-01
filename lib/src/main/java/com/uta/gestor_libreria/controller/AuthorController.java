package com.uta.gestor_libreria.controller;

import com.uta.gestor_libreria.entity.Author;
import com.uta.gestor_libreria.service.AuthorService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/authors")
public class AuthorController {
    private final AuthorService service;
    public AuthorController(AuthorService service) { this.service = service; }

    @GetMapping public List<Author> getAll() { return service.getAll(); }
    @GetMapping("/{id}") public Author get(@PathVariable String id) { return service.getById(id); }
    @PostMapping public Author create(@RequestBody Author a) { return service.save(a); }
    @PutMapping("/{id}") public Author update(@PathVariable String id, @RequestBody Author a) {
        a.setId(id);
        return service.save(a);
    }
    @DeleteMapping("/{id}") public void delete(@PathVariable String id) { service.delete(id); }
}
