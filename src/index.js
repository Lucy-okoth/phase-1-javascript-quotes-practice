document.addEventListener('DOMContentLoaded', () => {


    document.addEventListener('DOMContentLoaded', getQuotes());
    
    //FETCH initial quotes
    function getQuotes () {
        fetch('http://localhost:3000/quotes?_embed=likes')
        .then(res => res.json())
        .then(data => appendQuotes(data));
    }
    
    
    //Append Quotes to DOM
    function appendQuotes(quotes) {
        for (i = 0; i < quotes.length; i++) {
            //Create Elements
            let card = document.createElement('li');
            card.setAttribute('class', 'quote-card');
            let block = document.createElement('BLOCKQUOTE');
            block.setAttribute('class', 'blockquote');
            block.setAttribute('id', quotes[i].id)
            let quoteContent = document.createElement('p');
            quoteContent.setAttribute('class', 'mb-0');
            quoteContent.textContent = quotes[i].quote;
            let footer = document.createElement('FOOTER');
            footer.setAttribute('class', 'blockquote-footer');
            footer.textContent = quotes[i].author;
            let br = document.createElement('br');
            let likeBtn = document.createElement('BUTTON');
            likeBtn.setAttribute('class', 'btn-success');
            likeBtn.textContent = 'Likes: '
            likeBtn.addEventListener('click', () => likeHandler(event))
            let likeCount = document.createElement('span')
            likeCount.textContent = 0
            let deleteBtn = document.createElement('BUTTON');
            deleteBtn.setAttribute('class', 'btn-danger');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteHandler(event))
            let editBtn = document.createElement('BUTTON');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => editHandler(event));
            let editForm = document.createElement('FORM');
            let editQuote = document.createElement('input');
            editQuote.type = 'text';
            editQuote.placeholder = 'Enter new quote';
            let editSubmitBtn = document.createElement('BUTTON');
            editSubmitBtn.textContent = 'Submit'
            //Append Elements
            let quoteList = document.querySelector('#quote-list');
            quoteList.appendChild(card);
            card.appendChild(block);
            block.appendChild(quoteContent);
            block.appendChild(footer);
            block.appendChild(br);
            block.appendChild(likeBtn);
            likeBtn.appendChild(likeCount);
            block.appendChild(deleteBtn);
            block.appendChild(editBtn);
            block.appendChild(editForm);
            editForm.appendChild(editQuote);
            editForm.appendChild(editSubmitBtn);
            editForm.style.display = 'none';
        }
    }
    
    
    //Form submission behavior
    document.querySelector('#new-quote-form').addEventListener('submit', function (event) {
        event.preventDefault();
        let newQuote = {
            quote: event.target[0].value,
            author: event.target[1].value
        }
        fetch('http://localhost:3000/quotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(newQuote)
        })
        .then(res => res.json())
        .then(data => appendNew(data));
    })
    
    function appendNew(quotes) {
            //Create Elements
            let card = document.createElement('li');
            card.setAttribute('class', 'quote-card');
            let block = document.createElement('BLOCKQUOTE');
            block.setAttribute('class', 'blockquote');
            block.setAttribute('id', quotes.id)
            let quoteContent = document.createElement('p');
            quoteContent.setAttribute('class', 'mb-0');
            quoteContent.textContent = quotes.quote;
            let footer = document.createElement('FOOTER');
            footer.setAttribute('class', 'blockquote-footer');
            footer.textContent = quotes.author;
            let br = document.createElement('br');
            let likeBtn = document.createElement('BUTTON');
            likeBtn.setAttribute('class', 'btn-success');
            likeBtn.textContent = 'Likes: '
            likeBtn.addEventListener('click', () => likeHandler(event))
            let likeCount = document.createElement('span')
            likeCount.textContent = 0
            let deleteBtn = document.createElement('BUTTON');
            deleteBtn.setAttribute('class', 'btn-danger');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteHandler(event))
            let editBtn = document.createElement('BUTTON');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => editHandler(event));
            let editForm = document.createElement('FORM');
            let editQuote = document.createElement('input');
            editQuote.type = 'text';
            editQuote.placeholder = 'Enter new quote';
            let editSubmitBtn = document.createElement('BUTTON');
            editSubmitBtn.textContent = 'Submit'
            //Append Elements
            let quoteList = document.querySelector('#quote-list');
            quoteList.appendChild(card);
            card.appendChild(block);
            block.appendChild(quoteContent);
            block.appendChild(footer);
            block.appendChild(br);
            block.appendChild(likeBtn);
            likeBtn.appendChild(likeCount);
            block.appendChild(deleteBtn);
            block.appendChild(editBtn);
            block.appendChild(editForm);
            editForm.appendChild(editQuote);
            editForm.appendChild(editSubmitBtn);
            editForm.style.display = 'none';
            document.querySelector('#new-quote-form').reset()
        }
    
    
    //Like button behavior
    function likeHandler(event) {
        document.querySelector('span').textContent++
        let likeObj = {
            quoteID: event.target.parentElement.id,
            createdAt: Date.now()
        }
        fetch('http://localhost:3000/likes', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(likeObj)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
    
    
    //Delete button behavior
    function deleteHandler(event) {
        event.target.parentElement.parentElement.remove()
        fetch(`http://localhost:3000/quotes/${event.target.parentElement.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    
    
    //Edit button behavior
    function editHandler (event) {
        let form = event.target.parentElement.children[6];
        form.style.display = 'block';
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            event.target.parentElement.children[0].textContent = event.target.children[0].value
        })
    }
    
    
    
    
    })
    