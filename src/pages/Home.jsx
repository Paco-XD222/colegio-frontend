const highlights = [
  {
    title: 'Noticias institucionales',
    text: 'Comunicados y actividades visibles para estudiantes, familias y comunidad.',
  },
  {
    title: 'Docentes',
    text: 'Presentacion clara del plantel docente y sus areas de especialidad.',
  },
  {
    title: 'Promociones',
    text: 'Espacio para preservar promociones, recuerdos y generaciones egresadas.',
  },
]

function Home() {
  return (
    <>
      <section className="section intro-grid">
        <div>
          <p className="eyebrow">Propuesta React + Spring Boot</p>
          <h2>Una base visual lista para crecer hacia un sistema administrable</h2>
        </div>
        <p>
          Esta primera estructura separa la experiencia publica del futuro panel
          administrativo. Aun no consume la API desplegada, pero deja preparadas
          las vistas principales del sitio.
        </p>
      </section>

      <section className="section feature-grid">
        {highlights.map((item) => (
          <article className="feature-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
    </>
  )
}

export default Home
