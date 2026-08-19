---
title: Imágenes
icon: image
order: 6
---

# Imágenes

## Básica

```md
![Montañas](https://img.daisyui.com/images/stock/photo-1506905925346-21bda4d32df4.webp)
```

![Montañas](https://img.daisyui.com/images/stock/photo-1506905925346-21bda4d32df4.webp)

## Con tamaño

Añade el tamaño entre llaves después de la URL en formato `ancho:alto` (px):

```md
![Montañas](https://img.daisyui.com/images/stock/photo-1506905925346-21bda4d32df4.webp){300:200}
```

![Montañas](https://img.daisyui.com/images/stock/photo-1506905925346-21bda4d32df4.webp){300:200}

## Flotante

El sufijo `#left`, `#right` o `#center` después de la URL hace la imagen flotante (el texto la rodea):

```md
![Río](https://img.daisyui.com/images/stock/photo-1470252649378-9c29740c9fa8.webp#left){220:150}

Texto que fluye alrededor de la imagen flotante...
```

![Río](https://img.daisyui.com/images/stock/photo-1470252649378-9c29740c9fa8.webp#left){220:150}

Texto que fluye alrededor de la imagen flotante a la izquierda: el párrafo siguiente acompaña la imagen sin romper la línea. Puedes usar `#right` para colocarla a la derecha y `#center` para centrarla (en ese caso conviene definir tamaño).

### Derecha

```md
![Bosque](https://img.daisyui.com/images/stock/photo-1470071459604-3b5ec3a7fe05.webp#right){200:130}
```

![Bosque](https://img.daisyui.com/images/stock/photo-1470071459604-3b5ec3a7fe05.webp#right){200:130}

### Centrada

```md
![Paisaje](https://img.daisyui.com/images/stock/photo-1441974231531-c6227db76b6e.webp#center){400:220}
```

![Paisaje](https://img.daisyui.com/images/stock/photo-1441974231531-c6227db76b6e.webp#center){400:220}

## Notas

- Sin `{w:h}`, la imagen respeta su tamaño natural (máximo el ancho del contenedor).
- Las imágenes flotantes sin tamaño usan un ancho máximo del 50%.
- Para comparar dos imágenes con un slider, usa la directiva `:::diff` (ver **Componentes**).