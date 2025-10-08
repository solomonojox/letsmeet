export interface Plan {
    id: string;
    name: string;
    price: number;
    durationInDays: number;
    description: string;
    featureTitles: string[]
    planType: string;
    features: [
        {
            planId: string;
            plan: string;
            featureName: string;
            featureFeatureDescription: string;
            isActive: boolean;
            id: string;
            createdAt: string;
            updatedAt: string;
            createdBy: string;
            updatedBy: string;
            isDeleted: boolean;
            deletedAt: string;
            deletedBy: string
        }
    ];
    maximumMatchResultCount: number;
    maximumDailyMatchRequestCount: number;
    maximumTotalMatchRequestCount: number;
    maximumMatchLocationRequestRadiusInKm: number
}

export interface PlanData {
    name: string;
    price: number;
    durationInDays: number;
    description: string;
    planType: string;
    maximumMatchResultCount: number;
    maximumDailyMatchRequestCount: number;
    maximumTotalMatchRequestCount: number;
    maximumMatchLocationRequestRadiusInKm: number;
    features: [
        {
            planId: string;
            plan: string;
            featureName: string;
            // featureFeatureDescription?: string;
            featureFeatureDescription: string;
            isActive: boolean;
            id: string;
            createdAt: string;
            updatedAt: string;
            createdBy: string;
            updatedBy: string;
            isDeleted: boolean;
            deletedAt: string;
            deletedBy: string
        }
    ];
}