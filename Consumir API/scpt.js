const express = require('express');
const app = express();
const path = require('path');
const request = require('request'); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 

//usar pagina public
app.use(express.static('public')); 

//caminho pagina movies
app.get('/results', (req, res) => { 
  
    let query = req.query.search; 
    request('https://api.themoviedb.org/3/search/movie?api_key=b0ddd967d557fa360da453a32054dfaf&query='+query, (error, response, body) =>{ 
      
        if(error){ 
            console.log(error); 
        } 
        
        let data = JSON.parse(body); 
        res.render('movies', {data:data, searchQuery:query}); 
    });
}) 


//caminho pagina search
app.get('/search', (req,res) => { 
    res.render('search');
  
}); 

//servidor esta na porta 3000
app.listen(3000, () => { 
    console.log('Server started at port 3000');
});