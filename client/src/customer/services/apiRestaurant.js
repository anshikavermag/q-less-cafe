async function getAllOutlets() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/outlets`);

    if (!res.ok) throw new Error("Unable to fetch Outlets");
    const outletData = await res.json();
    return outletData.data.outlets;
}

async function getOrder(orderId) {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/orders/${orderId}`
    );
    if (!res.ok) throw new Error("Unable to fetch Order Details");
    const orderData = await res.json();
    return orderData.data.order;
}

async function createOrder(order) {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
            method: "POST",
            body: JSON.stringify(order),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const { data } = await res.json();
        return data.newOrder;
    } catch (err) {
        throw new Error("Unable to create Order");
    }
}

async function signup(userInfo) {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/users/signup`,
            {
                method: "POST",
                body: JSON.stringify(userInfo),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await res.json();
        return data;
    } catch (err) {
        throw new Error("Unable to create User");
    }
}

async function login(userInfo) {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
            method: "POST",
            body: JSON.stringify(userInfo),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        return data;
    } catch (err) {
        throw new Error("Unable to login User");
    }
}

export { getAllOutlets, getOrder, createOrder, signup, login };
