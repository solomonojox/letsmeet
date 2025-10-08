import React, { useContext, useEffect, useState } from 'react'
import { Trash2, Plus } from "lucide-react";
import AddNewPlan from './AddNewPlan';
import { addFeatures, createPlan, deletePlan, getPlans, removeFeature } from '../../Services/settings';
import { Feature, Plan, PlanData } from '../../types/Plans';
import { AppContext } from '../../Context/AppContext';
import AddFeatures from './AddFeatures';

export default function SubscriptionPlans() {
    const { showOverlay, hideOverlay, notifySuccess, notifyError } = useContext(AppContext);
    const [newPlanModal, setNewPlanModal] = useState(false);
    const [newFeatureModal, setNewFeatureModal] = useState(false);
    const [editingPlan, setEditingPlan] = useState<PlanData | null>(null);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [refetch, setRefetch] = useState(false);
    const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

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

    const [planId, setPlanId] = useState<string | null>(null);
    const handleAddFeature = (planId: string) => {
        setNewFeatureModal(true);
        setPlanId(planId);
    };

    const addNewFeature = async (data: Feature) => {
        showOverlay();
        try {
            const res = await addFeatures(planId, data);
            setNewFeatureModal(false);
            setRefetch(!refetch);
        } catch (error: any) {
            console.log(error);
        } finally {
            hideOverlay();
        }
    };

    const handleDeleteFeature = async (planId: string, featureId: string) => {
        showOverlay();
        try {
            await removeFeature(planId, featureId);
            notifySuccess('Feature deleted successfully', 'success');
            setRefetch(!refetch);
        } catch (error: any) {
            notifyError(error.response?.data?.responseMessage || 'Error deleting feature', 'error');
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
                    <div
                        key={plan.id}
                        className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 relative transition-all duration-200 hover:shadow-md hover:border-gray-200"
                        onMouseEnter={() => setHoveredPlan(plan.id)}
                        onMouseLeave={() => setHoveredPlan(null)}
                    >
                        <div className="mb-2">
                            <span className="bg-blue-900 text-white px-4 py-1 rounded-full text-sm font-medium">
                                {plan.name}
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">
                            ₦{plan.price.toLocaleString()}
                        </h2>

                        <div className="space-y-2 mb-3">
                            {plan.features.map((feature, index) => (
                                <PlanFeature
                                    key={`${plan.id}-feature-${index}`}
                                    text={`${feature.featureName}`}
                                    description={feature.featureFeatureDescription}
                                    onDelete={() => handleDeleteFeature(plan.id, feature.id)}
                                    showDelete={hoveredPlan === plan.id}
                                />
                            ))}

                            {/* Add Feature Button - Shows on hover */}
                            {hoveredPlan === plan.id && (
                                <button
                                    className="flex items-center justify-center w-full py-1.5 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-primary hover:text-primary transition-colors duration-200 mt-3"
                                    onClick={() => handleAddFeature(plan.id)}
                                >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add Feature
                                </button>
                            )}
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
                                title="Delete plan"
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
                />
            )}

            {newFeatureModal && (
                <AddFeatures
                    isOpen={newFeatureModal}
                    onClose={() => setNewFeatureModal(false)}
                    onSubmit={addNewFeature}
                />
            )}
        </div>
    )
}

type PlanFeatureProps = {
    text: string;
    description?: string;
    onDelete: () => void;
    showDelete: boolean;
};

function PlanFeature({ text, description, onDelete, showDelete }: PlanFeatureProps) {
    return (
        <div className="group flex items-start justify-between hover:bg-gray-50 rounded px-1 py-1 transition-colors duration-200">
            <div className="flex-1">
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

            {showDelete && (
                <button
                    onClick={onDelete}
                    className="ml-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-red-50 rounded"
                    title="Delete feature"
                >
                    <Trash2 className="h-3.5 w-3.5 text-red-400 hover:text-red-600" />
                </button>
            )}
        </div>
    );
}