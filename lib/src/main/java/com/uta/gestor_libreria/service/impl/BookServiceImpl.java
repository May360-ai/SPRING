package com.uta.gestor_libreria.service.impl;

import com.uta.gestor_libreria.entity.Book;
import com.uta.gestor_libreria.repository.BookRepository;
import com.uta.gestor_libreria.service.BookService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {
    private final BookRepository repo;
    public BookServiceImpl(BookRepository repo) { this.repo = repo; }

    @Override public List<Book> getAll() { return repo.findAll(); }
    @Override public Book getById(String id) { return repo.findById(id).orElse(null); }
    @Override public Book save(Book book) { return repo.save(book); }

    @Override
    @Transactional
    public Book update(String oldId, Book book) {
        if (!oldId.equals(book.getId())) {
            repo.deleteById(oldId);
        }
        return repo.save(book);
    }

    @Override public void delete(String id) { repo.deleteById(id); }
}
