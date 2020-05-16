export default () => {
  return {
    require: ['./ava.setup.js'],
    ignoredByWatcher: ['!**/*.{js,vue}'],
    babel: true,
    tap: true,
    verbose: true,
    color: true
  }
}
