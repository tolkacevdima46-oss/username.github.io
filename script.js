// Переключение вкладок
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Убираем активный класс у всех кнопок и контента
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Добавляем активный класс текущей кнопке и контенту
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});

// 🧮 МАТЕМАТИКА
function setExample(example) {
    document.getElementById('mathInput').value = example;
}

function calculateMath() {
    const input = document.getElementById('mathInput').value.trim();
    if (!input) {
        showError('mathResult', 'Введите математическое выражение');
        return;
    }
    
    try {
        // Заменяем символы для JavaScript
        let expression = input
            .replace(/√/g, 'Math.sqrt')
            .replace(/²/g, '**2')
            .replace(/³/g, '**3')
            .replace(/π/g, 'Math.PI')
            .replace(/÷/g, '/')
            .replace(/×/g, '*');
        
        const result = eval(expression);
        
        document.getElementById('mathResult').innerHTML = `
            <h4>✅ Результат вычисления:</h4>
            <div class="step"><strong>Выражение:</strong> ${input}</div>
            <div class="step"><strong>Результат:</strong> ${result}</div>
            <div class="step"><strong>JavaScript код:</strong> ${expression}</div>
        `;
    } catch (error) {
        showError('mathResult', `Ошибка вычисления: ${error.message}`);
    }
}

// ⚡ ФИЗИКА
function showPhysicsFields() {
    const formula = document.getElementById('physicsFormula').value;
    let html = '';
    
    switch(formula) {
        case 'kinetic':
            html = `
                <div class="field-group">
                    <input type="number" id="mass" placeholder="Масса (кг)" step="0.1">
                    <input type="number" id="velocity" placeholder="Скорость (м/с)" step="0.1">
                </div>
            `;
            break;
        case 'potential':
            html = `
                <div class="field-group">
                    <input type="number" id="mass" placeholder="Масса (кг)" step="0.1">
                    <input type="number" id="height" placeholder="Высота (м)" step="0.1">
                </div>
            `;
            break;
        case 'velocity':
            html = `
                <div class="field-group">
                    <input type="number" id="distance" placeholder="Расстояние (м)" step="0.1">
                    <input type="number" id="time" placeholder="Время (с)" step="0.1">
                </div>
            `;
            break;
        case 'force':
            html = `
                <div class="field-group">
                    <input type="number" id="mass" placeholder="Масса (кг)" step="0.1">
                    <input type="number" id="acceleration" placeholder="Ускорение (м/с²)" step="0.1">
                </div>
            `;
            break;
    }
    
    document.getElementById('physicsFields').innerHTML = html;
}

function calculatePhysics() {
    const formula = document.getElementById('physicsFormula').value;
    if (!formula) {
        showError('physicsResult', 'Выберите физическую формулу');
        return;
    }
    
    let result, steps, unit;
    
    try {
        switch(formula) {
            case 'kinetic':
                const mass = parseFloat(document.getElementById('mass').value) || 0;
                const velocity = parseFloat(document.getElementById('velocity').value) || 0;
                result = 0.5 * mass * velocity * velocity;
                steps = `
                    <div class="step">E = ½ × m × v²</div>
                    <div class="step">E = 0.5 × ${mass} × ${velocity}²</div>
                    <div class="step">E = 0.5 × ${mass} × ${velocity*velocity}</div>
                `;
                unit = 'Дж';
                break;
                
            case 'potential':
                const massP = parseFloat(document.getElementById('mass').value) || 0;
                const height = parseFloat(document.getElementById('height').value) || 0;
                const g = 9.81;
                result = massP * g * height;
                steps = `
                    <div class="step">E = m × g × h</div>
                    <div class="step">E = ${massP} × 9.81 × ${height}</div>
                `;
                unit = 'Дж';
                break;
                
            case 'velocity':
                const distance = parseFloat(document.getElementById('distance').value) || 0;
                const time = parseFloat(document.getElementById('time').value) || 0;
                result = distance / time;
                steps = `
                    <div class="step">v = s / t</div>
                    <div class="step">v = ${distance} / ${time}</div>
                `;
                unit = 'м/с';
                break;
                
            case 'force':
                const massF = parseFloat(document.getElementById('mass').value) || 0;
                const acceleration = parseFloat(document.getElementById('acceleration').value) || 0;
                result = massF * acceleration;
                steps = `
                    <div class="step">F = m × a</div>
                    <div class="step">F = ${massF} × ${acceleration}</div>
                `;
                unit = 'Н';
                break;
        }
        
        document.getElementById('physicsResult').innerHTML = `
            <h4>⚡ Результат расчета:</h4>
            ${steps}
            <div class="step"><strong>Ответ:</strong> ${result.toFixed(2)} ${unit}</div>
        `;
        
    } catch (error) {
        showError('physicsResult', `Ошибка расчета: ${error.message}`);
    }
}

