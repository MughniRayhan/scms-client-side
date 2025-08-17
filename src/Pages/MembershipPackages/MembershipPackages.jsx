import React, { useState, useEffect } from "react";
import useUserRole from "../../Hooks/useUserRole";
import { toast } from "react-toastify";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const MembershipPackages = () => {
    const { user } = UseAuth();
  const { role } = useUserRole();
  const axiosSecure = UseAxiosSecure();
  const [plans, setPlans] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [updatedPlan, setUpdatedPlan] = useState({ name: "", price: "", perks: [] });

  const userEmail = user?.email; 

  useEffect(() => {
  fetchPlans();
}, []);

useEffect(() => {
  if (userEmail) fetchSubscriptions();
}, [userEmail]);

  const fetchPlans = async () => {
    const res = await axiosSecure.get("/plans");
    setPlans(res.data);
  };

  const fetchSubscriptions = async () => {
    const res = await axiosSecure.get(`/subscriptions/${userEmail}`);
    setSubscriptions(res.data.map(sub => sub.planId));
  };

  const handleSubscribe = async (planId) => {
    try {
      await axiosSecure.post(
        '/subscriptions',
        { planId }
      );
      toast.success("Subscribed successfully!");
      setSubscriptions(prev => [...prev, planId]);
    } catch (err) {
      toast.error(err.response.data.message || "Failed to subscribe");
    }
  };

  const handleEditClick = (plan, index) => {
    setEditingPlan(index);
    setUpdatedPlan(plan);
  };

  const handleSave = async (planId) => {
    try {
        const { _id, ...planData } = updatedPlan;
      await axiosSecure.put(`/plans/${planId}`, planData);
      toast.success("Plan updated successfully!");
      fetchPlans();
      setEditingPlan(null);
    } catch (err) {
      toast.error("Failed to update plan");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 pt-24">
      <h2 className="text-3xl font-bold mb-8 text-accent text-center">Membership Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div key={plan._id} className="card shadow-lg border border-gray-200 p-6 bg-white hover:shadow-xl transition duration-300">
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
                <button className="btn btn-success w-full" onClick={() => handleSave(plan._id)}>Save</button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                <p className="text-2xl font-bold mb-4">${plan.price}</p>
                <ul className="mb-6 space-y-2">
                  {Array.isArray(plan.perks) && plan.perks.map((perk, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="mr-2 text-green-500">✔️</span> {perk}
                    </li>
                  ))}
                </ul>
                {role === "admin" ? (
                  <button className="btn btn-outline btn-primary w-full" onClick={() => handleEditClick(plan, index)}>Edit Plan</button>
                ) : (
                  <button
                    className={`btn ${subscriptions.includes(plan._id) ? "btn-success" : "btn-primary"} w-full`}
                    onClick={() => handleSubscribe(plan._id)}
                    disabled={subscriptions.includes(plan._id)}
                  >
                    {subscriptions.includes(plan._id) ? "Subscribed" : "Subscribe"}
                  </button>
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
