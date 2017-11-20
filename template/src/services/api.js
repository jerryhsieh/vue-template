
const state = {
  apiUrl: "https://demo.onionstudio.com.tw/api",
  publicUrl: "https://demo.onionstudio.com.tw/public"
}

const getters =  {
  apiUrl: state => state.apiUrl,
  publicUrl: state => state.publicUrl,
}

export default {
  state,
  getters
}
