/**
 * Created by lucas on 23/09/16.
 */

import {observable} from 'mobx';
import postApi from './../api/post';
class PostStore {
    @observable posts = [];
    @observable isLoading = false;
    @observable page = 1;
    @observable maxPages = 1;

    // @action
    changePage(c) {
        this.page += c;
        this.fetchPosts();
    }

    // @action
    nextPage() {
        this.changePage(1);
    }

    // @action
    previousPage() {
        this.changePage(-1);
    }

    // @action
    fetchPosts() {
        this.isLoading = true;
        postApi.index(this.page).then(function (data) {
            this.posts = data.posts;
            this.maxPages = data.total_pages - 1;
            this.isLoading = false;
        }.bind(this))
    }
}

var homeStore = new PostStore();

export default homeStore;