package com.spring.back_spring.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.back_spring.Service.DetalleCompraService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/detalle-compra")

public class DetalleCompraController {
    private final DetalleCompraService servicio;

    public DetalleCompraController(DetalleCompraService servicio) {
        this.servicio = servicio;
    }
}
