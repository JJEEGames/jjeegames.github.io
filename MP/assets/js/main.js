
//make switches toggle on and off so to use only a single value
document.addEventListener("click", function(e) {
    if (!e.target.matches(".switch .btn")) return; // Only handle our switch buttons

    const btn = e.target;
    const group = btn.closest(".switch");

    // Remove active from other buttons in this group
    group.querySelector(".active").classList.remove("active");
    
    // Set clicked button active
    btn.classList.add("active");

    // Fire native-like 'change' event
    const changeEvent = new Event("change", { bubbles: true });
    group.dispatchEvent(changeEvent);
});

//volume control mechanical power
function calc_mp_vc() {
    // Get inputs
    let RR = parseFloat(document.getElementById("vc_rr").value) || 0;
    let VTraw = parseFloat(document.getElementById("vc_vt").value) || 0;
    let Pplat = parseFloat(document.getElementById("vc_pplat").value) || 0;
    let PIP = parseFloat(document.getElementById("vc_pip").value) || 0;
    let PEEP = parseFloat(document.getElementById("vc_peep").value) || 0;

    
    // Convert VT
    let VTUnit = document.getElementById("vc_vt_unit").querySelector(".active").dataset.value;
    let VT = (VTUnit === "mL") ? VTraw / 1000 : VTraw;

    // Mechanical power
    //let result = 0.098 * RR * VT * (PIP - 0.5 * ( Pplat- PEEP)); -> can be broken down to: 
    
    let factor = 0.098 * RR * VT;

    let elas_static = factor * PEEP;
    let elas_dynamic = factor * (Pplat - PEEP) * 0.5;
    let elas_restrictive = factor * (PIP - Pplat);

    let mp = elas_dynamic + elas_static + elas_restrictive;

    // Output
    document.getElementById("vc_static").textContent = elas_static.toFixed(2);
    document.getElementById("vc_dynamic").textContent = elas_dynamic.toFixed(2);
    document.getElementById("vc_restrictive").textContent = elas_restrictive.toFixed(2);

    document.getElementById("vc_result").textContent = mp.toFixed(2);
}

//pressure control mechanical power
function calc_mp_pc() {
    // Get inputs
    let RR = parseFloat(document.getElementById("pc_rr").value) || 0;
    let VTraw = parseFloat(document.getElementById("pc_vt").value) || 0;
    let PIP = parseFloat(document.getElementById("pc_pip").value) || 0;

    
    // Convert VT
    let VTUnit = document.getElementById("pc_vt_unit").querySelector(".active").dataset.value;
    let VT = (VTUnit === "mL") ? VTraw / 1000 : VTraw;

    // Mechanical power
    let result = 0.098 * RR * VT * PIP;

    // Output
    document.getElementById("pc_result").textContent = result.toFixed(2);
}

//dynamic mechanical power
function calc_mp_dyn() {
    // Get inputs
    let RR = parseFloat(document.getElementById("dyn_rr").value) || 0;
    let VTraw = parseFloat(document.getElementById("dyn_vt").value) || 0;
    let PIP = parseFloat(document.getElementById("dyn_pip").value) || 0;
    let PEEP = parseFloat(document.getElementById("dyn_peep").value) || 0;

    // Convert VT
    let VTUnit = document.getElementById("dyn_vt_unit").querySelector(".active").dataset.value;
    let VT = (VTUnit === "mL") ? VTraw / 1000 : VTraw;

    // Mechanical power
    let result = 0.098 * RR * VT * (PIP + PEEP) * 0.5;

    // Output
    document.getElementById("dyn_result").textContent = result.toFixed(2);
}