// 📐 ГЕОМЕТРИЯ
function showGeometryFields() {
    const shape = document.getElementById('geometryShape').value;
    let html = '';
    
    switch(shape) {
        case 'triangle':
            html = `
                <div class="field-group">
                    <input type="number" id="base" placeholder="Основание" step="0.1">
                    <input type="number" id="height" placeholder="Высота" step="0.1">
                </div>
            `;
            break;
        case 'rectangle':
            html = `
                <div class="field-group">
                    <input type="number" id="length" placeholder="Длина" step="0.1">
                    <input type="number" id="width" placeholder="Ширина" step="0.1">
                </div>
            `;
            break;
        case 'circle':
            html = `
                <input type="number" id="radius" placeholder="Радиус" step="0.1">
            `;
            break;
        case 'sphere':
            html = `
                <input type="number" id="sphereRadius" placeholder="Радиус сферы" step="0.1">
            `;
            break;
    }
    
    document.getElementById('geometryFields').innerHTML = html;
}

function calculateGeometry() {
    const shape = document.getElementById('geometryShape').value;
    if (!shape) {
        showError('geometryResult', 'Выберите геометрическую фигуру');
        return;
    }
    
    let result, steps, area, perimeter, volume;
    
    try {
        switch(shape) {
            case 'triangle':
                const base = parseFloat(document.getElementById('base').value) || 0;
                const height = parseFloat(document.getElementById('height').value) || 0;
                area = 0.5 * base * height;
                steps = `
                    <div class="step">S = ½ × a × h</div>
                    <div class="step">S = 0.5 × ${base} × ${height}</div>
                    <div class="step"><strong>Площадь:</strong> ${area.toFixed(2)} ед²</div>
                `;
                break;
                
            case 'rectangle':
                const length = parseFloat(document.getElementById('length').value) || 0;
                const width = parseFloat(document.getElementById('width').value) || 0;
                area = length * width;
                perimeter = 2 * (length + width);
                steps = `
                    <div class="step">S = a × b = ${length} × ${width}</div>
                    <div class="step"><strong>Площадь:</strong> ${area.toFixed(2)} ед²</div>
                    <div class="step">P = 2 × (a + b) = 2 × (${length} + ${width})</div>
                    <div class="step"><strong>Периметр:</strong> ${perimeter.toFixed(2)} ед</div>
                `;
                break;
                
            case 'circle':
                const radius = parseFloat(document.getElementById('radius').value) || 0;
                area = Math.PI * radius * radius;
                perimeter = 2 * Math.PI * radius;
                steps = `
                    <div class="step">S = π × r² = 3.1416 × ${radius}²</div>
                    <div class="step"><strong>Площадь:</strong> ${area.toFixed(2)} ед²</div>
                    <div class="step">P = 2 × π × r = 2 × 3.1416 × ${radius}</div>
                    <div class="step"><strong>Длина окружности:</strong> ${perimeter.toFixed(2)} ед</div>
                `;
                break;
                
            case 'sphere':
                const sphereRadius = parseFloat(document.getElementById('sphereRadius').value) || 0;
                area = 4 * Math.PI * sphereRadius * sphereRadius;
                volume = (4/3) * Math.PI * Math.pow(sphereRadius, 3);
                steps = `
                    <div class="step">S = 4 × π × r² = 4 × 3.1416 × ${sphereRadius}²</div>
                    <div class="step"><strong>Площадь поверхности:</strong> ${area.toFixed(2)} ед²</div>
                    <div class="step">V = ⁴⁄₃ × π × r³ = 1.333 × 3.1416 × ${sphereRadius}³</div>
                    <div class="step"><strong>Объем:</strong> ${volume.toFixed(2)} ед³</div>
                `;
                break;
        }
        
        document.getElementById('geometryResult').innerHTML = `
            <h4>📐 Результат расчета:</h4>
            ${steps}
        `;
        
    } catch (error) {
        showError('geometryResult', `Ошибка расчета: ${error.message}`);
    }
}

