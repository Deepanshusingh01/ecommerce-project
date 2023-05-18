const routeNotFound = (req, res, next) => {
    res.json({ error: 'Route not Found'})
}

module.exports = routeNotFound