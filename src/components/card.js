import axios from "axios";
const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  // Creating elements
  const cardDiv = document.createElement("div");
  const headlineDiv = document.createElement("div");
  const authorDiv = document.createElement("div");
  const imgContainer = document.createElement("div");
  const img = document.createElement("img")
  const byAuthorSpan = document.createElement("span");

  // Adding content
  headlineDiv.textContent = article.headline;
  img.src = article.authorPhoto;
  byAuthorSpan.textContent = article.authorName;

  // Adding classes
  cardDiv.classList.add("card");
  headlineDiv.classList.add("headline");
  authorDiv.classList.add("author");
  imgContainer.classList.add("img-container");

  // Connecting them together
  cardDiv.appendChild(headlineDiv);
  cardDiv.appendChild(authorDiv);
  authorDiv.appendChild(imgContainer);
  authorDiv.appendChild(byAuthorSpan);
  imgContainer.appendChild(img);

  return cardDiv;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  axios.get("http://localhost:5000/api/articles")
  .then(res => {
    const technologies = res.data.articles;
    const wrapper = document.createElement("div");
    wrapper.classList.add(selector);

    for (const property in technologies) {
      technologies[property].forEach((element) => {
        const headline = element.headline;
        const authorPhoto = element.authorPhoto;
        const authorName = element.authorName;

        const cardObj = {
          headline,
          authorPhoto,
          authorName
        }
        const card = Card(cardObj);
        wrapper.appendChild(card)
      })
    }
    document.querySelector(selector).appendChild(wrapper);
  })
  .catch(err => console.error(err));  
}

export { Card, cardAppender }
