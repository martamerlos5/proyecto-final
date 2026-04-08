package com.spring.back_spring.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.back_spring.Entity.Compra;


@Repository
public interface CompraRepository extends JpaRepository<Compra, Long> {
    // GET: obtener las compras de un usuario
    public List<Compra> findByUsuarioId(Long usuarioId);

}
