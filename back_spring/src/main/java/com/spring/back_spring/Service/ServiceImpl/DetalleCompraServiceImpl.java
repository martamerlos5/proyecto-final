package com.spring.back_spring.Service.ServiceImpl;

import org.springframework.stereotype.Service;

import com.spring.back_spring.Mapper.DetalleCompraMapper;
import com.spring.back_spring.Repository.DetalleCompraRepository;
import com.spring.back_spring.Service.DetalleCompraService;

@Service
public class DetalleCompraServiceImpl implements DetalleCompraService {

    private final DetalleCompraRepository repositorio;
    private final DetalleCompraMapper mapper;

    public DetalleCompraServiceImpl(DetalleCompraRepository repositorio, DetalleCompraMapper mapper) {
        this.repositorio = repositorio;
        this.mapper = mapper;
    }

}
