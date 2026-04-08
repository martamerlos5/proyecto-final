package com.spring.back_spring.Service.ServiceImpl;

import org.springframework.stereotype.Service;

import com.spring.back_spring.DTO.ContactoDTO;
import com.spring.back_spring.Entity.Contacto;
import com.spring.back_spring.Mapper.ContactoMapper;
import com.spring.back_spring.Repository.ContactoRepository;
import com.spring.back_spring.Service.ContactoService;

@Service
public class ContactoServiceImpl implements ContactoService {
    private final ContactoRepository repositorio;
    private final ContactoMapper mapper;

    public ContactoServiceImpl(ContactoRepository repositorio, ContactoMapper mapper){
        this.repositorio = repositorio;
        this.mapper = mapper;
    }

    @Override
    public ContactoDTO guardarFormulario(ContactoDTO contactoDTO) {
        Contacto contacto = mapper.toEntity(contactoDTO);
        Contacto contactoNuevo = this.repositorio.save(contacto);
        return mapper.toDTO(contactoNuevo);
    }



}
