package com.spring.back_spring.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.back_spring.DTO.CompraDTO;
import com.spring.back_spring.Service.CompraService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/compras")
public class CompraController {

    private final CompraService servicio;

    public CompraController(CompraService servicio) {
        this.servicio = servicio;
    }

    // ------------- GET -------------

    // GET: obtener todas las compras
    @GetMapping
    public ResponseEntity<List<CompraDTO>> obtenerCompras() {
        List<CompraDTO> compras = servicio.obtenerCompras();
        return ResponseEntity.ok(compras);
    }

    // GET: obtener compra por ID
    @GetMapping("/{id}")
    public ResponseEntity<CompraDTO> obtenerCompraPorId(@PathVariable Long id) {
        CompraDTO compra = servicio.obtenerCompraPorId(id);
        return ResponseEntity.ok(compra);
    }

    // GET: obtener Compras por usuario
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<CompraDTO>> obtenerComprasPorUsuario(@PathVariable Long usuarioId) {
        List<CompraDTO> compras = servicio.obtenerComprasPorUsuario(usuarioId);
        return ResponseEntity.ok(compras);
    }

    // GET: obtener estadísticas
    @GetMapping("/estadisticas")
    public ResponseEntity<Map<String, Object>> obtenerEstadisticas() {
        return ResponseEntity.ok(servicio.obtenerEstadisticas());
    }

    // GET: obtener los 3 eventos más vendidos
    @GetMapping("/estadisticas/top3-eventos")
    public ResponseEntity<List<String>> obtenerTop3Eventos() {
        return ResponseEntity.ok(servicio.obtenerTopTresEventos());
    }

    // ------------- POST -------------

    // POST: comprar/registrar (crear) compra
    @PostMapping
    public ResponseEntity<CompraDTO> crearCompra(@RequestBody CompraDTO compraDTO) {
        CompraDTO compra = servicio.crearCompra(compraDTO);
        return ResponseEntity.ok(compra);
    }

    // ------------- DELETE -------------

    // DELETE: eliminar compra
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCompra(@PathVariable Long id) {
        servicio.eliminarCompra(id);
        return ResponseEntity.noContent().build();
    }
}