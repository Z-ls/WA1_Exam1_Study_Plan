'use strict';

const sqlite = require('sqlite3');
const db = new sqlite.Database('courses.db', err => {
	if (err) throw err;
});

exports.getStudyPlanById = matricola => {
	return new Promise((resolve, reject) => {
		const query = 'SELECT * FROM Study_Plans WHERE matricola = ?';
		db.get(query, [matricola], (err, row) => {
			if (err) reject(err);
			else resolve(row);
		});
	});
};

exports.updateStudyPlan = (matricola, isFullTime, courses) => {
	return new Promise((resolve, reject) => {
		const query =
			'UPDATE Study_Plans SET courses = ?, is_full_time = ? WHERE matricola = ?';
		db.run(query, [courses, isFullTime, matricola], function (err) {
			if (err) reject(err);
			else resolve(this.changes ? true : false);
		});
	});
};

exports.deleteStudyPlan = matricola => {
	return new Promise((resolve, reject) => {
		const query =
			'UPDATE Study_Plans SET courses = null, is_full_time = null WHERE matricola = ?';
		db.run(query, [matricola], function (err) {
			if (err) reject(err);
			else resolve(this.changes ? true : false);
		});
	});
};
