const API_KEY = "b83355570fc040d586ffb0423c66a18b";
const url = "https://newsapi.org/v2/everything?q=";

async function fetchNews(country) {         //fetching the json data from the api and parsing them
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=YOUR_API_KEY`);
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

// Fetch news for India
fetchNews('india');

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);             //bascially data.articles is an array of all the articles that is fetched and parsed
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {                  //for each article we are creating and copying the same template and filling that card with the data
        if (!article.urlToImage) return;             //urlToImage renders the image from the url
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);          //empty card and the article from the articles array
        cardsContainer.appendChild(cardClone);        //then the card is ready and formed so just put it in the container
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");        //opens a new window related to that particular news
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");     //if not null remove from the active element 
    curSelectedNav = navItem;                       //make the current selected Nav the curr element     
    curSelectedNav.classList.add("active");         //make this element active
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

const modebtn=document.querySelector('.modebtn');
const body=document.body;

modebtn.addEventListener('click',()=>{                      //switching to the dark mode as soon as the button is clicked
   

    body.classList.toggle('dark-mode');


});
