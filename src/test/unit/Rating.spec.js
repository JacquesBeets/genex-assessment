import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { createApp } from 'vue'
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

import Rating from "../../components/Rating.vue";

const vuetify = createVuetify({ components, directives })
const AppRating = createApp(Rating)
AppRating.use(vuetify)

describe("Rating.vue", () => {
    let store;
    let mockFunction = jest.fn();
    let mockRouter = {
        push: jest.fn(),
    };

    beforeEach(() => {  
        store = createStore({
            state() {
                return {
                    searchQuery: '',
                    selectedSearchQuery: '',
                    user: {},
                    apiBase: "https://api.punkapi.com/v2",
                    beers: [],
                    beerInfo:{},
                    ratings: []
                };
            },
            mutations: {
                setUser(state, payload) { 
                    state.user = payload;
                },
            },
            actions: {
                fetchUser: mockFunction,
                fetchRatings: mockFunction,
            },
            getters: {
                getUserLoggedIn: mockFunction,
                getBeers: mockFunction,
            },
        });
    });

    test("Check that Rating component exists.", () => {
        // Arrange
        const wrapper = mount(AppRating, {
            global: { plugins: [store] },
        });
        // Act
        // Assert
        expect(wrapper.findComponent({name: "Rating"}).exists()).toBe(true);
    }
    );
});
