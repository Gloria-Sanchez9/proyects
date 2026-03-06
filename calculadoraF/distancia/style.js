
        // Variables de estado
        let currentDimension = '2D';
        let currentCoordType = 'rect';
        
        // Objeto con las fÃ³rmulas para cada sistema de coordenadas
        const formulas = {
            '2D': {
                'rect': "âˆš[(xâ‚‚ - xâ‚)Â² + (yâ‚‚ - yâ‚)Â²]",
                'polar': "âˆš[râ‚Â² + râ‚‚Â² - 2Â·râ‚Â·râ‚‚Â·cos(Î¸â‚‚ - Î¸â‚)]"
            },
            '3D': {
                'rect': "âˆš[(xâ‚‚ - xâ‚)Â² + (yâ‚‚ - yâ‚)Â² + (zâ‚‚ - zâ‚)Â²]",
                'cylindrical': "âˆš[râ‚Â² + râ‚‚Â² - 2Â·râ‚Â·râ‚‚Â·cos(Î¸â‚‚ - Î¸â‚) + (zâ‚‚ - zâ‚)Â²]",
                'spherical': "âˆš[Ïâ‚Â² + Ïâ‚‚Â² - 2Â·Ïâ‚Â·Ïâ‚‚Â·(sinÏ†â‚Â·sinÏ†â‚‚Â·cos(Î¸â‚‚ - Î¸â‚) + cosÏ†â‚Â·cosÏ†â‚‚)]"
            }
        };
        
        // FunciÃ³n para actualizar la fÃ³rmula mostrada
        function updateFormulaDisplay() {
            document.getElementById('formula-display').textContent = 
                formulas[currentDimension][currentCoordType];
        }
        
        // FunciÃ³n para cambiar entre 2D y 3D
        function setDimension(dimension) {
            currentDimension = dimension;
            document.getElementById('btn-2d').classList.remove('active');
            document.getElementById('btn-3d').classList.remove('active');
            document.getElementById(`btn-${dimension.toLowerCase()}`).classList.add('active');
            
            // Mostrar/ocultar botones de tipo de coordenadas
            if (dimension === '2D') {
                document.getElementById('btn-cylindrical').classList.add('hidden');
                document.getElementById('btn-spherical').classList.add('hidden');
                document.getElementById('btn-polar').classList.remove('hidden');
                
                // Resetear a coordenadas rectangulares si estaba en 3D
                if (currentCoordType === 'cylindrical' || currentCoordType === 'spherical') {
                    setCoordType('rect');
                }
            } else {
                document.getElementById('btn-cylindrical').classList.remove('hidden');
                document.getElementById('btn-spherical').classList.remove('hidden');
                document.getElementById('btn-polar').classList.add('hidden');
                
                // Si estaba en polares, cambiar a rectangulares
                if (currentCoordType === 'polar') {
                    setCoordType('rect');
                }
            }
            
            updateInputLabels();
            updateFormulaDisplay();
        }
        
        // FunciÃ³n para cambiar el tipo de coordenadas
        function setCoordType(coordType) {
            currentCoordType = coordType;
            
            // Actualizar estado de los botones
            document.getElementById('btn-rect').classList.remove('active');
            document.getElementById('btn-polar').classList.remove('active');
            document.getElementById('btn-cylindrical').classList.remove('active');
            document.getElementById('btn-spherical').classList.remove('active');
            document.getElementById(`btn-${coordType}`).classList.add('active');
            
            updateInputLabels();
            updateFormulaDisplay();
        }
        
        // FunciÃ³n para actualizar las etiquetas de los inputs
        function updateInputLabels() {
            const labels = {
                'rect': ['X', 'Y', 'Z'],
                'polar': ['r', 'Î¸ (Â°)', ''],
                'cylindrical': ['r', 'Î¸ (Â°)', 'z'],
                'spherical': ['Ï', 'Î¸ (Â°)', 'Ï† (Â°)']
            };
            
            const coordLabels = labels[currentCoordType];
            
            // Actualizar etiquetas del Punto A
            document.getElementById('a1-label').textContent = `${coordLabels[0]}:`;
            document.getElementById('a2-label').textContent = `${coordLabels[1]}:`;
            document.getElementById('a3-label').textContent = `${coordLabels[2]}:`;
            
            // Actualizar etiquetas del Punto B
            document.getElementById('b1-label').textContent = `${coordLabels[0]}:`;
            document.getElementById('b2-label').textContent = `${coordLabels[1]}:`;
            document.getElementById('b3-label').textContent = `${coordLabels[2]}:`;
            
            // Mostrar/ocultar campo Z segÃºn dimensiÃ³n
            if (currentDimension === '3D') {
                document.getElementById('a3-group').classList.remove('hidden');
                document.getElementById('b3-group').classList.remove('hidden');
            } else {
                document.getElementById('a3-group').classList.add('hidden');
                document.getElementById('b3-group').classList.add('hidden');
            }
        }
        
        // FunciÃ³n para convertir coordenadas a rectangulares
        function convertToRect(values, coordType) {
            if (coordType === 'rect') return values;
            
            if (coordType === 'polar') {
                const [r, thetaDeg] = values;
                const theta = thetaDeg * Math.PI / 180;
                return [
                    r * Math.cos(theta),
                    r * Math.sin(theta)
                ];
            }
            
            if (coordType === 'cylindrical') {
                const [r, thetaDeg, z] = values;
                const theta = thetaDeg * Math.PI / 180;
                return [
                    r * Math.cos(theta),
                    r * Math.sin(theta),
                    z
                ];
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
        
        // FunciÃ³n para calcular la distancia
        function calculateDistance() {
            // Obtener valores de los puntos
            const a1 = parseFloat(document.getElementById('a1').value);
            const a2 = parseFloat(document.getElementById('a2').value);
            const a3 = currentDimension === '3D' ? parseFloat(document.getElementById('a3').value) : 0;
            
            const b1 = parseFloat(document.getElementById('b1').value);
            const b2 = parseFloat(document.getElementById('b2').value);
            const b3 = currentDimension === '3D' ? parseFloat(document.getElementById('b3').value) : 0;
            
            // Validar valores
            if (isNaN(a1) || isNaN(a2) || (currentDimension === '3D' && isNaN(a3)) ||
                isNaN(b1) || isNaN(b2) || (currentDimension === '3D' && isNaN(b3))) {
                showResult("Por favor ingrese valores vÃ¡lidos para todas las coordenadas.");
                return;
            }
            
            // Convertir ambos puntos a coordenadas rectangulares
            const pointA = convertToRect([a1, a2, a3], currentCoordType);
            const pointB = convertToRect([b1, b2, b3], currentCoordType);
            
            // Calcular distancia
            let dx = pointB[0] - pointA[0];
            let dy = pointB[1] - pointA[1];
            let dz = currentDimension === '3D' ? pointB[2] - pointA[2] : 0;
            
            let distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
            
            // Generar fÃ³rmula aplicada segÃºn el sistema de coordenadas
            let appliedFormula;
            if (currentCoordType === 'rect') {
                if (currentDimension === '2D') {
                    appliedFormula = `âˆš[(${pointB[0].toFixed(2)} - ${pointA[0].toFixed(2)})Â² + (${pointB[1].toFixed(2)} - ${pointA[1].toFixed(2)})Â²]`;
                } else {
                    appliedFormula = `âˆš[(${pointB[0].toFixed(2)} - ${pointA[0].toFixed(2)})Â² + (${pointB[1].toFixed(2)} - ${pointA[1].toFixed(2)})Â² + (${pointB[2].toFixed(2)} - ${pointA[2].toFixed(2)})Â²]`;
                }
            } else if (currentCoordType === 'polar') {
                appliedFormula = `âˆš[${a1.toFixed(2)}Â² + ${b1.toFixed(2)}Â² - 2Â·${a1.toFixed(2)}Â·${b1.toFixed(2)}Â·cos(${b2.toFixed(2)}Â° - ${a2.toFixed(2)}Â°)]`;
            } else if (currentCoordType === 'cylindrical') {
                appliedFormula = `âˆš[${a1.toFixed(2)}Â² + ${b1.toFixed(2)}Â² - 2Â·${a1.toFixed(2)}Â·${b1.toFixed(2)}Â·cos(${b2.toFixed(2)}Â° - ${a2.toFixed(2)}Â°) + (${b3.toFixed(2)} - ${a3.toFixed(2)})Â²]`;
            } else if (currentCoordType === 'spherical') {
                appliedFormula = `âˆš[${a1.toFixed(2)}Â² + ${b1.toFixed(2)}Â² - 2Â·${a1.toFixed(2)}Â·${b1.toFixed(2)}Â·(sin(${a3.toFixed(2)}Â°)Â·sin(${b3.toFixed(2)}Â°)Â·cos(${b2.toFixed(2)}Â° - ${a2.toFixed(2)}Â°) + cos(${a3.toFixed(2)}Â°)Â·cos(${b3.toFixed(2)}Â°))]`;
            }
            
            // Mostrar resultado (todos los nÃºmeros con 2 decimales)
            const resultHTML = `
                <div class="result-value"><strong>Distancia:</strong> ${distance.toFixed(2)}</div>
                <div class="result-value"><strong>FÃ³rmula aplicada:</strong></div>
                <div class="formula">${appliedFormula}</div>
                <div class="result-value"><strong>Punto A (rectangulares):</strong> (${pointA[0].toFixed(2)}, ${pointA[1].toFixed(2)}${currentDimension === '3D' ? `, ${pointA[2].toFixed(2)}` : ''})</div>
                <div class="result-value"><strong>Punto B (rectangulares):</strong> (${pointB[0].toFixed(2)}, ${pointB[1].toFixed(2)}${currentDimension === '3D' ? `, ${pointB[2].toFixed(2)}` : ''})</div>
            `;
            
            showResult(resultHTML);
        }
        
        // FunciÃ³n para mostrar resultados
        function showResult(message) {
            document.getElementById('result').innerHTML = message;
        }
        
        // Inicializar la UI al cargar la pÃ¡gina
        document.addEventListener('DOMContentLoaded', function() {
            setDimension('2D');
        });
