package com.uta.gestor_libreria.service;

import com.uta.gestor_libreria.entity.Author;
import java.util.List;

public interface AuthorService {
    List<Author> getAll();
    Author getById(String id);
    Author save(Author author);
    void delete(String id);
}
