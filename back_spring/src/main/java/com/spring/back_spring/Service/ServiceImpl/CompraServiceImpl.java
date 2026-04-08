package com.spring.back_spring.Service.ServiceImpl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.spring.back_spring.DTO.CompraDTO;
import com.spring.back_spring.DTO.DetalleCompraDTO;
import com.spring.back_spring.Entity.Compra;
import com.spring.back_spring.Entity.DetalleCompra;
import com.spring.back_spring.Entity.TipoEntrada;
import com.spring.back_spring.Mapper.CompraMapper;
import com.spring.back_spring.Mapper.DetalleCompraMapper;
import com.spring.back_spring.Repository.CompraRepository;
import com.spring.back_spring.Repository.TipoEntradaRepository;
import com.spring.back_spring.Service.CompraService;

@Service
public class CompraServiceImpl implements CompraService {

    private final CompraRepository repositorio;
    private final TipoEntradaRepository tipoRepository;
    private final CompraMapper mapper;
    private final DetalleCompraMapper detallemapper;

    public CompraServiceImpl(CompraRepository repositorio, TipoEntradaRepository tipoRepository, CompraMapper mapper,
            DetalleCompraMapper detallemapper) {
        this.repositorio = repositorio;
        this.tipoRepository = tipoRepository;
        this.mapper = mapper;
        this.detallemapper = detallemapper;
    }

    // ------------- GET -------------

    // GET: obtener TOODAS las Compras
    @Override
    public List<CompraDTO> obtenerCompras() {
        List<Compra> compras = repositorio.findAll();
        return compras.stream().map(mapper::toDTO).toList();
    }

    // GET: obtener Compra por ID
    @Override
    public CompraDTO obtenerCompraPorId(Long id) {
        Optional<Compra> opt = repositorio.findById(id);

        if (opt.isEmpty()) {
            throw new RuntimeException("No se ha encontrado la compra");
        }

        return mapper.toDTO(opt.get());
    }

    // GET: obtener Compras por usuario
    @Override
    public List<CompraDTO> obtenerComprasPorUsuario(Long usuarioId) {

        List<Compra> compras = repositorio.findByUsuarioId(usuarioId);

        if (compras.isEmpty()) {
            throw new RuntimeException("No se han encontrado Compras para ese usuario");
        }

        return compras.stream().map(mapper::toDTO).toList();
    }

    @Override
    public Map<String, Object> obtenerEstadisticas() {

        List<Compra> compras = repositorio.findAll();

        double ingresosTotales = compras.stream()
                .mapToDouble(Compra::getTotal)
                .sum();

        int totalCompras = compras.size();

        long entradasVendidas = compras.stream()
                .flatMap(c -> c.getDetalles().stream())
                .mapToLong(DetalleCompra::getCantidad)
                .sum();

        Map<String, Long> eventos = new HashMap<>();

        compras.forEach(compra -> {
            compra.getDetalles().forEach(detalle -> {
                String evento = detalle.getTipoEntrada().getEvento().getNombre();
                eventos.put(evento, eventos.getOrDefault(evento, 0L) + detalle.getCantidad());
            });
        });

        String eventoTop = eventos.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("N/A");

        Map<String, Object> resultado = new HashMap<>();
        resultado.put("ingresos", ingresosTotales);
        resultado.put("compras", totalCompras);
        resultado.put("entradas", entradasVendidas);
        resultado.put("eventoTop", eventoTop);

        return resultado;
    }

    @Override
    public List<String> obtenerTopTresEventos() {

        List<Compra> compras = repositorio.findAll();

        List<String> nombresEventos = new ArrayList<>();
        List<Long> cantidadesEventos = new ArrayList<>();

        for (Compra compra : compras) {
            for (DetalleCompra d : compra.getDetalles()) {

                String nombreEvento = d.getTipoEntrada().getEvento().getNombre();

                int index = nombresEventos.indexOf(nombreEvento);

                if (index == -1) {
                    nombresEventos.add(nombreEvento);
                    cantidadesEventos.add(d.getCantidad());
                } else {
                    cantidadesEventos.set(index,
                            cantidadesEventos.get(index) + d.getCantidad());
                }
            }
        }

        // ordenar (simple)
        for (int i = 0; i < cantidadesEventos.size(); i++) {
            for (int j = i + 1; j < cantidadesEventos.size(); j++) {

                if (cantidadesEventos.get(j) > cantidadesEventos.get(i)) {

                    Long tempCant = cantidadesEventos.get(i);
                    cantidadesEventos.set(i, cantidadesEventos.get(j));
                    cantidadesEventos.set(j, tempCant);

                    String tempNom = nombresEventos.get(i);
                    nombresEventos.set(i, nombresEventos.get(j));
                    nombresEventos.set(j, tempNom);
                }
            }
        }

        // devolver solo los 3 primeros nombres
        List<String> top3 = new ArrayList<>();

        for (int i = 0; i < nombresEventos.size() && i < 3; i++) {
            top3.add(nombresEventos.get(i));
        }

        return top3;
    }

    // ------------- POST -------------

    // POST: comprar/registrar una Compra (compra)
    @Override
    public CompraDTO crearCompra(CompraDTO compraDTO) {
        Compra compra = mapper.toEntity(compraDTO);
        compra.setFechaCompra(LocalDateTime.now());

        List<DetalleCompra> detalles = new ArrayList<>();

        for (DetalleCompraDTO d : compraDTO.getDetalles()) {

            TipoEntrada tipo = tipoRepository.findById(d.getTipoEntradaId())
                    .orElseThrow(() -> new RuntimeException("Tipo de entrada no encontrado"));

            // comprobar stock
            if (tipo.getStockDisponible() < d.getCantidad()) {
                throw new RuntimeException("No hay stock suficiente");
            }

            // restar stock
            tipo.setStockDisponible(tipo.getStockDisponible() - d.getCantidad());

            // guardar cambio en BD
            tipoRepository.save(tipo);

            // crear detalle
            DetalleCompra detalle = detallemapper.toEntity(d, tipo);
            detalle.setCompra(compra);

            detalles.add(detalle);
        }

        compra.setDetalles(detalles);

        // guardar compra
        Compra compraGuardada = repositorio.save(compra);

        // devolver DTO
        return mapper.toDTO(compraGuardada);

    }

    // ------------- DELETE -------------

    // DELETE: eliminar Compra
    @Override
    public void eliminarCompra(Long id) {

        Optional<Compra> opt = repositorio.findById(id);

        if (opt.isEmpty()) {
            throw new RuntimeException("No se encontró la compra");
        }

        Compra compra = opt.get();

        repositorio.delete(compra);
    }
}