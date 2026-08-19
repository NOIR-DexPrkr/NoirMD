---
title: Bloques de código
icon: code
order: 5
---

# Bloques de código

Los bloques de código se escriben con **tres comillas invertidas** (o tres tildes `~~~`). El lenguaje opcional activa el resaltado de sintaxis.

## Sintaxis

````md
```js
const saludo = (nombre) => `Hola, ${nombre}!`;
console.log(saludo('mundo'));
```
````

```js
const saludo = (nombre) => `Hola, ${nombre}!`;
console.log(saludo('mundo'));
```

## Lenguajes soportados

El resaltado funciona con los lenguajes de **highlight.js**: `js`, `ts`, `json`, `html`, `css`, `python`, `bash`, `md`, `sql`, `java`, `c`, `cpp`, `rust`, `go`, etc.

```python
def factorial(n):
    return 1 if n <= 1 else n * factorial(n - 1)

print(factorial(5))
```

```css
.nr-guide__panel {
  display: flex;
  border-radius: 14px;
  overflow: hidden;
}
```

## Notas

- Los bloques de código **no** procesan directivas: lo que escribas dentro se muestra literal.
- El botón de copiar (esquina superior derecha) copia el contenido al portapapeles.
- Los bloques largos se desplazan verticalmente; no rompen el layout.

## Mostrar la sintaxis de directivas

Para enseñar directivas dentro de la propia guía se usa un bloque con lenguaje `md`:

```md
:::card {title="Ejemplo"}

Contenido de la tarjeta.

:::
```

> El lenguaje `md` (o `markdown`) resalta la sintaxis de directivas de NoirMD.