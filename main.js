// import axios from 'axios';
const input = document.getElementById('url-input'),
    button = document.getElementById('shorten-button'),
    out = document.getElementById('out');

input.focus();

async function shorten (href) {
    // const shortid = (await (await fetch('/api/new', {
    //     method: 'post',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({href}),
    // })).json()).shortid;
    const response = (await (await fetch(`/graphiql?query=mutation%7B%0A%20%20createShortenURL(input%3A%20%7B%0A%20%20%20%20url%3A%20%22${href}%22%0A%20%20%7D)%7B%0A%20%20%20%20url%2C%0A%20%20%20%20shortString%0A%20%20%7D%0A%7D%0A`, {
        method: 'post',
        // headers: {
        //     'Content-Type': 'application/json',
        // },
        // body: JSON.stringify({href}),
    })).json());
    // const response = await axios.post(`/graphiql?query=mutation%7B%0A%20%20createShortenURL(input%3A%20%7B%0A%20%20%20%20url%3A%20%22${href}%22%0A%20%20%7D)%7B%0A%20%20%20%20url%2C%0A%20%20%20%20shortString%0A%20%20%7D%0A%7D%0A`);
    console.log('response: ', response);
    const { shortString } = response.data.createShortenURL;

    return shortString;
}

button.addEventListener('click', async () => {
    const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    const regex = new RegExp(expression);
    if (input.value.match(regex)) { // If it matches a proper link
        if (input.value.startsWith('http') || input.value.startsWith('https')) {
            const link = `${location.origin}/l/${await shorten(input.value)}`;
            out.innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
        } else {
            const url = `https://${input.value}`
            const link = `${location.origin}/l/${await shorten(url)}`;
            out.innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
        }
    } else {
        alert('Please enter a proper url')
    }
});