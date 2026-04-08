package com.spring.back_spring.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.spring.back_spring.DTO.LocalidadDTO;

@Service
public interface LocalidadService {
    // GET: obtener todas las localidades
    public List<LocalidadDTO> obtenerLocalidades();

    // GET: buscar localidades por nombre
    public List<LocalidadDTO> obtenerLocalidadesPorNombre(String nombre);

    // POST: crear localidad -> admin
    public LocalidadDTO crearLocalidad(LocalidadDTO localidadDTO);

    // PUT: actualizar localidad
    public LocalidadDTO actualizarLocalidad(Long id, LocalidadDTO localidadDTO);

    // DELETE: eliminar localidad
    public void eliminarLocalidad(Long id);

}
