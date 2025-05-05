import React, { useEffect, useState } from 'react';
import { fetchQuote, fetchQuoteRu } from '../../lib/WikiQuote.js';
import "./WikiStyle.css"
function WikiQuote() {

    useEffect(() => {
        async function fetchMyAPI() {
            // var parts = document.location.href('en').split("/");

            // Get the last part of the URL
            var lastPart = window.location.pathname;

            // if (lastPart  === "/en-uz") {
            var response = lastPart === "/en-uz" ? await fetchQuote() : await fetchQuoteRu();
            // } else {/
            // }

            // response = await response.json();
            console.log(response);
            const [quote, author] = response;
            setQuote(quote)
            setAuthor(author)
        }
        fetchMyAPI();
    }, []);


    const [quote, setQuote] = useState("Over intellect will make you a genius, over emotions will make you a lunatic")
    const [author, setAuthor] = useState("Askarjon Arslonov")
    return (
        <blockquote className='modal-container result'>
            <p className='quote-text'>
                "{quote}"
            </p>
            <span className="author-attribution">
                {author}
            </span>
        </blockquote>
    )
}

export default WikiQuote