const isEmpty = value => value === undefined || value === null || value === ''
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0]

export function required(temp) {
	return value => {
		if (isEmpty(value.trim())) {
			return temp
		}
	}
}

export function bankCard(cardNo) {
	if (!/^\d{16}|\d{19}$/.test(cardNo)) {
		return '无效银行卡'
	}
}

export function mobile(phone) {
	if (!/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(phone)) {
		return '请输入正确的手机号'
	}
}

export function minLength(min) {
	return value => {
		if (!isEmpty(value) && value.length < min) {
			return `Must be at least ${min} characters`
		}
	}
}

export function minInteger(min, text, unit){
	return value => {
		if(parseInt(value) < min){
			return `${text}最小为${min}${unit}`
		}
	}
}

export function maxInteger(max, text, unit){
	return value => {
		if(parseInt(value) > max){
			return `${text}最大为${max}${unit}`
		}
	}
}

export function maxLength(max) {
	return value => {
		if (!isEmpty(value) && value.length > max) {
			return `Must be no more than ${max} characters`
		}
	}
}

export function assignLength(text, len) {
	return value => {
		if (!isEmpty(value) && value.length !== len) {
			return `${text}必须是${len} 位数字`
		}
	}
}

export function assignIntegerLength(text, len) {
	return value => {
		const parseStr = value.toString()
		if (!isEmpty(parseStr) && parseStr.length !== len) {
			return `${text}必须是${len} 位数字`
		}
	}
}

export function integer(value) {
	if (!Number.isInteger(Number(value))) {
		return '验证码必须是数字'
	}
}

export function mod(text, mod, invest) {
	return value => {
		if (parseInt(value) % mod !== 0 && !(value > invest && value < mod)) {
			return `${text}`
		}
	}
}

export function oneOf(enumeration) {
	return value => {
		if (!~enumeration.indexOf(value)) {
			return `Must be one of: ${enumeration.join(', ')}`
		}
	}
}

export function match(field) {
	return (value, data) => {
		if (data) {
			if (value !== data[field]) {
				return '字段不匹配'
			}
		}
	}
}

export function createChecker(rules) {
	return (data = {}) => {
		const errors = {}
		Object.keys(rules).forEach((key) => {
			const rule = join([].concat(rules[key]))
			const error = rule(data[key], data)
			if (error) {
				errors[key] = error
			}
		})
		return errors
	}
}

export function idCard(id) {
	if (!/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[0-9|x|X]$/.test(id)) {
		return '请输入正确的身份证号'
	}
}

export function amount(value) {
	if (!Number.isInteger(Number(value))) {
		return '请输入正确的金额'
	}
}

export function email(email){
	if(!/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(email)){
	  return "请输入正确的邮箱地址";
	 }
}
