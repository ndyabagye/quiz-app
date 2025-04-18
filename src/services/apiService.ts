export const fetchDashboardMetrics = async () => {
	// simulate api latency
	await new Promise((resolve) => setTimeout(resolve, 500))
	return "Hello world"
}

export * from './authService';