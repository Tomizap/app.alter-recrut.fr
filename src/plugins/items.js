// src/plugins/refreshDataPlugin.js
import refreshData from '../utils/refreshData';

export default {
    install(app, { store }) {
        app.config.globalProperties.$items = {
            data: null,
            config: {

            },
            reaload: async () => store.dispatch('fetchItem')
        };
        store.dispatch('fetchItem');
    }
};
