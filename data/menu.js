/*
  ============================================================
  PIKAYPASA · ARCHIVO DE DATOS
  ============================================================
  Aquí se cambia TODO lo del negocio: precios, combos, envíos,
  horario, WhatsApp e Instagram. No hace falta tocar nada más.

  Reglas para editar sin romper nada:
  - Los precios van con punto, sin el signo $:   precio: 5.75
  - Los textos van entre comillas:               nombre: "Mixto"
  - Cada línea de una lista termina en coma.
  - Si algo deja de funcionar, revisa que no falte una coma
    o una comilla en lo último que cambiaste.
  ============================================================
*/

window.PIKAYPASA = {

  /* ---------- Datos del negocio ---------- */
  negocio: {
    nombre: "PikayPasa",
    whatsapp: "593990204178",           // formato internacional, sin + ni espacios
    whatsappVisible: "099 020 4178",    // como se muestra en la página
    direccion: "Cdla. Renacer, Mz. 147 Villa 10",
    ciudad: "Guayaquil",
    instagram: ""                       // ej.: "pikaypasa" (sin @). Vacío = no se muestra
  },

  /* ---------- Horario (hora de Ecuador) ---------- */
  horario: {
    texto: "Viernes, sábado y domingo, de 6 a 11 pm",
    textoCorto: "Vie, sáb y dom · 6 a 11 pm",
    dias: [5, 6, 0],     // 0 = domingo, 1 = lunes ... 5 = viernes, 6 = sábado
    abre: 18,            // 18 = 6 pm
    cierra: 23,          // 23 = 11 pm
    zonaHoraria: -5      // Ecuador continental: UTC-5
  },

  /* ---------- Interruptores ---------- */
  mostrarAlcohol: true,  // false = oculta micheladas, cervezas y combos con chela
  recargoBBQ: 0,         // cuánto cuesta bañar en BBQ (0 = gratis). Ej.: 0.50

  /* ---------- Envío por urbanización ---------- */
  // Para agregar una urbanización, copia una línea y cambia id, nombre y costo.
  envios: [
    { id: "renacer",   nombre: "Renacer",             costo: 0 },
    { id: "jardines",  nombre: "Jardines del Salado", costo: 1.00 },
    { id: "girasoles", nombre: "Girasoles",           costo: 1.00 },
    { id: "retiro",    nombre: "Retiro en el local",  costo: 0, retiro: true }
  ],

  /* ---------- Opciones que se repiten ---------- */
  aderezos: ["BBQ", "Hot honey", "Ranch", "Clásica"],
  escarchados: ["clásico", "picante"],

  /* ---------- Combos ---------- */
  // aderezos: cuántos aderezos trae (el cliente los elige)
  // preparacion: true = se puede pedir natural o bañado en BBQ
  // escarchado: true = trae micheladas y se elige el escarchado
  // porSeparado: precio si se compra suelto (se muestra tachado)
  // alcohol: true = se oculta si mostrarAlcohol es false
  combos: [
    { id: "mixto",  nombre: "Mixto",
      trae: "5 boneless + 3 tenders + papas + 2 aderezos",
      precio: 7.50, aderezos: 2, preparacion: true },

    { id: "pareja", nombre: "Combo Pareja",
      trae: "Boneless 8 + Tenders 3 + 2 aderezos",
      precio: 8.99, aderezos: 2, preparacion: true },

    { id: "parche", nombre: "Combo Parche", personas: 4,
      trae: "Boneless 10 + Tenders 7 + 4 aderezos",
      precio: 14.99, aderezos: 4, preparacion: true }
  ],

  combosChela: [
    { id: "boneless-chela", nombre: "Boneless + Chela",
      trae: "Boneless 5 + 1 michelada Coronita",
      precio: 5.75, porSeparado: 6.49, aderezos: 1, preparacion: true, escarchado: true, alcohol: true },

    { id: "tenders-chela", nombre: "Tenders + Chela",
      trae: "Tenders 3 + 1 michelada Coronita",
      precio: 5.99, porSeparado: 6.75, aderezos: 1, preparacion: true, escarchado: true, alcohol: true },

    { id: "mixto-chela", nombre: "Mixto + Chela",
      trae: "Mixto + 1 michelada Coronita",
      precio: 9.50, porSeparado: 10.00, aderezos: 2, preparacion: true, escarchado: true, alcohol: true },

    { id: "pareja-chelera", nombre: "Pareja Chelera",
      trae: "Combo Pareja + 2 micheladas Coronita",
      precio: 12.99, porSeparado: 13.99, aderezos: 2, preparacion: true, escarchado: true, alcohol: true },

    { id: "parche-chelero", nombre: "Parche Chelero", personas: 4,
      trae: "Combo Parche + 4 micheladas Coronita",
      precio: 22.99, porSeparado: 24.99, aderezos: 4, preparacion: true, escarchado: true, alcohol: true }
  ],

  /* ---------- Menú ---------- */
  boneless: {
    id: "boneless", nombre: "Boneless",
    trae: "Con papas y 1 aderezo de 2 oz gratis.",
    porciones: [
      { nombre: "5 piezas",  precio: 3.99 },
      { nombre: "8 piezas",  precio: 5.75 },
      { nombre: "10 piezas", precio: 6.75 }
    ],
    aderezos: 1, preparacion: true
  },

  tenders: {
    id: "tenders", nombre: "Tenders",
    trae: "Con papas y 1 aderezo de 2 oz gratis.",
    porciones: [
      { nombre: "3 piezas", precio: 4.25 },
      { nombre: "5 piezas", precio: 6.25 },
      { nombre: "7 piezas", precio: 7.99 }
    ],
    aderezos: 1, preparacion: true
  },

  extras: [
    { id: "aderezo-extra", nombre: "Aderezo extra", trae: "2 oz, del sabor que quieras.",
      precio: 1.00, sabor: true },

    { id: "michelada", nombre: "Michelada Coronita", trae: "Escarchado clásico o picante.",
      precio: 2.50, escarchado: true, alcohol: true },

    { id: "cerveza", nombre: "Cerveza Coronita sola", trae: "",
      precio: 1.50, alcohol: true }
  ]
};
