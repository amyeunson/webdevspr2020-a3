const express = require('express');
const router = express.Router();

// TODO: set toRead and haveRead as empty
const myBookLists = { 
    toRead: [
        {
            title: "I Know Why The Cage Bird Sings",
            authors: "Maya Angelou",
            id: 1
        },
        {
            title: "Green Eggs and Ham",
            authors: "Dr. Seuss",
            id: 2
        }
    ],
    haveRead: [
        {
            title: "The Rainbow Fish",
            authors: "Marcus Pfister",
            id: 3
        },
        {
            title: "Outliers",
            authors: "Malcolm Gladwell",
            id: 4
        }
    ]
} 

// GET books for MyLists
router.get('/', (req, res) => {
    res.status(200).send(myBookLists)
});

// Add searched book to ToRead List Or HaveRead List
// TODO: Change logic so it checks that both toRead and haveRead lists do not contain the book posted (not just one)
router.post('/', (req, res) => { 
    const bookItem = req.body;// body requires field for markType (markType values are "toRead"/"haveRead")
    const markType = bookItem.markType
    if (markType === null || markType === ""){
        return res.status(400).send('Error. Must include a markType');
    }
    const bookFound = myBookLists[markType].find((book) => book.id === bookItem.id);
    if (bookFound){
        return res.status(400).send('Cannot add a duplicate book to your list.');
    }
    myBookLists[markType] = myBookLists[markType].concat({
        title: bookItem.title,
        authors: bookItem.author,
        id: bookItem.id
    });
    res.status(200).send({message: 'Success!', id: bookItem.id});
});

// Swap book from To Read to Have Read OR
// Swap Have Read to To Read
router.put('/:bookId', (req, res) => {
    const bookId = req.params.bookId;
    const bookItem = req.body; // body will require fields for currentLocation and markType (markType values are "toRead"/"haveRead")
});

// Delete book from To Read OR Have Read list
router.delete('/:bookId', function (req, res) {
    const bookId = req.params.bookId; 
    const bookItem = req.body;// body will require field for currentLocation
});

module.exports = router;