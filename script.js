const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const githubBtn = document.getElementById('github');
const loader = document.getElementById('loader');

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
    const proxy = 'http://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxy + apiUrl);
        const data = await response.json();
        
        if(data['quoteText'].length>120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        
        }
        quoteText.innerHTML = data['quoteText'];
        authorText.innerHTML = data['quoteAuthor'] === '' ? 'Unknown' : data['quoteAuthor'];

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
    const repoUrl = 'https://github.com/the-localhost/quote-generator/';
    window.open(repoUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
githubBtn.addEventListener('click', seeCode);
