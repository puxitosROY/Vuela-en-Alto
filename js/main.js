/* =========================================================
   Vuela en Alto: intro animada + comparador antes/después
   - La intro se muestra solo la primera vez que alguien entra.
   - Se puede saltar con «Saltar», con «Entrar» o con Esc.
   - El pie de página permite verla otra vez.
   - Añadir ?intro a la dirección también la fuerza (útil para probar).
   ========================================================= */
(function () {
  'use strict';

  /* ---------------- Intro ---------------- */
  var CLAVE = 'vuela-intro-vista';
  var DURACION_AUTO = 7000;      // ms hasta pasar sola al sitio
  var DURACION_REDUCIDA = 2200;  // ms si la persona pidió menos movimiento

  var raiz = document.documentElement;
  var intro = document.getElementById('intro');

  if (intro) {
    var botonEntrar = document.getElementById('intro-entrar');
    var botonSaltar = document.getElementById('intro-saltar');
    var botonRepetir = document.getElementById('intro-repetir');
    var titulo = document.querySelector('.portada h1');
    var bloques = [
      document.getElementById('cabecera'),
      document.getElementById('contenido'),
      document.getElementById('pie')
    ];

    var movimientoReducido = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var temporizador = null;
    var cerrando = false;

    var bloquearSitio = function (bloquear) {
      bloques.forEach(function (el) {
        if (!el) return;
        if (bloquear) el.setAttribute('inert', '');
        else el.removeAttribute('inert');
      });
      document.body.classList.toggle('sin-scroll', bloquear);
    };

    var recordarVisita = function () {
      try { localStorage.setItem(CLAVE, '1'); } catch (e) { /* modo privado: no pasa nada */ }
    };

    var terminar = function () {
      raiz.classList.remove('con-intro');
      intro.classList.remove('saliendo', 'is-playing');
      bloquearSitio(false);
      if (titulo) {
        titulo.setAttribute('tabindex', '-1');
        titulo.focus({ preventScroll: true });
      }
    };

    var cerrar = function () {
      if (cerrando) return;
      cerrando = true;
      clearTimeout(temporizador);
      recordarVisita();

      if (movimientoReducido) { terminar(); return; }

      intro.classList.add('saliendo');
      var listo = false;
      var fin = function () { if (listo) return; listo = true; terminar(); };
      intro.addEventListener('transitionend', function (e) {
        if (e.target === intro && e.propertyName === 'opacity') fin();
      });
      setTimeout(fin, 800);                // respaldo por si no llega transitionend
    };

    var iniciar = function () {
      cerrando = false;
      clearTimeout(temporizador);
      raiz.classList.add('con-intro');
      intro.classList.remove('saliendo', 'is-playing');
      void intro.offsetWidth;              // reinicia las animaciones CSS
      intro.classList.add('is-playing');
      bloquearSitio(true);
      window.scrollTo(0, 0);
      intro.focus({ preventScroll: true });
      temporizador = setTimeout(cerrar, movimientoReducido ? DURACION_REDUCIDA : DURACION_AUTO);
    };

    botonEntrar.addEventListener('click', cerrar);
    botonSaltar.addEventListener('click', cerrar);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && raiz.classList.contains('con-intro')) cerrar();
    });
    if (botonRepetir) botonRepetir.addEventListener('click', iniciar);

    if (raiz.classList.contains('con-intro')) iniciar();
  }

  /* ---------------- Comparador antes/después ---------------- */
  var comparador = document.getElementById('comparador');
  var control = document.getElementById('comparador-control');
  if (comparador && control) {
    var mover = function () {
      comparador.style.setProperty('--pos', control.value + '%');
    };
    control.addEventListener('input', mover);
    mover();
  }
})();
