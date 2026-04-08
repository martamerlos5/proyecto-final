package com.spring.back_spring.Service.ServiceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.spring.back_spring.DTO.LocalidadDTO;
import com.spring.back_spring.Entity.Localidad;
import com.spring.back_spring.Mapper.LocalidadMapper;
import com.spring.back_spring.Repository.LocalidadRepository;
import com.spring.back_spring.Service.LocalidadService;

@Service
public class LocalidadServiceImpl implements LocalidadService {
    private final LocalidadRepository repositorio;
    private final LocalidadMapper mapper;

    public LocalidadServiceImpl(LocalidadRepository repositorio, LocalidadMapper mapper) {
        this.repositorio = repositorio;
        this.mapper = mapper;
    }

    @Override
    public List<LocalidadDTO> obtenerLocalidades() {
        List<Localidad> localidades = repositorio.findAll();
        return localidades.stream().map(mapper::toDTO).toList();
    }

    @Override
    public List<LocalidadDTO> obtenerLocalidadesPorNombre(String nombre) {
        List<Localidad> localidades = repositorio.findByNombreContainingIgnoreCase(nombre);

        if (localidades.isEmpty()) {
            throw new RuntimeException("No se han encontrado localidades con ese nombre");
        }
        return localidades.stream().map(mapper::toDTO).toList();
    }

    @Override
    public LocalidadDTO crearLocalidad(LocalidadDTO localidadDTO) {
        Localidad localidad = mapper.toEntity(localidadDTO);
        Localidad nuevaLocalidad = repositorio.save(localidad);

        return mapper.toDTO(nuevaLocalidad);
    }

    @Override
    public LocalidadDTO actualizarLocalidad(Long id, LocalidadDTO localidadDTO) {
        Optional<Localidad> opt = repositorio.findById(id);
        if (opt.isEmpty()) {
            throw new RuntimeException("No se ha encontrado la localidad");
        }

        Localidad localidad = opt.get();

        localidad.setNombre(localidadDTO.getNombre());
        Localidad localidadActualizada = repositorio.save(localidad);
        return mapper.toDTO(localidadActualizada);
    }

    @Override
    public void eliminarLocalidad(Long id) {
        Optional<Localidad> opt = repositorio.findById(id);
        if (opt.isEmpty()) {
            throw new RuntimeException("No se ha encontrado la localidad");
        }
        repositorio.delete(opt.get());
    }

}
