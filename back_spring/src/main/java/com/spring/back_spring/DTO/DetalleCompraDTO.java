package com.spring.back_spring.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DetalleCompraDTO {
    private Long tipoEntradaId;
    private String tipoEntradaNombre;
    private String eventoNombre;
    private Long cantidad;
    private Double precioUnitario;

}
