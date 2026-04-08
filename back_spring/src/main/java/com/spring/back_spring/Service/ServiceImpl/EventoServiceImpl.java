package com.spring.back_spring.Service.ServiceImpl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.spring.back_spring.DTO.EventoDTO;
import com.spring.back_spring.Entity.Categoria;
import com.spring.back_spring.Entity.Estado;
import com.spring.back_spring.Entity.Evento;
import com.spring.back_spring.Entity.Localidad;
import com.spring.back_spring.Mapper.EventoMapper;
import com.spring.back_spring.Repository.EventoRepository;
import com.spring.back_spring.Service.EventoService;

@Service
public class EventoServiceImpl implements EventoService {
    private final EventoRepository repositorio;
    private final EventoMapper mapper;

    public EventoServiceImpl(EventoRepository repositorio, EventoMapper mapper) {
        this.repositorio = repositorio;
        this.mapper = mapper;
    }

    // ------------- GET -------------

    // GET: obtener todos los eventos
    @Override
    public List<EventoDTO> obtenerEventos() {
        List<Evento> eventos = repositorio.findAll();

        eventos.forEach(this::actualizarEstadoEvento);

        return eventos.stream().map(mapper::toDTO).toList();

    }

    @Override
    public EventoDTO obtenerEventoPorId(Long id) {
        Optional<Evento> opt = repositorio.findById(id);
        if (opt.isEmpty()) {
            throw new RuntimeException("No se ha encontrado un evento con ese ID");
        }

        Evento evento = opt.get();

        actualizarEstadoEvento(evento);

        return mapper.toDTO(evento);
    }

    // GET: obtener todos los eventos por un nombre (insertado por el usuario si lo
    // busca)
    @Override
    public List<EventoDTO> obtenerEventosPorNombre(String nombre) {
        List<Evento> eventos = repositorio.findByNombreContaining(nombre);

        if (eventos.isEmpty()) {
            throw new RuntimeException("No se han encontrado eventos con ese nombre");
        }

        return eventos.stream().map(mapper::toDTO).toList();

    }

    @Override
    public List<EventoDTO> obtenerEventosMasProximos() {
        Pageable pageable = PageRequest.of(0, 3);
        List<Evento> eventos = repositorio.obtenerEventosMasProximos(LocalDate.now(), pageable);
        return eventos.stream().map(mapper::toDTO).toList();
    }

    @Override
    public List<EventoDTO> obtenerUltimosEventos() {
        Pageable pageable = PageRequest.of(0, 3);
        List<Evento> eventos = repositorio.obtenerUltimosEventos(pageable);
        return eventos.stream().map(mapper::toDTO).toList();
    }

    // GET: obtener todos los eventos/filtrar por UNA SOLA categoría (filtro)
    @Override
    public List<EventoDTO> obtenerEventosPorCategoria(Long id) {
        List<Evento> eventos = repositorio.findByCategoriasId(id);
        return eventos.stream().map(mapper::toDTO).toList();

    }

    // GET: obtener todos los eventos/filtrar por UNA SOLA localidad
    @Override
    public List<EventoDTO> obtenerEventosPorLocalidad(Long id) {
        List<Evento> eventos = repositorio.findByLocalidadId(id);
        return eventos.stream().map(mapper::toDTO).toList();
    }

    // GET: obtener todos los eventos por precio descendente
    @Override
    public List<EventoDTO> obtenerEventosPorPrecioDescendente() {
        Sort sort = Sort.by("precio").descending();

        List<Evento> eventos = repositorio.findAll(sort);

        return eventos.stream().map(mapper::toDTO).toList();

    }

    // GET: obtener todos los eventos por precio ascendente
    @Override
    public List<EventoDTO> obtenerEventosPrecioAscendente() {

        Sort sort = Sort.by("precio").ascending();

        List<Evento> eventos = repositorio.findAll(sort);

        return eventos.stream().map(mapper::toDTO).toList();

    }

    // ------------- POST -------------

