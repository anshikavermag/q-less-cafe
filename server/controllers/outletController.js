export async function getAllOutlets(req, res) {
    res.send('get all outlets');
}

export async function getOutlet(req, res) {
    const { id } = req.params;
    res.send('get outlet by id: ' + id);
}

export async function createOutlet(req, res) {
    res.status(201).send('create outlet: ' + req.body);
}

export async function updateOutlet(req, res) {
    const { id } = req.params;
    res.send('update outlet by id: ' + id);
}

export async function deleteOutlet(req, res) {
    res.status(204).send();
}

export async function getMenu(req, res) {
    const { id } = req.params;
    res.send('get menu by outlet id: ' + id);
}

export async function addMenuItem(req, res) {
    res.status(201).send('add menu item on outlet id: ' + req.body);
}

export async function updateMenuItem(req, res) {
    const { outletID, itemID } = req.params;
    res.send(
        `update menu item: { outlet id: ${outletID}, item id: ${itemID} }`,
    );
}

export async function deleteMenuItem(req, res) {
    const { outletID, itemID } = req.params;
    res.status(204).send();
}
