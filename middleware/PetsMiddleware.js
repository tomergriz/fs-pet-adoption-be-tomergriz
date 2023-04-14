function filterBody(req, res, next) {
    if (Object.keys(req.body).length === 0) {
        return next();
    }

    for (let key in req.body) {
        if (req.body[key] === "") {
            delete req.body[key];
        }
    }

    const { name, adoptionStatus, minHeight = 0, maxHeight = 1000, minWeight = 0, maxWeight = 1000 } = req.body;

    if (name && typeof name === "string") {
        req.body.name = { $regex: `.*${name}.*`, $options: "i" };
    }

    if (adoptionStatus) {
        req.body.adoptionStatus = adoptionStatus;
    }

    if (minHeight && maxHeight) {
        const min = Number(minHeight);
        const max = Number(maxHeight);
        if (!isNaN(min) && !isNaN(max)) {
            req.body.height = { $gte: min, $lte: max };
            delete req.body.minHeight;
            delete req.body.maxHeight;
        }
    }

    if (minWeight && maxWeight) {
        const min = Number(minWeight);
        const max = Number(maxWeight);
        if (!isNaN(min) && !isNaN(max)) {
            req.body.weight = { $gte: min, $lte: max };
            delete req.body.minWeight;
            delete req.body.maxWeight;
        }
    }

    next();
}

module.exports = { filterBody };
