// Import the Query Builder
import { SearchOptions, SearchResponse, type Payment } from '../../../../types/types';
import { PaymentAPI } from '../payment-api';

/**
 * Get Updated Payments
 * @param this - The Payment API
 * @param lastUpdatedDate - The last updated date
 * @returns The Payments
 */
export async function getUpdatedPayments(
	this: PaymentAPI,
	lastUpdatedDate: Date,
	options: SearchOptions<Payment> = {},
): Promise<SearchResponse<Payment>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Last Updated Date Filter
	queryBuilder.whereLastUpdatedAfter(lastUpdatedDate);

	// Setup the Search Options
	queryBuilder.setSearchOptions(options);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Payments
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const payments = this.formatResponse(response);

	// Setup the Search Response
	const searchResponse: SearchResponse<Payment> = {
		results: payments,
		hasNextPage: await this.hasNextPage(queryBuilder),
	};

	// Return the Payments
	return searchResponse;
}
