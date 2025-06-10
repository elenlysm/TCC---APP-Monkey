// middlewares/errorHandler.js
module.exports = function (err, req, res, next) {
    // Log detalhado do erro para análise
    console.error(err.stack || err);

    // Padroniza resposta de erro
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};
