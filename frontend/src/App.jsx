function App() {
  return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
          <div className="container">
            <span className="navbar-brand fw-bold">GasVolcan</span>
          </div>
        </nav>

        <main className="container py-5 text-center">
          <h1 className="mb-3">Bootstrap funcionando</h1>
          <p className="text-muted">
            Si ves la barra roja arriba y el botón con estilo, los estilos cargaron bien.
          </p>
          <button type="button" className="btn btn-primary">
            Botón de prueba
          </button>
        </main>
      </>
  )
}

export default App