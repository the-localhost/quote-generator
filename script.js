const body = document.getElementsByTagName('body')[0];
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const buttons = document.getElementsByTagName('button');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const githubBtn = document.getElementById('github');
const loader = document.getElementById('loader');
const bulb = document.getElementById('bulb');

const showLoadingSpinner = () => {
    quoteContainer.hidden = true;
    loader.hidden = false;
}

const removeLoadingSpinner = () => {
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// getting the quote from the API
async function getQuote(event, params = 0) {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        const apiQuotes = await response.json();
        const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

        // if the same quote is loaded again
        if(quote.innerText == quote['text']){
            throw "Same quote";
        }

        if(quote['text'].length>120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        
        }
        quoteText.innerHTML = quote['text'];
        authorText.innerHTML = quote['author'] === '' ? 'Unknown' : quote['author'];

        removeLoadingSpinner();
    } catch (error) {
        console.log('No quotes available, trying again! ', error);
        if(params === 10) {
            loader.classList.add('stuck-loader');
            setTimeout(function(){ alert("Something went wrong. Please refresh the page."); }, 1500);
            return;
        }
        getQuote(event, params+1);
    }
}

const tweetQuote = () => {
    const quote = quoteText.innerHTML;
    const author = authorText.innerHTML;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

const seeCode = () => {
    const repoUrl = "https://github.com/the-localhost/quote-generator/";
    window.open(repoUrl, '_blank');
}

// switches theme between dark and light mode
const switchTheme = () => {
    body.classList.toggle('light-body');
    bulb.classList.toggle('lit-bulb');
    quoteContainer.classList.toggle('light-quote-container');
    for(let button of buttons) 
        button.classList.toggle('light-button');
    loader.classList.toggle('light-loader');
    let bulbTitle = bulb.getAttribute('title');
    if(bulbTitle=='Light mode')
        bulb.setAttribute('title', 'Dark mode');
    else
        bulb.setAttribute('title', 'Light mode');
}

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
githubBtn.addEventListener('click', seeCode);
bulb.addEventListener('click', switchTheme);
