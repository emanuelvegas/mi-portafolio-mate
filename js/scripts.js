// ============================
// PORTAFOLIO DE MATEMÁTICAS - PIER NIMA
// Scripts de funcionalidad
// ============================

// ============================================
// FUNCIONES PARA INDEX.HTML (Mini Retos)
// ============================================

function validarSuma() {
    const respuesta = parseInt(document.getElementById('respuesta-suma').value);
    const feedback = document.getElementById('feedback-suma');
    const respuestaCorrecta = 20; // 12 + 8 = 20

    if (isNaN(respuesta)) {
        feedback.className = 'feedback incorrecto';
        feedback.textContent = '⚠️ Por favor, ingresa un número';
        return;
    }

    if (respuesta === respuestaCorrecta) {
        feedback.className = 'feedback correcto';
        feedback.textContent = '🎉 ¡Excelente! 12 + 8 = 20. ¡Eres un campeón de las sumas!';
    } else {
        feedback.className = 'feedback incorrecto';
        feedback.textContent = `💪 ¡Casi! La respuesta correcta es ${respuestaCorrecta}. ¡Sigue intentando!`;
    }
}

function validarArea() {
    const respuesta = parseInt(document.getElementById('respuesta-area').value);
    const feedback = document.getElementById('feedback-area');
    const respuestaCorrecta = 24; // 6 × 4 = 24

    if (isNaN(respuesta)) {
        feedback.className = 'feedback incorrecto';
        feedback.textContent = '⚠️ Por favor, ingresa un número';
        return;
    }

    if (respuesta === respuestaCorrecta) {
        feedback.className = 'feedback correcto';
        feedback.textContent = '🎉 ¡Perfecto! El área es 24 cm². Recuerda: largo × ancho = 6 × 4 = 24';
    } else {
        feedback.className = 'feedback incorrecto';
        feedback.textContent = `💪 ¡Intenta de nuevo! Pista: multiplica 6 × 4`;
    }
}

// ============================================
// FUNCIONES PARA SUMA.HTML
// ============================================

