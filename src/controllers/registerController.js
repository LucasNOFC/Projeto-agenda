const Register = require('../models/RegisterModel');

exports.index = (req, res) => {
    res.render('register');
};

exports.login = (req, res) => {
    res.send(req.body);
}

exports.register = async function (req, res) {
    try {
        const register = new Register(req.body);
        await register.createAccount();

        if (register.errors.length > 0) {
            req.flash('errors', register.errors);
            req.session.save(function () {
                return res.redirect('/register/index');
            });
            return;
        }
        
        req.flash('success', "Usuário cadastrado com sucesso!");
        req.session.save(function () {
            return res.redirect('/register/index');
        });
    } catch (e) {
        console.error(e);
        return res.render('404');

    }

}

exports.login = async function (req, res) {
    try {
        const register = new Register(req.body);
        await register.login();

        if (register.errors.length > 0) {
            req.flash('errors', register.errors);
            req.session.save(function () {
                return res.redirect('/login/index');
            });
            return;
        }
        
        req.flash('success', "Logado no sistema com sucesso!");
        req.session.user = register.user;
        req.session.save(function () {
            return res.redirect('/');
        });
    } catch (e) {
        console.error(e);
        return res.render('404');

    }

}

exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/');
}