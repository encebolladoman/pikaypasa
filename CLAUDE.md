# PikayPasa: página web del negocio

Este archivo explica el negocio y lo que debe tener la página. Léelo completo antes de escribir código. Todo el texto de la página va en **español (Ecuador)**, con un tono cercano y de barrio.

## 1. El negocio

- **Nombre:** PikayPasa (se escribe así; en el logo va "PIKAYPASA").
- **Qué es:** comida al paso con **boneless**, **alitas** y **micheladas**. Empezó con delivery y abrió un local pequeño el viernes 13 de noviembre de 2026.
- **Local:** Cdla. Renacer, Mz. 147 Villa 10. Los clientes no entran: se atiende desde la puerta.
- **Pedidos por WhatsApp:** 099 020 4178 (formato internacional: `593990204178`).
- **Horario:** viernes, sábado y domingo, de 6 a 11 pm.
- **Delivery por urbanización** (ver sección 2.1): gratis en Renacer; $1.00 en Jardines del Salado y en Girasoles. Retiro en el local, gratis.
- **Público:** la urbanización Renacer (unas 300 familias) y las urbanizaciones vecinas. La mayoría verá la página en el celular, desde un enlace en el grupo de WhatsApp de la urbanización.

## 2. Objetivo de la página

Es un **catálogo para pedir por WhatsApp**. No hay pagos en línea, inicio de sesión ni servidor. **La lógica de la página tiene que ser mínima:** la página solo arma el mensaje y abre WhatsApp. Todo lo demás lo resuelve una persona en el chat.

El cliente:
1. ve el menú y los combos,
2. agrega productos y combos al carrito,
3. elige su urbanización (o retiro en el local) y escribe su nombre y dirección (manzana y villa),
4. ve el desglose: subtotal + envío = total,
5. toca **"Enviar pedido por WhatsApp"** y se abre un chat directo con el 099 020 4178 con el mensaje ya escrito (`https://wa.me/593990204178?text=...`, con el texto codificado con `encodeURIComponent`).

**Lo que pasa después no es parte de la página:** quien atiende el WhatsApp responde para confirmar el pedido, pide la ubicación GPS y da un tiempo aproximado de entrega. Por eso la página **no** pide GPS, no calcula tiempos de entrega y no marca el pedido como "confirmado". Al enviar, muestra un aviso corto: "Te vamos a responder por WhatsApp para confirmar tu pedido y el tiempo de entrega."

### 2.1 Envío por urbanización

En el carrito, un selector obligatorio "¿Dónde lo entregamos?":

| Opción | Costo de envío |
|---|---|
| Renacer | Gratis |
| Jardines del Salado | $1.00 |
| Girasoles | $1.00 |
| Retiro en el local (Cdla. Renacer, Mz. 147 Villa 10) | Gratis |

- Guarda esta lista en el archivo de datos, junto al menú, para poder agregar urbanizaciones o cambiar los precios después.
- El costo de envío se suma una sola vez por pedido, sin importar cuántos productos tenga.
- Si elige "Retiro en el local", no se pide la dirección.
- El botón de enviar se activa solo cuando hay productos, una urbanización elegida y nombre (y dirección, si es delivery).

Desglose que se ve en el carrito:
```
Subtotal            $13.99
Envío (Girasoles)    $1.00
Total               $14.99
```
Con Renacer, la línea dice "Envío (Renacer): Gratis".

### 2.2 Mensaje de WhatsApp

Ejemplo del mensaje que se genera:
```
¡Hola PikayPasa! Quiero pedir:
• 1 × Alitas 12 piezas (bañadas en honey mustard) · aderezo Ranch — $9.80
• 1 × Boneless 8 piezas (naturales) · aderezo BBQ — $5.75
• 2 × Agua — $1.00
Subtotal: $16.55
Envío (Jardines del Salado): $1.00
Total: $17.55
Nombre: Ana
Dirección: Mz. 12 Villa 4
Nota: sin cebolla en la michelada
```
Cada línea lleva el sabor y el aderezo. Si es retiro: en vez de `Dirección`, va `Entrega: Retiro en el local`, y la línea de envío dice `Envío: Gratis (retiro)`. Incluye la nota solo si el cliente escribió una (campo opcional en el carrito).

