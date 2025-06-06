export interface UserDTO {
    username: string; // ID del usuario
    lastConnectionFailureReason: string;
    lastFailureEndTime: string;
    lastMachineUsed: string;
    aplicacionesEnUso: string[];
    maquinas: string[];
    desktopGroups: string[];
}  