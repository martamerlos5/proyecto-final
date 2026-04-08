package com.spring.back_spring.Service.ServiceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.spring.back_spring.DTO.TipoEntradaDTO;
import com.spring.back_spring.Entity.Estado;
import com.spring.back_spring.Entity.Evento;
import com.spring.back_spring.Entity.TipoEntrada;
import com.spring.back_spring.Mapper.TipoEntradaMapper;
import com.spring.back_spring.Repository.EventoRepository;
import com.spring.back_spring.Repository.TipoEntradaRepository;
import com.spring.back_spring.Service.TipoEntradaService;

@Service
public class TipoEntradaServiceImpl implements TipoEntradaService {

    private final TipoEntradaRepository repositorio;
    private final EventoRepository repositorioEvento;
    private final TipoEntradaMapper mapper;

    public TipoEntradaServiceImpl(TipoEntradaRepository repositorio, EventoRepository repositorioEvento,
            TipoEntradaMapper mapper) {
        this.repositorio = repositorio;
        this.repositorioEvento = repositorioEvento;
        this.mapper = mapper;
    }

    @Override
    public List<TipoEntradaDTO> obtenerTiposEntradaPorEvento(Long eventoId) {
        Evento evento = new Evento();
        evento.setId(eventoId);

        Evento ev = repositorioEvento.findById(eventoId)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));

        // si el estado está marcado como Finalizado o Cancelado -> no se muestran las
        // entradas
        if (ev.getEstado() == Estado.Finalizado || ev.getEstado() == Estado.Cancelado) {
            return List.of();
        }

        List<TipoEntrada> lista = repositorio.findByEventoId(eventoId);
        return lista.stream().map(mapper::toDTO).toList();
    }

    @Override
    public TipoEntradaDTO obtenerTipoEntradaPorId(Long id) {
        Optional<TipoEntrada> opt = repositorio.findById(id);
        if (opt.isEmpty()) {
            throw new RuntimeException("No se encontró el tipo de entrada");
        }

        return mapper.toDTO(opt.get());
    }

    @Override
    public TipoEntradaDTO crearTipoEntrada(TipoEntradaDTO tipoDTO) {
        TipoEntrada tipo = mapper.toEntity(tipoDTO);

        // asignar evento solo por ID !!!!!
        Evento evento = new Evento();
        evento.setId(tipoDTO.getEventoId());
        tipo.setEvento(evento);

        TipoEntrada tipoNuevo = repositorio.save(tipo);
        return mapper.toDTO(tipoNuevo);
    }

    @Override
    public TipoEntradaDTO actualizarTipoEntrada(Long id, TipoEntradaDTO tipoDTO) {
        Optional<TipoEntrada> opt = repositorio.findById(id);
        if (opt.isEmpty()) {
            throw new RuntimeException("No se encontró el tipo de entrada");
        }

        TipoEntrada tipo = opt.get();
        tipo.setNombre(tipoDTO.getNombre());
        tipo.setPrecio(tipoDTO.getPrecio());
        tipo.setDescripcion(tipoDTO.getDescripcion());
        tipo.setStockTotal(tipoDTO.getStockTotal());
        tipo.setStockDisponible(tipoDTO.getStockDisponible());

        if (tipoDTO.getStockDisponible() > tipoDTO.getStockTotal()) {
            throw new RuntimeException("El stock disponible no puede ser mayor que el total");
        }

        TipoEntrada tipoActualizado = repositorio.save(tipo);
        return mapper.toDTO(tipoActualizado);
    }

    @Override
    public void eliminarTipoEntrada(Long id) {
        Optional<TipoEntrada> opt = repositorio.findById(id);
        if (opt.isEmpty()) {
            throw new RuntimeException("No se encontró el tipo de entrada");
        }

        repositorio.delete(opt.get());
    }
}