## 3. Menú y precios (en dólares)

*Menú actualizado el 20 de noviembre de 2026: entraron las alitas, que reemplazan al producto que se vendía antes.*

Todos los boneless y alitas vienen **con papas y 1 aderezo de 2 oz gratis**, en cualquier tamaño. Aderezos para elegir: **BBQ, Hot honey, Ranch o Clásica**. Sabores: **naturales, bañados en BBQ o bañados en honey mustard**, sin recargo (configurable por sabor en el archivo de datos). Las alitas son corte BBQ: cada pieza es un muslito o una alita de dos huesos.

### Boneless
| Porción | Precio |
|---|---|
| 5 piezas | $3.99 |
| 8 piezas | $5.75 |
| 10 piezas | $6.75 |

### Alitas
| Porción | Precio |
|---|---|
| 6 piezas | $4.99 |
| 12 piezas | $9.80 |
| 24 piezas + cola 1 L | $19.80 (se puede pedir mitad y mitad de sabor) |

### Extras y bebidas
| Producto | Precio |
|---|---|
| Aderezo extra | $1.00 |
| Agua | $0.50 |
| Jugos (sabores del día, por confirmar) | $0.50 |
| Michelada Coronita (escarchado clásico o picante) | $2.50 |
| Cerveza Coronita sola | $1.50 |

### Combos
| Combo | Qué trae | Precio | Por separado |
|---|---|---|---|
| Mixto | 5 boneless + 6 alitas + papas + 2 aderezos | $8.49 | $8.98 |
| Combo Pareja | Boneless 8 + Alitas 6, cada uno con papas y aderezo | $9.99 | $10.74 |
| Combo Parche (4 personas) | Boneless 10 + Alitas 12 + papas + 4 aderezos | $15.99 | $18.55 |

### Combos con chela (michelada Coronita)
| Combo | Qué trae | Precio | Por separado |
|---|---|---|---|
| Boneless + Chela | Boneless 5 + 1 michelada | $5.75 | $6.49 |
| Alitas + Chela | Alitas 6 + 1 michelada | $6.75 | $7.49 |
| Mixto + Chela | Mixto + 1 michelada | $10.25 | $10.99 |
| Pareja Chelera | Combo Pareja + 2 micheladas | $13.99 | $14.99 |
| Parche Chelero | Combo Parche + 4 micheladas | $23.99 | $25.99 |

En todos los combos, muestra el precio "por separado" tachado y el ahorro. En los combos con boneless y alitas, el cliente elige un sabor para los boneless y otro para las alitas.

**Alcohol:** todo lo que lleve cerveza o michelada debe decir "Solo para mayores de 18 años". Pon un aviso visible sobre esas bebidas (no sobre agua ni jugos). Las bebidas con alcohol y los combos con chela deben poder **ocultarse con un solo cambio** (`mostrarAlcohol: true/false` en el archivo de datos); agua y jugos se muestran siempre.

**Importante:** guarda el menú, los precios, el horario y el número de WhatsApp en **un solo archivo de datos** (por ejemplo `data/menu.json` o `menu.js`) para que el dueño pueda cambiar un precio sin tocar el diseño.

## 4. Marca