function calcularSuma() {
    const num1 = parseInt(document.getElementById('num1-suma').value);
    const num2 = parseInt(document.getElementById('num2-suma').value);

    if (isNaN(num1) || isNaN(num2)) {
        alert('⚠️ Por favor, ingresa ambos números');
        return;
    }

    // Mostrar la explicación
    document.getElementById('explicacion-suma').style.display = 'block';

    // Paso 1: Alineación visual
    mostrarAlineacion(num1, num2);

    // Paso 2: Proceso de suma columna por columna
    mostrarProcesoSuma(num1, num2);

    // Paso 3: Resultado final
    const resultado = num1 + num2;
    mostrarResultadoSuma(resultado);

    // Scroll suave al resultado
    setTimeout(() => {
        document.getElementById('explicacion-suma').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

function mostrarAlineacion(num1, num2) {
    const alineacion = document.getElementById('alineacion-visual');
    const maxLen = Math.max(num1.toString().length, num2.toString().length);
    
    const num1Str = num1.toString().padStart(maxLen, ' ');
    const num2Str = num2.toString().padStart(maxLen, ' ');
    
    alineacion.innerHTML = `
        <div style="font-family: 'Courier New', monospace; font-size: 2rem; text-align: right; font-weight: bold;">
            <div style="padding: 0.5rem; letter-spacing: 0.3rem;">${num1Str.replace(/ /g, '&nbsp;')}</div>
            <div style="padding: 0.5rem; border-bottom: 3px solid #0288d1; letter-spacing: 0.3rem;">+ ${num2Str.replace(/ /g, '&nbsp;')}</div>
        </div>
    `;
}

function mostrarProcesoSuma(num1, num2) {
    const proceso = document.getElementById('proceso-suma');
    const str1 = num1.toString();
    const str2 = num2.toString();
    const maxLen = Math.max(str1.length, str2.length);
    
    let html = '<div style="line-height: 2;">';
    let carry = 0;
    
    // Procesar de derecha a izquierda
    for (let i = maxLen - 1; i >= 0; i--) {
        const digit1 = i >= maxLen - str1.length ? parseInt(str1[i - (maxLen - str1.length)]) : 0;
        const digit2 = i >= maxLen - str2.length ? parseInt(str2[i - (maxLen - str2.length)]) : 0;
        const suma = digit1 + digit2 + carry;
        const resultado = suma % 10;
        carry = Math.floor(suma / 10);
        
        const posicion = maxLen - i;
        const nombreColumna = posicion === 1 ? 'unidades' : 
                             posicion === 2 ? 'decenas' : 
                             posicion === 3 ? 'centenas' : 'miles';
        
        html += `
            <div class="columna-calculo">
                <strong>Columna de ${nombreColumna}:</strong><br>
                ${digit1} + ${digit2}${carry > 0 && i < maxLen - 1 ? ' + ' + (suma - digit1 - digit2) + ' (que llevamos)' : ''} = ${suma}<br>
                ${carry > 0 ? `Escribimos <strong>${resultado}</strong> y llevamos <strong>${carry}</strong>` : `Escribimos <strong>${resultado}</strong>`}
            </div>
        `;
    }
    
    if (carry > 0) {
        html += `
            <div class="columna-calculo">
                <strong>Última columna:</strong><br>
                Escribimos el <strong>${carry}</strong> que llevábamos
            </div>
        `;
    }
    
    html += '</div>';
    proceso.innerHTML = html;
}

function mostrarResultadoSuma(resultado) {
    const resultadoDiv = document.getElementById('resultado-suma-final');
    resultadoDiv.innerHTML = `
        <div style="font-size: 1.2rem; margin-bottom: 1rem;">El resultado de la suma es:</div>
        <div style="font-size: 2.5rem;">${resultado}</div>
        <div style="font-size: 1rem; margin-top: 1rem; color: #2e7d32;">🎉 ¡Muy bien! Has completado la suma</div>
    `;
}

function cargarEjemplo(n1, n2) {
    document.getElementById('num1-suma').value = n1;
    document.getElementById('num2-suma').value = n2;
    calcularSuma();
}

// ============================================
// FUNCIONES PARA AREA.HTML
// ============================================

let figuraActual = null;

function seleccionarFigura(figura) {
    // Ocultar todos los formularios
    document.querySelectorAll('.formula-card').forEach(card => {
        card.style.display = 'none';
    });
    
    // Remover clase activo de todos los botones
    document.querySelectorAll('.btn-figura').forEach(btn => {
        btn.classList.remove('activo');
    });
    
    // Mostrar el formulario seleccionado
    document.getElementById(`form-${figura}`).style.display = 'block';
    
    // Marcar botón como activo
    const botonActivo = document.querySelector(`[data-figura="${figura}"]`);
    if (botonActivo) {
        botonActivo.classList.add('activo');
    }
    
    figuraActual = figura;
    
    // Scroll suave al formulario
    setTimeout(() => {
        document.getElementById(`form-${figura}`).scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// Cuadrado
function calcularAreaCuadrado() {
    const lado = parseFloat(document.getElementById('lado-cuadrado').value);
    const resultado = document.getElementById('resultado-cuadrado');
    
    if (isNaN(lado) || lado <= 0) {
        alert('⚠️ Por favor, ingresa un número válido mayor que 0');
        return;
    }
    
    const area = lado * lado;
    
    resultado.innerHTML = `
        <div class="explicacion-pasos">
            <h3>📚 Procedimiento Paso a Paso</h3>
            
            <div class="paso-item">
                <span class="numero-paso">1</span>
                <div class="contenido-paso">
                    <h4>Fórmula del Cuadrado</h4>
                    <p>Para calcular el área de un cuadrado, usamos:</p>
                    <div style="background: white; padding: 1rem; border-radius: 10px; margin-top: 0.5rem; font-size: 1.3rem; text-align: center; border: 2px solid #ffeb3b;">
                        <strong>Área = lado × lado</strong>
                    </div>
                    <p style="margin-top: 0.5rem; color: #666;">El símbolo × significa "multiplicar"</p>
                </div>
            </div>
            
            <div class="paso-item">
                <span class="numero-paso">2</span>
                <div class="contenido-paso">
                    <h4>Sustitución de Valores</h4>
                    <p>Ahora cambiamos "lado" por tu número: <strong>${lado}</strong></p>
                    <div style="background: white; padding: 1rem; border-radius: 10px; margin-top: 0.5rem; font-size: 1.3rem; text-align: center; border: 2px solid #ffeb3b;">
                        <strong>Área = ${lado} × ${lado}</strong>
                    </div>
                </div>
            </div>
            
            <div class="paso-item">
                <span class="numero-paso">3</span>
                <div class="contenido-paso">
                    <h4>Cálculo Final</h4>
                    <p>Multiplicamos los números:</p>
                    <div style="background: white; padding: 1rem; border-radius: 10px; margin-top: 0.5rem; font-size: 1.3rem; text-align: center; border: 2px solid #ffeb3b;">
                        <strong>${lado} × ${lado} = ${area}</strong>
                    </div>
                </div>
            </div>
            
            <div class="resultado-final">
                🎉 El área del cuadrado es: <strong>${area} cm²</strong>
            </div>
        </div>
    `;
    
    resultado.classList.add('mostrar');
    setTimeout(() => {
        resultado.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// Rectángulo
function calcularAreaRectangulo() {
    const largo = parseFloat(document.getElementById('largo-rectangulo').value);
    const ancho = parseFloat(document.getElementById('ancho-rectangulo').value);
    const resultado = document.getElementById('resultado-rectangulo');
    
    if (isNaN(largo) || isNaN(ancho) || largo <= 0 || ancho <= 0) {
        alert('⚠️ Por favor, ingresa números válidos mayores que 0');
        return;
    }
    
    const area = largo * ancho;
    
    resultado.innerHTML = `
        <div class="explicacion-pasos">
            <h3>📚 Procedimiento Paso a Paso</h3>
            
            <div class="paso-item">
                <span class="numero-paso">1</span>
                <div class="contenido-paso">
                    <h4>Fórmula del Rectángulo</h4>
                    <p>Para calcular el área de un rectángulo, usamos:</p>
                    <div style="background: white; padding: 1rem; border-radius: 10px; margin-top: 0.5rem; font-size: 1.3rem; text-align: center; border: 2px solid #4caf50;">
                        <strong>Área = largo × ancho</strong>
                    </div>
                    <p style="margin-top: 0.5rem; color: #666;">Multiplicamos el lado largo por el lado corto</p>
                </div>
            </div>
            
            <div class="paso-item">
                <span class="numero-paso">2</span>
                <div class="contenido-paso">
                    <h4>Sustitución de Valores</h4>
                    <p>Ahora cambiamos las letras por tus números:</p>
                    <ul style="margin-top: 0.5rem; line-height: 2;">
                        <li>Largo = <strong>${largo}</strong> cm</li>
                        <li>Ancho = <strong>${ancho}</strong> cm</li>
                    </ul>
                    <div style="background: white; padding: 1rem; border-radius: 10px; margin-top: 0.5rem; font-size: 1.3rem; text-align: center; border: 2px solid #4caf50;">
                        <strong>Área = ${largo} × ${ancho}</strong>
                    </div>
                </div>
            </div>
            
            <div class="paso-item">
                <span class="numero-paso">3</span>
                <div class="contenido-paso">
                    <h4>Cálculo Final</h4>
                    <p>Multiplicamos los números:</p>
                    <div style="background: white; padding: 1rem; border-radius: 10px; margin-top: 0.5rem; font-size: 1.3rem; text-align: center; border: 2px solid #4caf50;">
                        <strong>${largo} × ${ancho} = ${area}</strong>
                    </div>
                </div>
            </div>
            
            <div class="resultado-final">
                🎉 El área del rectángulo es: <strong>${area} cm²</strong>
            </div>
        </div>
    `;
    
    resultado.classList.add('mostrar');
    setTimeout(() => {
        resultado.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// Triángulo
function calcularAreaTriangulo() {
    const base = parseFloat(document.getElementById('base-triangulo').value);
    const altura = parseFloat(document.getElementById('altura-triangulo').value);
    const resultado = document.getElementById('resultado-triangulo');
    
    if (isNaN(base) || isNaN(altura) || base <= 0 || altura <= 0) {
        alert('⚠️ Por favor, ingresa números válidos mayores que 0');
        return;
    }
    
    const area = (base * altura) / 2;
    
    resultado.innerHTML = `
        <div class="explicacion-pasos">
            <h3>📚 Procedimiento Paso a Paso</h3>
            
            <div class="paso-item">
                <span class="numero-paso">1</span>
                <div class="contenido-paso">
                    <h4>Fórmula del Triángulo</h4>
                    <p>Para calcular el área de un triángulo, usamos:</p>
                    <div style="background: white; padding: 1rem; border-radius: 10px; margin-top: 0.5rem; font-size: 1.3rem; text-align: center; border: 2px solid #e91e63;">
                        <strong>Área = (base × altura) ÷ 2</strong>
                    </div>
                    <p style="margin-top: 0.5rem; color: #666;">Multiplicamos base por altura y dividimos entre 2</p>
                </div>
            </div>
            
            <div class="paso-item">
                <span class="numero-paso">2</span>
                <div class="contenido-paso">
                    <h4>Sustitución de Valores</h4>
                    <p>Ahora cambiamos las letras por tus números:</p>
                    <ul style="margin-top: 0.5rem; line-height: 2;">
                        <li>Base = <strong>${base}</strong> cm</li>
                        <li>Altura = <strong>${altura}</strong> cm</li>
                    </ul>
                    <div style="background: white; padding: 1rem; border-radius: 10px; margin-top: 0.5rem; font-size: 1.3rem; text-align: center; border: 2px solid #e91e63;">
                        <strong>Área = (${base} × ${altura}) ÷ 2</strong>
                    </div>
                </div>
            </div>
            
            <div class="paso-item">
                <span class="numero-paso">3</span>
                <div class="contenido-paso">
                    <h4>Cálculo Paso a Paso</h4>
                    <p>Primero multiplicamos base por altura:</p>
                    <div style="background: #fff3e0; padding: 0.8rem; border-radius: 10px; margin-top: 0.5rem;">
                        <strong>${base} × ${altura} = ${base * altura}</strong>
                    </div>
                    <p style="margin-top: 1rem;">Luego dividimos entre 2:</p>
                    <div style="background: white; padding: 1rem; border-radius: 10px; margin-top: 0.5rem; font-size: 1.3rem; text-align: center; border: 2px solid #e91e63;">
                        <strong>${base * altura} ÷ 2 = ${area}</strong>
                    </div>
                </div>
            </div>
            
            <div class="resultado-final">
                🎉 El área del triángulo es: <strong>${area} cm²</strong>
            </div>
        </div>
    `;
    
    resultado.classList.add('mostrar');
    setTimeout(() => {
        resultado.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// Círculo
function calcularAreaCirculo() {
    const radio = parseFloat(document.getElementById('radio-circulo').value);
    const resultado = document.getElementById('resultado-circulo');
    
    if (isNaN(radio) || radio <= 0) {
        alert('⚠️ Por favor, ingresa un número válido mayor que 0');
        return;
    }
    
    const pi = 3.1416;
    const area = pi * radio * radio;
    
    resultado.innerHTML = `
        <div class="explicacion-pasos">
            <h3>📚 Procedimiento Paso a Paso</h3>
            
            <div class="paso-item">
                <span class="numero-paso">1</span>
                <div class="contenido-paso">
                    <h4>Fórmula del Círculo</h4>
                    <p>Para calcular el área de un círculo, usamos:</p>
                    <div style="background: white; padding: 1rem; border-radius: 10px; margin-top: 0.5rem; font-size: 1.3rem; text-align: center; border: 2px solid #9c27b0;">
                        <strong>Área = π × radio × radio</strong>
                    </div>
                    <p style="margin-top: 0.5rem; color: #666;">Donde π (pi) ≈ 3.1416</p>
                </div>
            </div>
            
            <div class="paso-item">
                <span class="numero-paso">2</span>
                <div class="contenido-paso">
                    <h4>Sustitución de Valores</h4>
                    <p>Ahora cambiamos las letras por tus números:</p>
                    <ul style="margin-top: 0.5rem; line-height: 2;">
                        <li>Radio = <strong>${radio}</strong> cm</li>
                        <li>π = <strong>3.1416</strong></li>
                    </ul>
                    <div style="background: white; padding: 1rem; border-radius: 10px; margin-top: 0.5rem; font-size: 1.3rem; text-align: center; border: 2px solid #9c27b0;">
                        <strong>Área = 3.1416 × ${radio} × ${radio}</strong>
                    </div>
                </div>
            </div>
            
            <div class="paso-item">
                <span class="numero-paso">3</span>
                <div class="contenido-paso">
                    <h4>Cálculo Paso a Paso</h4>
                    <p>Primero multiplicamos el radio por sí mismo:</p>
                    <div style="background: #fff3e0; padding: 0.8rem; border-radius: 10px; margin-top: 0.5rem;">
                        <strong>${radio} × ${radio} = ${radio * radio}</strong>
                    </div>
                    <p style="margin-top: 1rem;">Luego multiplicamos por π (3.1416):</p>
                    <div style="background: white; padding: 1rem; border-radius: 10px; margin-top: 0.5rem; font-size: 1.3rem; text-align: center; border: 2px solid #9c27b0;">
                        <strong>3.1416 × ${radio * radio} = ${area.toFixed(2)}</strong>
                    </div>
                </div>
            </div>
            
            <div class="resultado-final">
                🎉 El área del círculo es: <strong>${area.toFixed(2)} cm²</strong>
            </div>
        </div>
    `;
    
    resultado.classList.add('mostrar');
    setTimeout(() => {
        resultado.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}