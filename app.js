express = require('express')
const met = require('./met.js')

const app = express()

port = process.env.PORT || 3000

app.get('/students/:id', function(req,res){
	if(req.params.id=='A00999220'){
		res.send({
		"id": "A00999220",
		"fullname": "Erick Medina Fleming",
		"nickname": "abqu",
		"age": 113
	})
		
	} else {
	res.send({
		error: 'id invalido'
	})
	}

})

app.get('/met', function(req,res){
	if(!req.query.search){
		res.send({
			error: 'Busqueda no valida'
		})
	}
	met.busqueda(req.query.search, function(error,response){
		if(error){
			return res.send({error: error})
		}
		met.obra(response.object, function(error,response){
			if(error){
				res.send({error:error})
			}
			res.send({
				searchTerm: req.query.search,
				artist: response.artist,
				title: response.title,
				year: response.year,
				technique: response.technique,
				metUrl: response.metUrl
			})
		})
	})



})

app.listen(port,function(req,res){
	console.log('Work it')
})


//app.listen('*',function(req,res){
//	res.send({
//		error: 'Ruta no valida'
//	})
//})