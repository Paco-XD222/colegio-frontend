const teachers = [
  { name: 'Area de Ciencias', detail: 'Matematica, fisica, quimica y biologia.' },
  { name: 'Area Humanistica', detail: 'Lenguaje, sociales, filosofia e historia.' },
  { name: 'Area Tecnica', detail: 'Tecnologia, computacion y formacion aplicada.' },
]

function Docentes() {
  return (
    <section className="section card-grid">
      {teachers.map((teacher) => (
        <article className="profile-card" key={teacher.name}>
          <div className="avatar" aria-hidden="true">
            {teacher.name.slice(8, 10)}
          </div>
          <h2>{teacher.name}</h2>
          <p>{teacher.detail}</p>
        </article>
      ))}
    </section>
  )
}

export default Docentes
