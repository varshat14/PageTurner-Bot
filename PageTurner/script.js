let waitingForConfirmation = false; // To track if the bot is waiting for yes/no
let currentGenre = ''; 

document.addEventListener('DOMContentLoaded', () => {
    // Bot greeting message
    setTimeout(() => {
        addMessage("Hey there, I'm your Book Buddy! Ready to uncover your next page-turner?", 'bot-message');
         setTimeout(() => {
            addMessage("What's your vibe? Share your favorite genre!", 'bot-message');
            showGenreButtons(); // Display genre buttons after the second message
        }, 3500); // 3.5 seconds delay
    }, 1000);
});

document.getElementById('sendButton').addEventListener('click', () => {
    const userInput = document.getElementById('userInput').value.trim();
    if (userInput === '') return;

    // Add user message to chat
    addMessage(userInput, 'user-message');

    // Clear input
    document.getElementById('userInput').value = '';

    // Check if the bot is waiting for a yes/no response
    if (waitingForConfirmation) {
        handleConfirmationResponse(userInput.toLowerCase());
    } else {
        // General input handling (book recommendation logic)
        const botResponse = getBookRecommendation(userInput);
        addTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator();
            addMessage(botResponse, 'bot-message');
        }, 1500);
    }
});

// Function to add messages to chatbox
function addMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.textContent = text;

    document.getElementById('messages').appendChild(messageDiv);
    document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;
}

// Add typing indicator
function addTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.textContent = '...';
    document.getElementById('messages').appendChild(typingDiv);
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingDiv = document.querySelector('.typing-indicator');
    if (typingDiv) {
        typingDiv.remove();
    }
}

// Show genre selection buttons
function showGenreButtons() {
    const genres = ['Mystery', 'Fantasy', 'Science Fiction', 'Romance', 'Horror'];
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'genre-buttons';

    genres.forEach(genre => {
        const button = document.createElement('button');
        button.className = 'genre-button';
        button.textContent = genre;

        button.onclick = function () {
            displaySelectedGenre(genre);
        };

        buttonContainer.appendChild(button);
    });

    document.getElementById('messages').appendChild(buttonContainer);
}

// Display the selected genre as a message
function displaySelectedGenre(genre) {
    addMessage(genre, 'user-message');
    let response = `You selected the genre: ${genre}. Let's find some great books for you!`;
    setTimeout(() => {
        addMessage(response, 'bot-message');
        displayBookRecommendations(genre);
    }, 1000);
}

