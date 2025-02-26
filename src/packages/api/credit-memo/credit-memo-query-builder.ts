// Imports
import type { CreditMemo, Query } from '../../../types/types';
import { BaseQueryBuilder } from '../common/base-query-builder';

/**
 * The CreditMemo Query Builder
 */
export class CreditMemoQueryBuilder extends BaseQueryBuilder<CreditMemo> {
	/**
	 * Constructor
	 * @param endpoint - The Endpoint
	 * @param baseQuery - The Base Query
	 */
	constructor(endpoint: string, baseQuery: Query) {
		super(endpoint, baseQuery);
	}

	/**
	 * Where Due Date
	 * @param date - The due date
	 * @returns The Query Builder
	 */
	public whereDueDate(date: Date): this {
		this.whereClauses.push(`DueDate = '${date.toISOString()}'`);
		return this;
	}

	/**
	 * Where Customer ID
	 * @param customerId - The customer ID
	 * @returns The Query Builder
	 */
	public whereCustomerId(customerId: string): this {
		this.whereClauses.push(`CustomerRef.value = '${customerId}'`);
		return this;
	}
}
