export const sampleOrders = [
    {
        customer_name: 'Mehul Sharma',
        customer_contact: '9876543210',
        order_number: 1,
        order_total: 260,
        status: 'new',
        cooking_time: 20,
        created_at: new Date().toISOString(),
        order_items: [
            {
                outlet_name: 'Fast Food Point',
                name: 'French Fries',
                price: 80,
                quantity: 2,
            },
            {
                outlet_name: 'Fast Food Point',
                name: 'Pasta',
                price: 100,
                quantity: 1,
            },
        ],
    },
    {
        customer_name: 'Tanmay Jain',
        customer_contact: '8765432109',
        order_number: 2,
        order_total: 150,
        status: 'new',
        cooking_time: 10,
        created_at: new Date().toISOString(),
        order_items: [
            {
                outlet_name: 'Cold Brew Cafe',
                name: 'Cappuccino',
                price: 50,
                quantity: 3,
            },
        ],
    },
    {
        customer_name: 'Priya Agrawal',
        customer_contact: '7654321098',
        order_number: 3,
        order_total: 20,
        status: 'new',
        cooking_time: 5,
        created_at: new Date().toISOString(),
        order_items: [
            {
                outlet_name: 'Shree Tea Spot',
                name: 'Special Chai',
                price: 10,
                quantity: 2,
            },
        ],
    },
    {
        customer_name: 'Varun Tripathi',
        customer_contact: '6543210987',
        order_number: 4,
        order_total: 150,
        status: 'cooking',
        cooking_time: 25,
        created_at: new Date().toISOString(),
        order_items: [
            {
                outlet_name: 'Fast Food Point',
                name: 'Cheese Pizza',
                price: 150,
                quantity: 1,
            },
        ],
    },
    {
        customer_name: 'Nikita Verma',
        customer_contact: '9432109876',
        order_number: 5,
        order_total: 170,
        status: 'completed',
        cooking_time: 15,
        created_at: new Date().toISOString(),
        order_items: [
            {
                outlet_name: 'Cold Brew Cafe',
                name: 'Frappe',
                price: 70,
                quantity: 2,
            },
            {
                outlet_name: 'Shree Tea Spot',
                name: 'Green Tea',
                price: 30,
                quantity: 1,
            },
        ],
    },
];
