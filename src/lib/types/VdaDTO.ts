export interface VdaDTO {
    machineName: string; // Id único del VDA
    catalogName: string;
    registrationState: string;
    powerState: string;
    inMaintenanceMode: boolean;
    loadIndex: number;
    agentVersion: string;
    desktopGroupName: string;
    osType: string;
    deliveryType: string;
    ipAddress: string;
    isPhysical: string;
    lastRegistrationTime: string;
    persistUserChanges: string;
    sessionsEstablished: number;
    applications: string[];
}