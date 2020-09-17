'use strict';

// Google Calendar API

const axios = require('axios');
const _ = require('lodash');
const moment = require('moment-timezone')
moment.tz.setDefault("Asia/Tokyo")

const API_KEY = 'AIzaSyBW8OfiakTWaAvhc3zHqeYTHMH7CP4h_AU';
const ID = 'japanese__ja@holiday.calendar.google.com';
const TARGET_MONTHS_START = 6
const TARGET_MONTHS_END = 6

let holidays = null

const getClosestWeekday = (date) => {
  if (date == undefined) {
    date = moment().tz("Asia/Tokyo").startOf('day')
  }
  date.add(1, 'days')
  while (includesMomentElement(holidays, date)) {
    date.add(1, 'days')
  }
  return date
}

const getEarlierOrSameWeekday = (date) => {
  while (includesMomentElement(holidays, date)) {
    date.subtract(1, 'days')
  }
  return date
}

const getNationalHolidays = async () => {
  const from = moment().tz("Asia/Tokyo").subtract(TARGET_MONTHS_START, 'months').format('YYYY-MM-DD') + 'T00:00:00Z'
  const to = moment().tz("Asia/Tokyo").add(TARGET_MONTHS_END, 'months').format('YYYY-MM-DD') + 'T00:00:00Z'

  // Googleに渡す日付を作成
  try {
    const res = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/${ID}/events?key=${API_KEY}&timeMin=${from}&timeMax=${to}`);
    //console.log(res)
    return _.map(res.data.items, (item) => {
      return moment(item.start.date).tz("Asia/Tokyo")
    });
  } catch (error) {
    const {
      status,
      statusText
    } = error.response;
    alert(`API接続時にエラーが発生しました。HTTP Status: ${status} ${statusText}`)
    throw error
  }
};

const fetchHolidays = async () => {
  if (holidays != null) {
    return
  }
  let holidaysTmp = await getNationalHolidays()
  const from = moment().tz("Asia/Tokyo").subtract(TARGET_MONTHS_START, 'months').startOf('day')
  const to = moment().tz("Asia/Tokyo").add(TARGET_MONTHS_END, 'months')
  let date = from
  //国民の祝日+土日
  while (date.isBefore(to)) {
    //平日なら次のループへ
    if (date.day() != 6 && date.day() != 0) {
      date.add(1, 'days')
      continue
    }
    if (!includesMomentElement(holidaysTmp, date)) {
      holidaysTmp.push(date.clone())
    }
    date.add(1, 'days')
  }
  holidays = _.sortBy(holidaysTmp, function (holiday) {
    return holiday.unix()
  });
}

const includesMomentElement = (arr, date) => {
  const existanse = _.find(arr, function (el) {
    return el.isSame(date)
  });
  return existanse !== undefined
}

const getShukkaYoteibi = (values) => {
  let date = moment(values[1], 'YYYY/MM/DD')
  if (!date.isValid()) {
    return getClosestWeekday()
  }
  console.log(values[0])
  if ([
    '北海道', '福岡県', '佐賀県', '大分県', '長崎県', '熊本県', '宮崎県', '鹿児島県', '沖縄県',
    '青森県', '兵庫県', '岡山県', '広島県', '山口県', '鳥取県', '島根県', '徳島県', '香川県', '高知県', '愛媛県'
  ]
    .includes(values[0])) {
    date.subtract(2, 'days')
  } else {
    date.subtract(1, 'days')
  }
  return getEarlierOrSameWeekday(date)
}

const validateShukkaYoteibi = (values) => {
  let date = getShukkaYoteibi(values)
  if (date.isSameOrBefore(moment(), 'day')) {
    throw new Error(`お届け希望日から計算した出荷予定日が今日以前（${date.format('YYYY/MM/DD')}）になってしまいます。`)
  }
  return true
}

module.exports = {
  getShukkaYoteibi,
  validateShukkaYoteibi,
  fetchHolidays,
}
