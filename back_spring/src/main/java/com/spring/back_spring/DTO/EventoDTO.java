package com.spring.back_spring.DTO;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventoDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private LocalDate fecha_inicio;
    private LocalDate fecha_fin;
    private LocalTime hora_inicio;
    private LocalTime hora_fin;
    private String lugar;
    private String estado;

    // por la relación N:M entre evento y categoria, es una lista de ids
    private List<Long> categoriasId;
    private List<String> categoriasNombres;

    private Long localidadId;
    private String localidadNombre;

    private List<TipoEntradaDTO> tiposEntrada;
    private String imagen;

}
