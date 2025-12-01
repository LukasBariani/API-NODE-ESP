// test-readings.ts
const API_BASE = 'http://localhost:3333/api';

async function testReadings() {
  try {
    console.log('=== Testando Readings API ===\n');
    console.log('URL base:', API_BASE);

    // Teste 1: Criar reading com deviceId
    console.log('1. Criando reading com deviceId...');
    const reading1 = await fetch(`${API_BASE}/readings`, {
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
      const data = await reading1.json();
      console.log('✅ Success:', data);
    } else {
      console.log('❌ Erro - Response:', await reading1.text());
    }

    // Teste 2: Criar reading com API Key (como ESP32 faria)
    console.log('\n2. Criando reading com API Key...');
    const reading2 = await fetch(`${API_BASE}/esp/reading`, {
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
      const data = await reading2.json();
      console.log('✅ Success:', data);
    } else {
      console.log('❌ Erro - Response:', await reading2.text());
    }

    // Teste 3: Buscar readings do device 1
    console.log('\n3. Buscando readings do device 1...');
    const readings = await fetch(`${API_BASE}/readings/device/1`);
    
    console.log('Status:', readings.status);
    if (readings.ok) {
      const data = await readings.json();
      console.log('✅ Readings encontradas:', data.body?.length || 0);
    } else {
      console.log('❌ Erro - Response:', await readings.text());
    }

  } catch (error: any) {
    console.log('❌ Erro:', error.message);
  }
}

testReadings();