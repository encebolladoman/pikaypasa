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
  mostrarAlcohol: true,  // false = oculta micheladas, cervezas y combos con chela (agua y jugos siguen)

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

  // Sabores para boneless y alitas.
  // texto = como se dice para los boneless; textoAlitas = como se dice para las alitas.
  // recargo = cuánto cuesta ese sabor (0 = gratis). Ej.: recargo: 0.50
  sabores: [
    { id: "natural",       texto: "naturales",                textoAlitas: "naturales",                recargo: 0 },
    { id: "bbq",           texto: "bañados en BBQ",           textoAlitas: "bañadas en BBQ",           recargo: 0 },
    { id: "honey-mustard", texto: "bañados en honey mustard", textoAlitas: "bañadas en honey mustard", recargo: 0 }
  ],

  /* ---------- Combos ---------- */
  // aderezos: cuántos aderezos trae (el cliente los elige)
  // preparacion: qué parte del combo elige sabor: ["boneless"], ["alitas"] o ["boneless", "alitas"]
  // escarchado: true = trae micheladas y se elige el escarchado
  // porSeparado: precio si se compra suelto (se muestra tachado con el ahorro)
  // alcohol: true = se oculta si mostrarAlcohol es false
  combos: [
    { id: "mixto",  nombre: "Mixto",
      trae: "5 boneless + 6 alitas + papas + 2 aderezos",
      precio: 8.49, porSeparado: 8.98, aderezos: 2, preparacion: ["boneless", "alitas"] },

    { id: "pareja", nombre: "Combo Pareja",
      trae: "Boneless 8 + Alitas 6, cada uno con papas y aderezo",
      precio: 9.99, porSeparado: 10.74, aderezos: 2, preparacion: ["boneless", "alitas"] },

    { id: "parche", nombre: "Combo Parche", personas: 4,
      trae: "Boneless 10 + Alitas 12 + papas + 4 aderezos",
      precio: 15.99, porSeparado: 18.55, aderezos: 4, preparacion: ["boneless", "alitas"] }
  ],

  combosChela: [
    { id: "boneless-chela", nombre: "Boneless + Chela",
      trae: "Boneless 5 + 1 michelada Coronita",
      precio: 5.75, porSeparado: 6.49, aderezos: 1, preparacion: ["boneless"], escarchado: true, alcohol: true },

    { id: "alitas-chela", nombre: "Alitas + Chela",
      trae: "Alitas 6 + 1 michelada Coronita",
      precio: 6.75, porSeparado: 7.49, aderezos: 1, preparacion: ["alitas"], escarchado: true, alcohol: true },

    { id: "mixto-chela", nombre: "Mixto + Chela",
      trae: "Mixto + 1 michelada Coronita",
      precio: 10.25, porSeparado: 10.99, aderezos: 2, preparacion: ["boneless", "alitas"], escarchado: true, alcohol: true },

    { id: "pareja-chelera", nombre: "Pareja Chelera",
      trae: "Combo Pareja + 2 micheladas Coronita",
      precio: 13.99, porSeparado: 14.99, aderezos: 2, preparacion: ["boneless", "alitas"], escarchado: true, alcohol: true },

    { id: "parche-chelero", nombre: "Parche Chelero", personas: 4,
      trae: "Combo Parche + 4 micheladas Coronita",
      precio: 23.99, porSeparado: 25.99, aderezos: 4, preparacion: ["boneless", "alitas"], escarchado: true, alcohol: true }
  ],

  /* ---------- Menú ---------- */
  // mitadYMitad: true = en esa porción se pueden pedir dos sabores (mitad y mitad)
  // imagen: (opcional) ruta de una foto, ej.: "img/boneless.webp" (ancho máximo 800 px)
  boneless: {
    id: "boneless", nombre: "Boneless",
    trae: "Con papas y 1 aderezo de 2 oz gratis. Naturales, bañados en BBQ o en honey mustard.",
    porciones: [
      { nombre: "5 piezas",  precio: 3.99 },
      { nombre: "8 piezas",  precio: 5.75 },
      { nombre: "10 piezas", precio: 6.75 }
    ],
    aderezos: 1, preparacion: true
  },

  alitas: {
    id: "alitas", nombre: "Alitas", femenino: true,
    trae: "Con papas y 1 aderezo de 2 oz gratis. Naturales, bañadas en BBQ o en honey mustard.",
    porciones: [
      { nombre: "6 piezas",  precio: 4.99 },
      { nombre: "12 piezas", precio: 9.80 },
      { nombre: "24 piezas + cola 1 L", precio: 19.80, mitadYMitad: true }
    ],
    aderezos: 1, preparacion: true
  },

  extras: [
    { id: "aderezo-extra", nombre: "Aderezo extra", trae: "2 oz, del sabor que quieras.",
      precio: 1.00, sabor: true },

    { id: "agua", nombre: "Agua", trae: "",
      precio: 0.50 },

    { id: "jugo", nombre: "Jugos", trae: "Pregunta los sabores del día.",
      precio: 0.50 },

    { id: "michelada", nombre: "Michelada Coronita", trae: "Escarchado clásico o picante.",
      precio: 2.50, escarchado: true, alcohol: true },

    { id: "cerveza", nombre: "Cerveza Coronita sola", trae: "",
      precio: 1.50, alcohol: true }
  ]
};