    @Override
    public void validarFechasYHoras(Evento evento) {

        LocalDate hoy = LocalDate.now();

        if (evento.getFecha_inicio().isBefore(hoy)) {
            throw new RuntimeException("La fecha de inicio no puede ser anterior a hoy");
        }

        if (evento.getFecha_fin().isBefore(hoy)) {
            throw new RuntimeException("La fecha de fin no puede ser anterior a hoy");
        }

        if (evento.getFecha_fin().isBefore(evento.getFecha_inicio())) {
            throw new RuntimeException("La fecha de fin debe ser posterior a la fecha de inicio");
        }

        if (evento.getFecha_inicio().isEqual(evento.getFecha_fin())) {
            if (evento.getHora_fin().isBefore(evento.getHora_inicio())) {
                throw new RuntimeException("La hora de fin no puede ser anterior a la de inicio");
            }
        }
    }

    // para el estado Finalizado
    private void actualizarEstadoEvento(Evento evento) {
        LocalDate hoy = LocalDate.now();

        if (evento.getFecha_fin().isBefore(hoy) && evento.getEstado() == Estado.Activo) {
            evento.setEstado(Estado.Finalizado);
            repositorio.save(evento);
        }
    }

    // POST: crear evento (el evento viene en formato JSON) -> admins
    @Override
    public EventoDTO crearEvento(EventoDTO eventoDTO) {
        Evento evento = mapper.toEntity(eventoDTO);

        validarFechasYHoras(evento);

        // para que el estado llegue como Activo por defecto y no null
        evento.setEstado(Estado.Activo);

        // localidad : pasar del ID al objeto
        if (eventoDTO.getLocalidadId() != null) {
            Localidad localidad = new Localidad();
            localidad.setId(eventoDTO.getLocalidadId());
            evento.setLocalidad(localidad);
        }

        // categorías : pasar del ID a la lista de objetos
        if (eventoDTO.getCategoriasId() != null) {
            List<Categoria> categorias = eventoDTO.getCategoriasId().stream().map(id -> {
                Categoria cat = new Categoria();
                cat.setId(id);
                return cat;
            }).collect(Collectors.toList()); // <-- CAMBIADO AQUÍ

            evento.setCategorias(categorias);
        }

        Evento eventoNuevo = this.repositorio.save(evento);
        return mapper.toDTO(eventoNuevo);

    }

    // ------------- PUT -------------

    // PUT: actualizar evento (el evento viene en formato JSON) -> admins
    @Override
    public EventoDTO actualizarEvento(Long id, EventoDTO eventoDTO) {
        Optional<Evento> opt = repositorio.findById(id);

        if (opt.isEmpty()) {
            throw new RuntimeException("No se ha encontrado el evento");
        }

        Evento evento = opt.get();

        evento.setNombre(eventoDTO.getNombre());
        evento.setDescripcion(eventoDTO.getDescripcion());
        evento.setFecha_inicio(eventoDTO.getFecha_inicio());
        evento.setFecha_fin(eventoDTO.getFecha_fin());
        evento.setHora_inicio(eventoDTO.getHora_inicio());
        evento.setHora_fin(eventoDTO.getHora_fin());

        validarFechasYHoras(evento);

        evento.setLugar(eventoDTO.getLugar());

        evento.setEstado(Estado.valueOf(eventoDTO.getEstado())); // convertir el String a Enum

        if (eventoDTO.getLocalidadId() != null) {
            Localidad localidad = new Localidad();
            localidad.setId(eventoDTO.getLocalidadId());
            evento.setLocalidad(localidad);
        }

        if (eventoDTO.getCategoriasId() != null) {
            List<Categoria> categorias = eventoDTO.getCategoriasId().stream().map(idCategoria -> {
                Categoria categoria = new Categoria();
                categoria.setId(idCategoria);
                return categoria;
            }).collect(Collectors.toList());

            evento.setCategorias(categorias);
        }

        if (eventoDTO.getImagen() != null) {
            evento.setImagen(eventoDTO.getImagen());
        }

        Evento eventoActualizado = repositorio.save(evento);

        return mapper.toDTO(eventoActualizado);

    }

    // ------------- DELETE -------------

    // DELETE: eliminar un evento
    @Override
    public void eliminarEvento(Long id) {
        Optional<Evento> opt = repositorio.findById(id);
        if (opt.isEmpty()) {
            throw new RuntimeException("No se encontró el evento");
        }

        Evento evento = opt.get();

        repositorio.delete(evento);

    }


}
