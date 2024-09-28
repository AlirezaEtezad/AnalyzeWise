var primary = localStorage.getItem("primary") || '#43B9B2';
var secondary = localStorage.getItem("secondary") || '#C280D2';
var tertiary = localStorage.getItem("tertiary") || '#FD7E40';
var success = localStorage.getItem("success") || '#17A600';
var info = localStorage.getItem("info") || '#2E8DD3';
var warning = localStorage.getItem("warning") || '#F0AD4E';
var danger = localStorage.getItem("danger") || '#C42A02';
var light = localStorage.getItem("light") || '#F4F5F8';
var border = localStorage.getItem("border") || '1px dashed rgba(106, 113, 133, 0.3)';
window.EdminAdminConfig = {
	// Theme Primary Color
	primary: primary,
	// theme secondary color
	secondary: secondary,
    // theme tertiary color
    tertiary: tertiary,
	// theme success color
	success: success,
	// theme info color
	info: info,
	// theme warning color
	warning: warning,
	// theme danger color
	danger: danger,
    // theme light color
	light: light,
    // theme light color
	border: border,
};
