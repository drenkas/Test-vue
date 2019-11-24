export default class Task {
	constructor(title, text, date, id = null) {
		this.title = title
		this.text = text
		this.date = date
		this.id = id
	}
}
