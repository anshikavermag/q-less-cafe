export function resourceNotFound(response, resource) {
    return response.status(404).json({
        status: 'fail',
        message: `${resource} not found!`,
    });
}

export function internalServerErr(res, err) {
    return res.status(500).json({
        status: 'fail',
        message:
            process.env.NODE_ENV === 'development'
                ? err.message
                : 'Internal server error!',
    });
}
