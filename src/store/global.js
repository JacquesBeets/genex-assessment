import { createStore } from 'vuex'
import router from '../router'
import { auth, db } from '../firebase'
import { collection, addDoc, setDoc, doc, getDocs, query, where, onSnapshot } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

const store = createStore({
    state () {
      return {
        searchQuery: '',
        selectedSearchQuery: '',
        user: {},
        apiBase: "https://api.punkapi.com/v2",
        beers: [],
        beerInfo:{},
        ratings: []
      }
    },
    getters: {
      getBeers(state){
        return state.beers
      },
      getUserLoggedIn(state){
        return state.user.auth ? true : false
      },
      getRatings(state){
        
        const ratings = {}
        state.ratings.forEach(rating => {
          if(ratings[rating.beer]){
            ratings[rating.beer].push(rating)
          }else{
            ratings[rating.beer] = [rating]
          }
        })

        // loop over reatings object and calculate average rating of each beer out of 5
        for(let beer in ratings){
          let total = 0
          ratings[beer].forEach(rating => total += rating.rating)
          ratings[beer] = total / ratings[beer].length
        }
        return ratings
      }
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
      },
      SET_SEARCH_QUERY(state, query){
        state.searchQuery = query
      },
      SET_SELECTED_SEARCH_QUERY(state, query){
        state.selectedSearchQuery = query
      },
      SET_RATINGS(state, ratings){
        state.ratings = ratings
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
          console.error(error)
        }
      },
      async sendMessage({state}, message){
        const collectionRef = collection(db, 'messages')

        const messageObj = {  
          message,
          user: state.user.uid,
          username: state.user.email.split('@')[0],
          createdAt: new Date()
        }

        const messageRef = await addDoc(collectionRef, messageObj)
        return messageRef
      },
      async createRating({state}, payload){
        const collectionRef = collection(db, 'ratings')

        const ratingObj = {  
          rating: payload.rating,
          beer: payload.id,
          user: state.user.uid,
          username: state.user.email.split('@')[0],
          createdAt: new Date()
        }
        const ratingRef = await addDoc(collectionRef, ratingObj)
        return ratingRef
      },
      fetchRatings({state, commit}){
        const q = query(collection(db, 'ratings'))
        onSnapshot(q, (querySnapshot) => {
          const ratings = []
          querySnapshot.forEach((doc) => {
            ratings.push(doc.data())
          })
          commit('SET_RATINGS', ratings)
        })
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
      },
      fetchBeersByFoodPairing({state, commit}, foodPairing){
        return fetch(`${state.apiBase}/beers?food=${foodPairing}`)
                .then(response => response.json())
                .then(data => {
                  commit('SET_BEERS', data)
                  return data
                })
                .catch(error => error)
      },
    }
  })

  export default store