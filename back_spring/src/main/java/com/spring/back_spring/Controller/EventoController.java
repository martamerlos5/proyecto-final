package com.spring.back_spring.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.back_spring.DTO.EventoDTO;
import com.spring.back_spring.Service.EventoService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/eventos")
public class EventoController {
    private final EventoService servicio;

    public EventoController(EventoService servicio) {
        this.servicio = servicio;
    }

    // ------------- GET -------------

    // GET: obtener todos los eventos
    @GetMapping
    public ResponseEntity<List<EventoDTO>> obtenerEventos() {
        List<EventoDTO> eventos = servicio.obtenerEventos();
        return ResponseEntity.ok(eventos);
    }

    // GET: obtener todos los eventos por ID
    @GetMapping("/{id}")
    public ResponseEntity<EventoDTO> obtenerEventoPorId(@PathVariable Long id) {
        EventoDTO evento = servicio.obtenerEventoPorId(id);
        return ResponseEntity.ok(evento);
    }

    // GET: obtener todos los eventos por un nombre (insertado por el usuario si lo
    // busca)
    @GetMapping("/resultados")
    public ResponseEntity<List<EventoDTO>> obtenerEventosPorNombre(@RequestParam String nombre) {
        List<EventoDTO> eventos = servicio.obtenerEventosPorNombre(nombre);
        return ResponseEntity.ok(eventos);
    }

    @GetMapping("/proximos")
    public ResponseEntity<List<EventoDTO>> getProximosEventos() {
        List<EventoDTO> eventos = servicio.obtenerEventosMasProximos();
        return ResponseEntity.ok(eventos);
    }

    @GetMapping("/ultimos")
    public ResponseEntity<List<EventoDTO>> getUltimosEventos() {
        List<EventoDTO> eventos = servicio.obtenerUltimosEventos();
        return ResponseEntity.ok(eventos);
    }

    // // GET: obtener todos los eventos por UNA SOLA categoría (filtro)
    @GetMapping("/categoria/{id}")
    public ResponseEntity<List<EventoDTO>> obtenerEventosPorCategoria(@PathVariable Long id) {
        List<EventoDTO> eventos = servicio.obtenerEventosPorCategoria(id);
        return ResponseEntity.ok(eventos);
    }

    // obtener todos los eventos por UNA SOLA LOCALIDAD
    @GetMapping("/localidad/{id}")
    public ResponseEntity<List<EventoDTO>> obtenerEventosPorLocalidad(@PathVariable Long id) {
        List<EventoDTO> eventos = servicio.obtenerEventosPorLocalidad(id);
        return ResponseEntity.ok(eventos);

    }

    // ------------- POST -------------

    // POST: crear evento -> admins
    @PostMapping
    public ResponseEntity<EventoDTO> crearEvento(@RequestBody EventoDTO eventoDTO) {
        EventoDTO evento = servicio.crearEvento(eventoDTO);
        return ResponseEntity.ok(evento);
    }

    // @PostMapping(consumes = "multipart/form-data")
    // public ResponseEntity<EventoDTO> crearEvento(
    // @RequestParam String nombre,
    // @RequestParam(required = false) String descripcion,
    // @RequestParam String fecha_inicio,
    // @RequestParam String fecha_fin,
    // @RequestParam String hora_inicio,
    // @RequestParam String hora_fin,
    // @RequestParam String lugar,
    // @RequestParam Long localidadId,
    // @RequestParam(required = false) List<Long> categoriasId,
    // @RequestParam(required = false) MultipartFile imagen) {

    // EventoDTO dto = servicio.crearEventoMultipart(
    // nombre,
    // descripcion,
    // fecha_inicio,
    // fecha_fin,
    // hora_inicio,
    // hora_fin,
    // lugar,
    // localidadId,
    // categoriasId,
    // imagen);

    // return ResponseEntity.ok(dto);
    // }

    // ------------- PUT -------------

    // PUT: actualizar evento (el evento viene en formato JSON) -> admins
    @PutMapping("/{id}")
    public ResponseEntity<EventoDTO> actualizarEvento(@PathVariable Long id, @RequestBody EventoDTO eventoDTO) {
        EventoDTO evento = servicio.actualizarEvento(id, eventoDTO);
        return ResponseEntity.ok(evento);

    }

    // ------------- DELETE -------------

    // DELETE: eliminar un evento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEvento(@PathVariable Long id) {
        servicio.eliminarEvento(id);
        return ResponseEntity.noContent().build();

    }

}
