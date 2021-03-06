import {
	getSelectedCourses,
	updateStudyPlan,
	deleteStudyPlan
} from '../../API';

// Functions about the whole table and APIs

export const fetchSelectedCourses = async (
	setSelectedCoursesList,
	setIsFullTime,
	setIsSelectable,
	setIsEmpty,
	matricola
) => {
	const listObj = await getSelectedCourses(matricola);
	setSelectedCoursesList(listObj.list);
	setIsSelectable(!(listObj.list.length === 0));
	setIsEmpty(listObj.list.length === 0);
	setIsFullTime(listObj.isFullTime);
};

export const updateSelectedCourses = (
	matricola,
	isFullTime,
	selectedCoursesList
) => {
	updateStudyPlan(matricola, isFullTime, selectedCoursesList);
};

export const deleteCurrentStudyPlan = async matricola => {
	await deleteStudyPlan(matricola);
};

// Functions involving the table and its content

export const addSelectedCourse = (course, setSelectedCoursesList) => {
	if (
		!(
			course.isFullyBooked ||
			course.isTaken ||
			course.hasConflicts ||
			course.hasPreparatory === false
		)
	)
		setSelectedCoursesList(originalList => originalList.concat(course));
};

export const removeSelectedCourse = async (
	courseCode,
	setSelectedCoursesList
) => {
	setSelectedCoursesList(selectedCoursesList =>
		selectedCoursesList.filter(course => course.code !== courseCode)
	);
};

// Functions for checking constraints

export const checkFullyBooked = selectedCoursesList => {
	return !selectedCoursesList.some(
		course => course.currStudents === course.maxStudents
	);
};

export const checkDuplicate = (courseCode, selectedCoursesList) => {
	return !selectedCoursesList.map(course => course.code).includes(courseCode);
};

export const checkConflicts = (courseCode, selectedCoursesList) => {
	let flag = true;
	selectedCoursesList.forEach(course => {
		if (course.incompatibleCodes.includes(courseCode)) {
			flag = false;
		}
	});
	return flag;
};

export const checkPreparatory = (courseCode, selectedCoursesList) => {
	return !selectedCoursesList
		.map(course => course.preparatoryCourseCode)
		.includes(courseCode);
};

export const findPreparatory = (courseCode, selectedCoursesList) => {
	return selectedCoursesList.find(
		course => course.preparatoryCourseCode === courseCode
	);
};

export const checkCredits = (
	selectedCoursesList,
	setCurrCredits,
	maxCredits,
	minCredits
) => {
	let credits = 0;
	selectedCoursesList.forEach(course => {
		credits += course.credits;
	});
	setCurrCredits(credits);
	return !(credits > maxCredits || credits < minCredits);
};

export const alterFullTime = setIsFullTime => {
	setIsFullTime(isFullTime => !isFullTime);
};

// Extra functions

export const changeListVariant = (isValidList, listSent) => {
	if (!listSent) {
		return isValidList ? 'warning' : 'danger';
	} else return 'success';
};
