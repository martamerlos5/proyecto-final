package com.spring.back_spring.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.spring.back_spring.DTO.EventoDTO;
import com.spring.back_spring.Entity.Evento;

@Service
public interface EventoService {

    // ------------- GET -------------

    // GET: obtener todos los eventos
    public List<EventoDTO> obtenerEventos();

    // GET: obtener evento por ID
    public EventoDTO obtenerEventoPorId(Long id);

    // GET: obtener todos los eventos por un nombre (insertado por el usuario si lo
    // busca)
    public List<EventoDTO> obtenerEventosPorNombre(String nombre);

    // GET: obtener los 3 eventos más próximos
    public List<EventoDTO> obtenerEventosMasProximos();

    // GET: obtener los 3 últimos eventos añadidos a la api
    public List<EventoDTO> obtenerUltimosEventos();

    // GET: obtener todos los eventos por una categoría (filtro)
    public List<EventoDTO> obtenerEventosPorCategoria(Long id);

    // GET: obtener todos los eventos por una localidad (filtro)
    public List<EventoDTO> obtenerEventosPorLocalidad(Long id);

    // GET: obtener todos los eventos por precio descendente (filtro)
    public List<EventoDTO> obtenerEventosPorPrecioDescendente();

    // GET: obtener todos los eventos por precio ascendente (filtro)
    public List<EventoDTO> obtenerEventosPrecioAscendente();

    // ------------- POST -------------

    // // POST: crear evento (el evento viene en formato JSON) -> para admins
    public EventoDTO crearEvento(EventoDTO eventoDTO);

    // EventoDTO crearEventoMultipart(
    // String nombre,
    // String descripcion,
    // String fecha_inicio,
    // String fecha_fin,
    // String hora_inicio,
    // String hora_fin,
    // String lugar,
    // Long localidadId,
    // List<Long> categoriasId,
    // MultipartFile imagen);

    // ------------- PUT -------------

    // PUT: actualizar evento (el evento viene en formato JSON) -> para admins
    public EventoDTO actualizarEvento(Long id, EventoDTO eventoDTO);

    // ------------- DELETE -------------

    // DELETE: eliminar evento -> para admins
    public void eliminarEvento(Long id);

    // EXTRA
    // validar que las fechas y las horas sean correctas
    public void validarFechasYHoras(Evento evento);

}
