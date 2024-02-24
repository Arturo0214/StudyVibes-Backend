function reverse(text) {
    let reversed = '';

    for (let character of text) {
        reversed = character + reversed;
    }
    return reversed;
}

console.log('reversed text: ', reverse('arturo'));


function invertir(texto) {
    return texto.split("").reverse().join("");
}

console.log('reversed text: ', invertir('arturo'))