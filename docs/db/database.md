# Modelo Conceitual (Modelo Entidade Relacionamento - DER)
<div align="center">
<img src="https://user-images.githubusercontent.com/53983792/140938112-986ade48-cf06-49b8-bf8b-0736c4a91764.png" />
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
