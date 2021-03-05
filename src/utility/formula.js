export default {
  commaFormat: function (val) {
    return Number(val)
      .toString()
      .replace(
        /^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/,
        (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&'),
      )
  },
  jqCustomEvent: function (type, data) {
    return $.extend($.Event(type || '', data || {}))
  },

  getDegree: function (value) {
    return value * (Math.PI / 180)
  },

  getRandom: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },
}
