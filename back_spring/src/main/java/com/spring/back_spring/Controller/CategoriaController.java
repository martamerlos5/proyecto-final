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

import com.spring.back_spring.DTO.CategoriaDTO;
import com.spring.back_spring.Service.CategoriaService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    private final CategoriaService servicio;

    public CategoriaController(CategoriaService servicio) {
        this.servicio = servicio;
    }

    // ------------- GET -------------

    // GET: obtener todas las catego y rías
    @GetMapping
    public ResponseEntity<List<CategoriaDTO>> obtenerCategorias() {
        List<CategoriaDTO> categorias = servicio.obtenerCategorias();
        return ResponseEntity.ok(categorias);
    }

    // GET: buscar categorías por nombre
    @GetMapping("/buscar")
    public ResponseEntity<List<CategoriaDTO>> obtenerCategoriasPorNombre(@RequestParam String nombre) {
        List<CategoriaDTO> categorias = servicio.obtenerCategoriasPorNombre(nombre);
        return ResponseEntity.ok(categorias);
    }



    // ------------- POST -------------

    // POST: crear categoría -> admins
    @PostMapping
    public ResponseEntity<CategoriaDTO> crearCategoria(@RequestBody CategoriaDTO categoriaDTO) {
        CategoriaDTO creada = servicio.crearCategoria(categoriaDTO);
        return ResponseEntity.ok(creada);
    }




    // ------------- PUT -------------

    // PUT: actualizar categoría por id -> admins
    @PutMapping("/{id}")
    public ResponseEntity<CategoriaDTO> actualizarCategoria(@PathVariable Long id,
            @RequestBody CategoriaDTO categoriaDTO) {
        CategoriaDTO actualizada = servicio.actualizarCategoria(id, categoriaDTO);
        return ResponseEntity.ok(actualizada);
    }




    // ------------- DELETE -------------

    // DELETE: eliminar categoría por id -> admins
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCategoria(@PathVariable Long id) {
        servicio.eliminarCategoria(id);
        return ResponseEntity.noContent().build();
    }

}