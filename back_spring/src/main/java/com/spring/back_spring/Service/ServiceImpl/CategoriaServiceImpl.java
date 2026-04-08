package com.spring.back_spring.Service.ServiceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.spring.back_spring.DTO.CategoriaDTO;
import com.spring.back_spring.Entity.Categoria;
import com.spring.back_spring.Mapper.CategoriaMapper;
import com.spring.back_spring.Repository.CategoriaRepository;
import com.spring.back_spring.Service.CategoriaService;

@Service
public class CategoriaServiceImpl implements CategoriaService {
    private final CategoriaRepository repositorio;
    private final CategoriaMapper mapper;

    public CategoriaServiceImpl(CategoriaRepository repositorio, CategoriaMapper mapper) {
        this.repositorio = repositorio;
        this.mapper = mapper;
    }

    @Override
    public List<CategoriaDTO> obtenerCategorias() {
        List<Categoria> categorias = repositorio.findAll();
        return categorias.stream().map(mapper::toDTO).toList();
    }

    @Override
    public List<CategoriaDTO> obtenerCategoriasPorNombre(String nombre) {
        List<Categoria> categorias = repositorio.findByNombreContainingIgnoreCase(nombre);
        if (categorias.isEmpty()) {
            throw new RuntimeException("No se han encontrado categorías con ese nombre");
        }
        return categorias.stream().map(mapper::toDTO).toList();
    }

    @Override
    public CategoriaDTO crearCategoria(CategoriaDTO categoriaDTO) {
        Categoria categoria = mapper.toEntity(categoriaDTO);
        Categoria nueva = repositorio.save(categoria);
        return mapper.toDTO(nueva);
    }

    @Override
    public CategoriaDTO actualizarCategoria(Long id, CategoriaDTO categoriaDTO) {
        Optional<Categoria> opt = repositorio.findById(id);
        if (opt.isEmpty()) {
            throw new RuntimeException("No se ha encontrado la categoría");
        }
        Categoria categoria = opt.get();
        categoria.setNombre(categoriaDTO.getNombre());
        Categoria actualizada = repositorio.save(categoria);
        return mapper.toDTO(actualizada);
    }

    @Override
    public void eliminarCategoria(Long id) {
        Optional<Categoria> opt = repositorio.findById(id);
        if (opt.isEmpty()) {
            throw new RuntimeException("No se ha encontrado la categoría");
        }
        repositorio.delete(opt.get());
    }
}