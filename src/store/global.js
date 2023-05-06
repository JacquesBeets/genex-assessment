import { createStore } from 'vuex'
import router from '../router'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

const store = createStore({
    state () {
      return {
        user: {},
        apiBase: "https://api.punkapi.com/v2",
        beers: [],
        beerInfo:{}
      }
    },
    getters: {
      getBeers(state){
        return state.beers.filter(beer => 
          beer.image_url !== null &&
          beer.id !== 1 &&
          beer.id !== 3
        )
      },
    },
    mutations: {
      SET_USER(state, user){
        state.user = user
      },
      CLEAR_USER(state){ 
        state.user = {}
      },
      SET_BEERS(state, beers){
        state.beers = beers
      },
      SET_BEER_INFO(state, beerInfo){
        state.beerInfo = beerInfo
      }
    },
    actions:{
      login({commit}, userDetails){
        const { email, password } = userDetails
        return signInWithEmailAndPassword(auth, email, password)
          .then(user => {
            commit('SET_USER', auth.currentUser)
            router.push('/')
            return user
          })
          .catch(error => error)
      },
      register({commit}, userDetails){
        const { email, password } = userDetails
        return createUserWithEmailAndPassword(auth, email, password)
          .then(user => {
            commit('SET_USER', auth.currentUser)
            router.push('/')
            return user
          })
          .catch(error => error)
      },
      async logout({commit}){
        try {
          await signOut(auth)
          commit('CLEAR_USER')
          router.push('/login')
        } catch (error) {
          console.log(error)
        }
      },
      fetchUser({commit}){  
        auth.onAuthStateChanged(async user => { 
          if(user){
            commit('SET_USER', user)
            if(router.isReady() && router.currentRoute.value.path === '/login'){
              router.push('/')
            }
          }else{
            commit('CLEAR_USER')
          }
        })
      },
      fetchBeers({state, commit}){
        return fetch(`${state.apiBase}/beers?per_page=80`)
                .then(response => response.json())
                .then(data => {
                  commit('SET_BEERS', data)
                  return data
                })
                .catch(error => error)
      },
      fetchBeerById({state, commit}, id){
        return fetch(`${state.apiBase}/beers/${id}`)
                .then(response => response.json())
                .then(data => {
                  commit('SET_BEER_INFO', data[0])
                  return data[0]
                })
                .catch(error => error)
      }
    }
  })

  export default store