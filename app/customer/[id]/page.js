"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function CustomerDetail() {
  const [customer, setCustomer] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/customer/${id}`)
        .then((res) => res.json())
        .then((data) => setCustomer(data));
    }
  }, [id]);

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="gap-2 px-5">
      <h1>{customer.name}</h1>
      <p>Date of Birth: {new Date(customer.dateOfBirth).toDateString()}</p>
      <p>Member Number: {customer.memberNumber}</p>
      <p>Interests: {customer.interests}</p>
    </div>
  );
}
