import { useState } from 'react'
import PropTypes from 'prop-types'

function SearchBar({ onBuscar, placeholder = 'Buscar productos' }) {
    const [texto, setTexto] = useState('')

    const manejarEnvio = (evento) => {
        evento.preventDefault()
        onBuscar(texto.trim())
    }

    return (
        <form className="d-flex my-2 my-lg-0" role="search" onSubmit={manejarEnvio}>
            <input
                className="form-control me-2"
                type="search"
                placeholder={placeholder}
                aria-label="Buscar productos"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
            />
            <button className="btn btn-light" type="submit">
                Buscar
            </button>
        </form>
    )
}

SearchBar.propTypes = {
    onBuscar: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
}

export default SearchBar