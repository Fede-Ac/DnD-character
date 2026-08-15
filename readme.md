# Cómo agregar contenido

La estructura está pensada para que puedas duplicar bloques existentes y agregar nuevas habilidades, hechizos, feats o ítems sin modificar el diseño.

## Habilidades de clase o subclase

Para agregar una nueva habilidad, duplica este bloque:
```
<div class="ability">

    <h3 class="ability-name">
        Nombre de la habilidad
    </h3>

    <p class="ability-description">
        Descripción completa de la habilidad.

        Puedes utilizar varias líneas para agregar
        toda la información necesaria.
    </p>

</div>
```

## Hechizos

Para agregar un nuevo hechizo dentro de un nivel, duplica este bloque:

```
<div class="spell">

    <div class="spell-name">
        Nombre del hechizo
    </div>

    <div class="spell-description">
        Descripción completa del hechizo.
    </div>

    <div class="spell-meta">

        <span>
            Casting Time: —
        </span>

        <span>
            Range: —
        </span>

        <span>
            Duration: —
        </span>

    </div>

</div>
```

## Feats

Para agregar un nuevo feat:
```
<div class="feat">

    <h3 class="feat-name">
        Nombre del Feat
    </h3>

    <p class="feat-description">
        Descripción completa del feat.

        Incluye aquí efectos, condiciones,
        bonificaciones y reglas especiales.
    </p>

</div>
```
## Items

Para agregar un nuevo objeto:

```
<div class="item">

    <div class="item-name">
        Nombre del objeto
    </div>

    <div class="item-description">
        Descripción completa del objeto.

        Puedes incluir propiedades, efectos,
        daño, requisitos o cualquier otra información.
    </div>

</div>
```

## Agregar nuevas secciones

Las secciones principales utilizan el elemento HTML "details", por lo que puedes crear nuevas categorías fácilmente:

```
<details>

    <summary>
        🏷️ Nombre de la sección
    </summary>

    <div class="section-content">

        <!-- Contenido de la sección -->

    </div>

</details>
```
