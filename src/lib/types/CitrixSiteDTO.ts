export interface CitrixSiteDTO {
    // Licencias
    licenseEdition: string;
    licenseServerName: string;
    licenseServerPort: number;
    licensingGraceHoursLeft: number;
    licensingGracePeriodActive: boolean;
    localHostCacheEnabled: boolean;
    peakConcurrentLicenseUsers: number;
    peakConcurrentLicensedDevices: number;

    // Data store
    dataStoreSite: string;
    dataStoreMonitor: string;
    dataStoreLog: string;
}