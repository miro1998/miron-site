import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const response = await axios.get('/items');
        setItems(response.data);
    };

    const addItem = async () => {
        const newItem = { name, description, quantity };
        await axios.post('/items', newItem);
        fetchItems();
    };

    const deleteItem = async (id) => {
        await axios.delete(`/items/${id}`);
        fetchItems();
    };

    return (
        <div className="container">
            <h1>CRUD App</h1>
            <form onSubmit={(e) => { e.preventDefault(); addItem(); }}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" required />
                <button type="submit" className="btn btn-primary">Add Item</button>
            </form>
            <ul className="list-group mt-3">
                {items.map(item => (
                    <li key={item.id} className="list-group-item">
                        {item.name} - {item.description} - {item.quantity}
                        <button onClick={() => deleteItem(item.id)} className="btn btn-danger ml-3">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;