export type DeggresType = "C" | "F";

export const toggleDeggres = (
     userType: DeggresType,
     value: number,
     serverDegressType: DeggresType
) => {
     if (userType === serverDegressType) return value;
     if (userType === "C") return Math.round((value - 32) * (5 / 9));
     else return Math.round((value * 9 + 160) / 5);
};
