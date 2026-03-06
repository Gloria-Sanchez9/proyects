
        // Variables de estado
        let currentDimension = '2D';
        let currentCoordType = 'rect';
        let targetCoordType = '';
        
        // Objeto con todas las conversiones posibles
        const conversions = {
            '2D': {
                'rect': [
                    {name: 'Polares', func: rectToPolar, target: 'polar'}
                ],
                'polar': [
                    {name: 'Rectangulares', func: polarToRect, target: 'rect'}
                ]
            },
            '3D': {
                'rect': [
                    {name: 'CilÃ­ndricas', func: rectToCylindrical, target: 'cylindrical'},
                    {name: 'EsfÃ©ricas', func: rectToSpherical, target: 'spherical'}
                ],
                'cylindrical': [
                    {name: 'Rectangulares', func: cylindricalToRect, target: 'rect'},
                    {name: 'EsfÃ©ricas', func: cylindricalToSpherical, target: 'spherical'}
                ],
                'spherical': [
                    {name: 'Rectangulares', func: sphericalToRect, target: 'rect'},
                    {name: 'CilÃ­ndricas', func: sphericalToCylindrical, target: 'cylindrical'}
                ]
            }
        };
        
        // Funciones para manejar los botones
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
                document.getElementById('input3').classList.add('hidden');
                
                // Resetear a coordenadas rectangulares si estaba en 3D
                if (currentCoordType === 'cylindrical' || currentCoordType === 'spherical') {
                    setCoordType('rect');
                }
            } else {
                document.getElementById('btn-cylindrical').classList.remove('hidden');
                document.getElementById('btn-spherical').classList.remove('hidden');
                document.getElementById('btn-polar').classList.add('hidden');
                document.getElementById('input3').classList.remove('hidden');
                
                // Si estaba en polares, cambiar a rectangulares
                if (currentCoordType === 'polar') {
                    setCoordType('rect');
                }
            }
            
            updateUI();
        }
        
        function setCoordType(coordType) {
            currentCoordType = coordType;
            
            // Actualizar estado de los botones
            document.getElementById('btn-rect').classList.remove('active');
            document.getElementById('btn-polar').classList.remove('active');
            document.getElementById('btn-cylindrical').classList.remove('active');
            document.getElementById('btn-spherical').classList.remove('active');
            document.getElementById(`btn-${coordType}`).classList.add('active');
            
            updateUI();
        }
        
        function updateUI() {
            // Actualizar etiquetas de entrada
            updateInputLabels();
            
            // Actualizar botones de conversiÃ³n
            updateConversionButtons();
        }
        
        function updateInputLabels() {
            if (currentCoordType === 'rect') {
                document.getElementById('label1').textContent = 'X:';
                document.getElementById('label2').textContent = 'Y:';
                if (currentDimension === '3D') {
                    document.getElementById('label3').textContent = 'Z:';
                }
            } else if (currentCoordType === 'polar') {
                document.getElementById('label1').textContent = 'r:';
                document.getElementById('label2').textContent = 'Î¸ (Â°):';
            } else if (currentCoordType === 'cylindrical') {
                document.getElementById('label1').textContent = 'r:';
                document.getElementById('label2').textContent = 'Î¸ (Â°):';
                document.getElementById('label3').textContent = 'z:';
            } else if (currentCoordType === 'spherical') {
                document.getElementById('label1').textContent = 'Ï:';
                document.getElementById('label2').textContent = 'Î¸ (Â°):';
                document.getElementById('label3').textContent = 'Ï† (Â°):';
            }
        }
        
        function updateConversionButtons() {
            const titleElement = document.getElementById('conversion-title');
            const optionsElement = document.getElementById('conversion-options');
            
            // Limpiar opciones anteriores
            optionsElement.innerHTML = '';
            
            // Obtener conversiones disponibles
            const availableConversions = conversions[currentDimension][currentCoordType];
            
            // Actualizar tÃ­tulo
            let systemName = '';
            if (currentCoordType === 'rect') systemName = 'Rectangulares';
            else if (currentCoordType === 'polar') systemName = 'Polares';
            else if (currentCoordType === 'cylindrical') systemName = 'CilÃ­ndricas';
            else if (currentCoordType === 'spherical') systemName = 'EsfÃ©ricas';
            
            titleElement.textContent = `Convertir de ${systemName} a:`;
            
            // Crear botones para cada conversiÃ³n disponible
            availableConversions.forEach(conversion => {
                const button = document.createElement('button');
                button.textContent = conversion.name;
                button.onclick = () => {
                    targetCoordType = conversion.target;
                    conversion.func();
                };
                optionsElement.appendChild(button);
            });
        }
        
        // FunciÃ³n para formatear el resultado segÃºn el tipo de coordenada
        function formatResult(values) {
            let labels = [];
            let resultHTML = '';
            
            if (targetCoordType === 'rect') {
                labels = currentDimension === '2D' ? ['X', 'Y'] : ['X', 'Y', 'Z'];
            } else if (targetCoordType === 'polar') {
                labels = ['r', 'Î¸ (Â°)'];
            } else if (targetCoordType === 'cylindrical') {
                labels = ['r', 'Î¸ (Â°)', 'z'];
            } else if (targetCoordType === 'spherical') {
                labels = ['Ï', 'Î¸ (Â°)', 'Ï† (Â°)'];
            }
            
            // Obtener el nombre del sistema de coordenadas de destino
            let systemName = '';
            if (targetCoordType === 'rect') systemName = 'Rectangulares';
            else if (targetCoordType === 'polar') systemName = 'Polares';
            else if (targetCoordType === 'cylindrical') systemName = 'CilÃ­ndricas';
            else if (targetCoordType === 'spherical') systemName = 'EsfÃ©ricas';
            
            resultHTML += `<div><strong>Coordenadas ${systemName}:</strong></div>`;
            
            values.forEach((value, index) => {
                resultHTML += `<div class="result-coord">${labels[index]} = ${value.toFixed(4)}</div>`;
            });
            
            return resultHTML;
        }
        
        // =============================================
        // FUNCIONES DE CONVERSIÃ“N 2D
        // =============================================
        
        function rectToPolar() {
            const x = parseFloat(document.getElementById('val1').value);
            const y = parseFloat(document.getElementById('val2').value);
            
            if (isNaN(x) || isNaN(y)) {
                showResult("Por favor ingrese valores vÃ¡lidos para X e Y.");
                return;
            }
            
            const r = Math.sqrt(x*x + y*y);
            const theta = Math.atan2(y, x) * (180 / Math.PI); // en grados
            
            showResult(formatResult([r, theta]));
        }
        
        function polarToRect() {
            const r = parseFloat(document.getElementById('val1').value);
            const thetaDeg = parseFloat(document.getElementById('val2').value);
            
            if (isNaN(r) || isNaN(thetaDeg)) {
                showResult("Por favor ingrese valores vÃ¡lidos para r y Î¸.");
                return;
            }
            
            const theta = thetaDeg * (Math.PI / 180); // convertir a radianes
            const x = r * Math.cos(theta);
            const y = r * Math.sin(theta);
            
            showResult(formatResult([x, y]));
        }
        
        // =============================================
        // FUNCIONES DE CONVERSIÃ“N 3D
        // =============================================
        
        function rectToCylindrical() {
            const x = parseFloat(document.getElementById('val1').value);
            const y = parseFloat(document.getElementById('val2').value);
            const z = parseFloat(document.getElementById('val3').value);
            
            if (isNaN(x) || isNaN(y) || isNaN(z)) {
                showResult("Por favor ingrese valores vÃ¡lidos para X, Y y Z.");
                return;
            }
            
            const r = Math.sqrt(x*x + y*y);
            const theta = Math.atan2(y, x) * (180 / Math.PI); // en grados
            
            showResult(formatResult([r, theta, z]));
        }
        
        function cylindricalToRect() {
            const r = parseFloat(document.getElementById('val1').value);
            const thetaDeg = parseFloat(document.getElementById('val2').value);
            const z = parseFloat(document.getElementById('val3').value);
            
            if (isNaN(r) || isNaN(thetaDeg) || isNaN(z)) {
                showResult("Por favor ingrese valores vÃ¡lidos para r, Î¸ y z.");
                return;
            }
            
            const theta = thetaDeg * (Math.PI / 180); // convertir a radianes
            const x = r * Math.cos(theta);
            const y = r * Math.sin(theta);
            
            showResult(formatResult([x, y, z]));
        }
        
        function cylindricalToSpherical() {
            const r = parseFloat(document.getElementById('val1').value);
            const thetaDeg = parseFloat(document.getElementById('val2').value);
            const z = parseFloat(document.getElementById('val3').value);
            
            if (isNaN(r) || isNaN(thetaDeg) || isNaN(z)) {
                showResult("Por favor ingrese valores vÃ¡lidos para r, Î¸ y z.");
                return;
            }
            
            const rho = Math.sqrt(r*r + z*z);
            const phi = Math.atan2(r, z) * (180 / Math.PI);
            
            showResult(formatResult([rho, thetaDeg, phi]));
        }
        
        function rectToSpherical() {
            const x = parseFloat(document.getElementById('val1').value);
            const y = parseFloat(document.getElementById('val2').value);
            const z = parseFloat(document.getElementById('val3').value);
            
            if (isNaN(x) || isNaN(y) || isNaN(z)) {
                showResult("Por favor ingrese valores vÃ¡lidos para X, Y y Z.");
                return;
            }
            
            const rho = Math.sqrt(x*x + y*y + z*z);
            const theta = Math.atan2(y, x) * (180 / Math.PI); // en grados (azimuthal)
            const phi = Math.atan2(Math.sqrt(x*x + y*y), z) * (180 / Math.PI); // en grados (polar)
            
            showResult(formatResult([rho, theta, phi]));
        }
        
        function sphericalToRect() {
            const rho = parseFloat(document.getElementById('val1').value);
            const thetaDeg = parseFloat(document.getElementById('val2').value);
            const phiDeg = parseFloat(document.getElementById('val3').value);
            
            if (isNaN(rho) || isNaN(thetaDeg) || isNaN(phiDeg)) {
                showResult("Por favor ingrese valores vÃ¡lidos para Ï, Î¸ y Ï†.");
                return;
            }
            
            const theta = thetaDeg * (Math.PI / 180); // azimuthal en radianes
            const phi = phiDeg * (Math.PI / 180); // polar en radianes
            
            const x = rho * Math.sin(phi) * Math.cos(theta);
            const y = rho * Math.sin(phi) * Math.sin(theta);
            const z = rho * Math.cos(phi);
            
            showResult(formatResult([x, y, z]));
        }
        
        function sphericalToCylindrical() {
            const rho = parseFloat(document.getElementById('val1').value);
            const thetaDeg = parseFloat(document.getElementById('val2').value);
            const phiDeg = parseFloat(document.getElementById('val3').value);
            
            if (isNaN(rho) || isNaN(thetaDeg) || isNaN(phiDeg)) {
                showResult("Por favor ingrese valores vÃ¡lidos para Ï, Î¸ y Ï†.");
                return;
            }
            
            const phi = phiDeg * (Math.PI / 180); // polar en radianes
            
            const r = rho * Math.sin(phi);
            const z = rho * Math.cos(phi);
            
            showResult(formatResult([r, thetaDeg, z]));
        }
        
        function showResult(message) {
            document.getElementById('result').innerHTML = message;
        }
        
        // Inicializar la UI al cargar la pÃ¡gina
        document.addEventListener('DOMContentLoaded', function() {
            updateUI();
        });