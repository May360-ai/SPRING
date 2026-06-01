package com.uta.gestor_libreria.service.impl;

import com.uta.gestor_libreria.entity.Author;
import com.uta.gestor_libreria.repository.AuthorRepository;
import com.uta.gestor_libreria.service.AuthorService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AuthorServiceImpl implements AuthorService {
    private final AuthorRepository repo;
    public AuthorServiceImpl(AuthorRepository repo) { this.repo = repo; }

    @Override public List<Author> getAll() { return repo.findAll(); }
    @Override public Author getById(String id) { return repo.findById(id).orElse(null); }
    @Override public Author save(Author author) { return repo.save(author); }
    @Override public void delete(String id) { repo.deleteById(id); }
}
