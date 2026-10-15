import fs from 'fs';

async function run() {
  try {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
    };

    const res1 = await fetch('https://www.behance.net/gallery/228295113/A-cor-do-pecado', { headers });
    const text1 = await res1.text();
    console.log('Res1 status:', res1.status, 'len:', text1.length);

    const m = text1.match(/js_challenge_value=([^;\"\s]+)/);
    if (!m) {
      console.log('No js_challenge_value match. Res1:', text1.slice(0, 300));
      return;
    }

    const cookieVal = m[1];
    console.log('Got cookieVal:', cookieVal.slice(0, 20) + '...');

    const res2 = await fetch('https://www.behance.net/gallery/228295113/A-cor-do-pecado', {
      headers: {
        ...headers,
        'Cookie': `js_challenge_value=${cookieVal}`,
      }
    });

    console.log('Res2 status:', res2.status);
    const html2 = await res2.text();
    console.log('Res2 len:', html2.length);
    fs.writeFileSync('tmp/behance_pecado.html', html2);

    const initDataMatch = html2.match(/<script id="__INITIAL_DATA__"[^>]*>([\s\S]*?)<\/script>/);
    if (initDataMatch) {
      console.log('Found __INITIAL_DATA__! Saving to tmp/behance_pecado_data.json');
      fs.writeFileSync('tmp/behance_pecado_data.json', initDataMatch[1]);
    } else {
      console.log('No __INITIAL_DATA__ tag, checking other script tags or JSON');
      const jsonMatch = html2.match(/window\.__INITIAL_STATE__\s*=\s*(\{[\s\S]*?\});/);
      if (jsonMatch) {
        fs.writeFileSync('tmp/behance_pecado_data.json', jsonMatch[1]);
      }
    }

    const matches = html2.match(/https:\/\/mir-s3-cdn-cf\.behance\.net\/project_modules\/[^\s"'\\]+/g);
    if (matches) {
      const unique = Array.from(new Set(matches));
      console.log('Unique images count:', unique.length);
      fs.writeFileSync('tmp/pecado_images.json', JSON.stringify(unique, null, 2));
    }
  } catch (e) {
    console.error('Error:', e);
  }
}
run();
