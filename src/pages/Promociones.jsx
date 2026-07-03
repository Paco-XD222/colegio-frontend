const promotions = ['Promocion 2026', 'Promocion 2025', 'Promocion 2024']

function Promociones() {
  return (
    <section className="section timeline">
      {promotions.map((promotion) => (
        <article className="timeline-item" key={promotion}>
          <span></span>
          <div>
            <h2>{promotion}</h2>
            <p>
              Espacio reservado para fotografias, nombres y recuerdos de cada
              generacion.
            </p>
          </div>
        </article>
      ))}
    </section>
  )
}

export default Promociones
