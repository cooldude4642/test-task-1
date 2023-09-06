enum MONTHS {
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
}

enum MONTHS_ABBRS {
	'янв',
	'фев',
	'мар',
	'апр',
	'май',
	'июн',
	'июл',
	'авг',
	'сен',
	'окт',
	'ноя',
	'дек',
}

const MIN_VALUE = 0
const MAX_VALUE = 100
const DEFAULT_YEAR = 2023
const DEFAULT_MONTH_IDX = 0
const DEFAULT_FROM = new Date(DEFAULT_YEAR, DEFAULT_MONTH_IDX)
const DEFAULT_TO = new Date(DEFAULT_YEAR + 1, DEFAULT_MONTH_IDX)

export {
	MONTHS,
	MONTHS_ABBRS,
	MIN_VALUE,
	MAX_VALUE,
	DEFAULT_YEAR,
	DEFAULT_MONTH_IDX,
	DEFAULT_FROM,
	DEFAULT_TO,
}
