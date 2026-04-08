package com.spring.back_spring.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.back_spring.Entity.Categoria;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria,Long> {
    // Buscar categorías por nombre (contenga)
    public List<Categoria> findByNombreContainingIgnoreCase(String nombre);
    

}
