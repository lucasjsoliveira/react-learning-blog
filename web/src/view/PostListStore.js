/**
 * Created by lucas on 23/09/16.
 */

import {observable} from 'mobx';
import postApi from './../api/post';
class PostListStore {
    @observable posts = [];
    @observable isLoading = false;
    @observable page = 1;
    @observable count = 0;
    @observable pageSize = 1;
    @observable tagName = null;

    // @action
    changePage(c) {
        this.page += c;
        this.fetchPosts();
    }

    // @action
    goTo(c) {
        this.page = c;
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
            this.posts = data.models;
            this.count = data.total;
            this.pageSize = data.page_size;
            this.isLoading = false;
        }.bind(this))
    }

    fetchPostsByTag(tagId) {
        this.isLoading = true;
        postApi.getByTag(tagId, this.page).then(function (data) {
            this.posts = data.models;
            this.maxPages = data.total_pages - 1;
            this.isLoading = false;
            this.tagName = data.tagName;
        }.bind(this))
    }
}

var postListStore = new PostListStore();

export default postListStore;