package com.spring.back_spring.Mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.spring.back_spring.DTO.LocalidadDTO;
import com.spring.back_spring.Entity.Localidad;

@Component
public class LocalidadMapper {
    private final ModelMapper mapper = new ModelMapper();



    public LocalidadDTO toDTO(Localidad localidad) {
        return mapper.map(localidad, LocalidadDTO.class);
    }

    public Localidad toEntity(LocalidadDTO localidadDTO) {
        return mapper.map(localidadDTO, Localidad.class);
    }

}
