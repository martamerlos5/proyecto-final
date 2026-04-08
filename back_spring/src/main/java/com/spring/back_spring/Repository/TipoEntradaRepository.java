package com.spring.back_spring.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.back_spring.Entity.TipoEntrada;

@Repository
public interface TipoEntradaRepository extends JpaRepository<TipoEntrada,Long> {
    // GET: obtener los tipos de entrada de un evento
    public List<TipoEntrada> findByEventoId(Long eventoId);
    

}
