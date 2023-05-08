const https = require('https');
const fs = require('fs');

const url = 'https://rutube.ru/api/play/options/21675e5154442266a0c154f168a6b019/?format=json';

https.get(url, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const jsonData = JSON.parse(data);
    const hlsUrl = jsonData.appearance.live_streams.hls.['list-item'].url;

    const m3u8 = `#EXTM3U\n#EXT-X-STREAM-INF:BANDWIDTH=800000\n${hlsUrl}`;

    fs.writeFile('output.m3u8', m3u8, (err) => {
      if (err) throw err;
      console.log('M3U8 file has been saved!');
    });
  });

}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