### Logo
- La palabra **PIKAYPASA** en una sola línea, en **Anton**, todo en mayúsculas.
- Sobre fondo negro: **PIKAY** en hueso (#EDE6DA) y **PASA** en naranja (#FF6A13).
- Hazlo como texto o como SVG con esas fuentes y colores; no inventes un ícono.
- No uses la versión vieja en minúsculas ("pikay.pasa") ni íconos de comida.

### Colores ("Naranja crujiente")
| Color | Hex | Uso |
|---|---|---|
| Negro | #111111 | Fondo principal |
| Naranja | #FF6A13 | Solo acentos: botones, precios, detalles |
| Hueso | #EDE6DA | Textos sobre negro, fondos claros |
| Naranja oscuro | #C2410C | Texto naranja cuando va sobre fondo claro (para que se lea) |

No uses la paleta vieja (mostaza, rojo, café).

### Tipografía (Google Fonts)
- **Anton**: solo el logo.
- **Sora ExtraBold (800)**: títulos.
- **Sora Regular (400)**: textos.

### Estilo
Oscuro, con mucho contraste, directo y con apetito: precios grandes en naranja, botones gruesos, poca decoración. Se tiene que ver bien y cargar rápido en un celular de gama media con datos móviles.

## 5. Secciones de la página

1. **Inicio:** logo, una frase corta (por ejemplo "Boneless, alitas y micheladas en tu urbanización", y debajo "Todo viene con papas + 1 aderezo gratis"), el horario, "Delivery gratis en Renacer" y un botón "Ver menú".
2. **Combos y promos:** primero, porque es lo que más se vende.
3. **Menú:** Boneless, Alitas, Extras y Bebidas. En cada producto: elegir porción, aderezo y sabor, y botón "Agregar".
4. **Carrito:** una barra fija abajo en el celular con la cantidad de productos y el total. Al tocarla se abre un panel con:
   - la lista de productos y combos, con botones + / − y quitar (cada producto con su porción, aderezo y natural/BBQ),
   - el selector de urbanización (sección 2.1),
   - nombre, dirección (Mz. y villa) y una nota opcional,
   - el desglose subtotal + envío = total,
   - el botón **"Enviar pedido por WhatsApp"**.
   Guarda el carrito en `localStorage` para que no se pierda si el cliente recarga la página, y vacíalo después de enviar.
5. **Cómo pedir:** 3 pasos simples: arma tu pedido, envíalo por WhatsApp, y te confirmamos el pedido y el tiempo de entrega.
   Abajo, una tabla corta con el costo de envío por urbanización.
6. **Ubicación y horario:** dirección del local, horario y un botón de WhatsApp. Si el local está cerrado según el horario (hora de Ecuador, UTC-5), muestra "Ahora cerrado, abrimos el viernes a las 6 pm", pero deja que igual armen el pedido.
7. **Pie de página:** logo, WhatsApp, "Solo para mayores de 18 años" (si hay alcohol) y el año.

## 6. Requisitos técnicos

- Página estática, sin servidor: **HTML + CSS + JavaScript** sin frameworks (o Astro/Vite si hace falta, pero que el resultado sea estático).
- Diseñada primero para celular y que también se vea bien en computadora.
- Que se pueda publicar gratis en **Netlify, Vercel o GitHub Pages**. Al final, explica en pasos simples cómo publicarla.
- **Fotos:** todavía no hay fotos de los productos. Deja una carpeta `img/` con imágenes de reemplazo (un fondo de color con el nombre del producto) y nombres de archivo claros (`boneless.jpg`, `alitas.jpg`, `michelada.jpg`, etc.) para cambiarlas después.
- Etiquetas para compartir en WhatsApp (Open Graph): título "PikayPasa", descripción corta y una imagen `img/og.jpg` de 1200×630.
- Accesible: buen contraste, botones de al menos 44 px de alto y textos alternativos en las imágenes.

## 7. Lo que no debe salir en la página

- Costos, márgenes, ganancias ni datos de compras o ventas.
- Nombres de clientes.
- Promos que ya terminaron (la promo de apertura de los primeros 5 pedidos ya pasó).

## 8. Pendientes del negocio (preguntar antes de inventar)

- Ciudad exacta para mostrar con la dirección.
- Si hay recargo por bañar los boneless/alitas en salsa (hoy: sin recargo).
- Sabores de los jugos.
- Confirmar el permiso para vender alcohol (por eso existe el interruptor `mostrarAlcohol`).
- Fotos reales de los productos.
- Usuario de Instagram/TikTok/Facebook, si tienen.
