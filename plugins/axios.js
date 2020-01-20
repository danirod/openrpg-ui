export default function({ $axios }) {
  // TODO: Use real authentication instead of API tokens
  $axios.setToken(`Bearer YOUR_TOKEN_HERE`)
}
