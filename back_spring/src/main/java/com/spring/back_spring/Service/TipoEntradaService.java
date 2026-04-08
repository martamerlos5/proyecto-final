package com.spring.back_spring.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.spring.back_spring.DTO.TipoEntradaDTO;

@Service
public interface TipoEntradaService {
    

    // GET: todos los tipos de entrada de un evento
    public List<TipoEntradaDTO> obtenerTiposEntradaPorEvento(Long eventoId);

    // GET: tipo de entrada por ID
    public TipoEntradaDTO obtenerTipoEntradaPorId(Long id);

    // POST: crear tipo de entrada
    public TipoEntradaDTO crearTipoEntrada(TipoEntradaDTO tipoEntradaDTO);

    // PUT: actualizar tipo de entrada
    public TipoEntradaDTO actualizarTipoEntrada(Long id, TipoEntradaDTO tipoEntradaDTO);

    // DELETE: eliminar tipo de entrada
    public void eliminarTipoEntrada(Long id);
}