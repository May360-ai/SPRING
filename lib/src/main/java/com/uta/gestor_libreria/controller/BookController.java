package com.uta.gestor_libreria.controller;

import com.uta.gestor_libreria.entity.Book;
import com.uta.gestor_libreria.service.BookService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {
    private final BookService service;
    public BookController(BookService service) { this.service = service; }

    @GetMapping public List<Book> getAll() { return service.getAll(); }
    @GetMapping("/{id}") public Book get(@PathVariable String id) { return service.getById(id); }
    @PostMapping public Book create(@RequestBody Book b) { return service.save(b); }
    @PutMapping("/{oldId}") public Book update(@PathVariable String oldId, @RequestBody Book b) {
        return service.update(oldId, b);
    }
    @DeleteMapping("/{id}") public void delete(@PathVariable String id) { service.delete(id); }
}
