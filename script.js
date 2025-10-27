const searchForm = document.querySelector('form');
const moiveContainer = document.querySelector('.moive-container');
const inputBox = document.querySelector('.inputBox');

    // moiveContainer.style.background = "none";
    // moiveContainer.style.boxShadow = "none";
// function to fetch moive details using OMDB API 
const getMoiveInfo = async (moive) => {
    const apiKey = "1208a72f";
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${moive}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data)
    showMoiveData(data);
};

// function to show moive data on screen 
const showMoiveData = (data) => {

    moiveContainer.innerHTML = '';
    moiveContainer.classList.remove(noBackground);
    // moiveContainer.style.background = "#ffcf40";
    // moiveContainer.style.boxShadow = "0 0 15px #000";
    
    // use destructring assignment to extract properties from data object 
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;  //Array de-structuring

    const moiveElement = document.createElement('div');
    moiveElement.classList.add('moive-info');
    moiveElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating: &#9733</strong>${imdbRating}</p>`;
    
    //   Show Genre 
    const moiveGenreElement = document.createElement('div');
    moiveGenreElement.classList.add('moive-genre');     //Add class

    Genre.split(',').forEach((element) => {        //type of Genre is string
       const p = document.createElement('p');
       p.innerHTML = element;
       moiveGenreElement.appendChild(p);
    })
    moiveElement.appendChild(moiveGenreElement);

    // += nahi kiya to overwrite karega. hame first ko remove nahi karna hai isliye 
    moiveElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
                              <p><strong>Duration: </strong>${Runtime}</p>
                              <p><strong>Cast: </strong>${Actors}</p>
                              <p><strong>Plot: </strong>${Plot}</p>`;
    

    // Creating a div for moive poster 
    const moivePosterElement = document.createElement('div');
    moivePosterElement.classList.add('moive-poster');
    moivePosterElement.innerHTML = `<img src="${Poster}"/>`;

    moiveContainer.appendChild(moivePosterElement);
    moiveContainer.appendChild(moiveElement);
}

// Adding event  listener to search form 
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const moiveName = inputBox.value.trim();
    if (moiveName !== '') {
        getMoiveInfo(moiveName);
    }
    else{
        moiveContainer.innerHTML = `<h2>Enter moive name to get moive information</h2>`;
        moiveContainer.classList.add('noBackground')
        // moiveContainer.style.background = "none";
        // moiveContainer.style.boxShadow = "none";

        
    }

});

