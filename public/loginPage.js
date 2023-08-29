'use strict';

const UserFormObject = new UserForm();

UserFormObject.loginFormCallback = (data) => {
        ApiConnector.login(data, response => {
                if (response.success === true) {
                        location.reload();
                } else {
                        UserFormObject.setLoginErrorMessage(response.error);
                }
        });
}

UserFormObject.registerFormCallback = (data) => {
        ApiConnector.register(data, response => {
                if (response.success === true) {
                        location.reload();
                } else {
                        UserFormObject.setRegisterErrorMessage(response.error);
                }
        });
}

