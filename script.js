const inputbox = document.getElementById('Inputbox');
const searchbtn = document.getElementById('searchbtn');
const definitionpara = document.getElementById('defpara');
const examplepara = document.getElementById('expara');
const googlebtn = document.getElementById('google');
const bravebtn = document.getElementById('brave');
const edgebtn = document.getElementById('edge');

async function CheckWord(Word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${Word}`;
    try {
        const Worddata = await fetch(url).then(response => response.json());

        console.log(Worddata);

        // Display the first definition
        const m = Worddata[0].meanings[0].definitions.length;
        let founddefination = false;

        for(let i = 0; i < m; i++){
            if (Worddata[0].meanings[0].definitions[0].definition) {
                definitionpara.innerHTML = Worddata[0].meanings[0].definitions[i].definition;
                founddefination = true;
                break;
            } 
        
        }
        if(!founddefination){
            definitionpara.innerHTML = "Definition not Found!";
        }
        

        // Find the first example and display it
        let n = Worddata[0].meanings[0].definitions.length;
        let foundExample = false;  // Flag to track if an example is found

        for (let i = 0; i < n; i++) {
            if (Worddata[0].meanings[0].definitions[i].example) {
                examplepara.innerHTML = Worddata[0].meanings[0].definitions[i].example + ".";
                foundExample = true;
                break;  // Break the loop after finding the first example
            }
        }

        // If no example is found after the loop
        if (!foundExample) {
            examplepara.innerHTML = "Example not Found!";
        }

    } catch (error) {
        console.error('Error fetching the word:', error);
        definitionpara.innerHTML = "Error fetching data.";
        examplepara.innerHTML = "";
    }
}

searchbtn.addEventListener('click', () => {
    CheckWord(inputbox.value);
});


function openSearchEngine(engine) {
    const searchWord = inputbox.value.trim();  // Get the input value and trim any spaces
    if (!searchWord) {
        alert("Please enter a word to search");
        return;
    }

    let url = '';
    switch (engine) {
        case 'google':
            url = `https://www.google.com/search?q=${searchWord}+meaning&oq=prince+meaning+&gs_lcrp=EgZjaHJvbWUyDAgAEEUYORixAxiABDIHCAEQABiABDIHCAIQABiABDIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiABNIBCDY0ODVqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8`;
            break;
        case 'brave':
            url = `https://search.brave.com/search?q=${searchWord}+meaning&source=desktop`;
            break;
        case 'edge':
            url = `https://www.bing.com/search?pglt=41&q=${searchWord}+meaning&cvid=a48f4b5f23e14c458b2fcb8a29324565&gs_lcrp=EgZjaHJvbWUqBggBEAAYQDIGCAAQRRg5MgYIARAAGEAyBggCEAAYQDIGCAMQABhAMgYIBBAAGEAyBggFEAAYQDIGCAYQABhAMgYIBxAAGEAyBggIEAAYQNIBCDYwNTVqMGoxqAIAsAIA&FORM=ANSPA1&PC=U531`;
            break;
        default:
            break;
    }
    
    if (url) {
        window.open(url, '_blank');  // Open the URL in a new tab
    }
}

googlebtn.addEventListener('click', () => openSearchEngine('google'));
bravebtn.addEventListener('click', () => openSearchEngine('brave'));
edgebtn.addEventListener('click', () => openSearchEngine('edge'));


