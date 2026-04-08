package com.spring.back_spring.Mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.spring.back_spring.DTO.EventoDTO;
import com.spring.back_spring.DTO.TipoEntradaDTO;
import com.spring.back_spring.Entity.Evento;

@Component
public class EventoMapper {

    private final ModelMapper mapper = new ModelMapper();

    public EventoDTO toDTO(Evento evento) {
        EventoDTO eventoDTO = mapper.map(evento, EventoDTO.class);

        if (evento.getLocalidad() != null) {
            eventoDTO.setLocalidadId(evento.getLocalidad().getId());

            eventoDTO.setLocalidadNombre(evento.getLocalidad().getNombre());
        }

        if (evento.getCategorias() != null) {
            eventoDTO.setCategoriasId(evento.getCategorias().stream().map(categoria -> categoria.getId()).toList());
            eventoDTO.setCategoriasNombres(
                    evento.getCategorias().stream().map(categoria -> categoria.getNombre()).toList());
        }

        if (evento.getTipoEntradas() != null) {
            eventoDTO.setTiposEntrada(
                    evento.getTipoEntradas().stream().map(te -> {
                        TipoEntradaDTO dto = new TipoEntradaDTO();
                        dto.setId(te.getId());
                        dto.setNombre(te.getNombre());
                        dto.setPrecio(te.getPrecio());
                        dto.setStockTotal(te.getStockTotal());
                        dto.setStockDisponible(te.getStockDisponible());
                        dto.setEventoId(evento.getId());
                        return dto;
                    }).toList());
        }

        return eventoDTO;
    }

    public Evento toEntity(EventoDTO eventoDTO) {
        // return mapper.map(eventoDTO, Evento.class);

        Evento evento = new Evento();

        evento.setNombre(eventoDTO.getNombre());
        evento.setDescripcion(eventoDTO.getDescripcion());
        evento.setFecha_inicio(eventoDTO.getFecha_inicio());
        evento.setFecha_fin(eventoDTO.getFecha_fin());
        evento.setHora_inicio(eventoDTO.getHora_inicio());
        evento.setHora_fin(eventoDTO.getHora_fin());
        evento.setLugar(eventoDTO.getLugar());
        evento.setImagen(eventoDTO.getImagen());

        return evento;

    }

}
