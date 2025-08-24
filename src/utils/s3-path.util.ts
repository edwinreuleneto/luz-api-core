// Utils
export const buildClientFolder = (clientId: string): string =>
  `clients/${clientId}/`;

export const buildContractFolder = (contractId: string): string =>
  `contracts/${contractId}/`;

export const buildCaseFolder = (caseId: string): string => `cases/${caseId}/`;

export const buildInvoiceFolder = (invoiceId: string): string =>
  `invoices/${invoiceId}/`;

export const buildMiscFolder = (): string => `misc/`;
