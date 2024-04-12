export async function getAllOrders(req, res) {
    res.send('get all orders');
}

export async function getOrder(req, res) {
    const { id } = req.params;
    res.send('get order by id: ' + id);
}

export async function createOrder(req, res) {
    res.status(201).send('create order: ' + req.body);
}
