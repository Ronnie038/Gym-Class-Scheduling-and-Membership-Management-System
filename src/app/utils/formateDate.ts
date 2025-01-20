export function formatDateToYYYYMMDD(dateData?: string): Date {
	let date;
	if (dateData) {
		date = new Date(dateData);
	} else {
		date = new Date();
	}
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
	const day = String(date.getDate()).padStart(2, '0');

	return new Date(`${year}-${month}-${day}`);
}
