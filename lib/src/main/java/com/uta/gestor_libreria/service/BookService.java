package com.uta.gestor_libreria.service;

import com.uta.gestor_libreria.entity.Book;
import java.util.List;

public interface BookService {
    List<Book> getAll();
    Book getById(String id);
    Book save(Book book);
    Book update(String oldId, Book book);
    void delete(String id);
}
