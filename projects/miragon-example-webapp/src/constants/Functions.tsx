const helpers = {
    isNumber: function (value: string): boolean {
        return !isNaN(Number(value))
    },
    isPositiveInt: function (value: string): boolean {
        return /^\d+$/.test(value);
    },
    parseToHours: function (totalMinutes: string): number {
        totalMinutes = totalMinutes === "" ? "0" : totalMinutes
        return ((!this.isPositiveInt(totalMinutes) ? 0 : parseInt(totalMinutes)) / 60) | 0
    },
    getClientConfig: function(): { basePath: string, baseOptions: { headers: { Authorization: string }}} {
        return {
            basePath: "",
            baseOptions: {
                "headers": {
                    'Authorization': `Bearer ${this.getBearerToken()}`,
                }
            }
        }
    },
    getBearerToken: function (): string|null {
        return localStorage.getItem("token");
    }
}


export default helpers