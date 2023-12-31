import './App.css';
import React, { useState } from 'react';

const sampleData = [
    { id: 1, name: 'John Doe', age: 25, city: 'New York', occupation: 'Engineer' },
    { id: 2, name: 'Jane Smith', age: 30, city: 'San Francisco', occupation: 'Designer' },
    { id: 3, name: 'Bob Johnson', age: 28, city: 'Chicago', occupation: 'Accountant' },
    { id: 4, name: 'Alice Brown', age: 35, city: 'Los Angeles', occupation: 'Teacher' },
    { id: 5, name: 'Charlie Wilson', age: 40, city: 'Houston', occupation: 'Doctor' },
    { id: 6, name: 'Eva Davis', age: 22, city: 'Miami', occupation: 'Artist' },
    { id: 7, name: 'Frank Miller', age: 32, city: 'Seattle', occupation: 'Software Engineer' },
    { id: 8, name: 'Grace Taylor', age: 45, city: 'Boston', occupation: 'Lawyer' },
    { id: 9, name: 'Henry Clark', age: 28, city: 'Denver', occupation: 'Marketing Manager' },
    { id: 10, name: 'Ivy Adams', age: 33, city: 'Atlanta', occupation: 'Entrepreneur' },
];

function App() {
    const [data, setData] = useState(sampleData);
    const [filters, setFilters] = useState({
        name: '',
        age: '',
        city: '',
        occupation: '',
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleResetFilters = () => {
        setFilters({
            name: '',
            age: '',
            city: '',
            occupation: '',
        });
        setData(sampleData);
    };

    // Extract unique city and occupation values from the data
    const cities = [...new Set(sampleData.map((item) => item.city))];
    const occupations = [...new Set(sampleData.map((item) => item.occupation))];

    // Filter the data based on user input
    const filteredData = data.filter((item) => {
        return (
            item.name.toLowerCase().includes(filters.name.toLowerCase()) &&
            (filters.age === '' || item.age.toString() === filters.age) &&
            (filters.city === '' || item.city === filters.city) &&
            (filters.occupation === '' || item.occupation === filters.occupation)
        );
    });

    return (
        <div className="App">
            <h1>Filterable Table</h1>

            {/* Filter Inputs */}
            <div className="filters">
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={filters.name}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    placeholder="Age"
                    name="age"
                    value={filters.age}
                    onChange={handleFilterChange}
                />
                <select name="city" value={filters.city} onChange={handleFilterChange}>
                    <option value="">All Cities</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
                <select name="occupation" value={filters.occupation} onChange={handleFilterChange}>
                    <option value="">All Occupations</option>
                    {occupations.map((occupation, index) => (
                        <option key={index} value={occupation}>
                            {occupation}
                        </option>
                    ))}
                </select>
                <button onClick={handleResetFilters}>Reset Filters</button>
            </div>

            {/* Display the Table */}
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>City</th>
                    <th>Occupation</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.city}</td>
                        <td>{item.occupation}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
