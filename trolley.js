// trolley.js

// Define the AngularJS module
angular.module('bookApp', [])

// Define the controller for the trolley
.controller('TrolleyController', function($scope, $http) {
    // Fetch trolley items data from bookapi.js
    $http.get('BookAPI.js')
        .then(function(response) {
            // Assign the fetched data to $scope.trolleyItems
            $scope.trolleyItems = response.data.map(function(item) {
                return {
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity
                };
            });

            // Initialize totalPrice variable to store total price
            $scope.totalPrice = 0;

            // Function to remove item from the trolley
            $scope.removeFromTrolley = function(index) {
                // Remove the item from the trolley
                $scope.trolleyItems.splice(index, 1);

                // Recalculate total price
                $scope.calculateTotalPrice();
            };

            // Function to calculate total price
            $scope.calculateTotalPrice = function() {
                $scope.totalPrice = 0;
                // Iterate through trolley items and calculate total price
                for (var i = 0; i < $scope.trolleyItems.length; i++) {
                    $scope.totalPrice += $scope.trolleyItems[i].price * $scope.trolleyItems[i].quantity;
                }
            };

            // Call the calculateTotalPrice function initially to calculate total price
            $scope.calculateTotalPrice();
        })
        .catch(function(error) {
            console.error('Error fetching trolley data:', error);
        });
});
