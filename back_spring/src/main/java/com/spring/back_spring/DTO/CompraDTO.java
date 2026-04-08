package com.spring.back_spring.DTO;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompraDTO {
    private Long id;
    private Long usuarioId;
    private LocalDateTime fechaCompra;
    private Double total;
    private List<DetalleCompraDTO> detalles;

}
