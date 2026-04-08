package com.spring.back_spring.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.back_spring.Entity.Localidad;

@Repository
public interface LocalidadRepository extends JpaRepository<Localidad,Long>{
    // GET: buscar por nombre (que lo contenga)
    public List<Localidad> findByNombreContainingIgnoreCase(String nombre);

}
