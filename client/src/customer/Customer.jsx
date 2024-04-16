import { useEffect } from "react";

function Customer() {
    useEffect(() => {
        console.log("CUSTOMER component mounted");
        async function fetchData() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/orders`
                );
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return <div>CUSTOMER</div>;
}

export default Customer;
