export const openAddress = (address: string | undefined): void => {
    if (!address) {
        return;
    }

    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURI(address)}`;
    window.open(url, "_blank");
};

export const createPhoneLink = (phone: string | undefined): string | undefined => {
    if (!phone) {
        return undefined;
    }

    return `tel:${phone}`;
};

export const createMailLink = (mail: string | undefined): string | undefined => {
    if (!mail) {
        return undefined;
    }

    return `mailto:${mail}`;
};

export const getCustomerUrl = (customerId: string | undefined): string => {
    if (!customerId) {
        return `/`;
    }

    return `/customer/${customerId}`;
};

export const getProjectUrl = (projectId: string | undefined): string => {
    if (!projectId) {
        return `/`;
    }

    return `/project/${projectId}`;
};

export const getContactPersonUrl = (contactPersonId: string | undefined): string => {
    if (!contactPersonId) {
        return `/`;
    }

    return `/contactPerson/${contactPersonId}`;
};

export const getJobUrl = (projectId: string | undefined, jobId: string | undefined): string => {
    if (!projectId || !jobId) {
        return `/`;
    }

    return `/project/${projectId}/job/${jobId}`;
};

export const getJobWorkingsUrl = (projectId: string | undefined, jobId: string | undefined): string => {
    if (!projectId || !jobId) {
        return `/`;
    }

    return `/project/${projectId}/job/${jobId}/workings`;
};


export const getProjectsUrl = (): string => `/projects`;
