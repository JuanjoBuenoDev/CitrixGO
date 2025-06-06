export interface AppDTO {
    uid: string;
    name: string;
    applicationName: string;
    browserName: string;
    publishedName: string;
    maxTotalInstances: number | null;
    maxPerUserInstances: number | null;
    commandLineExecutable: string;
    commandLineArguments: string;
    directory: string;
    userFolder: string;
    desktopGroups: string[];
    vdas: string[];
    activeUsers: string[];
    enabled: boolean;
    executablePath: string;
}  