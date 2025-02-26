// Import the Query Builder
import { SearchOptions, SearchResponse, type CreditMemo } from '../../../../types/types';
import { CreditMemoAPI } from '../credit-memo-api';

/**
 * Get Updated CreditMemos
 * @param this - The CreditMemo API
 * @param lastUpdatedDate - The last updated date
 * @returns The CreditMemos
 */
export async function getUpdatedCreditMemos(
	this: CreditMemoAPI,
	lastUpdatedDate: Date,
	options: SearchOptions<CreditMemo> = {},
): Promise<SearchResponse<CreditMemo>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Last Updated Date Filter
	queryBuilder.whereLastUpdatedAfter(lastUpdatedDate);

	// Setup the Search Options
	queryBuilder.setSearchOptions(options);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the CreditMemos
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const creditmemos = this.formatResponse(response);

	// Setup the Search Response
	const searchResponse: SearchResponse<CreditMemo> = {
		results: creditmemos,
		hasNextPage: await this.hasNextPage(queryBuilder),
	};

	// Return the CreditMemos
	return searchResponse;
}
