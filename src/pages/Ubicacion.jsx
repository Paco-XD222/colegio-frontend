function Ubicacion() {
  return (
    <section className="section location-layout">
      <div>
        <p className="eyebrow">Ubicacion</p>
        <h2>Encuentra la unidad educativa</h2>
        <p>
          El establecimiento se encuentra entre las calles San Alberto y Avenida
          Aniceto Arce N. 453, al sudeste de la ciudad de Potosi.
        </p>
        <div className="contact-panel">
          <p>
            <strong>Ciudad:</strong> Potosi, Bolivia
          </p>
          <p>
            <strong>Zona:</strong> Distrito Municipal No. 8
          </p>
        </div>
      </div>
      <div className="map-placeholder">
        <iframe
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=Potosi%20Bolivia%20Avenida%20Aniceto%20Arce%20San%20Alberto&output=embed"
          title="Mapa de ubicacion del Colegio Carlos Medinaceli"
        ></iframe>
      </div>
    </section>
  )
}

export default Ubicacion
