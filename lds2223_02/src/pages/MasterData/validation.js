export const validationMessage={
required:"This field is required",
number:"This field is a number",
nif:"This field must be 9 digits",
phoneNumber:"This field has to be a valid Phone Number ",
positive:"This field values has to be positive",
date:"This field values has to be a valid date",
email:"This field has to be an valid email ",
max150:"This field has a maximum of 150 characters",
max120:"This field has a maximum of 150 characters",
password:"Password must be between 8-20 characters with at least one digit",
licensePlate:"License Plate must be valid example:00-AA-00"
}
export const validationPatterns={
phoneNumber:/^(\+?351)?9\d\d{7}$/,
number:/^[0-9]+$/,
password:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
date:/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
licensePlate:/^[0-9]{2}[\s-]{0,1}[0-9]{2}[\s-]{0,1}[A-IK-PR-VZ]{2}|[0-9]{2}[\s-]{0,1}[A-IK-PR-VZ]{2}[\s-]{0,1}[0-9]{2}|[A-IK-PR-WYZ]{2}[\s-]{0,1}[0-9]{2}[\s-]{0,1}[A-IK-PR-WYZ]{2}$/
}