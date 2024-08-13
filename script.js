document.getElementById('searchButton').addEventListener('click', buscarPeliculas)
let api_key = 'b37522610c31d3f24465263d78f1345c'
let urlMovie = 'https://api.themoviedb.org/3/search/movie'
let urlImg = 'https://image.tmdb.org/t/p/w500'

    function buscarPeliculas(){
        

        let buscarInput = document.getElementById('searchInput').value

        //Ahora nos conectamos con la API  
        fetch(`${urlMovie}?query=${buscarInput}&api_key=${api_key}`)

        //Ahora hagamos una consulta con un JSON
        .then(response => response.json())
        .then(response => mostrarPeliculas(response.results))
    }

    function mostrarPeliculas(pelicula){
        let resultadoContenedor = document.getElementById('results')
        resultadoContenedor.innerHTML = ''

        if(pelicula.lenght === 0){
            resultadoContenedor.innerHTML = '<p>No se encontro ningún resultado</p>'
            return//con este return, saldra del mostrarPeliculas
        }
        //en caso que no entre al IF, casa en la siguiente consulta
        pelicula.forEach(pelicula => {
            let peliculaDiv = document.createElement('div')//Aquí creamos un DIV para cada resultado
            peliculaDiv.classList.add('movie')

            //ahora escribimos los parametros que queremos mostrar de la busqueda
            let titulo = document.createElement('h2')
            titulo.textContent= pelicula.title//aca pedimos el Titulo de la pelicula

            let fechaSalida = document.createElement('h4')
            fechaSalida.textContent= ('Fecha de esreno:')+pelicula.release_date

            // let portadaPath = `${urlImg}+pelicula.poster_path` //DE ESTA FORMA NO FUNCIONA            
            let portadaPath = urlImg + pelicula.poster_path
            let portada = document.createElement('img')
            portada.src = portadaPath

            let trama = document.createElement('p')
            trama.textContent= pelicula.overview
            
            //hasta aca esta bien, podemos agregarle mas parametros que querramos mostrar de las peliculas
            //como la calificacion, los generos(que estan en otra array), etc.

            //Ahora vamos crear todo lo que esta dentro del DIV con appendChild()

            peliculaDiv.appendChild(portada)
            peliculaDiv.appendChild(titulo)
            peliculaDiv.appendChild(fechaSalida)
            peliculaDiv.appendChild(trama)

            resultadoContenedor.appendChild(peliculaDiv)

        });
    }
