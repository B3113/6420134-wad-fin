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
      <h1 className="p-5 font-bold">Customer List</h1>
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
    <form className="flex flex-col mt-10 gap-5 px-5" onSubmit={handleSubmit}>
      <input
        className="border border-black p-2 w-48 hover:rounded-full"
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        className="border border-black p-2 w-48 hover:rounded-full"
        type="date"
        placeholder="Date of Birth"
        value={formData.dateOfBirth}
        onChange={(e) =>
          setFormData({ ...formData, dateOfBirth: e.target.value })
        }
        required
      />
      <input
        className="border border-black p-2 w-48 hover:rounded-full"
        type="number"
        placeholder="Member Number"
        value={formData.memberNumber}
        onChange={(e) =>
          setFormData({ ...formData, memberNumber: e.target.value })
        }
        required
      />
      <input
        className="border border-black p-2 w-48 hover:rounded-full"
        type="text"
        placeholder="Interests"
        value={formData.interests}
        onChange={(e) =>
          setFormData({ ...formData, interests: e.target.value })
        }
        required
      />
      <button
        className="w-16 h-10 rounded-full bg-green-700 text-white font-bold"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}

export default CustomerList;
