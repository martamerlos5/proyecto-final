package com.spring.back_spring.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactoDTO {
    private Long id;
    private String email;
    private String nombre;
    private String motivo;
    private String asunto;
    private String mensaje;

}
