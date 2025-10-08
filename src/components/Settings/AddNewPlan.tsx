import { useContext, useState } from "react";
import { X, Plus, Trash2, Loader2 } from "lucide-react";
import axios from "axios";
import { createPlan, editPlan } from "../../Services/settings";
import { AppContext } from "../../Context/AppContext";

interface Feature {
    featureName: string;
    featureFeatureDescription: string;
}

interface PlanData {
    name: string;
    price: number;
    durationInDays: number;
    description: string;
    planType: string;
    maximumMatchResultCount: number;
    maximumDailyMatchRequestCount: number;
    maximumTotalMatchRequestCount: number;
    maximumMatchLocationRequestRadiusInKm: number;
    features: Feature[];
}

interface AddNewPlanProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (planData: PlanData) => void;
    initialData: PlanData | null;
    refetch: () => void;
}

export default function AddNewPlan({ isOpen, onClose, onSubmit, initialData, refetch }: AddNewPlanProps) {
    const { showOverlay, hideOverlay, notifySuccess, notifyError } = useContext(AppContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [planData, setPlanData] = useState<PlanData>(
        initialData || {
            name: "",
            price: 0,
            durationInDays: 0,
            description: "",
            planType: "",
            maximumMatchResultCount: 0,
            maximumDailyMatchRequestCount: 0,
            maximumTotalMatchRequestCount: 0,
            maximumMatchLocationRequestRadiusInKm: 0,
            features: [{ featureName: "", featureFeatureDescription: "" }],
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPlanData((prev) => ({
            ...prev,
            [name]: name.includes("Count") || name.includes("Days") || name.includes("price") || name.includes("Radius")
                ? Number(value)
                : value,
        }));
    };

    const handleFeatureChange = (index: number, field: keyof Feature, value: string) => {
        const updatedFeatures = planData.features.map((feature, i) =>
            i === index ? { ...feature, [field]: value } : feature
        );
        setPlanData((prev) => ({
            ...prev,
            features: updatedFeatures,
        }));
    };

    const addFeature = () => {
        setPlanData((prev) => ({
            ...prev,
            features: [...prev.features, { featureName: "", featureFeatureDescription: "" }],
        }));
    };

    const removeFeature = (index: number) => {
        if (planData.features.length > 1) {
            const updatedFeatures = planData.features.filter((_, i) => i !== index);
            setPlanData((prev) => ({
                ...prev,
                features: updatedFeatures,
            }));
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Validate required fields
            if (!planData.name || !planData.planType || planData.price <= 0 || planData.durationInDays <= 0) {
                notifyError("Please fill in all required fields (Name, Plan Type, Price, and Duration)", 'error');
                return;
            }

            // Validate features
            const hasEmptyFeatures = planData.features.some(
                feature => !feature?.featureName?.trim() || !feature?.featureFeatureDescription?.trim()
            );

            if (hasEmptyFeatures) {
                notifyError("Please fill in all feature names and descriptions", 'error');
                return;
            }

            if (initialData) {
                const response = await editPlan(planData);
                console.log(response)
                notifySuccess('Plan updated successfully', 'success');
                onClose();
                refetch();
                // onSubmit(planData);
                // clearForm();
            } else {
                const response = await createPlan(planData);
                notifySuccess(response.data.responseMessage || 'Plan created successfully', 'success');
                onClose();
                refetch();
                // onSubmit(planData);
                // clearForm();
            }

        } catch (error: any) {
            console.error("Error creating plan:", error);
            notifyError(error.response.data.responseMessage || "Failed to create plan. Please try again.", 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const clearForm = () => {
        setPlanData({
            name: "",
            price: 0,
            durationInDays: 0,
            description: "",
            planType: "",
            maximumMatchResultCount: 0,
            maximumDailyMatchRequestCount: 0,
            maximumTotalMatchRequestCount: 0,
            maximumMatchLocationRequestRadiusInKm: 0,
            features: [{ featureName: "", featureFeatureDescription: "" }],
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#00000066] p-6 flex justify-center items-center z-50 overflow-y-auto">
            <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium text-center flex-grow">
                        {initialData ? "Edit plan" : "Add a new plan"}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 mb-2 text-sm">
                                Plan Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter plan name"
                                value={planData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-primary text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="planType" className="block text-gray-700 mb-2 text-sm">
                                Plan Type *
                            </label>
                            <select
                                id="planType"
                                name="planType"
                                value={planData.planType}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-primary text-sm"
                            >
                                <option value="">Select plan type</option>
                                <option value="BASIC">Basic</option>
                                <option value="PREMIUM">Premium</option>
                                <option value="ENTERPRISE">Enterprise</option>
                                <option value="CUSTOM">Custom</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="price" className="block text-gray-700 mb-2 text-sm">
                                Price ($) *
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                value={planData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-primary text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="durationInDays" className="block text-gray-700 mb-2 text-sm">
                                Duration (Days) *
                            </label>
                            <input
                                type="number"
                                id="durationInDays"
                                name="durationInDays"
                                placeholder="30"
                                min="1"
                                value={planData.durationInDays}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-primary text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-gray-700 mb-2 text-sm">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Describe the plan features and benefits"
                            value={planData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-primary min-h-20 text-sm"
                        />
                    </div>

                    {/* Limits and Restrictions */}
                    <div className="border-t pt-4">
                        <h3 className="text-lg font-medium mb-4">Limits and Restrictions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="maximumMatchResultCount" className="block text-gray-700 mb-2 text-sm">
                                    Max Match Results
                                </label>
                                <input
                                    type="number"
                                    id="maximumMatchResultCount"
                                    name="maximumMatchResultCount"
                                    placeholder="0"
                                    min="0"
                                    value={planData.maximumMatchResultCount}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-primary text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="maximumDailyMatchRequestCount" className="block text-gray-700 mb-2 text-sm">
                                    Max Daily Match Requests
                                </label>
                                <input
                                    type="number"
                                    id="maximumDailyMatchRequestCount"
                                    name="maximumDailyMatchRequestCount"
                                    placeholder="0"
                                    min="0"
                                    value={planData.maximumDailyMatchRequestCount}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-primary text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="maximumTotalMatchRequestCount" className="block text-gray-700 mb-2 text-sm">
                                    Max Total Match Requests
                                </label>
                                <input
                                    type="number"
                                    id="maximumTotalMatchRequestCount"
                                    name="maximumTotalMatchRequestCount"
                                    placeholder="0"
                                    min="0"
                                    value={planData.maximumTotalMatchRequestCount}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-primary text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="maximumMatchLocationRequestRadiusInKm" className="block text-gray-700 mb-2 text-sm">
                                    Max Location Radius (KM)
                                </label>
                                <input
                                    type="number"
                                    id="maximumMatchLocationRequestRadiusInKm"
                                    name="maximumMatchLocationRequestRadiusInKm"
                                    placeholder="0"
                                    min="0"
                                    step="0.1"
                                    value={planData.maximumMatchLocationRequestRadiusInKm}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-primary text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Features</h3>
                            <button
                                type="button"
                                onClick={addFeature}
                                className="flex items-center gap-2 px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/75"
                            >
                                <Plus className="h-4 w-4" />
                                Add Feature
                            </button>
                        </div>

                        <div className="space-y-3">
                            {planData.features.map((feature, index) => (
                                <div key={index} className="flex gap-3 items-start p-3 border border-gray-200 rounded-md">
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-gray-700 mb-1 text-xs">Feature Name</label>
                                            <input
                                                type="text"
                                                placeholder="Feature name"
                                                value={feature.featureName}
                                                onChange={(e) => handleFeatureChange(index, "featureName", e.target.value)}
                                                className="w-full px-3 py-1 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-primary text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-1 text-xs">Description</label>
                                            <input
                                                type="text"
                                                placeholder="Feature description"
                                                value={feature.featureFeatureDescription}
                                                onChange={(e) => handleFeatureChange(index, "featureFeatureDescription", e.target.value)}
                                                className="w-full px-3 py-1 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-primary text-sm"
                                            />
                                        </div>
                                    </div>
                                    {planData.features.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeFeature(index)}
                                            className="p-1 text-red-500 hover:text-red-700 mt-5"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full py-2 border border-primary hover:bg-primary/10 text-primary rounded-md font-medium text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className={`w-full py-2 ${isSubmitting ? "bg-gray-400" : "bg-primary hover:bg-primary/75"} text-white rounded-md font-medium text-sm`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <Loader2 className="animate-spin mr-2" />
                                    {initialData ? "Updating..." : "Creating..."}
                                </div>
                            ) : initialData ? "Update plan" : "Create plan"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}