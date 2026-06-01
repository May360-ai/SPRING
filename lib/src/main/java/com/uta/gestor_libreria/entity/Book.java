package com.uta.gestor_libreria.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "libros")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    @Id
    @Column(name = "id", length = 20)
    private String id;

    @Column(name = "titulo", nullable = false, length = 20)
    private String titulo;

    @Column(name = "paginas", nullable = false, length = 20)
    private String paginas;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "autor_id", nullable = false)
    private Author author;
}
