// Random number generator between min and max.
// Used for generating random avatars as a workaround to database issues.

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default getRandomInt
