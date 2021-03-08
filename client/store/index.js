import Cookies from 'js-cookie'
import cookie from 'cookie';
import axios from "../plugins/axios";

export const state = () => ({
  infoModal:{
    dialog: false,
    msj:"",
    titulo:"",
    alertType: "",
  },
  dialogPassword: false,
  ots:[],
  auth: true,
  dialogLoading: false
});

export const mutations = {
  async SET_AUTH(state, token) {
    state.auth = true;  
    Cookies.set('token', token)
    this.$router.push('/')
  },
  async SET_AUTH_AUTOMATIC(state, res) {
    state.auth = true;
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
export const actions = {
  
  async nuxtServerInit ({ commit , state }, { req }  ) { 
        
     if (req.headers.cookie) {
         let { token } = cookie.parse(req.headers.cookie);
        
         await axios
           .get("loginUsersAutomatico", {
             headers: { Authorization: `Bearer ${token}` }
           })
           .then(res => {
             this.commit('SET_AUTH_AUTOMATIC', true );                    
           }).catch(err => {               
           })                
     }
   },
 

};
