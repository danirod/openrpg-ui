export default () => {
  return {
    require: ['./ava.setup.js'],
    ignoredByWatcher: ['!**/*.{js,vue}'],
    snapshotDir: 'snapshots',
    babel: true,
    tap: true,
    verbose: true,
    color: true
  }
}
