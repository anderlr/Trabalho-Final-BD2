# Modelo Conceitual (Modelo Entidade Relacionamento - DER)
<div align="center">
<img src="https://user-images.githubusercontent.com/53983792/130801025-4d846916-1508-47f2-972d-275203da3cc4.png" />
</div>

# Modelo Lógico (Modelo Relacional)
- Launch (id, flight_number*, name*, date*, sucess*, id_rocket*, id_launchpad*)
    id_rocket referencia Rocket(id)
    id_launchpad referencia Launchpad (id)
    chave candidata: name

- Rocket (id, name, height, mass, stages, first_flight)

- Launchpad (id, name, locality, region, latitude*, longitude*)

- Image (id, link*, id_rocket, id_lauchpad)
    id_rocket referencia Rocket (id)
    id_launchpad referencia Lauchpad (id)
    chave candidata: link