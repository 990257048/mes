function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import CalendarLocale from "rc-picker/es/locale/fr_FR";
import TimePickerLocale from '../../time-picker/locale/fr_FR'; // Merge into a locale object

var locale = {
  lang: _extends({
    placeholder: 'Sélectionner une date',
    yearPlaceholder: 'Sélectionner une année',
    monthPlaceholder: 'Sélectionner un mois',
    weekPlaceholder: 'Sélectionner une semaine',
    rangePlaceholder: ['Date de début', 'Date de fin'],
    rangeYearPlaceholder: ['Année de début', 'Année de fin'],
    rangeMonthPlaceholder: ['Mois de début', 'Mois de fin'],
    rangeWeekPlaceholder: ['Semaine de début', 'Semaine de fin']
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePickerLocale)
}; // All settings at:
// https://github.com/ant-design/ant-design/issues/424

export default locale;