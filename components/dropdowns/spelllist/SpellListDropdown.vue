<script>
// import the Companies component
import Dropdown from './dropdown'
// import the higher order component
import DropdownHOC from './hoc.js'

import * as api from '~/api/spell-lists'

const fetchSpellLists = async (axios) => {
  const res = await api.fetchSpellLists(axios)
  return res
    .map(api.SearchResultAdapter)
    .map((item) => ({ value: item.id, text: item.name }))
}

// Create a const variable which contains the Companies component wrapped in the higher order component
export default DropdownHOC(Dropdown, fetchSpellLists)
</script>
