// js/servicios.js
document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".tarjeta .btn");

  botones.forEach(boton => {
    boton.addEventListener("click", async (e) => {
      e.preventDefault();

      const token = localStorage.getItem('token');
      if (!token) {
        alert('Debes iniciar sesión para agendar un servicio.');
        window.location.href = 'login.html';
        return;
      }

      const tarjeta = boton.closest(".tarjeta");
      const nombre = tarjeta.querySelector("h3").innerText;
      const descripcion = tarjeta.querySelector("p").innerText;
      const precio = tarjeta.querySelector(".precio").innerText.replace(/[^\d]/g, '');
      const fecha = new Date().toISOString();

      const servicio = {
        name: nombre,
        description: descripcion,
        price: parseInt(precio, 10)
      };

      try {
        const res = await fetch('https://hamnida-tech.onrender.com/api/agendamientos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            fecha: fecha,
            servicios: [servicio]
          })
        });

        const data = await res.json();

        if (res.ok) {
          // Mensaje bonito sin redirección
          const mensaje = document.createElement('p');
          mensaje.textContent = '✅ Servicio agendado exitosamente.';
          mensaje.style.color = 'green';
          mensaje.style.marginTop = '10px';
          mensaje.classList.add('mensaje-exito');
          
          // Elimina mensajes anteriores si los hay
          const previo = tarjeta.querySelector('.mensaje-exito');
          if (previo) previo.remove();

          tarjeta.appendChild(mensaje);
        } else {
          alert(data.msg || 'Error al agendar el servicio.');
        }
      } catch (err) {
        console.error('Error:', err);
        alert('Hubo un problema al conectar con el servidor.');
      }
    });
  });
});
