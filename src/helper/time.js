// javascript-time-ago package custom formats
// Definition of custom time ago formats in the portuguese language
// for the non-standard time stamps used by Instagram.

const commentLabels = {
  second: "agora",
  minute: "{0}m",
  hour: "{0}h",
  day: "{0}d",
  week: "{0} sem",
}

const commentSteps = [
  {
    formatAs: "second",
  },
  {
    minTime: 60,
    formatAs: "minute",
  },
  {
    minTime: 60 * 60,
    formatAs: "hour",
  },
  {
    minTime: 24 * 60 * 60,
    formatAs: "day",
  },
  {
    minTime: 7 * 24 * 60 * 60,
    formatAs: "week",
  },
]

const commentStyle = {
  steps: commentSteps,
  labels: "commentLabels",
}

const postLabels = {
  second: "agora",
  minute: {
    one: "Há {0} minuto",
    other: "Há {0} minutos",
  },
  hour: {
    one: "Há {0} hora",
    other: "Há {0} horas",
  },
  day: {
    one: "Há {0} dia",
    other: "Há {0} dias",
  },
}

const postSteps = [
  {
    formatAs: "second",
  },
  {
    minTime: 60,
    formatAs: "minute",
  },
  {
    minTime: 60 * 60,
    formatAs: "hour",
  },
  {
    minTime: 24 * 60 * 60,
    formatAs: "day",
  },
  {
    // Starting from 7 days to the beginning of the current year, Instagram displays the post's date in Day, Month format
    minTime: 8 * 24 * 60 * 60,
    format(value, locale) {
      return new Intl.DateTimeFormat(locale, {
        month: "long",
        day: "numeric",
      }).format(new Date(value))
    },
  },
  {
    // Other years show the full date in Day, Month, Year format
    minTime(timestamp) {
      const beginningOfYear = new Date(new Date().getFullYear(), 0).getTime()
      const now = new Date(Date.now()).getTime()
      return Math.abs(beginningOfYear - now) / 1000
    },
    format(value, locale) {
      return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(value))
    },
  },
]

const postStyle = {
  steps: postSteps,
  labels: "postLabels",
}

export { commentLabels, commentStyle, postLabels, postStyle }
