const http = require('http'); // http server
const fs = require('fs'); // fs - file system

const server = http.createServer((req, res) => { // Створюємо HTTP сервер і визначаємо обробник запитів.
  if (req.method === 'GET' && req.url === '/') { // Перевіряємо, чи запит є GET-запитом і чи він адресований кореневому шляху ('/').
    fs.readFile('data.xml', 'utf-8', (err, data) => { 
        //parse
        const maxRate = findMaxRate(data); 


        const responseXml = `<data><max_rate>${maxRate}</max_rate></data>`; 
        res.end(responseXml); 
    });
  } 
});

function findMaxRate(xmlData) { 

  const rates = xmlData.match(/<rate>([\d.]+)<\/rate>/g); // regular expression

  let maxRate = 0; 

  for (const rate of rates) { 
    const rateValue = parseFloat(rate.match(/<rate>([\d.]+)<\/rate>/)[1]); // [1] - denote value

    if (rateValue > maxRate) { 
      maxRate = rateValue; 
    }
  }

  return maxRate; 
}

const port = 3000; 
server.listen(port, () => { 
  console.log(`Server is running on port ${port}`); 
});
