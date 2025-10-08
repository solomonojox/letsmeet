import React, { useContext, useEffect, useState } from 'react'
import { Trash2 } from "lucide-react";
import AddNewPlan from './AddNewPlan';
import { createPlan, deletePlan, getPlans } from '../../Services/settings';
import { Plan, PlanData } from '../../types/Plans';
import { AppContext } from '../../Context/AppContext';

export default function SubscriptionPlans() {
    const { showOverlay, hideOverlay, notifySuccess, notifyError } = useContext(AppContext);
    const [newPlanModal, setNewPlanModal] = useState(false);
    const [editingPlan, setEditingPlan] = useState<PlanData | null>(null);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        const getAllPlans = async () => {
            showOverlay();
            try {
                const res = await getPlans();
                setPlans(res);
                // console.log(data);
            } catch (error) {
                console.error(error);
            }            
            finally {
                hideOverlay();
            }
        }

        getAllPlans();
    }, [refetch])

    const handleEditPlan = (plan: any) => {
        setEditingPlan(plan);
        setNewPlanModal(true);
    };

    const handleDeletePlan = async (planId: string) => {
        showOverlay();
        try {
            await deletePlan(planId);
            notifySuccess('Plan deleted successfully', 'success');
        } catch (error: any) {
            // console.error(error.response.data.responseMessage || 'Error deleting plan');
            notifyError(error.response.data.responseMessage || 'Error deleting plan', 'error');
        } finally {
            hideOverlay();
        }
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
                                {plan.name}
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">
                            ₦{plan.price.toLocaleString()}
                        </h2>

                        <div className="space-y-2">
                            {plan.features.map((feature, index) => (
                                <PlanFeature
                                    key={`${plan.id}-feature-${index}`}
                                    text={`${feature.featureName}: ${feature.featureFeatureDescription}`}
                                    description={feature.featureFeatureDescription}
                                />
                            ))}
                        </div>

                        <div className="mt-2 flex space-x-2">
                            <button
                                className="bg-primary hover:bg-primary/70 text-white rounded-md py-2 w-full text-center font-medium"
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
                    onSubmit={() => { }}
                    initialData={editingPlan}
                    refetch={() => setRefetch(!refetch)}
                // initialData={editingPlan ? {
                //     // title: editingPlan.type,
                //     price: editingPlan.price.toString(),
                //     // benefits: editingPlan.features.map(f => f.text).join("\n")
                // } : undefined}
                />
            )}
        </div>
    )
}

type PlanFeatureProps = {
    text: string;
    description?: string;
};

function PlanFeature({ text, description }: PlanFeatureProps) {
    return (
        <div>
            <div className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-sm">{text}</span>
            </div>
            {description && (
                <div className="text-gray-500 text-xs ml-5 mt-0">
                    {description}
                </div>
            )}
        </div>
    );
}
