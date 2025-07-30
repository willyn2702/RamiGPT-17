document.getElementById("send-btn").onclick = async () => {
  const input = document.getElementById("user-input").value.trim();
  const chatBox = document.getElementById("chat-box");

  if (!input) {
    alert("Por favor, escribe un mensaje.");
    return;
  }

  chatBox.innerHTML += `<div><strong>You:</strong> ${input}</div>`;
  document.getElementById("user-input").value = "";

  try {
    const response = await fetch("https://ramigpt-17.onrender.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input })
    });

    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`);
    }

    const data = await response.json();

    if (!data.response) {
      throw new Error("Respuesta vacía de la API");
    }

    chatBox.innerHTML += `<div><strong>RamiGPT:</strong><pre>${data.response}</pre></div>`;
  } catch (error) {
    console.error("❌ Error en la petición:", error);
    chatBox.innerHTML += `<div style="color:red;"><strong>Error:</strong> ${error.message}</div>`;
  }
};

document.getElementById("download-btn").onclick = () => {
  window.location.href = "/api/download";
};

document.getElementById("inject-btn").onclick = () => {
  alert("🧪 Función futura: Este botón inyectará código directamente en tu proyecto Unreal Engine.");
};
