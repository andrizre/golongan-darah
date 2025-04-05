const data = {
  "A_A": { A: 75, O: 25 },
  "A_B": { A: 25, B: 25, AB: 25, O: 25 },
  "A_AB": { A: 50, AB: 50 },
  "A_O": { A: 50, O: 50 },
  "B_B": { B: 75, O: 25 },
  "B_AB": { B: 50, AB: 50 },
  "B_O": { B: 50, O: 50 },
  "AB_AB": { A: 25, B: 25, AB: 50 },
  "AB_O": { A: 50, B: 50 },
  "O_O": { O: 100 },
  "AB_A": { A: 50, AB: 50 },
  "AB_B": { B: 50, AB: 50 },
  "O_A": { A: 50, O: 50 },
  "O_B": { B: 50, O: 50 },
  "O_AB": { A: 50, B: 50 }
};

// Fungsi membuat key berurutan
function getKey(a, b) {
  return [a, b].sort().join("_");
}

// Prediksi rhesus anak
function predictRhesus(rh1, rh2) {
  if (rh1 === "+" && rh2 === "+") return { "+": 75, "-": 25 };
  if ((rh1 === "+" && rh2 === "-") || (rh1 === "-" && rh2 === "+")) return { "+": 50, "-": 50 };
  if (rh1 === "-" && rh2 === "-") return { "-": 100 };
  return null;
}

function showResult() {
  const a = document.getElementById("parentA").value;
  const b = document.getElementById("parentB").value;
  const result = document.getElementById("result");
  const useRhesus = document.getElementById("rhesusToggle").checked;

  result.innerHTML = "";
  result.classList.add("d-none");

  if (!a || !b) return;

  const key = getKey(a, b);
  const res = data[key];

  if (!res) {
    result.innerHTML = "Data tidak tersedia untuk kombinasi ini.";
    result.classList.remove("d-none");
    return;
  }

  let text = "<strong>Golongan Darah Anak:</strong><br>";
  for (let [gol, persen] of Object.entries(res)) {
    text += `• ${gol}: ${persen}%<br>`;
  }

  if (useRhesus) {
    const rh1 = document.getElementById("rhesusA").value;
    const rh2 = document.getElementById("rhesusB").value;

    if (rh1 && rh2) {
      const rhesusResult = predictRhesus(rh1, rh2);
      if (rhesusResult) {
        text += "<br><strong>Rhesus Anak:</strong><br>";
        for (let [r, p] of Object.entries(rhesusResult)) {
          text += `• Rh${r}: ${p}%<br>`;
        }
      } else {
        text += "<br><em>Data rhesus tidak valid.</em>";
      }
    } else {
      text += "<br><em>Silakan lengkapi pilihan rhesus orang tua.</em>";
    }
  }

  result.innerHTML = text;
  result.classList.remove("d-none");
}

// Event listeners
["parentA", "parentB", "rhesusA", "rhesusB", "rhesusToggle"].forEach(id => {
  document.getElementById(id).addEventListener("change", showResult);
});
