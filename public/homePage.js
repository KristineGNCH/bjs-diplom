const logoutButtonObject = new LogoutButton();

logoutButtonObject.action = function () {
    ApiConnector.logout((response) => {
        if (response.success === true) {
            location.reload();
        }
    })
};

ApiConnector.current = (response) => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
    }
};

const RatesBoardObject = new RatesBoard();

function getRates() {
    ApiConnector.getStocks((response) => {
        if (response.success === true) {
            RatesBoardObject.clearTable();
            RatesBoardObject.fillTable(response.data)
        }
    })
};

getRates();
setInterval(getRates, 60000);

const MoneyManagerObject = new MoneyManager();

MoneyManagerObject.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            MoneyManagerObject.setMessage(true, 'Баланс пополнен');
        } else {
            MoneyManagerObject.setMessage(false, response.error);
        }
    })
};

MoneyManagerObject.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            MoneyManagerObject.setMessage(true, 'Конвертация валюты выполнена');
        } else {
            MoneyManagerObject.setMessage(false, response.error);
        }
    })
};

MoneyManagerObject.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            MoneyManagerObject.setMessage(true, 'Перевод валюты выполнен');
        } else {
            MoneyManagerObject.setMessage(false, response.error);
        }
    })
};

const FavoritesWidgetObject = new FavoritesWidget();

ApiConnector.getFavorites = ((response) => {
    if (response.success === true) {
        FavoritesWidgetObject.clearTable();
        FavoritesWidgetObject.fillTable(response.data);
    } else {
        FavoritesWidgetObject.updateUsersList(response.data);
    }
});

FavoritesWidgetObject.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success === true) {
            FavoritesWidgetObject.clearTable();
            FavoritesWidgetObject.fillTable(response.data);
            FavoritesWidgetObject.updateUsersList(response.data);
            FavoritesWidgetObject.setMessage(true, 'Пользователь добавлен в список избранных');
        } else {
            FavoritesWidgetObject.setMessage(false, response.error);
        }
    })
};

FavoritesWidgetObject.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success === true) {
            FavoritesWidgetObject.clearTable();
            FavoritesWidgetObject.fillTable(response.data);
            FavoritesWidgetObject.updateUsersList(response.data);
            FavoritesWidgetObject.setMessage(true, 'Пользователь удалён из списка избранных');
        } else {
            FavoritesWidgetObject.setMessage(false, response.error);
        }
    })
};

