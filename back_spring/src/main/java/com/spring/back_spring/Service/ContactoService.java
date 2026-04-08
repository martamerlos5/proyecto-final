package com.spring.back_spring.Service;

import org.springframework.stereotype.Service;

import com.spring.back_spring.DTO.ContactoDTO;

@Service
public interface ContactoService {
    public ContactoDTO guardarFormulario(ContactoDTO contactoDTO);
    

}
