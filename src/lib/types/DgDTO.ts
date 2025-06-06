export interface DgDTO {
    uid: string; // Id único del Delivery Group
    name: string;
    state: string;
    sessionCount: number;
    vdas: string[]; // DNS de los VDAs
    averageLoadIndex: string;
    isMaintenanceMode: boolean;

    // Reinicio
    rebootEnabled: boolean;
    rebootFrequency: string;
    rebootDaysOfWeek: string;
    rebootStartTime: string;
    rebootDuration: string;
}  