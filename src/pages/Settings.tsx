import { useState } from "react";
import Password from "../components/Settings/Password";
import SubscriptionPlans from "../components/Settings/SubscriptionPlans";

// Define the Plan type
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

export default function Settings() {
    const [activeTab, setActiveTab] = useState("subscriptions");

    return (
        <div className="mx-auto mt-4">
            {/* Tabs */}
            <div className="flex mb-4 space-x-4">
                <button
                    className={`px-6 py-2 rounded-full text-xs font-medium ${activeTab === "subscriptions"
                        ? "bg-blue-900 text-white"
                        : "bg-gray-100 text-gray-700"
                        }`}
                    onClick={() => setActiveTab("subscriptions")}
                >
                    Subscriptions settings
                </button>
                <button
                    className={`px-6 py-2 rounded-full text-xs font-medium ${activeTab === "password"
                        ? "bg-blue-900 text-white"
                        : "bg-gray-100 text-gray-700"
                        }`}
                    onClick={() => setActiveTab("password")}
                >
                    Password update
                </button>
            </div>

            {activeTab === "subscriptions" && <SubscriptionPlans />}

            {activeTab === "password" && <Password />}
        </div>
    );
}