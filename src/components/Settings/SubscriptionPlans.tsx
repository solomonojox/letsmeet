import React, { useState } from 'react'
import { Trash2 } from "lucide-react";
import AddNewPlan from './AddNewPlan';
import { createPlan } from '../../Services/settings';

interface Plan {
    id: string;
    type: string;
    price: number;
    currency: string;
    features: Array<{
        text: string;
        usageLimit?: number;
    }>;
}

export default function SubscriptionPlans() {
    const [newPlanModal, setNewPlanModal] = useState(false);
    const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

    // Initial plans data
    const [plans, setPlans] = useState<Plan[]>([
        {
            id: "basic-001",
            type: "Basic Plan",
            price: 0,
            currency: "₦",
            features: [
                { text: "10 projects per month", usageLimit: 5 },
                { text: "Basic analytics" },
                { text: "24-hour support response time", usageLimit: 5 },
                { text: "1GB storage space" },
                { text: "Single user access" },
            ],
        },
        {
            id: "premium-001",
            type: "Premium Plan",
            price: 1000,
            currency: "₦",
            features: [
                { text: "Unlimited projects", usageLimit: 5 },
                { text: "Advanced analytics dashboard" },
                { text: "4-hour support response time", usageLimit: 5 },
                { text: "10GB storage space" },
                { text: "Team collaboration (up to 5 users)" },
            ],
        },
        {
            id: "enterprise-001",
            type: "Premium Plan",
            price: 1000,
            currency: "₦",
            features: [
                { text: "Unlimited projects and resources", usageLimit: 5 },
                { text: "Custom analytics solutions" },
                { text: "Dedicated support agent", usageLimit: 5 },
                { text: "Unlimited storage space" },
                { text: "Unlimited team members" },
            ],
        },
    ]);

    const handleAddNewPlan = (planData: any) => {
        const newPlan: Plan = {
            id: `plan-${Date.now()}`,
            type: planData.title,
            price: parseFloat(planData.price) || 0,
            currency: "₦",
            features: planData.benefits
                .split("\n")
                .filter((benefit: string) => benefit.trim() !== "")
                .map((benefit: string) => ({ text: benefit })),
        };

        if (editingPlan) {
            // Update existing plan
            setPlans(plans.map(plan => plan.id === editingPlan.id ? { ...newPlan, id: plan.id } : plan));
            setEditingPlan(null);
        } else {
            // Add new plan
            setPlans([...plans, newPlan]);
        }
        setNewPlanModal(false);
    };

    const handleEditPlan = (plan: Plan) => {
        setEditingPlan(plan);
        setNewPlanModal(true);
    };

    const handleDeletePlan = (planId: string) => {
        setPlans(plans.filter(plan => plan.id !== planId));
    };
    return (
        <div>
            <div className="mb-4">
                <button
                    className="flex items-center text-blue-900 border border-blue-900 rounded-full px-6 py-2 font-medium text-sm"
                    onClick={() => {
                        setEditingPlan(null);
                        setNewPlanModal(true);
                    }}
                >
                    <span className="mr-1">+</span> Add a new plan
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <div key={plan.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                        <div className="mb-2">
                            <span className="bg-blue-900 text-white px-4 py-1 rounded-full text-sm font-medium">
                                {plan.type}
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">
                            {plan.currency}{plan.price.toLocaleString()}
                        </h2>

                        <div className="space-y-2">
                            {plan.features.map((feature, index) => (
                                <PlanFeature
                                    key={`${plan.id}-feature-${index}`}
                                    text={feature.text}
                                    usageLimit={feature.usageLimit}
                                />
                            ))}
                        </div>

                        <div className="mt-2 flex space-x-2">
                            <button
                                className="bg-blue-900 text-white rounded-md py-2 w-full text-center font-medium"
                                onClick={() => handleEditPlan(plan)}
                            >
                                Edit plan
                            </button>
                            <button
                                className="flex items-center justify-center bg-white border border-red-200 rounded-md p-2"
                                onClick={() => handleDeletePlan(plan.id)}
                            >
                                <Trash2 className="h-5 w-5 text-red-500" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {newPlanModal && (
                <AddNewPlan
                    isOpen={newPlanModal}
                    onClose={() => setNewPlanModal(false)}
                    onSubmit={handleAddNewPlan}
                    initialData={editingPlan ? {
                        title: editingPlan.type,
                        price: editingPlan.price.toString(),
                        benefits: editingPlan.features.map(f => f.text).join("\n")
                    } : undefined}
                />
            )}
        </div>
    )
}

type PlanFeatureProps = {
    text: string;
    usageLimit?: number;
};

function PlanFeature({ text, usageLimit }: PlanFeatureProps) {
    return (
        <div>
            <div className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-sm">{text}</span>
            </div>
            {usageLimit && (
                <div className="text-gray-500 text-xs ml-5 mt-1">
                    You can only use this {usageLimit} times
                </div>
            )}
        </div>
    );
}
