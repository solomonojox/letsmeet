import { useState } from "react";
import { X } from "lucide-react";

interface PlanData {
    title: string;
    price: string;
    benefits: string;
}

interface AddNewPlanProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (planData: PlanData) => void;
    initialData?: PlanData;
}

export default function AddNewPlan({ isOpen, onClose, onSubmit, initialData }: AddNewPlanProps) {
    const [planData, setPlanData] = useState<PlanData>(
        initialData || {
            title: "",
            price: "",
            benefits: "",
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPlanData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onSubmit(planData);
    };

    const clearForm = () => {
        setPlanData({
            title: "",
            price: "",
            benefits: "",
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#00000066] p-6 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-full max-w-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium text-center flex-grow">
                        {initialData ? "Edit plan" : "Add a new plan"}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="What is the name of the plan"
                            value={planData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-primary text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 mb-2">
                            How much is the plan
                        </label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            placeholder="How much do you want to charge per month!"
                            value={planData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-primary text-sm"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="benefits" className="block text-gray-700 mb-2">
                            Benefits of this plan
                        </label>
                        <textarea
                            id="benefits"
                            name="benefits"
                            placeholder="What are the things the user can do with this plan"
                            value={planData.benefits}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-primary min-h-28 text-sm"
                        />
                    </div>

                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={clearForm}
                            className="w-full py-2 border border-primary hover:bg-primary/10 text-primary rounded-md font-medium text-sm"
                        >
                            Clear all
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full py-2 bg-primary hover:bg-primary/75 text-white rounded-md font-medium text-sm"
                        >
                            {initialData ? "Update plan" : "Add plan"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}