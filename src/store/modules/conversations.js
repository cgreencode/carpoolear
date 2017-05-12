import {ConversationApi} from '../../services/api';
import * as types from '../mutation-types';
import * as pagination from '../pagination';
import globalStore from '../index';

let conversationApi = new ConversationApi();
let pageSize = 20;

const state = {
    ...pagination.makeState('list'),
    userList: null,
    selectedID: null,
    messages: {
        /*
            id => {
                list: [],
                timestamp: DateTime,
                last_page: Boolean
            }
        */
    }
};

// getters
const getters = {
    ...pagination.makeGetters('list'),
    users: state => state.userList,
    selectedConversation: state => state.list ? state.list.find(item => item.id === state.selectedID) : null,
    messages: state => state.messages[state.selectedID],
    messagesList: state => state.messages[state.selectedID].list.reverse()
};

// actions
const actions = {
    ...pagination.makeActions('list', (data) => {
        return conversationApi.list();
    }),

    getUserList (store, texto) {
        if (texto.length > 0) {
            store.commit(types.CONVERSATION_SET_USERLIST, null);
            return conversationApi.userList({value: texto}).then((response) => {
                store.commit(types.CONVERSATION_SET_USERLIST, response.data);
            });
        } else {
            store.commit(types.CONVERSATION_SET_USERLIST, null);
            return Promise.resolve();
        }
    },

    createConversation (store, user) {
        return conversationApi.create(user.id).then((response) => {
            globalStore.dispatch('conversations/listSearch');
            return Promise.resolve(response.data);
        });
    },

    select (store, id) {
        store.commit(types.CONVERSATION_SET_SELECTED, id);
        if (!store.state.messages[id]) {
            store.state.messages[id] = {
                list: [],
                timestamp: null,
                last_page: false
            };
        }
        globalStore.dispatch('conversations/findMessage');
    },

    findMessage (store, {id, more}) {
        if (!id) {
            id = store.state.selectedID;
        }
        let msgObj = store.state.messages[id];
        let timestamp = more ? msgObj.timestamp : null;
        let unread = false;

        return conversationApi.getMessages({ unread, pageSize, timestamp }).then(response => {
            if (!more) {
                store.commit(types.CONVERSATION_BLANK_MESSAGES, {id});
            }
            if (response.data.length > 0) {
                store.commit(types.CONVERSATION_SET_LAST_PAGE);
            } else {
                response.data.forEach(item => {
                    store.commit(types.CONVERSATION_ADD_MESSAGE, item);
                });
            }
        }).catch(error => {
            return Promise.reject(error);
        });
    },

    sendMessage (store, message) {
        let id = store.state.selectedID;
        return conversationApi.send(id, message).then(response => {
            store.commit(types.CONVERSATION_ADD_MESSAGE, {message: response.data});
        }).catch(error => {
            return Promise.reject(error);
        });
    }

};

// mutations
const mutations = {
    ...pagination.makeMutations('list'),

    [types.CONVERSATION_SET_USERLIST] (state, users) {
        state.userList = users;
    },

    [types.CONVERSATION_SET_SELECTED] (state, id) {
        state.selectedID = id;
    },

    [types.CONVERSATION_ADD_MESSAGE] (state, {message, id}) {
        if (!id) {
            id = state.selectedID;
        }
        state.messages[id].list.push(message);
    },

    [types.CONVERSATION_SET_LAST_PAGE] (state, {id}) {
        if (!id) {
            id = state.selectedID;
        }
        state.messages[id].last_page = true;
    },

    [types.CONVERSATION_BLANK_MESSAGES] (state, {id}) {
        if (!id) {
            id = state.selectedID;
        }
        state.messages[id].last_page = false;
        state.messages[id].list = [];
        state.messages[id].timestamp = null;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
