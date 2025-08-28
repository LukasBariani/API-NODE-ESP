"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// test-readings.ts
const API_BASE = 'http://localhost:3333/api';
function testReadings() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            console.log('=== Testando Readings API ===\n');
            console.log('URL base:', API_BASE);
            // Teste 1: Criar reading com deviceId
            console.log('1. Criando reading com deviceId...');
            const reading1 = yield fetch(`${API_BASE}/readings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    deviceId: 1,
                    temperature: 25.5,
                    humidity: 60,
                    pressure: 1013.25
                })
            });
            console.log('Status:', reading1.status);
            if (reading1.ok) {
                const data = yield reading1.json();
                console.log('✅ Success:', data);
            }
            else {
                console.log('❌ Erro - Response:', yield reading1.text());
            }
            // Teste 2: Criar reading com API Key (como ESP32 faria)
            console.log('\n2. Criando reading com API Key...');
            const reading2 = yield fetch(`${API_BASE}/esp/reading`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'abc123'
                },
                body: JSON.stringify({
                    temperature: 22.8,
                    humidity: 55,
                    pressure: 1012.8
                })
            });
            console.log('Status:', reading2.status);
            if (reading2.ok) {
                const data = yield reading2.json();
                console.log('✅ Success:', data);
            }
            else {
                console.log('❌ Erro - Response:', yield reading2.text());
            }
            // Teste 3: Buscar readings do device 1
            console.log('\n3. Buscando readings do device 1...');
            const readings = yield fetch(`${API_BASE}/readings/device/1`);
            console.log('Status:', readings.status);
            if (readings.ok) {
                const data = yield readings.json();
                console.log('✅ Readings encontradas:', ((_a = data.body) === null || _a === void 0 ? void 0 : _a.length) || 0);
            }
            else {
                console.log('❌ Erro - Response:', yield readings.text());
            }
        }
        catch (error) {
            console.log('❌ Erro:', error.message);
        }
    });
}
testReadings();
