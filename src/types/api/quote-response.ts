export interface Courier {
  url: string;
}

export interface ServiceInfo {
  pickup: boolean;
  requirePrint: boolean;
  serviceLevelAgreement?: string;
  zone?: string;
}

export interface QuoteResponse {
  provider: string;
  courier: Courier;
  rate: string;
  promoRate: string;
  serviceInfo: ServiceInfo;
}
