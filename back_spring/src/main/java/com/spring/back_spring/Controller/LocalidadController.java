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

import com.spring.back_spring.DTO.LocalidadDTO;
import com.spring.back_spring.Service.LocalidadService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/localidades")
public class LocalidadController {

    private final LocalidadService servicio;

    public LocalidadController(LocalidadService servicio) {
        this.servicio = servicio;
    }

    // ------------- GET -------------
    
    // GET: obtener todas las localidades
    @GetMapping
    public ResponseEntity<List<LocalidadDTO>> obtenerLocalidades() {
        List<LocalidadDTO> localidades = servicio.obtenerLocalidades();
        return ResponseEntity.ok(localidades);
    }

    // GET: buscar localidades por nombre
    @GetMapping("/buscar")
    public ResponseEntity<List<LocalidadDTO>> obtenerLocalidadesPorNombre(@RequestParam String nombre) {
        List<LocalidadDTO> localidades = servicio.obtenerLocalidadesPorNombre(nombre);
        return ResponseEntity.ok(localidades);
    }



    // ------------- POST -------------

    // POST: crear una localidad -> admins
    @PostMapping
    public ResponseEntity<LocalidadDTO> crearLocalidad(@RequestBody LocalidadDTO localidadDTO) {
        LocalidadDTO creada = servicio.crearLocalidad(localidadDTO);
        return ResponseEntity.ok(creada);
    }



    // ------------- PUT -------------

    // PUT: actualizar localidad por id -> admins
    @PutMapping("/{id}")
    public ResponseEntity<LocalidadDTO> actualizarLocalidad(@PathVariable Long id, @RequestBody LocalidadDTO localidadDTO) {
        LocalidadDTO actualizada = servicio.actualizarLocalidad(id, localidadDTO);
        return ResponseEntity.ok(actualizada);
    }


    
    // ------------- DELETE -------------

    // DELETE: eliminar una localidad por id -> admins
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarLocalidad(@PathVariable Long id) {
        servicio.eliminarLocalidad(id);
        return ResponseEntity.noContent().build();
    }

}