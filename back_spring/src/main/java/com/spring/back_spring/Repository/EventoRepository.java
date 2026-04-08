package com.spring.back_spring.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.back_spring.Entity.Evento;

public interface EventoRepository extends JpaRepository<Evento, Long> {
    // filtrar por nombre (buscar) - usando Containing no es necesario escribir la
    // consulta con like '%param%'
    public List<Evento> findByNombreContaining(String nombre);

    // para el menú lateral (menu.jsx) - debe hacer join
    public List<Evento> findByCategoriasId(Long id);

    // para el menú lateral (menu.jsx) - debe hacer join
    public List<Evento> findByLocalidadId(Long id);

    // para 'explora los eventos más próximos' del index . Pageable es para limitar
    // los resultados
    @Query("SELECT e FROM Evento e WHERE e.fecha_inicio >= :fechaActual ORDER BY e.fecha_inicio ASC")
    public List<Evento> obtenerEventosMasProximos(@Param("fechaActual") LocalDate fechaActual, Pageable pageable);

    // para el 'últimos eventos añadidos' del menú lateral (en Menu.jsx)
    @Query("SELECT e FROM Evento e ORDER BY e.id DESC")
    public List<Evento> obtenerUltimosEventos(Pageable pageable);

}
