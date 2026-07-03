const modules = ['Noticias', 'Docentes', 'Promociones']

function Admin() {
  return (
    <section className="section admin-panel">
      <div>
        <p className="eyebrow">Panel administrativo</p>
        <h2>Gestion de contenido institucional</h2>
        <p>
          Pantalla inicial del area privada. En siguientes issues se conectaran
          formularios, autenticacion y servicios del backend.
        </p>
      </div>
      <div className="admin-modules">
        {modules.map((module) => (
          <article className="module-card" key={module}>
            <span>{module.slice(0, 1)}</span>
            <h3>{module}</h3>
            <p>Crear, editar y mantener registros.</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Admin
