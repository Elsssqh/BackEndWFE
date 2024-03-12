// BookAPI.js

angular.module('bookApp', [])
    .controller('BookController', function ($scope, $http) {
        $scope.books = [];
        $scope.selectedBook = null;

        // Fetch books from the API
        $http.get('https://www.googleapis.com/books/v1/volumes?q=cartoon%20novel&langRestrict=en&maxResults=21&key=AIzaSyCvJYVNcx7FGTjOkeOqgHNrzKB3Y7F5ulU')
            .then(function (response) {
                console.log('API Response:', response.data);

                if (response.data.items) {
                    $scope.books = response.data.items.map(function (item) {
                        // Truncate the description to a specific length (e.g., 150 characters)
                        const truncatedDescription = item.volumeInfo.description ? item.volumeInfo.description.slice(0, 150) + '...' : 'No description available.';

                        return {
                            title: item.volumeInfo.title || 'No Title',
                            authors: item.volumeInfo.authors || ['Unknown Author'],
                            description: truncatedDescription,
                            thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'no-image.jpg',
                            price: item.saleInfo && item.saleInfo.listPrice && item.saleInfo.listPrice.amount ? item.saleInfo.listPrice.amount : 'Not available'
   
                        };
                    });
                } else {
                    console.error('Error fetching book data.');
                }
            })
            .catch(function (error) {
                console.error('Error fetching book data:', error);
            });

        $scope.showBookDetails = function (book) {
            $scope.selectedBook = book;
            document.getElementById('overlay').style.display = 'flex';
        };

        $scope.addToTrolley = function (bookData) {
            // Create a book object with the required properties
            var book = {
                title: bookData.title,
                price: bookData.price,
                quantity: 1 // You can set the initial quantity as per your requirement
            };
        
            // Initialize the trolleyItems array if it's not already initialized
            $scope.trolleyItems = $scope.trolleyItems || [];
        
            // Add the book to the trolley
            $scope.trolleyItems.push(book);
        
            console.log('Added to Trolley:', book);
            alert('Book added to Trolley!');
        };
        

        $scope.hideBookDetails = function () {
            $scope.selectedBook = null;
            document.getElementById('overlay').style.display = 'none';
        };
    });
