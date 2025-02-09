// Import the Query Builder
import { type Invoice } from '../../../../types/types';
import { InvoiceAPI } from '../invoice-api';

/**
 * Get Updated Invoices
 * @param this - The Invoice API
 * @param lastUpdatedDate - The last updated date
 * @returns The Invoices
 */
export async function getUpdatedInvoices(this: InvoiceAPI, lastUpdatedDate: Date): Promise<Array<Invoice>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the URL
	const url = queryBuilder.whereLastUpdatedAfter(lastUpdatedDate).build();

	// Get the Invoices
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const invoices = this.formatResponse(response);

	// Return the Invoices
	return invoices;
}
