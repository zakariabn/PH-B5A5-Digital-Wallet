export const calculateAmount = (
	fee?: { type: 'percentage' | 'fixed'; value: number },
	base = 0
) => {
	if (!fee) return 0;
	return fee.type === 'percentage' ? (base * fee.value) / 100 : fee.value;
};
