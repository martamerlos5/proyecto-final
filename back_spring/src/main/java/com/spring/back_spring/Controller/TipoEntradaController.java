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
import org.springframework.web.bind.annotation.RestController;

import com.spring.back_spring.DTO.TipoEntradaDTO;
import com.spring.back_spring.Service.TipoEntradaService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/tipos-entrada")
public class TipoEntradaController {

    private final TipoEntradaService servicio;

    public TipoEntradaController(TipoEntradaService servicio) {
        this.servicio = servicio;
    }

    // ------------- GET -------------

    @GetMapping("/evento/{eventoId}")
    public ResponseEntity<List<TipoEntradaDTO>> obtenerTiposEntrada(@PathVariable Long eventoId) {
        return ResponseEntity.ok(servicio.obtenerTiposEntradaPorEvento(eventoId));
    }


    @GetMapping("/detalle/{id}")
    public ResponseEntity<TipoEntradaDTO> obtenerTipoEntrada(@PathVariable Long id) {
        return ResponseEntity.ok(servicio.obtenerTipoEntradaPorId(id));
    }



    // ------------- POST -------------

    @PostMapping
    public ResponseEntity<TipoEntradaDTO> crearTipoEntrada(@RequestBody TipoEntradaDTO tipoEntradaDTO) {
        TipoEntradaDTO tipoEntrada = servicio.crearTipoEntrada(tipoEntradaDTO);
        return ResponseEntity.ok(tipoEntrada);
    }



    // ------------- PUT -------------

    @PutMapping("/detalle/{id}")
    public ResponseEntity<TipoEntradaDTO> tipoEntradaDTO(@PathVariable Long id,
                                                                @RequestBody TipoEntradaDTO dto) {
        TipoEntradaDTO tipoEntrada = servicio.actualizarTipoEntrada(id, dto);
        return ResponseEntity.ok(tipoEntrada);
    }



    // ------------- DELETE -------------

    @DeleteMapping("/detalle/{id}")
    public ResponseEntity<Void> eliminarTipoEntrada(@PathVariable Long id) {
        servicio.eliminarTipoEntrada(id);
        return ResponseEntity.noContent().build();
    }
}