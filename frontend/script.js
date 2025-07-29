
document.getElementById("send-btn").onclick = async () => {
  const input = document.getElementById("user-input").value;
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: input })
  });
  const data = await response.json();
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += "<div><strong>You:</strong> " + input + "</div>";
  chatBox.innerHTML += "<div><strong>RamiGPT:</strong><pre>" + data.response + "</pre></div>";
  document.getElementById("user-input").value = "";
};
document.getElementById("download-btn").onclick = () => {
  window.location.href = "/api/download";
};
document.getElementById("inject-btn").onclick = () => {
  alert("🧪 Función futura: Este botón inyectará código directamente en tu proyecto Unreal Engine.");
};
