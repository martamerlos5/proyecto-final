package com.spring.back_spring.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table(name = "tipos_entrada")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TipoEntrada {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "evento_id", nullable = false)
    private Evento evento;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name="descripcion")
    private String descripcion;

    @Column(name = "precio", nullable = false)
    private Double precio;

    @Column(name = "stock_total", nullable = false)
    private Long stockTotal;

    // se irá modificando conforme se vayan adquiriendo entradas
    @Column(name = "stock_disponible", nullable = false)
    private Long stockDisponible;

 

}
