import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditarEntrada() {
    const { entradaId, id } = useParams();
    const navigate = useNavigate();

    const [entrada, setEntrada] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stockTotal: "",
        stockDisponible: ""
    });

    useEffect(() => {
        fetch(`http://localhost:8080/tipos-entrada/detalle/${entradaId}`)
            .then(res => res.json())
            .then(data => setEntrada(data));
    }, [entradaId]);

    const cambiar = (e) => {
        setEntrada({ ...entrada, [e.target.name]: e.target.value });
    };

    const procesa = async (ev) => {
        ev.preventDefault();

        const actualizada = {
            ...entrada,
            precio: parseFloat(entrada.precio),
            stockTotal: parseInt(entrada.stockTotal),
            stockDisponible: parseInt(entrada.stockDisponible),
            eventoId: parseInt(id)
        };

        await fetch(`http://localhost:8080/tipos-entrada/detalle/${entradaId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(actualizada)
        });

        navigate(`/dashboard-admin/eventos/editar/${id}/entradas/ver`);
    };

    return (
        <section className="dashboard_seccion">
            <div className="registro_contenedor">
                <h2>EDITAR ENTRADA</h2>

                <form onSubmit={procesa} className="form_registro">
                    <div className="campo">
                        <label> Nombre </label>
                        <input name="nombre" value={entrada.nombre} onChange={cambiar} />
                    </div>

                    <div className="campo">
                        <label> Descripción </label>
                        <input name="descripcion" value={entrada.descripcion} onChange={cambiar} />
                    </div>
                    
                    <div className="campo">
                        <label> Precio </label>
                        <input name="precio" value={entrada.precio} onChange={cambiar} />
                        
                    </div>

                    <div className="campo">
                        <label> Stock total </label>
                        <input name="stockTotal" value={entrada.stockTotal} onChange={cambiar} />
                        
                    </div>

                    <div className="campo">
                        <label> Stock disponible </label>
                        <input name="stockDisponible" value={entrada.stockDisponible} onChange={cambiar} />
                    </div>

                                    

                    <button type="submit" className="boton boton_admin">Guardar</button>
                </form>
            </div>
        </section>
    );
}

export default EditarEntrada;