package com.spring.back_spring.Mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.spring.back_spring.DTO.TipoEntradaDTO;
import com.spring.back_spring.Entity.TipoEntrada;

@Component
public class TipoEntradaMapper {
    private final ModelMapper mapper = new ModelMapper();

    public TipoEntradaDTO toDTO(TipoEntrada tipoEntrada) {
        return mapper.map(tipoEntrada, TipoEntradaDTO.class);
    }

    public TipoEntrada toEntity(TipoEntradaDTO tipoEntradaDTO) {
        return mapper.map(tipoEntradaDTO, TipoEntrada.class);
    }

}
