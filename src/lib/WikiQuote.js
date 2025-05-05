async function fetchQuote() {

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const d = new Date();
    let currentMonth = month[d.getMonth()];
    let currentDay = d.getDate();

    let wqQuoteHtml = "";
    let wqAuthorHtml = "";
    let url = `https://cors-anywhere1-puce.vercel.app/en.wikiquote.org/wiki/Wikiquote:Quote_of_the_day/${currentMonth}_${(new Date).getDate()}`;

    const data = await fetch(url)
        .then(response => response.text()) // Parse the response as text (HTML)
        .then(html => {
            // Parse the HTML to extract the desired content (quote and author)
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            // const quoteElement = doc.querySelector(".mw-parser-output > table > tbody > tr > td");
            // const authorElement = doc.querySelector(".mw-parser-output > table > tbody > tr > td > b");
            const quoteOfDay = doc.querySelector("tbody > tr > td:nth-child(3)")
            // wqQuoteHtml = quoteElement ? quoteElement.innerHTML : "Quote not found";
            // wqAuthorHtml = authorElement ? authorElement.innerHTML : "Author not found";

            // Do something with wqQuoteHtml and wqAuthorHtml (e.g., display them on the webpage)
            // console.log("Quote:", wqQuoteHtml);
            // console.log("Author:", wqAuthorHtml);
            // console.log(quoteOfDay.innerText)
            return quoteOfDay.innerText

        }).then(data => data)
        .catch(error => console.log(error));
    return data.split("~")
}

// fetchQuote(); // Call the function to fetch and process the quote

// console.log(fetchQuote())

async function fetchQuoteRu() {
    let url = `https://cors-anywhere1-puce.vercel.app/ru.wikiquote.org/wiki/Заглавная_страница`;

    const data = await fetch(url)
        .then(response => response.text()) // Parse the response as text (HTML)
        .then(html => {
            // Parse the HTML to extract the desired content (quote and author)
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            // const quoteElement = doc.querySelector(".mw-parser-output > table > tbody > tr > td");
            // const authorElement = doc.querySelector(".mw-parser-output > table > tbody > tr > td > b");
            const quoteOfDay = doc.querySelector("tbody > tr > td:nth-child(2) > span")
            const Author = doc.querySelector("tbody > tr > td:nth-child(2)  a")
            // wqQuoteHtml = quoteElement ? quoteElement.innerHTML : "Quote not found";
            // wqAuthorHtml = authorElement ? authorElement.innerHTML : "Author not found";

            // Do something with wqQuoteHtml and wqAuthorHtml (e.g., display them on the webpage)
            // console.log("Quote:", wqQuoteHtml);
            // console.log("Author:", wqAuthorHtml);
            // console.log(quoteOfDay.innerText)

            return [quoteOfDay.innerText, Author.innerText]

        }).then(data => data)
        .catch(error => console.log(error));
    return data
    // .split("~")
}

// fetchQuote(); // Call the function to fetch and process the quote

console.log(fetchQuoteRu())

export { fetchQuote, fetchQuoteRu };