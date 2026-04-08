package com.spring.back_spring.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.spring.back_spring.DTO.CategoriaDTO;

@Service
public interface CategoriaService {
    // GET: obtener todas las categorías
    public List<CategoriaDTO> obtenerCategorias();

    // GET: buscar categorías por nombre
    public List<CategoriaDTO> obtenerCategoriasPorNombre(String nombre);

    // POST: crear categoría
    public CategoriaDTO crearCategoria(CategoriaDTO categoriaDTO);

    // PUT: actualizar categoría
    public CategoriaDTO actualizarCategoria(Long id, CategoriaDTO categoriaDTO);

    // DELETE: eliminar categoría
    public void eliminarCategoria(Long id);

}