// 💻 ИНФОРМАТИКА
function showComputerFields() {
    const topic = document.getElementById('computerTopic').value;
    let html = '';
    
    switch(topic) {
        case 'binary':
        case 'hex':
            html = `<input type="number" id="decimalInput" placeholder="Десятичное число" min="0">`;
            break;
        case 'logic':
            html = `
                <div class="field-group">
                    <select id="logicOp">
                        <option value="AND">AND (И)</option>
                        <option value="OR">OR (ИЛИ)</option>
                        <option value="XOR">XOR (искл. ИЛИ)</option>
                        <option value="NOT">NOT (НЕ)</option>
                    </select>
                    <input type="number" id="logicA" placeholder="A (0 или 1)" min="0" max="1">
                    <input type="number" id="logicB" placeholder="B (0 или 1)" min="0" max="1">
                </div>
            `;
            break;
    }
    
    document.getElementById('computerFields').innerHTML = html;
}

function calculateComputer() {
    const topic = document.getElementById('computerTopic').value;
    if (!topic) {
        showError('computerResult', 'Выберите тему информатики');
        return;
    }
    
    let result, steps;
    
    try {
        switch(topic) {
            case 'binary':
                const decimal = parseInt(document.getElementById('decimalInput').value) || 0;
                const binary = decimal.toString(2);
                steps = `
                    <div class="step">Десятичное число: ${decimal}</div>
                    <div class="step">Делим последовательно на 2:</div>
                    <div class="step">${getBinarySteps(decimal)}</div>
                    <div class="step"><strong>Двоичное представление:</strong> ${binary}</div>
                `;
                break;
                
            case 'hex':
                const decimalHex = parseInt(document.getElementById('decimalInput').value) || 0;
                const hex = decimalHex.toString(16).toUpperCase();
                steps = `
                    <div class="step">Десятичное число: ${decimalHex}</div>
                    <div class="step"><strong>Шестнадцатеричное:</strong> ${hex}</div>
                    <div class="step">Цифры: 0-9, A=10, B=11, C=12, D=13, E=14, F=15</div>
                `;
                break;
                
            case 'logic':
                const op = document.getElementById('logicOp').value;
                const a = parseInt(document.getElementById('logicA').value) || 0;
                const b = parseInt(document.getElementById('logicB').value) || 0;
                
                let logicResult;
                switch(op) {
                    case 'AND': logicResult = a && b; break;
                    case 'OR': logicResult = a || b; break;
                    case 'XOR': logicResult = a ^ b; break;
                    case 'NOT': logicResult = !a ? 1 : 0; break;
                }
                
                steps = `
                    <div class="step">Операция: ${op}</div>
                    <div class="step">A = ${a}, B = ${b}</div>
                    <div class="step"><strong>Результат:</strong> ${logicResult}</div>
                    <div class="step">${getLogicExplanation(op, a, b, logicResult)}</div>
                `;
                break;
        }
        
        document.getElementById('computerResult').innerHTML = `
            <h4>💻 Результат:</h4>
            ${steps}
        `;
        
    } catch (error) {
        showError('computerResult', `Ошибка вычисления: ${error.message}`);
    }
}

// Вспомогательные функции
function showError(elementId, message) {
    document.getElementById(elementId).innerHTML = `
        <div style="color: #dc3545; background: #f8d7da; padding: 15px; border-radius: 5px; border-left: 4px solid #dc3545;">
            <strong>❌ Ошибка:</strong> ${message}
        </div>
    `;
}

function getBinarySteps(decimal) {
    let steps = '';
    let n = decimal;
    let remainders = [];
    
    if (n === 0) return '<div class="step">0 ÷ 2 = 0, остаток 0</div>';
    
    while (n > 0) {
        const remainder = n % 2;
        const quotient = Math.floor(n / 2);
        steps += `<div class="step">${n} ÷ 2 = ${quotient}, остаток ${remainder}</div>`;
        remainders.unshift(remainder);
        n = quotient;
    }
    
    return steps;
}

function getLogicExplanation(op, a, b, result) {
    const explanations = {
        'AND': 'AND = 1 только если оба входа = 1',
        'OR': 'OR = 1 если хотя бы один вход = 1', 
        'XOR': 'XOR = 1 если входы разные',
        'NOT': 'NOT инвертирует вход (0→1, 1→0)'
    };
    return explanations[op];
}

// Автоматическое отображение полей при загрузке
document.addEventListener('DOMContentLoaded', function() {
    showPhysicsFields();
    showGeometryFields();
    showComputerFields();
});
