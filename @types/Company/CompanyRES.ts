export interface ICompanyRES {
    data: {
        _id: string;
        nextAffilatePaymentNumber: number;
        isRootCompany: boolean;
        companyName: string;
        companyDomain: string;
        companyNs1: string;
        companyNs2: string;
        companyCommesionProfit: number;
        companyCdnUrl: string;
        ytChannel?: string;
        apperance: {
            companyMainColor: string;
            companyTextColor: string;
            companyNeastedTitleColor: string;
            companyFaviconUrl: string;
            companyLogoUrl: string;
            companyDarkmodeLogoUrl: string;
            contrastColor:string
            themeColors: string[];
            themeMainColors: string[];
            logoWidth: number,
        }

        companyCurrency?: string;
        allowDefaultCountry?: boolean;
        defualtCountry?: string;
        allowSpecificShippingCompanies?: boolean;
        shippingCompaniesWhiteList?: string[];
        
        createdAt: string;
        updatedAt: string;
        __v: 0;
    };
}
