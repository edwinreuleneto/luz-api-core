// Utils
export const buildOrganizationFolder = (organizationId: string): string => `org/${organizationId}/`;

export const buildClientFolder = (organizationId: string, clientId: string): string =>
  `org/${organizationId}/clients/${clientId}/`;

export const buildContractFolder = (organizationId: string, contractId: string): string =>
  `org/${organizationId}/contracts/${contractId}/`;

export const buildCaseFolder = (organizationId: string, caseId: string): string =>
  `org/${organizationId}/cases/${caseId}/`;

export const buildInvoiceFolder = (organizationId: string, invoiceId: string): string =>
  `org/${organizationId}/invoices/${invoiceId}/`;

export const buildMiscFolder = (organizationId: string): string => `org/${organizationId}/misc/`;

