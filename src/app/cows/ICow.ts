export default interface ICow {
    id?: number;
    healthIndex?: number;
    endDate?: number | null;
    minValueDateTime?: number;
    type: string;
    cowId: number;
    animalId: string;
    eventId: number;
    deletable: boolean;
    lactationNumber: number;
    daysInLactation: number;
    ageInDays: number;
    startDateTime: number;
    reportingDateTime: number;
}
