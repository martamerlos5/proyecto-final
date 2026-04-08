package com.spring.back_spring.Entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "eventos")
@Entity
public class Evento {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "nombre", nullable = false)
  private String nombre;

  @Column(name = "descripcion", nullable = true, length = 1000)
  private String descripcion;

  @Column(name = "fecha_inicio", nullable = false)
  private LocalDate fecha_inicio;

  @Column(name = "fecha_fin", nullable = false)
  private LocalDate fecha_fin;

  @Column(name="hora_inicio", nullable=false)
  private LocalTime hora_inicio;

  @Column(name="hora_fin", nullable=false)
  private LocalTime hora_fin;

  @Column(name = "lugar", nullable = false)
  private String lugar;

  @Enumerated(EnumType.STRING)
  @Column(name = "estado", nullable = true)
  private Estado estado;

  @ManyToOne
  @JoinColumn(name = "localidad_id")
  private Localidad localidad;


  @Column(name = "imagen", nullable = true)
  private String imagen;

  // relación con Entrada. Un evento tiene muchos tipos de entradas.
  @OneToMany(mappedBy = "evento", cascade = CascadeType.ALL)
  @ToString.Exclude
  private List<TipoEntrada> tipoEntradas;


  @ManyToMany
  @JoinTable(name = "evento_tiene_categorias", // nombre de la tabla de la relación N:M
      joinColumns = @JoinColumn(name = "evento_id"), // fk hacia Evento
      inverseJoinColumns = @JoinColumn(name = "categoria_id") // fk hacia Categoria
  )
  private List<Categoria> categorias;

}