// Display book recommendations based on genre
function displayBookRecommendations(genre) {
    const bookRecommendations = {
        // Sample data for demonstration
         "Mystery": [
            {
                title: "The Girl with the Dragon Tattoo",
                author: "Stieg Larsson",
                image: "img/1.jpg",
                summary: "A gripping mystery thriller about a journalist and a hacker investigating a family's dark secrets.",
                goodreadsUrl: "https://www.goodreads.com/book/show/2429135.The_Girl_with_the_Dragon_Tattoo?ac=1&from_search=true&qid=v9hPdFJyYD&rank=1"
            },
            {
                title: "Gone Girl",
                author: "Gillian Flynn",
                image: "img/2.jpg",
                summary: "A psychological thriller about the disappearance of a woman and the unraveling of her marriage.",
                 goodreadsUrl: "https://www.goodreads.com/book/show/19288043-gone-girl?ref=nav_sb_ss_1_9"

            },
              {
        "title": "Big Little Lies",
        "author": "Liane Moriarty",
        "image": "img/3.jpg",
        "summary": "A story about three women whose lives unravel after a tragic event at a school trivia night.",
 goodreadsUrl: "https://www.goodreads.com/book/show/33516773-big-little-lies?ref=nav_sb_ss_1_15"

    },
    {
        "title": "The Silent Patient",
        "author": "Alex Michaelides",
        "image": "img/4.jpg",
        "summary": "A woman shoots her husband and then goes silent. A psychotherapist tries to uncover the truth.",
 goodreadsUrl: "https://www.goodreads.com/book/show/40097951-the-silent-patient?ref=nav_sb_ss_1_14"

    },
    {
        "title": "The Woman in the Window",
        "author": "A. J. Finn",
        "image": "img/5.jpg",
        "summary": "A woman with agoraphobia becomes obsessed with her neighbors and believes she has witnessed a crime.",
 goodreadsUrl: "https://www.goodreads.com/book/show/40389527-the-woman-in-the-window?ref=nav_sb_ss_1_17"

    },
    {
        "title": "In the Woods",
        "author": "Tana French",
        "image": "img/6.jpg",
        "summary": "A detective revisits the woods of his childhood to investigate a young girl's murder.",
 goodreadsUrl: "https://www.goodreads.com/book/show/2459785.In_the_Woods?ref=nav_sb_ss_2_12"

    }
        ],
        "Fantasy": [
            {
                title: "Harry Potter and the Sorcerer's Stone",
                author: "J.K. Rowling",
                image: "img/7.jpg",
                summary: "The first book in the Harry Potter series, following the adventures of a young wizard at Hogwarts.",
 goodreadsUrl: "https://www.goodreads.com/book/show/42844155-harry-potter-and-the-sorcerer-s-stone?ref=nav_sb_ss_1_10"

            },
            {
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                image: "img/8.jpg",
                summary: "Bilbo Baggins embarks on a grand adventure with dwarves to reclaim treasure guarded by the dragon Smaug.",
 goodreadsUrl: "https://www.goodreads.com/book/show/5907.The_Hobbit?ac=1&from_search=true&qid=aqVsHHcYF2&rank=1"

            },
            {
            "title": "A Song of Ice and Fire",
            "author": "George R.R. Martin",
            "image": "img/9.jpg",
            "summary": "A complex series set in a fictional world filled with political intrigue, dragons, and the struggle for the Iron Throne.",
 goodreadsUrl: "https://www.goodreads.com/book/show/2429135.The_Girl_with_the_Dragon_Tattoo?ac=1&from_search=true&qid=v9hPdFJyYD&rank=1"

        },
        {
            "title": "The Name of the Wind",
            "author": "Patrick Rothfuss",
            "image": "img/10.jpg",
            "summary": "The tale of Kvothe, a gifted young man who grows up to become a legendary figure in a magical world.",
 goodreadsUrl: "https://www.goodreads.com/book/show/186074.The_Name_of_the_Wind?ref=nav_sb_ss_1_20"

        },
        {
            "title": "The Lies of Locke Lamora",
            "author": "Scott Lynch",
            "image": "img/11.jpg",
            "summary": "A fantasy about a group of master thieves in the city of Camorr, where they outwit rivals and authorities alike.",
 goodreadsUrl: "https://www.goodreads.com/book/show/29588376-the-lies-of-locke-lamora?ref=nav_sb_ss_2_9"

        },
        {
            "title": "Mistborn: The Final Empire",
            "author": "Brandon Sanderson",
            "image": "img/12.jpg",
            "summary": "A group of rebels with magical abilities fight to overthrow a tyrannical ruler in a world where ash falls from the sky.",
 goodreadsUrl: "https://www.goodreads.com/book/show/68428.The_Final_Empire?ref=nav_sb_ss_1_19"

        }
        ],
        "Science Fiction": [
        {
            "title": "Dune",
            "author": "Frank Herbert",
            "image": "img/13.jpg",
            "summary": "A young nobleman becomes embroiled in a power struggle on the desert planet Arrakis, the source of the galaxy's most valuable substance.",
 goodreadsUrl: "https://www.goodreads.com/book/show/44767458-dune?from_search=true&from_srp=true&qid=uHn02t409z&rank=1"

        },
        {
            "title": "Neuromancer",
            "author": "William Gibson",
            "image": "img/14.jpg",
            "summary": "A washed-up hacker is hired to pull off the ultimate hack, thrusting him into a world of artificial intelligence and cyberspace.",
 goodreadsUrl: "https://www.goodreads.com/book/show/6088007-neuromancer?ref=nav_sb_ss_1_10"

        },
        {
            "title": "The Martian",
            "author": "Andy Weir",
            "image": "img/15.jpg",
            "summary": "After a disaster leaves him stranded on Mars, astronaut Mark Watney must use his ingenuity to survive and signal for rescue.",
 goodreadsUrl: "https://www.goodreads.com/book/show/18007564-the-martian?ref=nav_sb_ss_1_11"

        },
        {
            "title": "Ender's Game",
            "author": "Orson Scott Card",
            "image": "img/16.jpg",
            "summary": "A young boy, Ender Wiggin, is recruited to a military school to prepare for an impending alien invasion.",
 goodreadsUrl: "https://www.goodreads.com/book/show/375802.Ender_s_Game?ref=nav_sb_ss_1_8"

        },
        {
            "title": "The Left Hand of Darkness",
            "author": "Ursula K. Le Guin",
            "image": "img/17.jpg",
            "summary": "A human envoy from Earth navigates political intrigue on a distant planet inhabited by an androgynous species.",
 goodreadsUrl: "https://www.goodreads.com/book/show/18423.The_Left_Hand_of_Darkness?ref=nav_sb_ss_1_13"

        },
        {
            "title": "Snow Crash",
            "author": "Neal Stephenson",
            "image": "img/18.jpg",
            "summary": "A cyberpunk novel where a hacker uncovers a plot involving an ancient virus that threatens the future of the virtual world.",
 goodreadsUrl: "https://www.goodreads.com/book/show/61240297-snow-crash?ref=nav_sb_ss_2_6"

        }
    ],
     "Romance": [
        {
            "title": "Twilight",
            "author": "Stephenie Meyer",
            "image": "img/19.jpg",
            "summary": "A teenage girl falls in love with a vampire, setting off a passionate and dangerous love triangle.",
 goodreadsUrl: "https://www.goodreads.com/book/show/41865.Twilight?ref=nav_sb_ss_1_6"

        },
        {
            "title": "Pride and Prejudice",
            "author": "Jane Austen",
            "image": "img/20.jpg",
            "summary": "Elizabeth Bennet and the proud Mr. Darcy navigate societal expectations, misunderstandings, and their growing feelings for each other.",
 goodreadsUrl: "https://www.goodreads.com/book/show/1885.Pride_and_Prejudice?ref=nav_sb_ss_1_13"

        },
        {
            "title": "The Fault in Our Stars",
            "author": "John Green",
            "image": "img/21.jpg",
            "summary": "Two teenagers with cancer fall in love, navigating the difficulties of illness, love, and loss.",
 goodreadsUrl: "https://www.goodreads.com/book/show/11870085-the-fault-in-our-stars?ref=nav_sb_ss_1_12"

        },
        {
            "title": "Twisted Love",
            "author": "Ana Huang",
            "image": "img/22.jpg",
            "summary": "Ana Huang follows the intense romance between Ava Chen and Alex Volkov, marked by passion, secrets, and emotional turmoil. Their relationship evolves from friendship to a complex, forbidden love filled with trust issues and unresolved desires.",
 goodreadsUrl: "https://www.goodreads.com/book/show/55817097-twisted-love?from_search=true&from_srp=true&qid=RefB275UNM&rank=1"

        },
        {
            "title": "Me Before You",
            "author": "Jojo Moyes",
            "image": "img/23.jpg",
            "summary": "A caregiver forms an unexpected and transformative bond with a quadriplegic man, leading to a deep and emotional romance.",
 goodreadsUrl: "https://www.goodreads.com/book/show/17347634-me-before-you?ref=nav_sb_ss_1_13"

        },
        {
            "title": "The Notebook",
            "author": "Nicholas Sparks",
            "image": "img/24.jpg",
            "summary": "A love story between a young couple, which transcends time, as they face challenges and an unforgettable connection that spans decades.",
 goodreadsUrl: "https://www.goodreads.com/book/show/33648131-the-notebook?ref=nav_sb_ss_1_12"

        }],
        "Horror": [
        {
            "title": "It",
            "author": "Stephen King",
            "image": "img/25.jpg",
            "summary": "A group of childhood friends reunite to confront a shape-shifting entity that has terrorized their hometown for decades.",
 goodreadsUrl: "https://www.goodreads.com/book/show/830502.It?from_search=true&from_srp=true&qid=gQZu8sfqu5&rank=3"

        },
        {
            "title": "The Shining",
            "author": "Stephen King",
            "image": "img/26.jpg",
            "summary": "A family isolated in a haunted hotel must face supernatural forces that push the father to madness.",
 goodreadsUrl: "https://www.goodreads.com/book/show/11588.The_Shining?from_search=true&from_srp=true&qid=9gZhLywtHr&rank=1"

        },
        {
            "title": "Dracula",
            "author": "Bram Stoker",
            "image": "img/27.jpg",
            "summary": "The classic tale of the vampire Count Dracula, who seeks to move from Transylvania to England in order to spread the undead curse.",
 goodreadsUrl: "https://www.goodreads.com/book/show/17245.Dracula?from_search=true&from_srp=true&qid=25zdO38gao&rank=1"

        },
        {
            "title": "Frankenstein",
            "author": "Mary Shelley",
            "image": "img/28.jpg",
            "summary": "The tragic story of Dr. Victor Frankenstein and the monster he creates, exploring themes of creation and the consequences of unchecked ambition.",
 goodreadsUrl: "https://www.goodreads.com/book/show/35031085-frankenstein?ref=nav_sb_ss_1_12"

        },
        {
            "title": "The Haunting of Hill House",
            "author": "Shirley Jackson",
            "image": "img/29.jpg",
            "summary": "A group of people stay in a reportedly haunted mansion, where disturbing events occur, testing the limits of their sanity.",
 goodreadsUrl: "https://www.goodreads.com/book/show/89717.The_Haunting_of_Hill_House?ref=nav_sb_ss_1_15"

        },
        {
            "title": "American Psycho",
            "author": "Bret Easton Ellis",
            "image": "img/30.jpg",
            "summary": "The chilling, first-person account of a wealthy New York City man who leads a double life as a murderer and psychopath.",
 goodreadsUrl: "https://www.goodreads.com/book/show/28676.American_Psycho?ref=nav_sb_ss_1_10"

        }
    ]
    };


    const books = bookRecommendations[genre];
    if (books) {
        const bookCardsContainer = document.createElement('div');
        bookCardsContainer.className = 'book-cards';

        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <p><strong>${book.title}</strong></p>
                <p>by ${book.author}</p>
            `;
            bookCard.addEventListener('click', () => {
                fetchBookDetails(book);
            });
            bookCardsContainer.appendChild(bookCard);
        });

        document.getElementById('messages').appendChild(bookCardsContainer);
    }
}

function fetchBookDetails(book) {
    // Simulate fetching additional details
    const additionalDetails = {
        goodreadsRating: "4/5",
        goodreadsUrl: book.goodreadsUrl || "#",  // Fallback to '#' if no URL is provided
    };

    // Create the book detail box
    const detailBox = document.createElement('div');
    detailBox.className = 'book-detail-box';

    // Display book details including image and Goodreads link
    detailBox.innerHTML = `
        <div class="book-detail-content">
            <img src="${book.image}" alt="Book Cover" class="book-detail-image" />
            <div class="book-details">
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Summary:</strong> ${book.summary}</p>
                <p><strong>Goodreads Rating:</strong> ${additionalDetails.goodreadsRating}</p>
                <p><strong>Goodreads Link:</strong> <a href="${additionalDetails.goodreadsUrl}" target="_blank" class="goodreads-link">View on Goodreads</a></p>
            </div>
        </div>
    `;

    // Append the detail box to the messages container
    document.getElementById('messages').appendChild(detailBox);

    // Ask for user confirmation (yes/no)
    setTimeout(() => {
        addMessage("Are you interested in this book? (yes/no)", 'bot-message');
        waitingForConfirmation = true; // Expecting a "yes" or "no" response
    }, 1000);
}


// Handle yes/no confirmation responses
function handleConfirmationResponse(userInput) {
    if (userInput === 'yes') {
        addMessage("It's an excellent choice! Go for it, buddy!", 'bot-message');
        setTimeout(() => {
            addMessage("What genre would you like to explore next?", 'bot-message');
            showGenreButtons();
        }, 2000);
    } else if (userInput === 'no') {
        addMessage("You can check out the other options that are available. Explore more!", 'bot-message');
        setTimeout(() => {
            showGenreButtons();
        }, 000);
    } else {
        addMessage("I didn't understand that. Please reply with 'yes' or 'no'.", 'bot-message');
    }

    waitingForConfirmation = false; // Reset state
}

