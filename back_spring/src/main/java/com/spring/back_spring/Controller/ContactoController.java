package com.spring.back_spring.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.back_spring.DTO.ContactoDTO;
import com.spring.back_spring.Service.ContactoService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/contacto")

public class ContactoController {
    private final ContactoService servicio;

    public ContactoController(ContactoService servicio){
        this.servicio = servicio;
    }

    @PostMapping
    public ResponseEntity<ContactoDTO> guardarFormulario(@RequestBody ContactoDTO contactoDTO){
        ContactoDTO contacto = servicio.guardarFormulario(contactoDTO);
        return ResponseEntity.ok(contacto);
    }

}
