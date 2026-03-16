// Carga del Navbar (Placeholder)
fetch('../nav.html') 
    .then(response => {
        if (!response.ok) throw new Error("No se pudo cargar el nav");
        return response.text();
    })
    .then(data => {
        document.getElementById('nav-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error:', error));

// Variables de estado
let currentDimension = '2D';
let currentCoordType = 'rect';

// Objeto con las fórmulas corregidas para cada sistema
const formulas = {
    '2D': {
        'rect': "√[(x₂ - x₁)² + (y₂ - y₁)²]",
        'polar': "√[r₁² + r₂² - 2·r₁·r₂·cos(θ₂ - θ₁)]"
    },
    '3D': {
        'rect': "√[(x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²]",
        'cylindrical': "√[r₁² + r₂² - 2·r₁·r₂·cos(θ₂ - θ₁) + (z₂ - z₁)²]",
        'spherical': "√[ρ₁² + ρ₂² - 2·ρ₁·ρ₂·(sinφ₁·sinφ₂·cos(θ₂ - θ₁) + cosφ₁·cosφ₂)]"
    }
};

// Función para actualizar la fórmula mostrada
function updateFormulaDisplay() {
    document.getElementById('formula-display').textContent = 
        formulas[currentDimension][currentCoordType];
}

// Función para cambiar entre 2D y 3D
function setDimension(dimension) {
    currentDimension = dimension;
    document.getElementById('btn-2d').classList.remove('active');
    document.getElementById('btn-3d').classList.remove('active');
    document.getElementById(`btn-${dimension.toLowerCase()}`).classList.add('active');
    
    if (dimension === '2D') {
        document.getElementById('btn-cylindrical').classList.add('hidden');
        document.getElementById('btn-spherical').classList.add('hidden');
        document.getElementById('btn-polar').classList.remove('hidden');
        
        if (currentCoordType === 'cylindrical' || currentCoordType === 'spherical') {
            setCoordType('rect');
        }
    } else {
        document.getElementById('btn-cylindrical').classList.remove('hidden');
        document.getElementById('btn-spherical').classList.remove('hidden');
        document.getElementById('btn-polar').classList.add('hidden');
        
        if (currentCoordType === 'polar') {
            setCoordType('rect');
        }
    }
    
    updateInputLabels();
    updateFormulaDisplay();
}

// Función para cambiar el tipo de coordenadas
function setCoordType(coordType) {
    currentCoordType = coordType;
    
    document.getElementById('btn-rect').classList.remove('active');
    document.getElementById('btn-polar').classList.remove('active');
    document.getElementById('btn-cylindrical').classList.remove('active');
    document.getElementById('btn-spherical').classList.remove('active');
    document.getElementById(`btn-${coordType}`).classList.add('active');
    
    updateInputLabels();
    updateFormulaDisplay();
}

// Función para actualizar las etiquetas de los inputs
function updateInputLabels() {
    const labels = {
        'rect': ['X', 'Y', 'Z'],
        'polar': ['r', 'θ (°)', ''],
        'cylindrical': ['r', 'θ (°)', 'z'],
        'spherical': ['ρ', 'θ (°)', 'φ (°)']
    };
    
    const coordLabels = labels[currentCoordType];
    
    document.getElementById('a1-label').textContent = `${coordLabels[0]}:`;
    document.getElementById('a2-label').textContent = `${coordLabels[1]}:`;
    document.getElementById('a3-label').textContent = `${coordLabels[2]}:`;
    
    document.getElementById('b1-label').textContent = `${coordLabels[0]}:`;
    document.getElementById('b2-label').textContent = `${coordLabels[1]}:`;
    document.getElementById('b3-label').textContent = `${coordLabels[2]}:`;
    
    if (currentDimension === '3D') {
        document.getElementById('a3-group').classList.remove('hidden');
        document.getElementById('b3-group').classList.remove('hidden');
    } else {
        document.getElementById('a3-group').classList.add('hidden');
        document.getElementById('b3-group').classList.add('hidden');
    }
}

// Función para convertir a rectangulares (necesaria para el cálculo interno)
function convertToRect(values, coordType) {
    if (coordType === 'rect') return values;
    
    if (coordType === 'polar') {
        const [r, thetaDeg] = values;
        const theta = thetaDeg * Math.PI / 180;
        return [r * Math.cos(theta), r * Math.sin(theta)];
    }
    
    if (coordType === 'cylindrical') {
        const [r, thetaDeg, z] = values;
        const theta = thetaDeg * Math.PI / 180;
        return [r * Math.cos(theta), r * Math.sin(theta), z];
    }
    
    if (coordType === 'spherical') {
        const [rho, thetaDeg, phiDeg] = values;
        const theta = thetaDeg * Math.PI / 180;
        const phi = phiDeg * Math.PI / 180;
        return [
            rho * Math.sin(phi) * Math.cos(theta),
            rho * Math.sin(phi) * Math.sin(theta),
            rho * Math.cos(phi)
        ];
    }
    return values;
}

// Función para calcular la distancia
function calculateDistance() {
    const a1 = parseFloat(document.getElementById('a1').value);
    const a2 = parseFloat(document.getElementById('a2').value);
    const a3 = currentDimension === '3D' ? parseFloat(document.getElementById('a3').value) : 0;
    
    const b1 = parseFloat(document.getElementById('b1').value);
    const b2 = parseFloat(document.getElementById('b2').value);
    const b3 = currentDimension === '3D' ? parseFloat(document.getElementById('b3').value) : 0;
    
    if (isNaN(a1) || isNaN(a2) || (currentDimension === '3D' && isNaN(a3)) ||
        isNaN(b1) || isNaN(b2) || (currentDimension === '3D' && isNaN(b3))) {
        showResult("Por favor ingrese valores válidos para todas las coordenadas.");
        return;
    }
    
    const pointA = convertToRect([a1, a2, a3], currentCoordType);
    const pointB = convertToRect([b1, b2, b3], currentCoordType);
    
    let dx = pointB[0] - pointA[0];
    let dy = pointB[1] - pointA[1];
    let dz = currentDimension === '3D' ? pointB[2] - pointA[2] : 0;
    
    let distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
    
    let appliedFormula;
    if (currentCoordType === 'rect') {
        if (currentDimension === '2D') {
            appliedFormula = `√[(${b1.toFixed(2)} - ${a1.toFixed(2)})² + (${b2.toFixed(2)} - ${a2.toFixed(2)})²]`;
        } else {
            appliedFormula = `√[(${b1.toFixed(2)} - ${a1.toFixed(2)})² + (${b2.toFixed(2)} - ${a2.toFixed(2)})² + (${b3.toFixed(2)} - ${a3.toFixed(2)})²]`;
        }
    } else if (currentCoordType === 'polar') {
        appliedFormula = `√[${a1.toFixed(2)}² + ${b1.toFixed(2)}² - 2·${a1.toFixed(2)}·${b1.toFixed(2)}·cos(${b2.toFixed(2)}° - ${a2.toFixed(2)}°)]`;
    } else if (currentCoordType === 'cylindrical') {
        appliedFormula = `√[${a1.toFixed(2)}² + ${b1.toFixed(2)}² - 2·${a1.toFixed(2)}·${b1.toFixed(2)}·cos(${b2.toFixed(2)}° - ${a2.toFixed(2)}°) + (${b3.toFixed(2)} - ${a3.toFixed(2)})²]`;
    } else if (currentCoordType === 'spherical') {
        appliedFormula = `√[${a1.toFixed(2)}² + ${b1.toFixed(2)}² - 2·${a1.toFixed(2)}·${b1.toFixed(2)}·(sin(${a3.toFixed(2)}°)·sin(${b3.toFixed(2)}°)·cos(${b2.toFixed(2)}° - ${a2.toFixed(2)}°) + cos(${a3.toFixed(2)}°)·cos(${b3.toFixed(2)}°))]`;
    }
    
    const resultHTML = `
        <div class="result-value"><strong>Distancia:</strong> ${distance.toFixed(4)}</div>
        <div class="result-value"><strong>Fórmula aplicada:</strong></div>
        <div class="formula" style="font-size: 0.9em; overflow-x: auto;">${appliedFormula}</div>
        <div class="result-value"><strong>Punto A (rect):</strong> (${pointA[0].toFixed(2)}, ${pointA[1].toFixed(2)}${currentDimension === '3D' ? `, ${pointA[2].toFixed(2)}` : ''})</div>
        <div class="result-value"><strong>Punto B (rect):</strong> (${pointB[0].toFixed(2)}, ${pointB[1].toFixed(2)}${currentDimension === '3D' ? `, ${pointB[2].toFixed(2)}` : ''})</div>
    `;
    
    showResult(resultHTML);
}

function showResult(message) {
    document.getElementById('result').innerHTML = message;
}

document.addEventListener('DOMContentLoaded', function() {
    setDimension('2D');
});