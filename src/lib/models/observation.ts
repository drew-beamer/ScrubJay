export default interface Observation {
    speciesCode: string;
    comName: string;
    sciName: string;
    locId: string;
    obsDt: Date;
    howMany: number;
    obsValid: boolean;
    obsReviewed: boolean;
    subId: string;
    obsId: string;
    checklistId: string;
    presenceNoted: boolean;
    hasComments: boolean;
    evidence: 'P' | 'A' | 'V' | null;
}
