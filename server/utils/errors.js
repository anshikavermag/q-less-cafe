export function resourceNotFound(res) {
    return res.status(404).json({
        status: 'fail',
        message: 'Resource not found!',
    });
}

export function internalServerErr(res, err) {
    return res.status(500).json({
        status: 'fail',
        message: err.message,
    });
}
