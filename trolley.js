// script.js

angular.module('bookApp', [])
    .controller('TrolleyController', function ($scope) {
        // Initialize trolleyItems and totalPrice
        $scope.trolleyItems = [];
        $scope.totalPrice = 0;

        // Function to add a book to the trolley
        $scope.addToTrolley = function (book) {
            // Check if the book is already in the trolley
           var index = $scope.trolleyItems.findIndex(item => item.title === book.title);

            if (index === -1) {
                // If not, add it to the trolley
                $scope.trolleyItems.push({
                    title: book.title,
                    quantity: 1,  // Initial quantity is 1
                    price: book.price  // Assuming 'price' is the property from the API
                });
            } else {
                // If yes, increase the quantity
                $scope.trolleyItems[index].quantity++;
            }

            // Update the total price
            $scope.totalPrice += book.price;
       };

        // Function to remove a book from the trolley
        $scope.removeFromTrolley = function (index) {
           // Subtract the price based on the quantity
           $scope.totalPrice -= $scope.trolleyItems[index].price * $scope.trolleyItems[index].quantity;

            // Remove the item from the trolley
           $scope.trolleyItems.splice(index, 1);
       };

        $scope.toggleMenu = function (){
            var navbar = document.querySelector('#navbarNav');
            navbar.classList.toggle('active');
       };
  });
