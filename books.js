//map changes all elements of an array to something else in a NEW array
//(used here to dynamically place arrayed data into innerHTML)
//.map syntax
//define array
const array1 = [1, 4, 9, 16];
//pass function to map
const map1 = array1.map((x) => x * 2);
// console.log(map1) -> (4) [2, 8, 18, 32]

//join eliminates (or alters) divisions within an array
//(use here to remove commas)
//.join syntax
//define array
const elements = ["Fire", "Air", "Water"];
// console.log(elements);            //-> (3) ['Fire', 'Air', 'Water']
// console.log(elements.join());     //->Fire,Air,Water
// console.log(elements.join(''));   //->FireAirWater
// console.log(elements.join(' '));  //->Fire Air Water
// console.log(elements.join('-'));  //->Fire-Air-Water

let books;

async function renderBooks(filter) {
  const booksWrapper = document.querySelector(".books");

  booksWrapper.classList += ' books__loading';

  if (!books) {
    books = await getBooks();
  }
  booksWrapper.classList.remove('books__loading')

  if (filter === "LOW_TO_HIGH") { //use || OR to compare regular price vs sale price. First value that exists gets used.
    books.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)); //To note: .sort does NOT create new array
  } else if (filter === "HIGH_TO_LOW") {
    books.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
  } else if (filter === "RATING") {
    books.sort((a, b) => b.rating - a.rating);
  }

  const booksHTML = books
    .map((book) => {
      //have to reassign the return of .map to var because mapping x does NOT redefine x. Creates new
      return `<div class="book">
    <figure class="book__img--wrapper">
      <img class="book__img" src="${book.url}" alt="">
    </figure>
    <div class="book__title">
      ${book.title}
    </div>
    <div class="book__ratings">
      ${ratingsHTML(book.rating)}
    </div>
    <div class="book__price">
      ${priceHTML(book.originalPrice,book.salePrice)}
    </div>
  </div>`;
    })
    .join(""); //use .join to eliminate commas separating arrayed elements (so that commas aren't rendered along with data)
  booksWrapper.innerHTML = booksHTML;
}

function priceHTML(originalPrice, salePrice) {
  if (!salePrice) {
    return `$${originalPrice.toFixed(2)}`
  }
  else {
    return `<span class="book__price--normal">$${originalPrice.toFixed(2)}</span>$${salePrice.toFixed(2)}`
  }
}

function filterBooks(event) {
  renderBooks(event.target.value);
}

function ratingsHTML(rating) {
  let ratingHTML = "";
  for (let i = 0; i < Math.floor(rating); ++i) {
    //Math.floor rounds down. Math.floor rounds up. So 4.2 doesn't get 5 stars
    ratingHTML += '<i class="fas fa-star"></i>\n';
  }
  if (!Number.isInteger(rating)) {//To make half stars possible if rating has decimal
    ratingHTML += '<i class="fas fa-star-half-alt"></i>\n';
  }
  return ratingHTML;
}
setTimeout(() => {
  renderBooks();
});


// FAKE DATA
function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve ([
    {
      id: 1,
      title: "Crack the Coding Interview",
      url: "assets/crack the coding interview.png",
      originalPrice: 49.95,
      salePrice: 14.95,
      rating: 4.5,
    },
    {
      id: 2,
      title: "Atomic Habits",
      url: "assets/atomic habits.jpg",
      originalPrice: 39,
      salePrice: null,
      rating: 3,
    },
    {
      id: 3,
      title: "Deep Work",
      url: "assets/deep work.jpeg",
      originalPrice: 29,
      salePrice: 12,
      rating: 1,
    },
    {
      id: 4,
      title: "The 10X Rule",
      url: "assets/book-1.jpeg",
      originalPrice: 44,
      salePrice: 19,
      rating: 4.5,
    },
    {
      id: 5,
      title: "Be Obsessed Or Be Average",
      url: "assets/book-2.jpeg",
      originalPrice: 32,
      salePrice: 17,
      rating: 3,
    },
    {
      id: 6,
      title: "Rich Dad Poor Dad",
      url: "assets/book-3.jpeg",
      originalPrice: 70,
      salePrice: 12.5,
      rating: 5,
    },
    {
      id: 7,
      title: "Cashflow Quadrant",
      url: "assets/book-4.jpeg",
      originalPrice: 11,
      salePrice: 10,
      rating: 4,
    },
    {
      id: 8,
      title: "48 Laws of Power",
      url: "assets/book-5.jpeg",
      originalPrice: 38,
      salePrice: 17.95,
      rating: 4.5,
    },
    {
      id: 9,
      title: "The 5 Second Rule",
      url: "assets/book-6.jpeg",
      originalPrice: 35,
      salePrice: null,
      rating: 2,
    },
    {
      id: 10,
      title: "Your Next Five Moves",
      url: "assets/book-7.jpg",
      originalPrice: 40,
      salePrice: null,
      rating: 4,
    },
    {
      id: 11,
      title: "Mastery",
      url: "assets/book-8.jpeg",
      originalPrice: 30,
      salePrice: null,
      rating: 4.5,
    },
  ])
    }, 1000);
  })
}
