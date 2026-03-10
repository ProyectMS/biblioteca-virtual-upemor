const API_URL = 'https://script.google.com/macros/s/AKfycbxQA07KPdBKeji0vvHSD3vyWV93qBIyFrngc9_-w8w-Au7rFBagRls7JutvExs6Dum75A/exec';

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modalRegistro');
  const btnRegistrar = document.getElementById('btnRegistrar');

  function alumnoValido() {
    const a = JSON.parse(localStorage.getItem('alumno'));
    return a && a.matricula && a.nombre && a.apellido;
  }

  if (alumnoValido()) {
    modal.classList.add('hidden');
    document.body.classList.remove('bloqueado');
  }

  btnRegistrar.addEventListener('click', async () => {
    const apellido = document.getElementById('apellido').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const matricula = document.getElementById('matricula').value.trim();

    if (!apellido || !nombre || !matricula) {
      alert('Completa todos los campos');
      return;
    }

    const alumno = { apellido, nombre, matricula };
    localStorage.setItem('alumno', JSON.stringify(alumno));

    await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'registro_usuario',
        ...alumno
      })
    });

    modal.classList.add('hidden');
    document.body.classList.remove('bloqueado');
  });
});