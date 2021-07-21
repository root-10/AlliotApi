module.exports = {
  getCurrentDate() {
    const currentDate = new Date();
    return `${currentDate.getFullYear()}-${twoDigitsFormater(currentDate.getMonth() + 1)}-${twoDigitsFormater(currentDate.getDate())} ${twoDigitsFormater(currentDate.getHours())}:${twoDigitsFormater(currentDate.getMinutes())}:${twoDigitsFormater(currentDate.getSeconds())}`;
  },

  getTimestamp() {
    const timestamp = Date.now();
    return Math.floor(timestamp / 1000);
  }
};

function twoDigitsFormater(value) {
  return typeof (value) === 'number' ? (`0${value}`).slice(-2) : '00';
}