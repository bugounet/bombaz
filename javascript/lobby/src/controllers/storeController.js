/**
 * Created by bugounet on 16/05/15.
 */

var FormattingStringRegex =  /\%(\(\w+\))?[s]/gi;

function formatString (format, data) {
    // following values will be defined in loop iterations
    var match, expression, namedArg, value;
    // create return variable
    var s = format;
    // create counter
    var i = 0;
    // assignment not used as expression in while because jsLint does not
    // like that kind of things.
    match = FormattingStringRegex.exec(this.displayFormat);
    // for each matching group found, replace data
    while (match) {
        expression = match[0];
        namedArg = match[1];
        if (namedArg !== undefined) {
            // Matching unnamed argument case.
            if (data[namedArg] === undefined) {
                // Fail if array is too short
                throw ("Failed to format string \"" + format + "\" : " +
                namedArg + " missing in formatting data (expression " +
                expression + " not matched.");
            }
            // replace expression in template.
            value = data[namedArg];
        } else {
            // matching named argument case.
            if (data[i] === undefined) {
                // fail if named argument value not given.
                throw ("Failed to format string \"" + format + "\" : " +
                "Not enough arguments in formatting data to match " +
                " expression \"" + expression + "\".");
            }
            // replace expression in template
            value = data[i];
        }
        // replace expression by its value
        s = s.replace(expression, value);
        // increment and get next matching regex group if any.
        i++;
        match = FormattingStringRegex.exec(this.displayFormat);
    }
    if (i !== data.length) {
        // warn if some values ar not used in the formatting
        console.warn("Formatting data unused while formatting \"" + format +
            "\"");
    }
    return s;
}

function EmptyCatalogItem() {
    "use strict";
    this.name = "No result";
    this.displayFormat = "%(name)s";
    this.toString = function () {
        formatString(this.displayFormat, { name: this.name });
    };
}

function CatalogItem(product) {
    "use strict";
    this.name = product.name;
    this.price = product.price;
    this.specialOffer = product.discount !== 0;
    this.finalPrice = product.price - product.discount;

    this.displayFormat = "%(specialOfferPrefix)s%(name)s -- %(price)s GP";

    this.toString = function () {
        formatString(this.displayFormat, {
            name: this.name,
            price: this.finalPrice,
            specialOfferPrefix: this.specialOffer ? "[PROMO]" : "",
        });
    };
}

lobbyControllers.controller('storeController', ['$scope', '$http', 'popupService',
    function ($scope, $http, $popupService) {
        "use strict";

        $scope.cart = [];

        $scope.storeGetMapsCatalog = function () {
            $http.get(
                {
                    url: 'lobby/api/store/catalogue/maps'
                }
            ).success(function (data) {
                $scope.fillCatalogue(data.maps);
            }).error(function (data) {
                $popupService.error("Could not get maps catalogue.");
                $scope.catalogue = [new EmptyCatalogItem()];
            });
        };

        $scope.storeGetSkinsCatalog = function () {
            $http.get(
                {
                    url: 'lobby/api/store/catalogue/skins'
                }
            ).success(function (data) {
                $scope.fillCatalogue(data.skins);
            }).error(function (data) {
                $popupService.error("Could not get skins catalogue.");
                $scope.catalogue = [new EmptyCatalogItem()];
            });
        };

        $scope.fillCatalogue = function (list) {
            $scope.catalogue = [];
            var arr = $scope.catalogue,
                // will be set in loop
                i, item;
            // iterate over maps, create CatalogItem items and fill the
            // scope catalogue.
            for (i = 0; i < list.length; i++) {
                item = new CatalogItem(list[i]);
                arr[arr.length] = item;
            }
        };

        $scope.storeAddToCart = function (product) {
            console.log("adding product ", product, "to cart");
            var arr = $scope.cart;
            // append product at end of cart
            arr[arr.length] = product;
            $popupService.info("Product added to cart");
        };

        $scope.storeRemoveFromCart = function (product) {
            console.log("Removing ", product, "from cart");
            var position = $scope.cart.indexOf(product);
            // if product position not found, curse and exit
            if (position === -1) {
                console.error("product not found in cart.");
                return;
            }
            // remove item at product position from cart.
            $scope.cart.splice(position, 1);
            $popupService.info("Product removed from cart");
        };

        $scope.storeBuy = function () {
            console.log("Validating cart.");
            $http.post(
                {
                    url: 'lobby/api/v1_0/store/buy/',
                    data: $scope.cart,
                }
            ).success(function (data) {
                // empty view cart on success
                $scope.cart = [];
                $popupService.success("Order successfully completed.");
            }).error(function (data) {
                $popupService.error("Could not validate your order. You have" +
                    " not been charged for that and the support team will" +
                    " contact you soon for further investigation.");
            });
        };

}]);
