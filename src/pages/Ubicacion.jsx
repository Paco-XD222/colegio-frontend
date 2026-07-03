const mapsUrl = 'https://maps.app.goo.gl/pvfZMnCUdUtDUHv47'
const embedUrl =
  'https://www.google.com/maps?q=Colegio%20Nacional%20Mixto%20Carlos%20Medinaceli%2C%20Quijarro%20591%2C%20Potos%C3%AD%2C%20Bolivia&output=embed'

function Ubicacion() {
  return (
    <section className="section location-layout">
      <div>
        <p className="eyebrow">Ubicacion</p>
        <h2>Encuentra la unidad educativa</h2>
        <p>
          Ubicacion exacta del Colegio Nacional Mixto Carlos Medinaceli en la
          ciudad de Potosí.
        </p>
        <div className="contact-panel">
          <p>
            <strong>Institucion:</strong> Colegio Nacional Mixto Carlos
            Medinaceli
          </p>
          <p>
            <strong>Dirección:</strong> Quijarro 591, Potosí, Bolivia
          </p>
          <p>
            <strong>Ciudad:</strong> Potosí, Bolivia
          </p>
        </div>
      </div>
      <div className="map-card">
        <div className="map-placeholder">
          <iframe
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={embedUrl}
            title="Mapa del Colegio Nacional Mixto Carlos Medinaceli"
          ></iframe>
        </div>
        <a className="button primary" href={mapsUrl} target="_blank" rel="noreferrer">
          Abrir en Google Maps
        </a>
      </div>
    </section>
  )
}

export default Ubicacion
