const btnSearch = document.querySelector("#btnSearch");
const search = document.querySelector("#search");
const seeMore = document.querySelector("#see-more");
const card = document.querySelector("#card");

let objData = {};
let col;

btnSearch.addEventListener("click", (e) => {
  if (search.value !== "") {
    e.preventDefault();
    cleanUp();
    loadAPI(search.value);
  }
});

async function loadAPI(title) {
  try {
    const key = "fad503ce";
    const url = `http://www.omdbapi.com/?s=${title}&page=1&apikey=${key}`;

    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    objData = data;

    data.Error ? loadAlert() : loadCard(data);
  } catch (e) {
    console.error(e);
  }
}

function loadCard() {
  //   console.log(data.Title);
  cleanUp();
  const row = document.createElement("div");
  row.classList.add("row");
  card.appendChild(row);

  objData.Search.length < 3 ? (col = "col-12") : (col = "col-3");

  objData.Search.forEach((element) => {
    const { Poster, Title, Year } = element;

    row.innerHTML += `
    <div class="${col} cont-card  d-flex justify-content-center my-2">
        <div class="card ">
            <h3 class="text-center card-title">${Title}</h3>
            <img src="${Poster}"  class="img-fluid"/>
            <p class="small pt-2 text-center">Year: ${Year}</p>
            <a class="btn-card center" id="see-more" onClick="loadSeeMore('${Title}')">Ver detalles >></a>
        </div>
    </div>
  `;
  });
}

function loadSeeMore(title) {
  // console.log(title);

  fetch(`http://www.omdbapi.com/?t=${title}&apikey=fad503ce`)
    .then((res) => res.json())
    .then((data) => {
      const {
        Poster,
        Title,
        Year,
        Plot,
        Director,
        Genre,
        DVD,
        Runtime,
        BoxOffice,
        Country,
        Awards,
      } = data;

      card.innerHTML = `
          <div class="cont-see">
          <div class="row">
            <div class="col-4 p-4 center flex-column">
              <img src="${Poster}" class="img-fluid" />
      
              <a class="btn-card center mt-4" onClick="loadCard()"> Volver</a>
            </div>
      
            <div class="col-8 p-4">
              <h3 class="text-center see-more-title ">${Title}</h3>
              <div class="information">
      
                <p><span>Genero:</span>${Genre}</p>
                <p><span>Información: </span> ${Plot}</p>
                <p><span>Lanzamiento:</span>${DVD}</p>
                <p><span>Duración:</span>${Runtime}</p>
                <p><span>Venta en Taquillas:</span>${BoxOffice}</p>
                <p><span>Año:</span>${Year}</p>
                <p><span>Director:</span>${Director}</p>
                <p><span>Pais:</span>${Country}</p>
                <p><span>Premios:</span>${Awards}</p>
      
              </div>
            </div>
          </div>
        </div>
          `;
    })
    .catch((e) => console.error(e));
}

function loadAlert() {
  card.innerHTML = `
    <div class="alert">La película que buscas no se encuentra &#128532</div>
    `;

  setTimeout(() => {
    cleanUp();
  }, 4000);
}

function cleanUp() {
  card.innerHTML = "";
}
