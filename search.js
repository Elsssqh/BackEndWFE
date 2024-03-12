// script-angular.js

angular.module('bookApp', [])
    .controller('BookController', function ($scope, $http) {
        $scope.books = [];
        $scope.searchQuery = '';
        $scope.bodyHeight = '900px'; // Set default height

        $scope.searchBooks = function () {
            // Check if the search query is not empty
            if ($scope.searchQuery.trim() !== '') {
                $http.get('https://www.googleapis.com/books/v1/volumes?q=' + $scope.searchQuery + '&langRestrict=en&maxResults=30&key=AIzaSyCvJYVNcx7FGTjOkeOqgHNrzKB3Y7F5ulU')
                    .then(function (response) {
                        console.log('API Response:', response.data);

                        if (response.data.items) {
                            $scope.books = response.data.items.map(function (item) {
                                // Truncate the description to a specific length (e.g., 150 characters)
                                const truncatedDescription = item.volumeInfo.description ? item.volumeInfo.description.slice(0, 130) + '...' : 'No description available.';

                                return {
                                    title: item.volumeInfo.title || 'No Title',
                                    authors: item.volumeInfo.authors || ['Unknown Author'],
                                    description: truncatedDescription,
                                    thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'no-image.jpg'
                                };
                            });

                            // Update body height based on the number of books
                            $scope.bodyHeight = ($scope.books.length * 415) + 'px';
                        } else {
                            console.error('Error fetching book data.');
                        }
                    })
                    .catch(function (error) {
                        console.error('Error fetching book data:', error);
                    });
            } else {
                console.warn('Empty search query.');
            }
        };
    });


    window.addEventListener('resize', function() {
        var height = window.innerHeight;
        if (height > 5000) {
            document.getElementById('search').style.height = height + 'px';
        }
    });
