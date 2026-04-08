package com.spring.back_spring.Mapper;

import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.spring.back_spring.DTO.CompraDTO;
import com.spring.back_spring.Entity.Compra;

@Component
public class CompraMapper {
    private final ModelMapper mapper = new ModelMapper();

    
    private final DetalleCompraMapper detalleCompraMapper;

    public CompraMapper(DetalleCompraMapper detalleCompraMapper) {
        this.detalleCompraMapper = detalleCompraMapper;
    }

    public CompraDTO toDTO(Compra compra) {
        CompraDTO dto = new CompraDTO();
        dto.setId(compra.getId());
        dto.setUsuarioId(compra.getUsuarioId());
        dto.setFechaCompra(compra.getFechaCompra());
        dto.setTotal(compra.getTotal());

        if (compra.getDetalles() != null) {
            dto.setDetalles(compra.getDetalles().stream()
                    .map(detalle -> detalleCompraMapper.toDTO(detalle))
                    .collect(Collectors.toList()));
        }
        return dto;
    }

    public Compra toEntity(CompraDTO compraDTO) {

        Compra compra = new Compra();

        compra.setUsuarioId(compraDTO.getUsuarioId());
        compra.setFechaCompra(compraDTO.getFechaCompra());
        compra.setTotal(compraDTO.getTotal());

        return compra;
    }
}
