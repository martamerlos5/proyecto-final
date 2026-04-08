package com.spring.back_spring.Service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.spring.back_spring.DTO.CompraDTO;

@Service
public interface CompraService {
    // GET: obtener TODAS las Compras
    public List<CompraDTO> obtenerCompras();

    // GET: obtener Compra por ID
    public CompraDTO obtenerCompraPorId(Long id);

    // GET: obtener Compras por usuario
    public List<CompraDTO> obtenerComprasPorUsuario(Long usuarioId);

    // GET: obtener estadísticas
    public Map<String, Object> obtenerEstadisticas();

    // GET: obtener los 3 eventos más vendidos
    public List<String> obtenerTopTresEventos();

    // POST: comprar/registrar (crear) una Compra
    public CompraDTO crearCompra(CompraDTO dto);

    
    // DELETE: eliminar Compra
    public void eliminarCompra(Long id);

}
