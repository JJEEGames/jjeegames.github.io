let vtUnit = "mL"; // default

document.getElementById("btnML").addEventListener("click", () => {
    vtUnit = "mL";

    // Set active button
    document.getElementById("btnML").classList.add("active");
    document.getElementById("btnL").classList.remove("active");

    calculate();
});

document.getElementById("btnL").addEventListener("click", () => {
    vtUnit = "L";

    // Set active button
    document.getElementById("btnL").classList.add("active");
    document.getElementById("btnML").classList.remove("active");

    calculate();
});

function calculate() {
    // Get inputs
    let RR = parseFloat(document.getElementById("rr").value) || 0;
    let VTraw = parseFloat(document.getElementById("vt").value) || 0;
    let Pplat = parseFloat(document.getElementById("pplat").value) || 0;
    let PIP = parseFloat(document.getElementById("pip").value) || 0;
    let PEEP = parseFloat(document.getElementById("peep").value) || 0;

    // Convert VT
    let VT = (vtUnit === "mL") ? VTraw / 1000 : VTraw;

    // Mechanical power
    let result = 0.098 * RR * VT * (PIP - 0.5 * ( Pplat- PEEP));

    // Output
    document.getElementById("result").textContent = result.toFixed(2);
}

// Auto-recalculate on input change
document.querySelectorAll(".calc-input").forEach(inp => {
    inp.addEventListener("input", calculate);
});