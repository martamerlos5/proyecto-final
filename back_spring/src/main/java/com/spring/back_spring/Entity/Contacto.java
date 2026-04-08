package com.spring.back_spring.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="contacto")
@Entity
public class Contacto {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name="email", nullable=false)
    private String email;

    @Column(name="nombre", nullable=false)
    private String nombre;

    @Column(name="motivo", nullable=false)
    private String motivo;

    @Column(name="asunto", nullable=false)
    private String asunto;

    @Column(name="mensaje", nullable=false)
    private String mensaje;
}
