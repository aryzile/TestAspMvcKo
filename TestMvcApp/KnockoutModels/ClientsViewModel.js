/// <reference path="../Scripts/jquery-2.2.0.js" />
/// <reference path="../Scripts/knockout-3.4.0.js" />

function Client(firstName, lastName) {
    var self = this;
    self.firstName = firstName,
    self.lastName = lastName
}

function ClientsViewModel() {
    var self = this;
    self.clients = ko.observableArray([])

    self.newFirstName = ko.observable("");
    self.newLastName = ko.observable("");

    self.getClients = function () {
        self.clients.removeAll();

        $.getJSON("/Home/GetClients/", function (data) {
            $.each(data, function (key, value) {
                self.clients.push(new Client(value.FirstName, value.LastName));
            });
        });
    }

    self.addClient = function () {
        var fname = self.newFirstName();
        var lname = self.newLastName();

        if (fname != "" || lname != "") {
            var client = new Client(fname, lname);

            self.newFirstName("");
            self.newLastName("");

            $.ajax({
                url: "/Home/SaveClient/",
                type: 'POST',
                data: ko.toJSON(client),
                contentType: 'application/json',
                success: function (result) {
                    self.clients.removeAll();
                    $.each(result, function (key, value) {
                        self.clients.push(new Client(value.FirstName, value.LastName));
                    });
                }
            });
        }
    }
};

var viewModel = new ClientsViewModel();
ko.applyBindings(viewModel);

$(document).ready(function () {
    viewModel.getClients();
});
