import React from 'react';
import { Input, Checkbox } from 'antd';

const { TextArea } = Input;

export default {
	id: {
		label: 'ID',
	},
	name: {
		label: 'Customer Name',
		required: true,
	},
	companyName: {
		label: 'Company Name',
	},
	website: {
		label: 'Website',
	},
	active: {
		label: 'Active',
	},
	salutation: {
		label: 'Salutation',
	},
	first_name: {
		label: 'First Name',
		editable: true,
	},
	last_name: {
		label: 'Last Name',
		editable: true,
	},
	email: {
		label: 'Email',
	},
	phone: {
		label: 'Phone',
	},
	created_time: {
		label: 'Created Time',
	},
	last_modified_time: {
		label: 'Last Modified Time',
	},
	comments: {
		label: 'Comments',
	}
};