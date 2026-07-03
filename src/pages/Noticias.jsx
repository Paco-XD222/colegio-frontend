const sampleNews = [
  'Acto civico y actividades culturales de la comunidad educativa.',
  'Comunicado para madres, padres y tutores sobre calendario academico.',
  'Participacion estudiantil en ferias y concursos departamentales.',
]

function Noticias() {
  return (
    <section className="section content-list">
      {sampleNews.map((item, index) => (
        <article className="content-item" key={item}>
          <span className="item-number">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <h2>{item}</h2>
            <p>
              Vista estatica temporal. Luego se reemplazara por datos reales del
              backend desplegado en Render.
            </p>
          </div>
        </article>
      ))}
    </section>
  )
}

export default Noticias
