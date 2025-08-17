import React, { useState } from "react";
import useUserRole from "../../Hooks/useUserRole";

const MembershipPackages = () => {
    const {role,roleLoading} = useUserRole();
  const [plans, setPlans] = useState([
    { name: "Basic", price: 20, perks: ["Access to Tennis Court", "1 Free Coaching Session", "Locker Access"] },
    { name: "Standard", price: 35, perks: ["All Basic Perks", "Access to Badminton Court", "2 Free Coaching Sessions"] },
    { name: "Premium", price: 50, perks: ["All Standard Perks", "Access to Gym & Squash Court", "Unlimited Coaching Sessions"] },
  ]);

  const [editingPlan, setEditingPlan] = useState(null);
  const [updatedPlan, setUpdatedPlan] = useState({ name: "", price: "", perks: [] });

  const handleEditClick = (plan, index) => {
    setEditingPlan(index);
    setUpdatedPlan(plan);
  };

  const handleSave = () => {
    const newPlans = [...plans];
    newPlans[editingPlan] = updatedPlan;
    setPlans(newPlans);
    setEditingPlan(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-accent text-center">Membership Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div key={index} className="card shadow-lg border border-gray-200 p-6 bg-white hover:shadow-xl transition duration-300">
            {editingPlan === index ? (
              <div>
                <input
                  className="border p-2 mb-2 w-full"
                  value={updatedPlan.name}
                  onChange={(e) => setUpdatedPlan({ ...updatedPlan, name: e.target.value })}
                />
                <input
                  className="border p-2 mb-2 w-full"
                  type="number"
                  value={updatedPlan.price}
                  onChange={(e) => setUpdatedPlan({ ...updatedPlan, price: e.target.value })}
                />
                <textarea
                  className="border p-2 mb-2 w-full"
                  value={updatedPlan.perks.join(", ")}
                  onChange={(e) => setUpdatedPlan({ ...updatedPlan, perks: e.target.value.split(",") })}
                />
                <button className="btn btn-success w-full" onClick={handleSave}>Save</button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                <p className="text-2xl font-bold mb-4">${plan.price}</p>
                <ul className="mb-6 space-y-2">
                  {plan.perks.map((perk, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="mr-2 text-green-500">✔️</span> {perk}
                    </li>
                  ))}
                </ul>
                {role === "admin" ? (
                  <button className="btn btn-outline btn-primary w-full" onClick={() => handleEditClick(plan, index)}>Edit Plan</button>
                ) : (
                  <button className="btn btn-primary w-full">Subscribe</button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipPackages;
