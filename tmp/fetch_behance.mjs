async function run() {
  try {
    const res = await fetch('https://www.behance.net/gallery/248368873/Forum-JOTA', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
      }
    });
    console.log('Status:', res.status);
    const html = await res.text();
    console.log('HTML length:', html.length);
    const matches = html.match(/https:\/\/mir-s3-cdn-cf\.behance\.net\/project_modules\/[^\s"'\\]+/g);
    if (matches) {
      console.log('Unique images:', Array.from(new Set(matches)));
    }
  } catch (e) {
    console.error('Error:', e);
  }
}
run();
