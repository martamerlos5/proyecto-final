package com.spring.back_spring.Mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.spring.back_spring.DTO.CategoriaDTO;
import com.spring.back_spring.Entity.Categoria;



@Component
public class CategoriaMapper {
    private final ModelMapper mapper = new ModelMapper();


    public CategoriaDTO toDTO(Categoria categoria){
        return mapper.map(categoria, CategoriaDTO.class);
    }

    public Categoria toEntity(CategoriaDTO categoriaDTO){
        return mapper.map(categoriaDTO, Categoria.class);
    }

}
