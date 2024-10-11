"use client";
import { useState, useEffect } from "react";

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("/api/customer")
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, []);

  const deleteCustomer = (id) => {
    fetch(`/api/customer/${id}`, {
      method: "DELETE",
    }).then(() => {
      setCustomers(customers.filter((customer) => customer._id !== id));
    });
  };

  return (
    <div>
      <h1>Customer List</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>
            {customer.name} - {customer.memberNumber} -{" "}
            <a href={`/customer/${customer._id}`}>View Details</a>
            <button onClick={() => deleteCustomer(customer._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <AddCustomer setCustomers={setCustomers} />
    </div>
  );
}

function AddCustomer({ setCustomers }) {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    memberNumber: "",
    interests: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/customer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const newCustomer = await response.json();
    setCustomers((prev) => [...prev, newCustomer]);

    // Reset form
    setFormData({ name: "", dateOfBirth: "", memberNumber: "", interests: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={formData.dateOfBirth}
        onChange={(e) =>
          setFormData({ ...formData, dateOfBirth: e.target.value })
        }
        required
      />
      <input
        type="number"
        placeholder="Member Number"
        value={formData.memberNumber}
        onChange={(e) =>
          setFormData({ ...formData, memberNumber: e.target.value })
        }
        required
      />
      <input
        type="text"
        placeholder="Interests"
        value={formData.interests}
        onChange={(e) =>
          setFormData({ ...formData, interests: e.target.value })
        }
        required
      />
      <button type="submit">Add Customer</button>
    </form>
  );
}

export default CustomerList;
