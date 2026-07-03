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
          <p className="eyebrow">React + Spring Boot</p>
          <h2>Sistema administrable conectado al backend</h2>
        </div>
        <p>
          El sistema permite mostrar noticias, docentes y promociones desde una
          API Spring Boot desplegada en Render. Además, cuenta con un panel
          administrativo para gestionar el contenido del sitio.
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
