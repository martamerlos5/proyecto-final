package com.spring.back_spring.Mapper;

import org.springframework.stereotype.Component;

import com.spring.back_spring.DTO.DetalleCompraDTO;
import com.spring.back_spring.Entity.DetalleCompra;
import com.spring.back_spring.Entity.TipoEntrada;

@Component
public class DetalleCompraMapper {
    public DetalleCompra toEntity(DetalleCompraDTO detalleDTO, TipoEntrada tipoEntrada) {

        DetalleCompra detalle = new DetalleCompra();

        detalle.setTipoEntrada(tipoEntrada);
        detalle.setCantidad(detalleDTO.getCantidad());
        detalle.setPrecioUnitario(detalleDTO.getPrecioUnitario());

        return detalle;
    }

    // ENTITY → DTO
    public DetalleCompraDTO toDTO(DetalleCompra detalle) {
        DetalleCompraDTO dto = new DetalleCompraDTO();
        dto.setTipoEntradaId(detalle.getTipoEntrada().getId());
        dto.setCantidad(detalle.getCantidad());
        dto.setPrecioUnitario(detalle.getPrecioUnitario());

        // ESTO ES LO QUE TE FALTA RELLENAR:
        if (detalle.getTipoEntrada() != null) {
            dto.setTipoEntradaNombre(detalle.getTipoEntrada().getNombre());

            if (detalle.getTipoEntrada().getEvento() != null) {
                dto.setEventoNombre(detalle.getTipoEntrada().getEvento().getNombre());
            }
        }
        return dto;
    }
}
