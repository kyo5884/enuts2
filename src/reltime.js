relTime = (time) => {
  var nowDate = new Date()
  var targetDate = new Date(time)

  var elapsedTime = Math.ceil((nowDate.getTime() - targetDate.getTime()) / 1000)

  var message = null

  if (elapsedTime < 60) {
    message = 'now'
  } else if (elapsedTime < 60 * 60) {
    // 1 時間未満
    message = Math.floor(elapsedTime / 60) + 'm'
  } else if (elapsedTime < 24 * 60 * 60) {
    // 1 日未満
    message = Math.floor(elapsedTime / 3600) + 'h'
  } else if (elapsedTime < 7 * 24 * 60 * 60) {
    // 1 週間未満
    message = Math.floor(elapsedTime / 86400) + 'd'
  } else {
    // 1 週間以上
    message = Math.floor(elapsedTime / 604800) + 'w'
  }

  return message
}

module.exports = relTime
