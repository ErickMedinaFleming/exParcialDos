const request = require('request')

const busqueda = function(palabra,callback) {
	const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + palabra
	request({url,json:true},function(error, response){
		if(error){
			callback(error,undefined)
		}else {
			const data = response.body
			if(data.message){
				callback('Ruta no valida', undefined)
			}else if(data.total == 0){
				callback('No hay', undefined)
			}else {
				const info = {
					object : data.objectIDs[0]
				}
				callback(undefined,info)
			}

		}
	})
}

const obra = function(objectId, callback) {
	const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objectId

	request({url,json:true}, function(error,response){
		if(error){
			callback(error,undefined)
		}else {
			const data = response.body
			if(data.message){
				callback('Ruta no valida', undefined)
			}else if(data.total == 0){
				callback('No hay', undefined)
			}else {
				const info = {
					artist : data.constituents[0].name,
					title: data.title,
					year: data.objectEndDate,
					technique: data.medium,
					metUrl: data.objectURL
				}
				callback(undefined,info)
			}

		}


	})
}

module.exports = {
	busqueda : busqueda,
	obra : obra
}