package com.spring.back_spring.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TipoEntradaDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private Double precio;
    private Long stockTotal;
    private Long stockDisponible;
    private Long eventoId;

}
