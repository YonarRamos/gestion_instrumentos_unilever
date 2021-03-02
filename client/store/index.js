import Cookies from 'js-cookie'
import cookie from 'cookie'

export const state = () => ({
  infoModal:{
    dialog: false,
    msj:"",
    titulo:"",
    alertType: "",
  },
  dialogPassword: false,
  ots:[],
  auth: false,
  dialogLoading: false
});

export const mutations = {
  async SET_AUTH(state, token) {
    state.auth = true;  
    Cookies.set('token', token)
    this.$router.push('/')
  },
  async setUser(state, payload){
    Cookies.set('user', payload.empresa)
    Cookies.set('user_id', payload.id)
  },
  toggleDialogPassword(state, payload){
    state.dialogPassword = payload
  },
  toggleInfoModal(state, payload){
    state.infoModal.dialog = true
    state.infoModal.msj = payload.msj
    state.infoModal.titulo = payload.titulo
    state.infoModal.alertType = payload.alertType
  },
  ocultarInfoModal(state, payload){
    state.infoModal.dialog = payload
  },
  async SET_DESLOGIN(state) {  
    Cookies.remove('token');
    Cookies.remove('user');
    Cookies.remove('user_id')
    state.auth = false;
    this.$router.push('/login')
  },
  toggleLoading(state, payload){
    state.dialogLoading = payload;
  }

};
export const actions ={
    nuxtServerInit({commit},{req }){
        if(req.headers.cookie){
            let { token } = cookie.parse(req.headers.cookie);
            console.log(req.headers.cookie)
            if (token) {
                commit('SET_AUTH', token)
              }
        }
    }

}
