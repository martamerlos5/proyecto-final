import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CrearEntradas() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [entrada, setEntrada] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stockTotal: "",
    });

    const handleChange = (e) => {
        setEntrada({
            ...entrada,
            [e.target.name]: e.target.value,
        });
    };

    const procesa = async (e) => {
        e.preventDefault();

        const nuevaEntrada = {
            ...entrada,
            precio: parseFloat(entrada.precio),
            stockTotal: parseInt(entrada.stockTotal),
            stockDisponible: parseInt(entrada.stockTotal),
            eventoId: parseInt(id),
        };

        try {
            const res = await fetch("http://localhost:8080/tipos-entrada", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevaEntrada),
            });

            if (!res.ok) throw new Error("Error al crear entrada");

            toast.success("Entrada creada correctamente");

            navigate(`/dashboard-admin/eventos/editar/${id}/entradas/ver`);

        } catch (error) {
            console.error(error);
            toast.error("Error al crear la entrada");
        }
    };

    return (
        <section className="dashboard_seccion">
            <div className="registro_contenedor">
                <h2>CREAR ENTRADA</h2>

                <form onSubmit={procesa} className="form_registro">
                    <div className="campo">
                        <label> Nombre </label>
                        <input 
                            name="nombre" 
                            value={entrada.nombre} 
                            onChange={handleChange} 
                            placeholder="Nombre" 
                            required 
                        />
                    </div>

                    <div className="campo">
                        <label> Descripción </label>
                        <input 
                            name="descripcion" 
                            value={entrada.descripcion} 
                            onChange={handleChange} 
                            placeholder="Descripción" 
                        />
                    </div>

                    <div className="campo">
                        <label> Precio </label>
                        <input 
                            type="number" 
                            name="precio" 
                            value={entrada.precio} 
                            onChange={handleChange} 
                            placeholder="Precio" 
                            required 
                        />
                    </div>

                    <div className="campo">
                        <label> Stock total </label>
                        <input 
                            type="number" 
                            name="stockTotal" 
                            value={entrada.stockTotal} 
                            onChange={handleChange} 
                            placeholder="Stock" 
                            required 
                        />
                    </div>

                    <button type="submit" className="boton_admin boton">
                        Crear
                    </button>
                </form>
            </div>
        </section>
    );
}

export default CrearEntradas;