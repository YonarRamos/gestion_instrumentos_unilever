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
  auth: false
});

export const mutations = {
  async SET_AUTH(state, token) {
    state.auth = true;  
    Cookies.set('token', token)
    Cookies.set('name', state.user.nombre)
    Cookies.set('lastname', state.user.apellido)
    Cookies.set('rol', state.user.rol)   
    this.$router.push('/')
  },
  async setUser(state, payload){
    state.user = payload
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
  cargarOTS(state, payload){
    state.ots.push(payload)
  },
  async SET_DESLOGIN(state) {  
    state.auth = false;
    Cookies.remove('token')
    Cookies.remove('name')
    Cookies.remove('lastname')
    Cookies.remove('rol')   
    location.reload();
  }

};
export const actions ={
    nuxtServerInit({commit},{req }){
        //console.log(req.headers)
        if(req.headers.cookie){
            let { token } = cookie.parse(req.headers.cookie);
            console.log(req.headers.cookie)
            if (token) {
                commit('SET_AUTH', token)
              }
        }
    }

}
