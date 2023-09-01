const logoutButtonObject = new LogoutButton();

logoutButtonObject.action = function () {
    ApiConnector.logout((response) => {
        if (response.success === true) {
            location.reload();
        }
    })
};

ApiConnector.current((response) => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoardObject = new RatesBoard();

function getRates() {
    ApiConnector.getStocks((response) => {
        if (response.success === true) {
            ratesBoardObject.clearTable();
            ratesBoardObject.fillTable(response.data)
        }
    })
};

getRates();
setInterval(getRates, 60000);

const moneyManagerObject = new MoneyManager();

moneyManagerObject.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManagerObject.setMessage(true, 'Баланс пополнен');
        } else {
            moneyManagerObject.setMessage(false, response.error);
        }
    })
};

moneyManagerObject.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManagerObject.setMessage(true, 'Конвертация валюты выполнена');
        } else {
            moneyManagerObject.setMessage(false, response.error);
        }
    })
};

moneyManagerObject.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManagerObject.setMessage(true, 'Перевод валюты выполнен');
        } else {
            moneyManagerObject.setMessage(false, response.error);
        }
    })
};

const favoritesWidgetObject = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    if (response.success === true) {
        favoritesWidgetObject.clearTable();
        favoritesWidgetObject.fillTable(response.data);
    } else {
        favoritesWidgetObject.updateUsersList(response.data);
    }
});

favoritesWidgetObject.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success === true) {
            favoritesWidgetObject.clearTable();
            favoritesWidgetObject.fillTable(response.data);
            moneyManagerObject.updateUsersList(response.data);
            favoritesWidgetObject.setMessage(true, 'Пользователь добавлен в список избранных');
        } else {
            favoritesWidgetObject.setMessage(false, response.error);
        }
    })
};

favoritesWidgetObject.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success === true) {
            favoritesWidgetObject.clearTable();
            favoritesWidgetObject.fillTable(response.data);
            moneyManagerObject.updateUsersList(response.data);
            favoritesWidgetObject.setMessage(true, 'Пользователь удалён из списка избранных');
        } else {
            favoritesWidgetObject.setMessage(false, response.error);
        }
    })
};

