export interface ReportDetailsType {
    id: string;
    createdAt: string;
    updatedAt: string;
    reporterUserId: string;
    reporterEmail: string;
    reporterName: string;
    reportedUserId: string;
    reportedEmail: string;
    reportedName: string;
    chatId: string;
    reportedChatMessageId: string;
    reportedChatMediaUrl: string;
    reportStatus: string;
    reportType: string;
    reason: string;
    details: string;
    reviewedByAdminId: string;
    reviewedByAdminEmail: string;
    reviewedByAdminName: string;
    reviewedAt: string;
    legitimacy: null;
    adminDecisionRationale: string;
    contentRemoved: boolean;
    strikeIssued: boolean;
    strikeId: string;
    enforcementActionTaken: string;
    isEscalated: boolean;
    escalatedToAdminId: string;
    escalatedToAdminEmail: string;
    escalatedToAdminName: string;
    escalatedAt: string;
    priority: number;
    reportedPhotoUrl?: string;
    reporterPhotoUrl?: string;
}

export interface BlockDetailsType {
    friendshipId: string;
    blockerUserId: string;
    blockerEmail: string;
    blockerName: string;
    blockerPhotoUrl: string;
    blockedUserId: string;
    blockedEmail: string;
    blockedName: string;
    blockedPhotoUrl: string;
    blockReason: string;
    blockedAt: string;
    becameFriendsAt: string;
    lastInteractionAt: string;
    lastInteractionType: string
}