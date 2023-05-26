exports.meuMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
}

exports.checkLogin = (req, res, next) => {
    if(!req.session.user) {
        req.flash("errors", "Você precisa fazer login");
        req.session.save(() => res.redirect('/'));
        return;
    }   //Verifica usuário logado.

    next();
}

exports.checkCrsfError = (err, req, res, next) => {
    if (err) {
        return res.render('404');
    }

    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}