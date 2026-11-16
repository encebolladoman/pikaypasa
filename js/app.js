/*
  PikayPasa · lógica de la página.
  No hace falta tocar este archivo para cambiar precios u horarios:
  todo eso está en data/menu.js.
*/
(function () {
  'use strict';

  var D = window.PIKAYPASA;
  if (!D) return;

  var CLAVE_PEDIDO = 'pikaypasa-pedido-v1';
  var CLAVE_DATOS = 'pikaypasa-datos-v1';
  var DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

  /* ---------- utilidades ---------- */
  function $(sel, raiz) { return (raiz || document).querySelector(sel); }
  function $$(sel, raiz) { return Array.prototype.slice.call((raiz || document).querySelectorAll(sel)); }
  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function centavos(n) { return Math.round(Number(n || 0) * 100); }
  function dinero(c) { return '$' + (c / 100).toFixed(2); }
  function leer(clave, porDefecto) {
    try { var v = localStorage.getItem(clave); return v ? JSON.parse(v) : porDefecto; }
    catch (e) { return porDefecto; }
  }
  function guardar(clave, valor) {
    try { localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) { /* sin almacenamiento */ }
  }
  function horaTexto(h) {
    var hh = h % 12 === 0 ? 12 : h % 12;
    return hh + (h < 12 ? ' am' : ' pm');
  }

  var ICO = {
    mas: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    menos: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/></svg>',
    quitar: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6.5 7l1 13h9l1-13"/></svg>',
    listo: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
  };

  /* ---------- catálogo ---------- */
  var alcoholVisible = D.mostrarAlcohol !== false;
  var catalogo = {};
  var combos = D.combos || [];
  var combosChela = alcoholVisible ? (D.combosChela || []) : [];
  var principales = [D.boneless, D.tenders].filter(Boolean);
  var extras = (D.extras || []).filter(function (p) { return alcoholVisible || !p.alcohol; });
  combos.concat(combosChela).forEach(function (p) { p.tipo = 'combo'; catalogo[p.id] = p; });
  principales.concat(extras).forEach(function (p) { p.tipo = 'producto'; catalogo[p.id] = p; });

  function tieneOpciones(p) {
    return !!(p.porciones || p.aderezos || p.preparacion || p.escarchado || p.sabor);
  }

  function precioUnidad(p, cfg) {
    var base = p.porciones ? p.porciones[cfg.porcion || 0].precio : p.precio;
    var c = centavos(base);
    if (p.preparacion && cfg.prep === 'bbq') c += centavos(D.recargoBBQ);
    return c;
  }

  function nombreLinea(p, cfg) {
    var nombre = p.porciones ? p.nombre + ' ' + p.porciones[cfg.porcion || 0].nombre : p.nombre;
    var det = [];
    if (p.preparacion) det.push(cfg.prep === 'bbq' ? 'bañados en BBQ' : 'naturales');
    if (p.escarchado) det.push((p.tipo === 'combo' ? 'micheladas con escarchado ' : 'escarchado ') + cfg.escarchado);
    if (p.sabor) det.push(cfg.sabor);
    return { nombre: nombre, detalle: det.join(', '), aderezos: cfg.aderezos || [] };
  }

  /* ---------- pedido (carrito) ---------- */
  var pedido = leer(CLAVE_PEDIDO, []).filter(function (l) {
    return l && catalogo[l.id] && l.cantidad > 0;
  });
  var datos = leer(CLAVE_DATOS, { zona: '', nombre: '', direccion: '', nota: '' });
  if (!D.envios.some(function (z) { return z.id === datos.zona; })) datos.zona = '';

  function claveDe(id, cfg) { return id + '|' + JSON.stringify(cfg); }

  function agregar(id, cfg) {
    var k = claveDe(id, cfg);
    var linea = pedido.filter(function (l) { return l.clave === k; })[0];
    if (linea) linea.cantidad += 1;
    else pedido.push({ clave: k, id: id, cfg: cfg, cantidad: 1 });
    guardar(CLAVE_PEDIDO, pedido);
    pintarPedido();
    pulsarBarra();
  }

  function cambiarCantidad(k, delta) {
    pedido = pedido.map(function (l) {
      if (l.clave === k) l.cantidad += delta;
      return l;
    }).filter(function (l) { return l.cantidad > 0; });
    guardar(CLAVE_PEDIDO, pedido);
    pintarPedido();
  }

  function quitar(k) {
    pedido = pedido.filter(function (l) { return l.clave !== k; });
    guardar(CLAVE_PEDIDO, pedido);
    pintarPedido();
  }

  function zonaElegida() {
    return D.envios.filter(function (z) { return z.id === datos.zona; })[0] || null;
  }

  function cuentas() {
    var unidades = 0, subtotal = 0;
    pedido.forEach(function (l) {
      unidades += l.cantidad;
      subtotal += precioUnidad(catalogo[l.id], l.cfg) * l.cantidad;
    });
    var z = zonaElegida();
    var envio = z ? centavos(z.costo) : 0;
    return { unidades: unidades, subtotal: subtotal, envio: envio, total: subtotal + envio, zona: z };
  }

  /* ---------- pintar el catálogo ---------- */
  function grupoBotones(nombre, legend, opciones, marcado) {
    return '<fieldset class="opcion"><legend>' + esc(legend) + '</legend><div class="chips">' +
      opciones.map(function (o, i) {
        var val = o.valor != null ? o.valor : o.texto;
        return '<label class="chip"><input type="radio" name="' + nombre + '" value="' + esc(val) + '"' +
          (i === marcado ? ' checked' : '') + '><span>' + o.html + '</span></label>';
      }).join('') + '</div></fieldset>';
  }

  function selectAderezo(nombre, etiqueta, elegido) {
    return '<label class="opcion-select"><span>' + esc(etiqueta) + '</span><select name="' + nombre + '">' +
      D.aderezos.map(function (a) {
        return '<option' + (a === elegido ? ' selected' : '') + '>' + esc(a) + '</option>';
      }).join('') + '</select></label>';
  }

  function opcionesHTML(p) {
    var h = '';
    if (p.porciones) {
      h += grupoBotones('porcion', 'Porción', p.porciones.map(function (po, i) {
        return { valor: i, html: esc(po.nombre) + ' <b>' + dinero(centavos(po.precio)) + '</b>' };
      }), 0);
    }
    if (p.aderezos === 1) {
      h += grupoBotones('aderezo0', 'Aderezo', D.aderezos.map(function (a) {
        return { texto: a, html: esc(a) };
      }), 0);
    } else if (p.aderezos > 1) {
      h += '<fieldset class="opcion"><legend>Aderezos (' + p.aderezos + ')</legend><div class="selects">';
      for (var i = 0; i < p.aderezos; i++) {
        h += selectAderezo('aderezo' + i, 'Aderezo ' + (i + 1), D.aderezos[i % D.aderezos.length]);
      }
      h += '</div></fieldset>';
    }
    if (p.preparacion) {
      var recargo = centavos(D.recargoBBQ);
      h += grupoBotones('prep', p.tipo === 'combo' ? 'Boneless y tenders' : 'Cómo los quieres', [
        { valor: 'natural', html: 'Naturales' },
        { valor: 'bbq', html: 'Bañados en BBQ' + (recargo ? ' <b>+' + dinero(recargo) + '</b>' : '') }
      ], 0);
    }
    if (p.escarchado) {
      h += grupoBotones('escarchado', p.tipo === 'combo' ? 'Escarchado de las micheladas' : 'Escarchado',
        D.escarchados.map(function (e) { return { texto: e, html: e.charAt(0).toUpperCase() + e.slice(1) }; }), 0);
    }
    if (p.sabor) {
      h += grupoBotones('sabor', 'Sabor', D.aderezos.map(function (a) { return { texto: a, html: esc(a) }; }), 0);
    }
    return h;
  }

  function leerCfg(p, form) {
    var f = new FormData(form);
    var cfg = {};
    if (p.porciones) cfg.porcion = Number(f.get('porcion')) || 0;
    if (p.aderezos) {
      cfg.aderezos = [];
      for (var i = 0; i < p.aderezos; i++) cfg.aderezos.push(String(f.get('aderezo' + i) || D.aderezos[0]));
    }
    if (p.preparacion) cfg.prep = f.get('prep') === 'bbq' ? 'bbq' : 'natural';
    if (p.escarchado) cfg.escarchado = String(f.get('escarchado') || D.escarchados[0]);
    if (p.sabor) cfg.sabor = String(f.get('sabor') || D.aderezos[0]);
    return cfg;
  }

  function itemHTML(p, plegable) {
    var precio = p.porciones ? centavos(p.porciones[0].precio) : centavos(p.precio);
    var ahorro = p.porSeparado ? centavos(p.porSeparado) - centavos(p.precio) : 0;
    var opciones = tieneOpciones(p) ? opcionesHTML(p) : '';
    var idOpc = 'opc-' + p.id;
    plegable = !!opciones;
    var resumen = p.porciones
      ? '<p class="item-porciones">' + p.porciones.map(function (po) {
          return esc(po.nombre) + ' <b>' + dinero(centavos(po.precio)) + '</b>';
        }).join('<span aria-hidden="true"> · </span>') + '</p>'
      : '';
    return '' +
      '<article class="item' + (plegable ? ' item-plegable' : '') + '" id="p-' + esc(p.id) + '" data-id="' + esc(p.id) + '">' +
        '<form class="item-form">' +
          '<div class="item-cabeza">' +
            '<h3 class="item-nombre">' + esc(p.nombre) + (p.personas ? ' <span class="item-personas">' + p.personas + ' personas</span>' : '') + '</h3>' +
            '<p class="item-precio">' + (p.porciones ? '<span class="item-desde">desde </span>' : '') + '<span data-precio>' + dinero(precio) + '</span></p>' +
          '</div>' +
          (p.trae ? '<p class="item-trae">' + esc(p.trae) + (p.preparacion && p.tipo === 'producto' ? ' Naturales o bañados en BBQ.' : '') + '</p>' : '') +
          resumen +
          (ahorro > 0 ? '<p class="item-ahorro">Por separado <s>' + dinero(centavos(p.porSeparado)) + '</s> · ahorras ' + dinero(ahorro) + '</p>' : '') +
          (p.alcohol && !p.porSeparado ? '<p class="item-18"><span class="sello-18">+18</span> Solo mayores de 18 años</p>' : '') +
          (opciones ? '<div class="item-opciones" id="' + idOpc + '"' + (plegable ? ' hidden' : '') + '>' + opciones + '</div>' : '') +
          '<div class="item-acciones">' +
            (plegable && opciones
              ? '<button type="button" class="btn btn-abrir" aria-expanded="false" aria-controls="' + idOpc + '">Elegir y agregar</button>' +
                '<button type="submit" class="btn btn-agregar" hidden>Agregar · <span data-precio-btn>' + dinero(precio) + '</span></button>' +
                '<button type="button" class="btn-texto btn-cancelar" hidden>Cancelar</button>'
              : '<button type="submit" class="btn btn-agregar">Agregar · <span data-precio-btn>' + dinero(precio) + '</span></button>') +
          '</div>' +
        '</form>' +
      '</article>';
  }

  function pintarCatalogo() {
    $('#lista-combos').innerHTML = combos.map(function (p) { return itemHTML(p, true); }).join('');
    $('#lista-chela').innerHTML = combosChela.map(function (p) { return itemHTML(p, true); }).join('');
    $('#menu-principal').innerHTML = principales.map(function (p) { return itemHTML(p, false); }).join('');
    $('#lista-extras').innerHTML = extras.map(function (p) { return itemHTML(p, false); }).join('');

    $$('.item').forEach(function (art) {
      var p = catalogo[art.getAttribute('data-id')];
      var form = $('.item-form', art);
      var abrir = $('.btn-abrir', art);
      var agregarBtn = $('.btn-agregar', art);
      var cancelar = $('.btn-cancelar', art);
      var opc = $('.item-opciones', art);

      function actualizarPrecio() {
        var c = precioUnidad(p, leerCfg(p, form));
        $('[data-precio]', art).textContent = dinero(c);
        $('[data-precio-btn]', art).textContent = dinero(c);
      }
      form.addEventListener('change', actualizarPrecio);

      function plegar(abierto) {
        if (!abrir) return;
        var desde = $('.item-desde', art);
        if (desde) desde.hidden = abierto;
        var resumen = $('.item-porciones', art);
        if (resumen) resumen.hidden = abierto;
        opc.hidden = !abierto;
        abrir.hidden = abierto;
        abrir.setAttribute('aria-expanded', String(abierto));
        agregarBtn.hidden = !abierto;
        cancelar.hidden = !abierto;
        art.classList.toggle('abierto', abierto);
        if (!abierto) { form.reset(); actualizarPrecio(); }
      }
      if (abrir) {
        abrir.addEventListener('click', function () {
          plegar(true);
          var primero = $('input, select', opc);
          if (primero) primero.focus({ preventScroll: true });
        });
        cancelar.addEventListener('click', function () { plegar(false); abrir.focus(); });
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        agregar(p.id, leerCfg(p, form));
        var original = agregarBtn.innerHTML;
        agregarBtn.classList.add('agregado');
        agregarBtn.innerHTML = ICO.listo + ' Agregado';
        setTimeout(function () {
          agregarBtn.classList.remove('agregado');
          agregarBtn.innerHTML = original;
          actualizarPrecio();
          if (abrir) { plegar(false); abrir.focus(); }
        }, 1100);
      });
    });
  }

  /* ---------- pintar el pedido ---------- */
  var barra = $('#barra');
  var dialogo = $('#pedido');

  function pintarZonas() {
    $('#zonas').innerHTML = D.envios.map(function (z) {
      var costo = centavos(z.costo);
      return '<label class="zona"><input type="radio" name="zona" value="' + esc(z.id) + '"' +
        (datos.zona === z.id ? ' checked' : '') + '>' +
        '<span class="zona-nombre">' + esc(z.nombre) +
        (z.retiro ? '<small>' + esc(D.negocio.direccion) + '</small>' : '') + '</span>' +
        '<span class="zona-costo">' + (costo ? dinero(costo) : 'Gratis') + '</span></label>';
    }).join('');
  }

  function pintarPedido() {
    var c = cuentas();

    // barra
    barra.hidden = c.unidades === 0;
    document.body.classList.toggle('con-barra', c.unidades > 0);
    $('#barra-cantidad').textContent = c.unidades + (c.unidades === 1 ? ' producto' : ' productos');
    $('#barra-total').textContent = dinero(c.subtotal);

    // líneas
    $('#vacio').hidden = pedido.length > 0;
    $('#lineas').innerHTML = pedido.map(function (l) {
      var p = catalogo[l.id];
      var n = nombreLinea(p, l.cfg);
      var total = precioUnidad(p, l.cfg) * l.cantidad;
      return '<li class="linea" data-clave="' + esc(l.clave) + '">' +
        '<div class="linea-texto"><p class="linea-nombre">' + esc(n.nombre) + '</p>' +
        (n.detalle ? '<p class="linea-detalle">' + esc(n.detalle.charAt(0).toUpperCase() + n.detalle.slice(1)) + '</p>' : '') +
        (n.aderezos.length ? '<p class="linea-detalle">Aderezos: ' + esc(n.aderezos.join(', ')) + '</p>' : '') +
        '</div>' +
        '<p class="linea-total">' + dinero(total) + '</p>' +
        '<div class="linea-controles">' +
          '<button type="button" class="btn-icono" data-accion="menos" aria-label="Quitar uno de ' + esc(n.nombre) + '">' + ICO.menos + '</button>' +
          '<span class="linea-cantidad" aria-label="Cantidad">' + l.cantidad + '</span>' +
          '<button type="button" class="btn-icono" data-accion="mas" aria-label="Agregar uno más de ' + esc(n.nombre) + '">' + ICO.mas + '</button>' +
          '<button type="button" class="btn-texto btn-quitar" data-accion="quitar">' + ICO.quitar + ' Quitar</button>' +
        '</div></li>';
    }).join('');

    // dirección solo si es delivery
    var esRetiro = !!(c.zona && c.zona.retiro);
    $('#campo-direccion').hidden = esRetiro;

    // desglose
    var lineaEnvio;
    if (!c.zona) lineaEnvio = ['Envío', 'Elige dónde lo entregamos'];
    else if (esRetiro) lineaEnvio = ['Envío', 'Gratis (retiro)'];
    else lineaEnvio = ['Envío (' + c.zona.nombre + ')', c.envio ? dinero(c.envio) : 'Gratis'];
    $('#desglose').innerHTML =
      '<div><dt>Subtotal</dt><dd>' + dinero(c.subtotal) + '</dd></div>' +
      '<div><dt>' + esc(lineaEnvio[0]) + '</dt><dd' + (c.zona ? '' : ' class="pendiente"') + '>' + esc(lineaEnvio[1]) + '</dd></div>' +
      '<div class="desglose-total"><dt>Total</dt><dd>' + dinero(c.total) + '</dd></div>';

    validar();
  }

  function faltantes() {
    var c = cuentas();
    var f = [];
    if (!c.unidades) f.push('agregar productos');
    if (!c.zona) f.push('elegir dónde lo entregamos');
    if (!datos.nombre.trim()) f.push('tu nombre');
    if (c.zona && !c.zona.retiro && !datos.direccion.trim()) f.push('tu dirección');
    return f;
  }

  function validar() {
    var f = faltantes();
    $('#enviar').disabled = f.length > 0;
    $('#falta').textContent = f.length
      ? 'Para enviar falta: ' + f.join(', ').replace(/, ([^,]*)$/, ' y $1') + '.'
      : '';
  }

  function pulsarBarra() {
    barra.classList.remove('pulso');
    void barra.offsetWidth;
    barra.classList.add('pulso');
  }

  /* ---------- mensaje de WhatsApp ---------- */
  function mensaje() {
    var c = cuentas();
    var t = ['¡Hola PikayPasa! Quiero hacer este pedido:', ''];
    pedido.forEach(function (l) {
      var p = catalogo[l.id];
      var n = nombreLinea(p, l.cfg);
      var total = precioUnidad(p, l.cfg) * l.cantidad;
      t.push('- ' + l.cantidad + ' × ' + n.nombre + (n.detalle ? ' (' + n.detalle + ')' : '') + ': ' + dinero(total));
      if (n.aderezos.length) t.push('  Aderezos: ' + n.aderezos.join(', '));
    });
    t.push('');
    t.push('Subtotal: ' + dinero(c.subtotal));
    if (c.zona.retiro) t.push('Envío: Gratis (retiro)');
    else t.push('Envío (' + c.zona.nombre + '): ' + (c.envio ? dinero(c.envio) : 'Gratis'));
    t.push('TOTAL: ' + dinero(c.total));
    t.push('');
    t.push('Nombre: ' + datos.nombre.trim());
    t.push(c.zona.retiro
      ? 'Entrega: Retiro en el local'
      : 'Entrega: Delivery, ' + c.zona.nombre + ', ' + datos.direccion.trim());
    if (datos.nota.trim()) t.push('Nota: ' + datos.nota.trim());
    t.push('');
    t.push('Quedo atento a la confirmación.');
    return t.join('\n');
  }

  function urlWhatsApp(texto) {
    return 'https://wa.me/' + D.negocio.whatsapp + '?text=' + encodeURIComponent(texto);
  }

  function enviar() {
    if (faltantes().length) return;
    var url = urlWhatsApp(mensaje());
    var ventana = window.open(url, '_blank');
    if (ventana) ventana.opener = null;
    else window.location.href = url;
    $('#reabrir').href = url;

    pedido = [];
    guardar(CLAVE_PEDIDO, pedido);
    datos.nota = '';
    $('#f-nota').value = '';
    guardar(CLAVE_DATOS, datos);
    pintarPedido();

    dialogo.classList.add('modo-enviado');
    $('#enviado').hidden = false;
    $('#seguir').focus();
  }
  // Para revisar el mensaje desde la consola del navegador: PikayPasaMensaje()
  window.PikayPasaMensaje = function () { return faltantes().length ? faltantes() : mensaje(); };

  /* ---------- abrir / cerrar el panel ---------- */
  function abrirPanel() {
    dialogo.classList.remove('modo-enviado');
    $('#enviado').hidden = true;
    if (typeof dialogo.showModal === 'function') dialogo.showModal();
    else dialogo.setAttribute('open', '');
    document.documentElement.classList.add('sin-scroll');
  }
  function cerrarPanel() {
    if (typeof dialogo.close === 'function' && dialogo.open) dialogo.close();
    else dialogo.removeAttribute('open');
  }
  dialogo.addEventListener('close', function () {
    document.documentElement.classList.remove('sin-scroll');
    barra.focus({ preventScroll: true });
  });
  dialogo.addEventListener('click', function (e) { if (e.target === dialogo) cerrarPanel(); });

  barra.addEventListener('click', abrirPanel);
  $('#cerrar-pedido').addEventListener('click', cerrarPanel);
  $('#seguir').addEventListener('click', cerrarPanel);
  $('#enviar').addEventListener('click', enviar);

  $('#lineas').addEventListener('click', function (e) {
    var b = e.target.closest('[data-accion]');
    if (!b) return;
    var k = b.closest('.linea').getAttribute('data-clave');
    var acc = b.getAttribute('data-accion');
    if (acc === 'mas') cambiarCantidad(k, 1);
    else if (acc === 'menos') cambiarCantidad(k, -1);
    else quitar(k);
    var mismo = $('.linea[data-clave="' + (window.CSS && CSS.escape ? CSS.escape(k) : k) + '"] [data-accion="' + acc + '"]');
    (mismo || $('#cerrar-pedido')).focus();
  });

  $('#datos').addEventListener('input', function (e) {
    var el = e.target;
    if (el.name === 'zona') datos.zona = el.value;
    else if (el.name in datos) datos[el.name] = el.value;
    guardar(CLAVE_DATOS, datos);
    pintarPedido();
  });
  $('#datos').addEventListener('change', function (e) {
    if (e.target.name === 'zona') { datos.zona = e.target.value; guardar(CLAVE_DATOS, datos); pintarPedido(); }
  });
  $('#datos').addEventListener('submit', function (e) { e.preventDefault(); });

  /* ---------- horario ---------- */
  function estadoHorario() {
    var h = D.horario;
    var ahora = new Date(Date.now() + h.zonaHoraria * 3600000);
    var dia = ahora.getUTCDay();
    var hora = ahora.getUTCHours() + ahora.getUTCMinutes() / 60;
    var abiertoHoy = h.dias.indexOf(dia) > -1;
    if (abiertoHoy && hora >= h.abre && hora < h.cierra) {
      return { abierto: true, texto: 'Abierto ahora, hasta las ' + horaTexto(h.cierra) };
    }
    var cuando;
    if (abiertoHoy && hora < h.abre) cuando = 'hoy';
    else {
      for (var i = 1; i <= 7; i++) {
        var d = (dia + i) % 7;
        if (h.dias.indexOf(d) > -1) { cuando = i === 1 ? 'mañana' : 'el ' + DIAS[d]; break; }
      }
    }
    return { abierto: false, texto: 'Ahora cerrado, abrimos ' + cuando + ' a las ' + horaTexto(h.abre) };
  }

  function pintarHorario() {
    var e = estadoHorario();
    var estado = $('#estado');
    estado.innerHTML = '<span class="cartel-punto" aria-hidden="true"></span><span>' + esc(e.texto) + '</span>' +
      (e.abierto ? '' : '<small>Igual puedes armar tu pedido.</small>');
    $('#estado-2').textContent = e.texto + '.';
    document.body.classList.toggle('cerrado', !e.abierto);
    return e;
  }

  /* ---------- textos fijos ---------- */
  function pintarTextos() {
    var n = D.negocio;
    var textos = {
      horario: D.horario.texto,
      horarioCorto: D.horario.textoCorto,
      direccionCompleta: n.direccion + (n.ciudad ? ', ' + n.ciudad : ''),
      whatsappVisible: n.whatsappVisible
    };
    $$('[data-texto]').forEach(function (el) {
      el.textContent = textos[el.getAttribute('data-texto')] || '';
    });
    var waHola = urlWhatsApp('¡Hola PikayPasa!');
    $('#wa-general').href = waHola;
    $('#wa-pie').href = waHola;
    $('#wa-flotante').href = urlWhatsApp('¡Hola PikayPasa! Tengo una consulta.');
    $('#anio').textContent = new Date().getFullYear();

    $('#tabla-envios').innerHTML = D.envios.map(function (z) {
      var costo = centavos(z.costo);
      return '<tr><td>' + esc(z.nombre) + (z.retiro ? '<small>' + esc(n.direccion) + '</small>' : '') +
        '</td><td>' + (costo ? dinero(costo) : 'Gratis') + '</td></tr>';
    }).join('');

    var ig = String(n.instagram || '').replace(/^@/, '').trim();
    ['#ig-1', '#ig-2'].forEach(function (sel) {
      var a = $(sel);
      a.hidden = !ig;
      if (ig) {
        a.href = 'https://instagram.com/' + encodeURIComponent(ig);
        $('.ig-usuario', a).textContent = '@' + ig;
      }
    });

    if (!alcoholVisible) $$('[data-alcohol]').forEach(function (el) { el.hidden = true; });
  }

  /* ---------- arranque ---------- */
  pintarTextos();
  pintarCatalogo();
  pintarZonas();
  $('#f-nombre').value = datos.nombre || '';
  $('#f-direccion').value = datos.direccion || '';
  $('#f-nota').value = datos.nota || '';
  pintarPedido();

  /* ---------- barra de secciones: marca dónde estás ---------- */
  var pista = $('#secciones');
  var enlaces = $$('a', pista).filter(function (a) { return !a.hidden && $(a.getAttribute('href')); });
  if ('IntersectionObserver' in window) {
    var marcar = function (id) {
      enlaces.forEach(function (a) {
        var activo = a.getAttribute('href') === '#' + id;
        if (activo) {
          a.setAttribute('aria-current', 'true');
          pista.scrollTo({ left: a.offsetLeft - 16, behavior: 'smooth' });
        } else a.removeAttribute('aria-current');
      });
    };
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) { if (en.isIntersecting) marcar(en.target.id); });
    }, { rootMargin: '-30% 0px -65% 0px' });
    enlaces.forEach(function (a) { io.observe($(a.getAttribute('href'))); });
  }

  /* La barra de secciones y el WhatsApp flotante aparecen al pasar la reja */
  var frente = $('.frente');
  if ('IntersectionObserver' in window && frente) {
    new IntersectionObserver(function (entradas) {
      document.body.classList.toggle('paso-la-reja', !entradas[0].isIntersecting);
    }).observe(frente);
  } else {
    document.body.classList.add('paso-la-reja');
  }

  var e = pintarHorario();
  setInterval(pintarHorario, 60000);
  if (e.abierto) document.body.classList.add('subiendo');
})();
