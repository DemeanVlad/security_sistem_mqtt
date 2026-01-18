const ws = new WebSocket("ws://localhost:8080");

let movementCount = 0;
const indicator = document.getElementById("indicator");
const history = document.getElementById("history");
const counter = document.getElementById("counter");
const statusArmed = document.getElementById("statusArmed");

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "motion") {
    const li = document.createElement("li");
    li.textContent = `[${data.timestamp}] ${data.msg}`;
    history.prepend(li);

    if (history.childElementCount > 10) history.removeChild(history.lastChild);

    if (data.msg === "DETECTED") {
      indicator.classList.add("on");
      indicator.classList.remove("off");
      movementCount++;
      counter.innerText = `Număr mișcări: ${movementCount}`;
    } else {
      indicator.classList.add("off");
      indicator.classList.remove("on");
    }
  }

  if (data.type === "armed") {
    statusArmed.innerText = `Status: ${data.armed ? "ARMED" : "DISARMED"}`;
    if (!data.armed) indicator.classList.add("off");
  }

  if (data.type === "info") {
    statusArmed.innerText = `Status: ${data.armed ? "ARMED" : "DISARMED"}`;
  }
};

// Butoane ARM/DISARM
document.getElementById("armBtn").onclick = () => fetch("/cmd/ARM");
document.getElementById("disarmBtn").onclick = () => fetch("/cmd/DISARM");
