package com.spring.back_spring.Mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.spring.back_spring.DTO.ContactoDTO;
import com.spring.back_spring.Entity.Contacto;

@Component
public class ContactoMapper {
    private final ModelMapper mapper = new ModelMapper();


    public ContactoDTO toDTO(Contacto contacto){
        return mapper.map(contacto, ContactoDTO.class);
    }

    public Contacto toEntity(ContactoDTO contactoDTO){
        return mapper.map(contactoDTO, Contacto.class);
    }

}
